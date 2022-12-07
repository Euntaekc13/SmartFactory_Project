const Sequelize = require("sequelize");

module.exports = class Part_default extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        part_type: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
        max_life: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Part_default",
        tableName: "part_defaults",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Part_default.belongsTo(db.Part);
  }
};
