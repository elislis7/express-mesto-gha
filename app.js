const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const router = require('./routes/router');
const auth = require('./middlewares/auth');
const handelError = require('./middlewares/handelErrors');

const { validationCreateUser, validationLogin } = require('./middlewares/validations');

const app = express();

app.use(helmet());
app.use(express.json());

app.post('/signup', validationCreateUser, createUser);
app.post('/signin', validationLogin, login);

app.use(auth);
app.use(router);

app.use(errors());
app.use(handelError);

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
