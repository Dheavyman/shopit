const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { v4: uuidV4 } = require('uuid')

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL
const products = [
  {
    productId: uuidV4(),
    name: 'Shopit TV',
    quantity: 5
  },
  {
    productId: uuidV4(),
    name: 'Shopit shoe',
    quantity: 10
  }
]

const Product = mongoose.model('Product', new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}))

mongoose.connect(
  DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  () => {
    console.log('Database connected')
    if (process.env.NODE_ENV !== 'production') {
      products.forEach(product => {
        Product.findOne({name: product.name}, (error, existingProduct) => {
          if(!error && !existingProduct) {
            Product.create(product)
          }
        })
      });

    }
  }
)

module.exports = { mongoose, Product }
