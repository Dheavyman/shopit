const mongoose = require('mongoose')
const Customer = require('./models')
const customers = require('./seeders')

const DATABASE_URL = process.env.DATABASE_URL

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
      customers.forEach(customer => {
        Customer.findOne({name: customer.name}, (error, existingCustomer) => {
          if(!error && !existingCustomer) {
            Customer.create(customer)
          }
        })
      });
    }
  }
)

module.exports = mongoose
