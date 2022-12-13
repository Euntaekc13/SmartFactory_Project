const Sequelize = require("sequelize");
const config = require("../config/config")["development"];
const Machine = require("./machine");
const Part_default = require("./part_default");
const Part = require("./part");
const Software_history = require("./software_history");
const Test_result = require("./test_result");
const User = require("./user");
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

db.Machine = Machine;
db.Part_default = Part_default;
db.Part = Part;
db.Software_history = Software_history;
db.Test_result = Test_result;
db.User = User;
db.Element = Element;

Machine.init(sequelize);
Part_default.init(sequelize);
Part.init(sequelize);
Software_history.init(sequelize);
Test_result.init(sequelize);
User.init(sequelize);
Element.init(sequelize);

Machine.associate(db);
Part_default.associate(db);
Part.associate(db);
Software_history.associate(db);
Test_result.associate(db);
User.associate(db);
Element.associate(db);

module.exports = db;
