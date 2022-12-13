module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEVELOPMENT,
    // password: "",
    password: process.env.DB_PASS_DEVELOPMENT,
    database: process.env.DB_DATABASE_DEVELOPMENT,
    host: process.env.DB_HOST_DEVELOPMENT,
    dialect: "mysql",
    pool: {
      max: 5, // maximum number of connection in pool
      min: 0, // minimum number of connection in pool
      acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, // maximum time, in milliseconds, that a connection can be idle before being released
    },
  },
  stagging: {
    username: process.env.DB_USERNAME_STAGING,
    password: process.env.DB_PASS_STAGING,
    database: process.env.DB_DATABASE_STAGING,
    host: process.env.DB_HOST_STAGING,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASS_PRODUCTION,
    database: process.env.DB_DATABASE_PRODUCTION,
    host: process.env.DB_HOST_STAGING,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
