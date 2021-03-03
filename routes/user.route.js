const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.post('/new', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: 'Invalid input' });
  }

  bcrypt.hash(password, 10, (err, hashed) => {
    if (err) throw err;
    User.create({ name: name, email: email, password: hashed })
      .then(() => {
        res.status(200).send({ message: 'user saved' });
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  });
});

module.exports = router;
