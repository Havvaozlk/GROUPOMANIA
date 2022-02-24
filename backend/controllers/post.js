
const models =require('../models/index');
const Post= models.posts;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../config/db');

//AFFICHER UN POST
exports.getOnePost = (req,res, next) => {
    Post.findOne({
      where: {id: req.params.id}
    })
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(400).json({error:error}))
  }

// CREER UN POST
exports.createPost = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

if (!req.file) {
    return Post.create({
        id: userId,
        content: req.body.content,
        status: req.body.status,
        image: "",
    })
        .then((posts) => res.status(201).json(posts))
        .catch((error) => {console.log(error)
             res.status(500).json(error)});

    } else if (req.file) {
        Post.create({
            id: userId,
            content: req.body.content,
            status: req.body.status,
            image: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
            }`,
        })
            .then((posts) => res.status(201).json({posts}))
            .catch((error) => res.status(500).json(error));
    }
};


//AFFICHER TOUT LES POST
exports.getAllPosts= (req, res, next) => {
    Post.findAll({attributes : ['id', 'content', 'status', 'image', 'userId']})
   .then((posts) => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
}

//supprimer un post
exports.deletePost = (req, res, next) => {
    Post.findOne ({
      where: {id :req.params.id}
    })
    .then(posts => {
      if (posts.id !== req.auth.userId) {
        console.log('post.id' + req.auth.userId);
        console.log('posts.id' + posts.id);
          return res.status(403).json({
            error : new Error('Unauthorized request!')
          })
        } else {
    Post.destroy({where: {id: req.params.id}})
    .then(() => res.status(200).json({message: 'Post supprimé !'}))
    .catch(error => res.status(400).json({error}));
       
     } })
      .catch(error => res.status(500).json({error}))
    ;
  }

