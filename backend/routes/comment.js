const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer= require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.get('/:id', auth, commentCtrl.getOneComment);
module.exports= router;