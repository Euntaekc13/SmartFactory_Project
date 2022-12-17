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
          // 1이면 양품, 2이면 고품
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        dice_num: {
          type: Sequelize.INTEGER(40),
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(40),
          allowNull: true,
          defaultValue: "",
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
