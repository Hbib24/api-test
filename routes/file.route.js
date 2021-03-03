const express = require('express');
const router = express.Router();
const File = require('../models/file.model');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, (req, res) => {
  res.send({ message: 'hekki' });
});

module.exports = router;
