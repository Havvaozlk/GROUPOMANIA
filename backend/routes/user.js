const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
// const password = require('../middleware/password');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//router.delete('/id', userCtrl.deleteUser);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
module.exports = router;