
const {DataTypes} = require('sequelize')

 module.exports = (sequelize) => {

    sequelize.define('movie', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        title: {
            type: DataTypes.STRING,
            allNull: false
        },

        image: {
            type: DataTypes.STRING
        },

        releaseDate: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // classification:{
        //     type: DataTypes.ENUM(1, 2, 3, 4, 5)
        // }
    }, {timestamps: false})
 }