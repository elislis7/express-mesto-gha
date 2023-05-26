const router = require('express').Router();

const { getAllCards, createCard, removeCard, likeCard, removeLikeCard } = require('../controllers/cards');

router.get('/', getAllCards);

router.post('/', createCard);

router.delete('/cards/:cardId', removeCard);

router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', removeLikeCard);

module.exports = router;