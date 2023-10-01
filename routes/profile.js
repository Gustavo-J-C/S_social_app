const routes = require('express').Router();

const profileController = require('../controllers/profile');
const authenticateToken = require('../middlewares/authMiddleware');

routes.get('/:userId', profileController.getProfile);

routes.patch('/:userId', profileController.editProfile);

routes.get('/:userId/following', profileController.getFollowing);
routes.get('/:userId/followers', profileController.getFollowers);

routes.post('/:userId/follow', authenticateToken, profileController.follow)
routes.post('/:userId/unfollow', authenticateToken, profileController.unfollow)

module.exports = routes