const router = require('express').Router();

const { getAllCards, createCard, removeCard, likeCard, removeLikeCard, } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', removeCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', removeLikeCard);

module.exports = router;

/* {
  "name": "test card",
  "link": "https://images.unsplash.com/photo-1685097110366-0e21d14b6bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
} */