const User = require('../models/user');

// возвращает всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// возвращает пользователя по id
const getUsersByID = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректный _id пользователя' });
      }
      return res.status(500).send({ message: err.message });
    });
};

// создаёт пользователя
const createUser = (req, res) => {
  User.create(req.body)
    .then((data) => res.status(201).send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// редактирует инфо пользователя
const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден'});
      }
      return res.status(500).send({ message: err.message });
    });
};

// редактирует аватар пользователя
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getAllUsers,
  getUsersByID,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
