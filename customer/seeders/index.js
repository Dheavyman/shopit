const { v4: uuidV4 } = require('uuid')

const customers = [
  {
    customerId: uuidV4(),
    name: 'John Johnson',
    address: '5 Johnson street'
  },
  {
    customerId: uuidV4(),
    name: 'Fred Francis',
    address: '24 Francis close'
  },
  {
    customerId: uuidV4(),
    name: 'Peter Paul'
  }
]

module.exports = customers
