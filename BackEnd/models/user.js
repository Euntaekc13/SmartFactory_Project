const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        employee_number: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        phone_number: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        user_image: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        authorization: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Machine);
  }
};
