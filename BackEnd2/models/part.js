const Sequelize = require("sequelize");

module.exports = class Part extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        count: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Part",
        tableName: "parts",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Part.belongsTo(db.Machine);
    db.Part.belongsTo(db.Part_default);
  }
};
