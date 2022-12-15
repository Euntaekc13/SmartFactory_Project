const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const Machine = require("./machine");
const Part_default = require("./part_default");
const Part = require("./part");
const Software_history = require("./software_history");
const Test_result = require("./test_result");
const User = require("./user");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
    },
  }
);

db.sequelize = sequelize;

db.Machine = Machine;
db.Part_default = Part_default;
db.Part = Part;
db.Software_history = Software_history;
db.Test_result = Test_result;
db.User = User;

Machine.init(sequelize);
Part_default.init(sequelize);
Part.init(sequelize);
Software_history.init(sequelize);
Test_result.init(sequelize);
User.init(sequelize);

Machine.associate(db);
Part_default.associate(db);
Part.associate(db);
Software_history.associate(db);
Test_result.associate(db);
User.associate(db);

module.exports = db;
