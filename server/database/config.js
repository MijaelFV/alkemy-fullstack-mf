const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME = 'challengedb' , process.env.DB_USER = 'alkemyuser', process.env.DB_PASSWORD = 'alkemy', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mariadb',
    logging: false,
});

module.exports = {db}