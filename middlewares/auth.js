const jwt = require('jsonwebtoken');

const NotAuthError = require('../errors/NotAuthError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  const token = authorization('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'JWT-token');
  } catch (err) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};

module.exports = auth;
