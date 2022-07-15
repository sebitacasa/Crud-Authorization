const express = require('express')
const router = express.Router()
const genres = require('./routes') 

router.use('/alkemy', genres )

module.exports = router