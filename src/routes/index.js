const express = require('express')
const router = express.Router()
const routes = require('./routes') 

router.use('/alkemy', routes )

module.exports = router