const path = require('path')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = path.join(__dirname, '..', 'protos', 'orders.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH)
const orders = grpc.loadPackageDefinition(packageDefinition).orders
const client = new orders.OrderService(process.env.RPC_SERVER_URL, grpc.credentials.createInsecure())

module.exports = client
