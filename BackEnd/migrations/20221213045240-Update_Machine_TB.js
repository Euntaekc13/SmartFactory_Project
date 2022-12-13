"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("parts", "Part_defaultId");
    await queryInterface.addColumn("parts", "PartDefaultId", {
      type: Sequelize.INTEGER(40),
      references: {
        model: "part_defaults",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("parts", "PartDefaultId");
  },
};
