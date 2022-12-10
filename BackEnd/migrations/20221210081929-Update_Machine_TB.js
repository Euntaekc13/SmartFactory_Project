"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("machines", "manager", {
      type: Sequelize.STRING(40),
      allowNull: true,
    });
    await queryInterface.addColumn("machines", "information", {
      type: Sequelize.STRING(40),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("machines", "manager");
    await queryInterface.removeColumn("machines", "information");
  },
};
