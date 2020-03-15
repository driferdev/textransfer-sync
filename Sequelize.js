'use strict'
const config = require('./config');
const Sequelize = require('sequelize');

let sequelize = null

module.exports = () => {
    if (!sequelize) {
        sequelize = new Sequelize(config.db)
    }
    return sequelize;
}