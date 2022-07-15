const {Genre} = require('../db')

const genres = [
    {name: "comedy"},
    {name: "drama"},
    {name: "terror"},
    {name: "suspense"},
    {name: "fiction"},
    {name: "documental"},
    
]

const uploadGenres = async (req, res) => {
    genres.forEach((e) => {
        Genre.findOrCreate({
          where: { name: e.name },
        });
      });
    
      const allGenres = await Genre.findAll();
      res.send(allGenres);
    };


module.exports = uploadGenres