const { Character, Genre, Movie } = require("../db");

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

/////////////////////////////////////////////////////////////////////

const postMovie = async (req, res) => {
  try {
    const { genre, character } = req.body;

    let movie = await Movie.create({
      title: req.body.title,

      image: req.body.image,
      releaseDate: req.body.releaseDate,
    });

    character.map((answer) => {
      Character.findOrCreate({
        where: { name: answer.name },
        defaults: {
          images: answer.images,
          age: answer.age,
          weigth: answer.weigth,
          history: answer.history,
        },
      });
    });
    let addGenres = await Genre.findAll({ where: { name: genre } });
    const charc = await Character.findAll({
      where: { name: character.map((a) => a.name) },
    });
    await movie.addGenre(addGenres);
    await movie.addCharacter(charc);

    return res.json({ msg: "movie created", data: movie });
  } catch (error) {
    return res.status(404).json({ msg: "error" });
  }
};
//  await Character.findOrCreate({
//   where: { name: character.map(e => e.name)},
//   defaults: character.map(e => e)
// });

/////////////////////////////////////////////////////////////////////////

const getCharacter = async (req, res) => {
  try {
    let characterData = await Character.findAll();
    const character = characterData.map((e) => {
      return {
        name: e.name,
        images: e.images,
      };
    });

    res.send(characterData);
  } catch (error) {
    return res.status(404).send("Ups something went wrong... try again");
  }
};

////////////////////////////////////////////////////////////////////////////////

module.exports = {
  postMovie,
  getMovie,
  getCharacter,
};
