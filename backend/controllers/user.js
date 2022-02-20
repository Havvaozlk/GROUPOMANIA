//on utilise le package de cryptage pour hasher le mot de passe
const bcrypt = require('bcrypt');
//on importe notre modele user
const User = require('../models/user');
//on installe et importe le package pour créer et vérifier les tokens d'authentification
//qui permettent aux utilisateurs de ne se connecter qu'une seule fois à leur compte 
const jwt = require('jsonwebtoken');

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
                isAdmin: req.body.isAdmin,
            })
                .then((user) => res.status(200).json({
                    userId: user.id,
                    isAdmin: user.isAdmin,
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
    