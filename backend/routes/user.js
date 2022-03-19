const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);
router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/update/:id', auth, userCtrl.updateUser);

module.exports = router;