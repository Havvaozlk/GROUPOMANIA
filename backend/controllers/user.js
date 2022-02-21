
//on utilise le package de cryptage pour hasher le mot de passe
const bcrypt = require('bcrypt');
//on importe notre modele user
const models = require('../models/index');
const { users } = require('../models/index')
const auth = require('../middleware/auth');
//on installe et importe le package pour créer et vérifier les tokens d'authentification
//qui permettent aux utilisateurs de ne se connecter qu'une seule fois à leur compte 
const jwt = require('jsonwebtoken');



//fonction inscription
exports.signup = (req, res, next) => {
    //on hash le mot de passe avec bcrypt, on lui passe le mot de passe et le nombre de tour que l'algorithme va faire
    bcrypt.hash(req.body.password, 10)
        //on récupere le hash de mdp
        .then(hash => {
            //on crée le nouvel utilisateur avecnotre modele Mongoose
            User.create({
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                admin: req.body.admin,
            })
                .then((user) => res.status(200).json({
                    userId: user.id,
                    admin: user.admin,
                    token: jwt.sign(
                        { userId: user.id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    ),
                    message: 'utilisateur crée !'
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
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
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
              });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

//fonction pour supprimer un compte
exports.deleteUser = (req, res, next) => {
  models.users.findOne ({
    where: {id :req.params.id}
  })
  models.users.destroy({where: {id: req.params.id}})
  .then((user) => res.status(200).json(user) ({message: 'Compte supprimé !'}))
  .catch(error => res.status(500).json({error}));
}

//afficher tout les utilisateurs
  exports.getAllUsers = (req, res, next) => {
    models.users.findAll({attributes : ['id', 'email', 'firstName', 'lastName']})
    .then((users) => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
}

//afficher un utilisateur
exports.getOneUser = (req,res, next) => {
  models.users.findOne({
    where: {id: req.params.id}
  })
  .then((user) => res.status(200).json(user))
  .catch(error => res.status(404).json({error:error}))
}

//modifier un utilisateur
exports.updateUser = (req,res,next) => {
  models.users.findOne({ where: {id: req.params.id}
  })
  .then((user) => {
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    email = req.body.email;
    user.update()
    .then(() => res.status(201).json({message: 'Votre profil a été modifié ! ' }))
    .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

}