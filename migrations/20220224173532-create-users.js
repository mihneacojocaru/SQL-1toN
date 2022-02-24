'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};