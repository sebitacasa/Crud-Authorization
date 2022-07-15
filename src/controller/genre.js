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
    try {
        let gen = genres.map(e => {
            return {name: e.name}
        })

        const genreData = await Genre.findAll()

        if(genreData.length){
            return res.send(genreData)
        } else {
            const genresDb = await Genre.bulkCreate(gen)
            return res.json(genresDb)
        }
    } catch (error) {
        res.status(404).json("error")
    }
}

module.exports = uploadGenres