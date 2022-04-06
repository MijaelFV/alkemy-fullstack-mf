const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME = 'alkemydb' , process.env.DB_USER = 'alkemyuser', process.env.DB_PASSWORD = 'alkemy', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
});

module.exports = {db}