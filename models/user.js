'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
 
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg:'User must have a name'},
        notEmpty: {msg:'Name must not be empty'},
      }
    },
    birthday:{
      type: DataTypes.DATEONLY,
      allowNull: false,
      isDate: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg:'User must have a email'},
        notEmpty: {msg:'Email must not be empty'},
        isEmail: true,
      } 
    },
  }, {
    sequelize,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  });

  User.associate=(models)=>{
        User.hasMany(models.Post,{
          as:'postId',
          foreignKey:{
            fieldName:'userId',
            allowNull:false,
            // onUpdate:'CASCADE',
            onDelete:'CASCADE'
          }
        })
  }

  // CASCADE RESTRICT 

  return User;

};