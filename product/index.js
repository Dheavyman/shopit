const bodyParser = require('body-parser')
const logger = require('morgan')
const express = require('express')
const { mongoose, Product } = require('./db')

const app = express()
const db = mongoose.connection

app.use(bodyParser.json())
app.use(logger('dev'));

app.get('/api/products', (req, res) => {
  Product.find({}, (error, products) => {
    if (error) {
      return res.status(500).send({
        status: 'error',
        message: error
      })
    }
    return res.send({
      status: 'success',
      message: 'Products retrieved',
      data: products
    })
  })
})

app.set('port', 8052)
app.listen(app.get('port'), (error) => {
  if (error) {
    console.log(error.message)
  }
  console.log('Server running on port: ', app.get('port'))
})

db.on('error', console.error.bind(console, 'Database connection error'))
