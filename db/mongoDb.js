const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose').connect(
  process.env.MONGODB_URI,
  { UseNewUrlParser: true },
  () => console.log('Connected to DB...')
);
module.exports = mongoose;
