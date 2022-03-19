const models = require('../models/index');
const Comment = models.comments;
const Post = models.posts;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../config/db');

// CREER UN COMMENTAIRE
exports.createComment = (req, res, next) => {
  Post.findByPk(req.params.postId)
    .then(commentedPost => {
      if (commentedPost) {
        const comment = Comment.build({
          content: req.body.content,
          postId: commentedPost.id,
          userId: req.auth.userId,
          creatorFirstName: req.body.creatorFirstName,
          creatorLastName: req.body.creatorLastName,
        })
        comment.save()
          .then(() => res.status(201).json({ message: 'Commentaire crée !' }))
          .catch(error => res.status(400).json(error));
      } else {
        return res.status(404).json({ error: "Le post n'a pas été trouvé" })
      }
    })
    .catch(error => res.status(500).json({ error: 'Erreur' }));
}

//AFFICHER UN COMMENTAIRE
exports.getOneComment = (req, res, next) => {
  Comment.findOne({
    where: { id: req.params.id }
  })
    .then((comment) => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error: error }))
}

//AFFICHER TOUT LES COMMENTAIRES
exports.getAllComments = (req, res, next) => {
  Comment.findAll()
    .then((comments) => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
}

//SUPPRIMER UN COMMENTAIRE
exports.deleteComment = (req, res, next) => {
  Comment.findOne({
    where: { id: req.params.id }
  })
    .then(comments => {
      if (comments.userId !== req.auth.userId) {
        console.log('comments.id' + comments.id);
        console.log('req.auth.userId' + req.auth.userId);
        return res.status(403).json({
          error: new Error('Unauthorized request!')
        })
      } else {
        Comment.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch(error => res.status(400).json({ error }));

      }
    })
    .catch(error => res.status(500).json({ error }))
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
  Comment.findOne({ where: { id: req.params.id } })

    .then((comments) => {
      console.log(comments);
      if (comments.userId !== req.auth.userId) {
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