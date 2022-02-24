const models =require('../models/index');
const Comment= models.comments;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const db = require('../config/db');

//AFFICHER UN POST
exports.getOneComment = (req,res, next) => {
    Comment.findOne({
      where: {id: req.params.id}
    })
    .then((comment) => res.status(200).json(comment))
    .catch(error => res.status(400).json({error:error}))
  }