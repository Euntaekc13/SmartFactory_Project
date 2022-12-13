"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Machines", "UserId", {
      type: Sequelize.INTEGER(40),
      references: {
        model: "users",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Machines", "UserId");
  },
};
