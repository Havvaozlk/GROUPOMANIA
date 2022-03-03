const models =require('../models/index');
const Comment= models.comments;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../config/db');

// CREER UN COMMENTAIRE
exports.createComment = (req, res, next) => {
  if (!req.body.content) {
      res.status(400).send({
          message: "impossible de publier un commentaire vide !"
      });
      return
  } else {
      Comment.create({
              userId: req.auth.userId,
              content: req.body.content,
          })
          .then(() => res.status(201).json({
              message: 'Commentaire créé !'
          }))
          .catch((error) => res.status(400).json({
              error,
              message: 'Vous ne pouvez pas publier un commentaire'
          }))
  }
}

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
      if (comments.userId !== req.auth.userId) {
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

  //MODIFIER UN COMMENTAIRE
  exports.updateComment = (req, res, next) => {
    const commentObject = req.file ? {
      ...req.body.comments,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
      ...req.body
  };
    Comment.findOne({ where: {id: req.params.id} })
  
      .then((comments) => {
        console.log(comments);
        if (comments.userId !== req.auth.userId) {
        //   console.log(posts.id);
        //   console.log(req.auth.userId);
          return res.status(403).json({
            error: new Error('Unauthorized request!')
          });
        }
            Comment.update({ ...commentObject }, { where: { id: req.params.id } })
              .then((comments) => res.status(200).json({
                message: 'Commentaire modifié !'
              }))
              .catch((error) => res.status(400).json({
                error
              }))
            });
  }