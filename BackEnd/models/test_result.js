const Sequelize = require("sequelize");

module.exports = class Test_result extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        serial_number: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        final_result: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Test_result",
        tableName: "test_results",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Test_result.belongsTo(db.Machine);
  }
};
