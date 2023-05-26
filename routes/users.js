const router = require('express').Router();

const { getAllUsers, getUsersByID, createUser, updateUserInfo, updateUserAvatar } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/users/:userId', getUsersByID);

router.post('/', createUser);

router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
