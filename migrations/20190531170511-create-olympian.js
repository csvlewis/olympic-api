'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Olympians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sex: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      sport: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Olympians');
  }
};
