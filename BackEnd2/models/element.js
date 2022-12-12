const Sequelize = require("sequelize");

module.exports = class Element extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        tagId: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        value: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        status: {
          type: Sequelize.BOOLEAN(40),
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
