const models =require('../models/index');
const Comment= models.comments;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../config/db');

//AFFICHER UN COMMENTAIRE
exports.getOneComment = (req,res, next) => {
    Comment.findOne({
      where: {id: req.params.id}
    })
    .then((comment) => res.status(200).json(comment))
    .catch(error => res.status(400).json({error:error}))
  }

  //AFFICHER TOUT LES COMMENTAIRES
exports.getAllComments= (req, res, next) => {
    Comment.findAll({attributes : ['id', 'content']})
   .then((comments) => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
}