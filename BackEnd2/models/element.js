const Sequelize = require("sequelize");

module.exports = class Element extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        DataTime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        Start: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No1PartsError: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No1_Action: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No2_Action: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No3Ready: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        ColorSensor: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        Reset: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        sensor1_on_off: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No1Delay: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        No1Count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        No2Count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        No3Count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        lamp_green: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        lamp_yellow: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        lamp_red: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No3Motor1: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        No3Motor2: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        No2Chip: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No2CubeFull: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No2Sol: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No2SolAction: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No3Chip: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        Emergency: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        ColorSensorSensing: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        No3Gripper: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        belt: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Element",
        tableName: "elements",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
