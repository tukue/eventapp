const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnailImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  largeImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  iconImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  chatRoomName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timezone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privacy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ownerDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Event;