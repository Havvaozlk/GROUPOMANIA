
const models =require('../models/index');
const { posts } = require('../models/index');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const auth = require('../middleware/auth');
const post = require('../models/post');
//const { post } = require('../routes/user.js');


//créer un post
exports.createPost = (req, res, next) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "impossible de publier un message vide !"
        });
        return
    }
    if (req.file) {
        models.posts.create({
            id: req.auth.userId,
            content: req.body.content,
            status: req.body.status,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
        .then(() => res.status(201).json({
            message: 'post crée !'
        }))
        .catch((error) => res.status(400).json
        ({error, message: 'erreur1'}) )
    } else {
        post.create({
            id: req.auth.userId,
            content: req.body.content,
            status: req.body.status,
            image: null,
        })
        .then(() => res.status(201).json({
            message: 'post crée !'
        }))
        .catch((error) => res.status(400).json
        ({error, message: 'erreur2'}) )
    }

}

//afficher tout les post
exports.getAllPost = (req, res, next) => {
    models.posts.findAll({
        include: [{
            model: user,
            attributes : ['fistName', 'lastName', 'email', 'admin']
        }]
        
    })
    .then((posts) => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
}

//supprimer un post
exports.deletePost = (req, res, next) => {
    models.posts.findOne ({
      where: {id:req.params.id}
    })
    models.posts.destroy({where: {id: req.params.id}})
    .then(() => res.status(200).json(user) ({message: 'Post supprimé !'}))
    .catch(error => res.status(400).json({error}));
  };
    