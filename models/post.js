'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  }


  Post.init({
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postedAt:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  });


  Post.associate=(models)=>{

    Post.belongsTo(models.User,{

      as:'postId',
      foreignKey:{
        fieldName:'userId',
        allowNull:false
      }

    })
    
  }
  return Post;
};
