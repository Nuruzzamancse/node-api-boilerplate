const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const authController = require('../controller/auth');

router.post('/', userController.createUser);
router.get('/:id', authController.userAuthenticate, userController.getSingleUser);

module.exports = router;