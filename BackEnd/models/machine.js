const Sequelize = require("sequelize");

module.exports = class Machine extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        machine_name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        machine_status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        machine_image: {
          type: Sequelize.STRING(40),
          allowNull: false,
          defaultValue: "default.jpg",
        },
        mqtt_host: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        mqtt_name: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        mqtt_topic: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Machine",
        tableName: "machines",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Machine.hasMany(db.Part);
    db.Machine.hasMany(db.Software_history);
    db.Machine.hasMany(db.Test_result);
  }
};
