const Sequelize = require("sequelize");

module.exports = class Software_history extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        part_type: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
        software_version: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        detail: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Software_history",
        tableName: "software_histories",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Software_history.belongsTo(db.Machine);
  }
};
