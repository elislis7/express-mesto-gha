const mongoose = require('mongoose');
const validator = require('validator');

// eslint-disable-next-line function-paren-newline
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },

  link: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
},
// eslint-disable-next-line function-paren-newline
{ versionKey: false });

module.exports = mongoose.model('card', cardSchema);
