const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  // case where user client did not provide valid inputs
  if (!email || !password) {
    return res.status(400).send({ message: 'Invalid input' });
  }
  // fetching user from database using email provided
  User.findOne({ email: email }).then((user) => {
    // case where user does not exist in the database
    if (!user) {
      return res
        .status(401)
        .send({ message: 'Invalid username/password supplied' });
    }
    // once user is retrieved, we compare passwords
    bcrypt.compare(password, user.password, (err, isValid) => {
      if (err) throw err;
      // once the passwords check, we have a successful authentication
      // we send the user data to the client
      if (isValid) {
        const { email, name, role, _id } = user;

        const token = jwt.sign(
          {
            id: _id,
          },
          process.env.SECRET,
          {
            expiresIn: '1h',
          }
        );

        res
          .status(200)
          .header({ authToken: token })
          .send({
            user: { id: _id, email: email, name: name, role: role },
            message: 'successful operation',
          });
      } else {
        // case where passwords did not match
        res.status(401).send({ message: 'Invalid username/password supplied' });
      }
    });
  });
});

module.exports = router;
