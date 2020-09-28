const path = require('path')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const mongoose = require('./db')
const OrderServices = require('./services')

const PROTO_PATH = path.join(__dirname, '..', 'protos', 'orders.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const orders = grpc.loadPackageDefinition(packageDefinition).orders
const server = new grpc.Server()

server.addService(orders.OrderService.service, {
  placeOrder: OrderServices.placeOrder
})

const db = mongoose.connection

server.bind('0.0.0.0:8051', grpc.ServerCredentials.createInsecure())
server.start()
console.log('Server running on port 8051')

db.on('error', console.error.bind(console, 'Database connection error'))
