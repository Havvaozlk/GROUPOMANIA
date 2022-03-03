const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer= require('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');

router.post('/', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getOneComment);
router.get('/', auth, commentCtrl.getAllComments);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.put('/:id', auth, commentCtrl.updateComment);

module.exports= router;