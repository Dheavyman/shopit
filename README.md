# shopit
An e-commerce application for your shopping experience

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Built With](#built-with)
- [Credits](#credits)


## Prerequisites
* Install docker locally
* Install rabbitmq locally or go to https://www.cloudamqp.com and create a free instance for testing

## Getting started
Follow the steps below to get the application running locally:
```
# Clone the repository

>$ git clone https://github.com/Dheavyman/shopit.git

# Change directory into the project

>$ cd shopit

# Create a .env file at the root of the application and in each of the services(customer, product, order, payment)

>$ touch .env

Copy the content of .env.example file into the .env file created and supply the appropriate values for each key

# Start the application
Ensure docker is running on your machine

>$ docker-compose build
>$ docker-compose up
```

## API Documentation
* Get customers `GET: http://localhost:8050/api/customers`
* Get products `GET: http://localhost:8050/products`
* Place order `POST: http://localhost:8050/orders`
* To view/manage database with mongo-express `GET: http://localhost:8081`

## Built with
* Node
* Express
* MongoDB
* gRPC
* RabbitMQ

## Credits
Justin Nebo
