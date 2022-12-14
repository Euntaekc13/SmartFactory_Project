"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Element", {
      tagId: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Element");
  },
};
