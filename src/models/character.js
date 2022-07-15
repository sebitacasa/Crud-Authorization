
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {

    sequelize.define('character', {

        // id: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        //     allowNull: false,
        //     primaryKey: true
        // },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        images: {
            type: DataTypes.STRING,
            
        },

        age: {
            type: DataTypes.STRING,
            
        },

        weigth: {
            type: DataTypes.STRING,
            
        },

        history: {
            type: DataTypes.STRING,
          
        },

      
    }, {timestamps: false})
}