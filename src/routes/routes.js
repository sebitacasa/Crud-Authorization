const uploadGenres = require('../controller/genre')
const {postMovie, getMovie, getCharacter, moviePut, characterPut, deleteCharacter, deleteMovie} = require('../controller/index')
const {registrer, logIn} = require('../controller/Auth')
const express = require('express')
const router = express.Router()
const verifyToken = require("../middleware/auth")

////////////////////////////////////////////////////////////////////////////

router.route('/genres').get(uploadGenres)
router.route('/movies').get(verifyToken,getMovie)
router.route('/character').get(getCharacter)
router.route('/postMovie').post(verifyToken,postMovie)
router.route('/movieUpdate/:id').put(moviePut)
router.route('/characterUpdate/:id').put(characterPut)
router.route('/deleteCharacter/:id').delete(deleteCharacter)
router.route('/deleteMovie/:id').delete(deleteMovie)


////////////////////////////////////////////////////////////////////////////

router.route('/auth/registrer').post(registrer) // crea el usario
router.route('/auth/login').post(logIn) // trae el usuario


////////////////////////////////////////////////////////////////////////////


module.exports = router