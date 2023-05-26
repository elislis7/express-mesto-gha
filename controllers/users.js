const User = require('../models/user');

// возвращает всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// возвращает пользователя по id
const getUsersByID = (req, res) => {
  User.findById(req.params.id)
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: `Пользователь по указанному ${_id} не найден` })
      } else {
      res.status(500).send({ message: err.message })
      }
    }
  );
};

// создаёт пользователя
const createUser = (req, res) => {
  User.create(req.body)
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' })
      } else {
      res.status(500).send({ message: err.message })
      }
    }
  );
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
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' })
      } else {
      res.status(404).send({ message: `Пользователь с указанным ${_id} не найден` })
      }
      res.status(500).send({ message: err.message })
    }
  );
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
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' })
      } else {
      res.status(404).send({ message: `Пользователь с указанным ${_id} не найден` })
      }
      res.status(500).send({ message: err.message })
    }
  );
};

module.exports = {
  getAllUsers,
  getUsersByID,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
