'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Columns', 'position', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Columns', 'position');
  }
};
