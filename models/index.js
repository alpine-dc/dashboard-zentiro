require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/db.config.js")[env];

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.banner = require("./banner.js")(sequelize, Sequelize);
db.product = require("./product.js")(sequelize, Sequelize);
db.best_seller = require("./best_seller.js")(sequelize, Sequelize);
db.product_image = require("./product_image.js")(sequelize, Sequelize);
db.category = require("./category.js")(sequelize, Sequelize);
db.faq = require("./faq.js")(sequelize, Sequelize);
db.about_us = require("./about_us.js")(sequelize, Sequelize);
db.contact_us = require("./contact_us.js")(sequelize, Sequelize);
db.term_condition = require("./term_condition.js")(sequelize, Sequelize);

module.exports = db;
