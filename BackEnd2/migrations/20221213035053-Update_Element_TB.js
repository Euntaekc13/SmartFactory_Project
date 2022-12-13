"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("elements", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("elements", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("elements", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("elements", "createdAt");
    await queryInterface.removeColumn("elements", "updatedAt");
    await queryInterface.removeColumn("elements", "deletedAt");
  },
};
