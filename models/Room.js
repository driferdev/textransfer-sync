'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../Sequelize')();

module.exports = sequelize.define('room', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  text: {
    type: Sequelize.STRING,
    allowNull: true
  },
  last_used: {
    type: Sequelize.TIME,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  updated_at: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.TIME,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true
});