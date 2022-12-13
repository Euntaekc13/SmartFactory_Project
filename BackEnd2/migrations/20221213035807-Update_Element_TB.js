"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.changeColumn("elements", "createdAt", {
    //   type: Sequelize.DATETIME,
    //   allowNull: false,
    // });
    // await queryInterface.changeColumn("elements", "updatedAt", {
    //   type: Sequelize.DATETIME,
    //   allowNull: false,
    // });
    await queryInterface.changeColumn("elements", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    // await queryInterface.changeColumn("elements", "DataTime", {
    //   type: Sequelize.DATETIME,
    //   allowNull: true,
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
