const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer= require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.delete('/:id', auth, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
module.exports= router;