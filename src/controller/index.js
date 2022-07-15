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

//////////////////////////////////////////////////////////////////////

const postMovie = async (req, res) => {
  try {
    const { title, image, releaseDate, genre, character } = req.body;
   

    let movie = await Movie.create({
      title,
      image,
      releaseDate,
    });

    let addGenres = await Genre.findAll({ where: { name: genre } });

    await movie.addGenre(addGenres);
    
     await Character.findOrCreate({
      where: { name: character.name },
      defaults: character
    });

    const charc = await Character.findAll()
    await movie.addCharacter(charc);
  

    return res.json({ msg: "pelicula creada", data: movie });
  } catch (error) {
    return res.status(404).json({ msg: "error" });
  }
};

/////////////////////////////////////////////////////////////////////////

const getCharacter = async (req, res) => {

  try {
    let characterData = await Character.findAll()
  const character = characterData.map(e => {
    return {
      name: e.name,
      images: e.images
    }
  })

  res.send(characterData)
  } catch (error) {
    return res.status(404).send("Ups something went wrong... try again")
  }
  
}


////////////////////////////////////////////////////////////////////////////////


    
   

module.exports = {
  postMovie,
  getMovie,
  getCharacter
};
