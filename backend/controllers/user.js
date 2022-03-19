
//on utilise le package de cryptage pour hasher le mot de passe
const bcrypt = require('bcrypt');
//on importe notre modele user
const models = require('../models/index');
const passwordValidator = require('password-validator');
//on installe et importe le package pour créer et vérifier les tokens d'authentification
//qui permettent aux utilisateurs de ne se connecter qu'une seule fois à leur compte 
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const User = models.users

var schema = new passwordValidator();
schema
.is().min(8)   //minimum 8 caractères                                 
.is().max(100)  //max 100                                
.has().uppercase()   //doit contenir des lettres majuscule                           
.has().lowercase()    //  doit contenir des lettres minuscule                        
.has().digits(1)       //doit contenir au moins un chiffre                         
.has().not().spaces()    //pas d'espace                      
.is().not().oneOf(['Passw0rd', 'Password123']); //ne doit pas etre égale à

//fonction inscription
exports.signup = async (req, res, next) => {
  if(req.body.email == null || req.body.email == '' || req.body.firstName == null || req.body.firstName == ''|| req.body.password == null || req.body.password == '' || req.body.lastName == null || req.body.lastName == '') {
    return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
}
if (!emailValidator.validate(req.body.email)) {
  return res.status(400).json({error: "Adresse mail invalide"})
}
if (!schema.validate(req.body.password))  {
  return res.status(400).json({error: "erreur mot de passe"}) 
}
try {
  // Vérification si l'utilisateur existe déjà
  let user = await User.findOne({ where: { email: req.body.email }});
  if (user !== null) {
    return res
      .status(400)
      .json({ error: `Email déjà utilisé` });
  }
  bcrypt.hash(req.body.password, 10)
        //on récupere le hash de mdp
      .then(hash => {
      //on crée le nouvel utilisateur
        User.create({
          id: req.body.id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          admin: false,
        })
        .then(() => res.status(200).json({error: "utilisateur crée !"}));
      })
      .catch(error => res.status(500).json({ error }));
} catch (err) {
  if (err.name == "SequelizeDatabaseError") {
    return res.status(500).json({ error: "Database Error"});
  }
  return res.status(500).json({ error: "Hash Process Error"});
}
}

 //fonction pour se connecter a un compte existant
exports.login = (req, res, next) => {
    User.findOne({ 
         where: {email: req.body.email}
    })
      .then(users => {
        //si on ne trouve pas l'utilisateur
        if (!users) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //si l'utilisateur a été trouvé on compare les mot de passes
        bcrypt.compare(req.body.password, users.password)
          .then((valid) => {
            //si elle n'est pas valable 
            if (!valid) {
              console.log(req.body.password);
              console.log(users.password);
              return res.status(401).json({ error: 'Email ou mot de passe incorrect !' });
            } 
            //si elle est valable on envoie un objet json avec le userId et token
            res.status(200).json({
                userId: users.id,
                admin: users.admin,
                firstName: users.firstName,
                    lastName: users.lastName,
                    email: users.email,
                //on appel la fonction sign de jwt pour encoder un nouveau token
                token: jwt.sign(
                  //on y ajoute l'id de l'utilisateur
                  { userId: users.id, admin:users.admin },
                  //on ajoute une chaine secrète de développement temporaire
                  'RANDOM_TOKEN_SECRET',
                  //nous définissons ensuite la fin de validité du token à 24H
                  { expiresIn: '24h' }
                )
              })
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

//fonction pour supprimer son compte
exports.deleteUser = (req, res, next) => {
  User.findOne ({
    where: {id :req.params.id}
  })
  .then(users => {
    if (users.id !== req.auth.userId) {
      console.log(req.auth.userId);
      console.log(users.id);
        return res.status(401).json({
          error : new Error('Unauthorized request!')
        })
      } else {
  User.destroy({where: {id: req.params.id}})
  .then(() => res.status(200).json({message: 'Compte supprimé !'}))
  .catch(error => res.status(400).json({error}));
     
   } })
    .catch(error => res.status(500).json({error}))
  ;
}

// afficher tout les utilisateurs
  exports.getAllUsers = (req, res, next) => {
     User.findAll({attributes : ['id', 'email', 'firstName', 'lastName', 'admin']})
    .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
}


//afficher un utilisateur
exports.getOneUser = (req,res, next) => {
  User.findOne({
    where: {id: req.params.id}
  })
  .then((user) => res.status(200).json(user))
  .catch(error => res.status(400).json({error:error}))
}

//modifier son profil
exports.updateUser = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((oldUser) => {
      if (oldUser.id !== req.auth.userId) {
        return res.status(403).json({
          error: new Error('Unauthorized request!')
        });
      }
      User.update({ ...req.body}, { where: { id: req.params.id } })
            .then(() => res.status(200).json({
              message: 'Profil modifié !',
              users : {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
              
              }
            }))
            .catch((error) => res.status(400).json({
              error
            }))
          });
}