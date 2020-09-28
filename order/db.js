const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(
  DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)

module.exports = mongoose
