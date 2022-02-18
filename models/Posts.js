'use strict';
const Sequelize  = require('sequelize');

module.exports = (sequelize) => {

    class Posts extends Sequelize.Model{};

    Posts.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        title:{
            type: Sequelize.STRING,
            allowNull: false,

            validate:{
                notNull:{
                    msg:"Please provide a book title"
                },
                notEmpty:{
                    msg:"Please provide a value for the title"
                }
            }
        },
        text:{
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg:"Text can't be null"
                },
                notEmpty:{
                    msg:"Text can't be empty"
                }
            }
        },
        user_id:{
            type:Sequelize.INTEGER
        },
        releaseDate:{
            type:Sequelize.DATEONLY
        },
    },{
        sequelize,

        timestamps: false,

        createdAt: false,

        updatedAt: false,

        tableName: ""
    });

    return Posts;
}