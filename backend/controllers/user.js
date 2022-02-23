
//on utilise le package de cryptage pour hasher le mot de passe
const bcrypt = require('bcrypt');
//on importe notre modele user
const models = require('../models/index');
const { users } = require('../models/index');
const auth = require('../middleware/auth');
const passwordValidator = require('password-validator');
//on installe et importe le package pour créer et vérifier les tokens d'authentification
//qui permettent aux utilisateurs de ne se connecter qu'une seule fois à leur compte 
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');

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
exports.signup = (req, res, next) => {
  if (!emailValidator.validate(req.body.email) || (!schema.validate(req.body.password))) {  
    throw { error: " invalide !" }  
  } else if (emailValidator.validate(req.body.email) && (schema.validate(req.body.password))) 
    //on hash le mot de passe avec bcrypt, on lui passe le mot de passe et le nombre de tour que l'algorithme va faire
    bcrypt.hash(req.body.password, 10)
        //on récupere le hash de mdp
        .then(hash => {
            //on crée le nouvel utilisateur avecnotre modele Mongoose
            models.users.create({
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                admin: req.body.admin,
            })
                .then((users) => res.status(200).json({
                    userId: users.id,
                    admin: users.admin,
                    token: jwt.sign(
                        { userId: users.id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    ),
                }));
            })
                .catch(error => res.status(500).json({ error }));
          }

//fonction pour se connecter a un compte existant
exports.login = (req, res, next) => {
    models.users.findOne({ 
         where: {email: req.body.email}
    })
      .then(users => {
        //si on ne trouve pas l'utilisateur
        if (!users) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //si l'utilisateur a été trouvé on compare les mot de passes
        bcrypt.compare(req.body.password, users.password)
          .then(valid => {
            //si elle n'est pas valable 
            if (valid) {
              console.log(req.body.password);
              console.log(users.password);
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } else {
            //si elle est valable on envoie un objet json avec le userId et token
            res.status(200).json({
                userId: users.id,
                admin: users.admin,
                //on appel la fonction sign de jwt pour encoder un nouveau token
                token: jwt.sign(
                  //on y ajoute l'id de l'utilisateur
                  { userId: users.id },
                  //on ajoute une chaine secrète de développement temporaire
                  'RANDOM_TOKEN_SECRET',
                  //nous définissons ensuite la fin de validité du token à 24H
                  { expiresIn: '24h' }
                )
              })}
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

//fonction pour supprimer son compte
exports.deleteUser = (req, res, next) => {
  models.users.findOne ({
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
  models.users.destroy({where: {id: req.params.id}})
  .then((user) => res.status(200).json(user) ({message: 'Compte supprimé !'}))
  .catch(error => res.status(400).json({error}));
     
   } })
    .catch(error => res.status(500).json({error}))
  ;
}

// afficher tout les utilisateurs
  exports.getAllUsers = (req, res, next) => {
     models.users.findAll({attributes : ['id', 'email', 'firstName', 'lastName', 'admin']})
    .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
}


//afficher un utilisateur
exports.getOneUser = (req,res, next) => {
  models.users.findOne({
    where: {id: req.params.id}
  })
  .then((user) => res.status(200).json(user))
  .catch(error => res.status(400).json({error:error}))
}

//modifier son profil
exports.updateUser = (req, res, next) => {
  const userObject = req.file ? {
    ...req.body.users,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : {
    ...req.body
};
  models.users.findOne({ where: {id: req.params.id} })
    .then((users) => {
      if (users.id !== req.auth.userId) {
        return res.status(403).json({
          error: new Error('Unauthorized request!')
        });
      }
          models.users.update({ ...userObject }, { where: { id: req.params.id } })
            .then((users) => res.status(200).json({
              message: 'Profil modifié !',
              users : {
                id: users.id,
                firstName: users.firstName,
                lastName: users.lastName,
                email: users.email,
                password: users.password,
                admin: users.admin,
              
              }
            }))
            .catch((error) => res.status(400).json({
              error
            }))
          });
}

// exports.adminDeleteUser = (req, res, next) => {
//   models.users.findOne ({
//     where: {id :req.params.id}
//   })
//       .then(users => {
//         if (users.admin !== 1) {
//           console.log(users.admin);
//             return res.status(401).json({
//               error : new Error('Unauthorized request!')
//             })
//            } else {
//             models.users.destroy({where: {id: req.params.id}})
//             .then((user) => res.status(200).json(user) ({message: 'Compte supprimé !'}))
//             .catch(error => res.status(400).json({error}));
               
//              } })
//               .catch(error => res.status(500).json({error}))
//             ;
//           }

