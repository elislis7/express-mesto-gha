const Card = require('../models/card');
const { isValidObjectId } = require('mongoose');

// возвращает все карточки
const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((cards) => res.status(201).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// удаляет карточку
const removeCard = (req, res) => {
  const { cardId } = req.params;

  if (!isValidObjectId(cardId)) {
    return res.status(400).send({ message: 'Переданы некорректные данные для удаления карточки' });
  }

  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с указанным _id не найдена` })
      }
      res.send({ message: 'Карточка удалена' })
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// создает лайк на карточке
const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(userId) || !isValidObjectId(cardId)) {
    return res.status(400).send({message: 'Переданы некорректные данные для постановки лайка' });
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки' })
      }
      res.status(201).send(card.likes)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// удаляет лайк на карточке
const removeLikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  if (!isValidObjectId(userId) || !isValidObjectId(cardId)) {
    return res.status(400).send({message: 'Переданы некорректные данные для постановки лайка' });
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: `Передан несуществующий _id карточки` })
      }
      res.status(200).send(card.likes)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для снятии лайка' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  removeCard,
  likeCard,
  removeLikeCard,
};
