const { Character, Genre, Movie } = require("../db");
const verifyToken = require("../middleware/auth");

const getMovie = async (req, res) => {
  try {
    let movies = await Movie.findAll({
      include: [
        {
          model: Genre,

          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Character,
        },
      ],
    });
    console.log(movies);

    res.send(movies);
  } catch (error) {
    res.status(404).json({ msg: "error" });
  }
};

//////////////////////////////////////////////////////////////////////

const postMovie = async (req, res) => {
  try {
    const { title, image, releaseDate, genre, character } = req.body;

    const charc = Character.build(character);

    await charc.save();

    let movies = { title, image, releaseDate };
    let movie = await Movie.create({
      ...movies,
    });

    let addGenres = await Genre.findAll({ where: { name: genre } });

    await movie.addGenre(addGenres);
    let addCharacter = await Character.findAll();

    await movie.addCharacter(addCharacter);

    return res.json({ msg: "pelicula creada", data: movie });
  } catch (error) {
    return res.status(404).json({ msg: "error" });
  }
};

module.exports = {
  postMovie,
  getMovie,
};
