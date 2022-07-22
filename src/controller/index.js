const { Character, Genre, Movie } = require("../db");

                  //// Movies Section ////
///////////////////////////////////////////////////////////////
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

    res.send(movies);
  } catch (error) {
    res.status(404).json({ msg: "error" });
  }
};

///////////////////////////////////////////////////////////////////

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

                   
/////////////////////////////////////////////////////////////////////////

const moviePut = async (req, res) => {
  const { id } = req.params;
  const { title, releaseDate, image, genres } = req.body;

  try {
    await Movie.update(
      {
        title,
        releaseDate,
        image,
        genres,
      },
      {
        where: {
          id,
        },
      }
    );
    const movieUpdatealready = await Movie.findByPk(id);
    return res.send(movieUpdatealready);
  } catch (error) {
    res.status(404).send("ups something went wrong");
  }
};

//////////////////////////////////////////////////////////////////////////

const deleteMovie = async (req, res) => {
  const {id} = req.params
  try {
    await Movie.destroy({where: {id: id}})
    res.status(204).send("character was deleted sucefully")
  } catch (error) {
    res.send(error)
  }
}



                      ///Character Section///
///////////////////////////////////////////////////////////////////////////

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

const characterPut = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    await Character.update(
      {
        name: req.body.name,
        images: req.body.images,
        weigth: req.body.weigth,
        history: req.body.history,
      },
      {
        where: {
          id,
        },
      }
    );
    const characterUpdateAlready = await Character.findByPk(id);
    return res.send(characterUpdateAlready);
  } catch (error) {
    res.status(404).send("ups something went wrong");
  }
};

///////////////////////////////////////////////////////////////////////////////


const deleteCharacter = async (req, res) => {
  const {id} = req.params
  try {
    await Character.destroy({where: {id}})
    res.status(204).send("character was deleted sucefully")
  } catch (error) {
    res.send(error)
  }
}

//////////////////////////////////////////////////////////////////////////////

module.exports = {
  postMovie,
  getMovie,
  getCharacter,
  moviePut,
  characterPut,
  deleteCharacter,
  deleteMovie
};
