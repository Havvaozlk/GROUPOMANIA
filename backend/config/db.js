//fichier configuration mysql
require('dotenv').config();

module.exports = {
    HOST: "localhost",
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
      //nombre max et min de connexion dans le pool
      max: 5,
      min: 0,
      //temps max en milliseconde que le pool essaiera d'obtenir une connexion avant de lancer une erreur
      acquire: 30000,
      //temps maximum, en millisecondes, pendant lequel une connexion peut être inactive avant d'être libérée
      idle: 10000
    }
  };