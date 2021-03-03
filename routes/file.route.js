const express = require('express');
const router = express.Router();
const File = require('../models/file.model');

router.get('/', (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;

    File.find()
      .then((files) => {
        res.status(200).send(files);
      })
      .catch((err) => {
        res.status(401).send({ err: err });
      });
  } catch {
    File.find({ type: 'public' })
      .then((files) => {
        res.status(200).send(files);
      })
      .catch((err) => {
        res.status(401).send({ err: err });
      });
  }
});

module.exports = router;
