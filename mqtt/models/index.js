const Sequelize = require("sequelize");
const config = require("../config/config")["development"];
const Element = require("./element");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  { timezone: "+09:00" }
);

db.sequelize = sequelize;

db.Element = Element;

Element.init(sequelize);

Element.associate(db);

module.exports = db;
