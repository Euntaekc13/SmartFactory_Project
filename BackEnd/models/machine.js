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
          // 0일 때 대기 중, 1일 때 동작 중, 2일 때 고장 중
          type: Sequelize.INTEGER(40),
          allowNull: false,
          defaultValue: 0,
        },
        machine_image: {
          type: Sequelize.STRING(40),
          allowNull: false,
          defaultValue: "default.jpg",
        },
        mqtt_port: {
          type: Sequelize.INTEGER(40),
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
        information: {
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
    db.Machine.belongsTo(db.User);
  }
};
