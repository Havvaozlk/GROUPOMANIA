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

//SUPPRIMER UN COMMENTAIRE
exports.deleteComment = (req, res, next) => {
    Comment.findOne ({
      where: {id :req.params.id}
    })
    .then(comments => {
      if (comments.id !== req.auth.userId) {
        console.log('comments.id' + comments.id);
        console.log('req.auth.userId' + req.auth.userId);
          return res.status(403).json({
            error : new Error('Unauthorized request!')
          })
        } else {
    Comment.destroy({where: {id: req.params.id}})
    .then(() => res.status(200).json({message: 'Post supprimé !'}))
    .catch(error => res.status(400).json({error}));
       
     } })
      .catch(error => res.status(500).json({error}))
    ;
  }