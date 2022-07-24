const uploadGenres = require("../controller/genre");
const {
  postMovie,
  getMovie,
  getCharacter,
  moviePut,
  characterPut,
  deleteCharacter,
  deleteMovie,
  filterMovie,
  
} = require("../controller/index");
const { registrer, logIn } = require("../controller/Auth");

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");



////////////////////////////////////////////////////////////////////////////

router.route("/genres").get(verifyToken,uploadGenres);
router.route("/movies").get(verifyToken, getMovie);
router.route("/character").get(verifyToken ,getCharacter);
router.route("/postMovie").post(verifyToken, postMovie);
router.route("/movieUpdate/:id").put(verifyToken ,moviePut);
router.route("/characterUpdate/:id").put(verifyToken,characterPut);
router.route("/deleteCharacter/:id").delete(verifyToken,deleteCharacter);
router.route("/deleteMovie/:id").delete(verifyToken,deleteMovie);
router.route("/").get(verifyToken,filterMovie);


////////////////////////////////////////////////////////////////////////////

router.route("/auth/registrer").post(registrer); // crea el usario
router.route("/auth/login").post(logIn); // trae el usuario

////////////////////////////////////////////////////////////////////////////

module.exports = router;
