const bodyParser = require('body-parser')
const logger = require('morgan')
const express = require('express')
const axios = require('axios')
const mongoose = require('./db')
const orderRoutes = require('./routes')

const app = express()
const db = mongoose.connection

app.use(bodyParser.json())
app.use(logger('dev'));
app.use('/api', orderRoutes)

app.get('/', (req, res) => {
  res.send({
    status: 'success',
    message: 'Welcome to shopit api'
  })
})

// Simplified communication
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:8052/api/products')
    const { data } = response.data

    return res.send({
      status: 'success',
      message: 'Products retrieved',
      data
    })

  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: error.message
    })
  }
})

app.set('port', 8050)
app.listen(app.get('port'), (error) => {
  if (error) {
    console.log(error.message)
  }
  console.log('Server running on port: ', app.get('port'))
})

db.on('error', console.error.bind(console, 'Database connection error'))
