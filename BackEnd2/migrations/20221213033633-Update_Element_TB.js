"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable("Elements");
    await queryInterface.createTable("Elements", {
      DataTime: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      Start: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No1PartsError: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No1_Action: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No2_Action: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No3Ready: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      ColorSensor: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      Reset: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      sensor1_on_off: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No1Delay: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      No1Count: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      No2Count: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      No3Count: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lamp_green: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lamp_yellow: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      lamp_red: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No3Motor1: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      No3Motor2: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      No2Chip: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No2CubeFull: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No2Sol: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No2SolAction: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No3Chip: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      Emergency: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      ColorSensorSensing: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      No3Gripper: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      belt: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Elements");
  },
};
