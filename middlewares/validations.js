const isURL = require('validator/lib/isURL');
const { celebrate, Joi } = require('celebrate');

const BadRequestError = require('../errors/BadRequestError');

const urlValidation = (url) => {
  const validate = isURL(url);
  if (validate) {
    return url;
  }
  throw new BadRequestError('Некорректный URL адрес');
};

const idValidation = (id) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (regex.test(id)) return id;
  throw new BadRequestError('Некорректный id');
};

const validationCreateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      avatar: Joi.string().custom(urlValidation),
      password: Joi.string().required(),
    }),
});

const validationLogin = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
});

const validationUserId = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string().required().custom(idValidation),
    }),
});

const validationUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().required().custom(urlValidation),
    }),
});

const validationCreateCard = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().required().custom(urlValidation),
    }),
});

const validationCardById = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string().required().custom(idValidation),
    }),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
  validationCreateCard,
  validationCardById,
};
