const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '646fb8b8fa8c1ac7c4200ccd',
  };

  next();
});

app.use(users);
app.use(cards);

app.use((req, res) => {
  res
    .status(404)
    .send({ message: "Страница  по этому адресу не найдена" });
});

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});