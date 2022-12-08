'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Parts","Part_defaultId",{
      type: Sequelize.INTEGER(40),
      references: {
        model: "part_defaults",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Parts","Part_defaultId")
  }
};
