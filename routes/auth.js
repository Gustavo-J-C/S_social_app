const express = require('express');

const router = express.Router();

const feedController = require('../controllers/feed');

router.post('/login', feedController.getPosts);

router.post('/register', feedController.createPost)

module.exports = router;