const uploadGenres = require('../controller/genre')
const {postMovie, getMovie} = require('../controller/index')
const {registrer, logIn} = require('../controller/Auth')
const express = require('express')
const router = express.Router()
const verifyToken = require("../middleware/auth")


router.route('/genres').get(uploadGenres)
router.route('/movies').get(verifyToken,getMovie)
router.route('/postMovie').post(verifyToken,postMovie)


///////////////////////////////////////////

router.route('/auth/registrer').post(registrer) // crea el usario
router.route('/auth/login').post(logIn) // trae el usuario


/////////////////////////////////////////


module.exports = router