const jwt = require('jsonwebtoken');
const express = require(`express`);
const router = express.Router();
require('dotenv').config();
const auth = require('../middleware/authentication.js');
const userController = require("../controller/user.js")

router.get(`/`, auth.authenticationMiddleware, userController.getUsers);
router.post(`/register`, userController.register);
router.put(`/update/:userId`, userController.update);
router.delete(`/delete/:userId`, userController.deleteUser);
router.post('/signin', userController.signin);


//here we export the router
module.exports = router;

