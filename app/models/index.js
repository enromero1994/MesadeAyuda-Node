const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.request = require("../models/request.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.resolution = require("../models/resolution.model.js")(sequelize, Sequelize);




// db.user.hasMany(db.request)
// db.user.hasMany(db.category)

//Relacion de uno a uno - una solicitud solo puede tener un usuario y una categoria

db.request.belongsTo(db.user)
// db.request.belongsTo(db.user,{
//   foreignKey: 'Resolutor',
//       as: 'resolutor',
// })
db.request.belongsTo(db.category,{
  foreignKey: 'categoryId',
      as: 'categories',
})
// db.request.belongsTo(db.resolution)
// db.resolution.belongsTo(db.user)
//
db.request.belongsToMany(db.user, {
  through: db.resolution ,
  foreignKey: "requestId",
  otherKey: "userId"
});
db.user.belongsToMany(db.request, {
  through: db.resolution ,
  foreignKey: "userId",
  otherKey: "requestId"
});


//Relacion mucho a mucho
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;