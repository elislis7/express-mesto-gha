const router = require('express').Router();

const { getAllUsers, getUsersByID, createUser, updateUserInfo, updateUserAvatar } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:userId', getUsersByID);
router.post('/users', createUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
