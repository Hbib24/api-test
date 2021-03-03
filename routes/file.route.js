const express = require('express');
const router = express.Router();
const File = require('../models/file.model');

router.get('/', (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { role, userId } = decodedToken;

    Promise.all([Files.find({ type: public }), Files.find({ userID: userId })])
      .then((files) => {
        res.status(200).send(files);
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  } catch {
    File.find({ type: 'public' })
      .then((files) => {
        res.status(200).send(files);
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  }
});

router.post('/', (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const { role, userId } = decodedToken;

  if (role === 'admin') {
    req.body.type = 'public';
  } else {
    req.body.type = 'private';
  }
  File.create(req.body)
    .then(() => res.status(200))
    .catch((err) => res.status(400).send({ err: err }));
});

module.exports = router;
