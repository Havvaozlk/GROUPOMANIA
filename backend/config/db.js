
require('dotenv').config();

module.exports = {
    HOST: "localhost",
    USER: process.env.Username,
    PASSWORD: process.env.password,
    DB: process.env.Database,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };