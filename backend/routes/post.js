const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.delete('/:id', postCtrl.deletePost);
router.get('/', postCtrl.getAllPost);
router.post('/', postCtrl.createPost);
module.exports= router;