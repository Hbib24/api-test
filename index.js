require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT;

const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const fileRouter = require('./routes/file.route');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

app.listen(PORT, () => console.log('listening on ' + PORT));
