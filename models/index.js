const db = {};
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("ride_db", "root", "", {
  host: "localhost",
  port: "3308",
  dialect: "mysql",
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Driver = require("./driver.model")(sequelize, Sequelize);
db.Vehicle = require("./vehicle.model")(sequelize, Sequelize);
db.Ride = require("./ride.model")(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Ride);
db.Ride.belongsTo(db.User);

db.Driver.hasMany(db.Ride);
db.Ride.belongsTo(db.Driver);

db.Vehicle.hasMany(db.Ride);
db.Ride.belongsTo(db.Vehicle);

module.exports = db;
