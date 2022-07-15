const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index')
const { conn } = require('./db');
const verifyToken = require('./middleware/auth')

require('./db')

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(cors())
server.use(morgan('dev'))


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  server.use('/', routes);

  // server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  //   const status = err.status || 500;
  //   const message = err.message || err;
  //   console.error(err);
  //   res.status(status).send(message);
  // });
  
  
 

  
  module.exports = server

