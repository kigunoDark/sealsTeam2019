const Sequelize = require('sequelize');
const sequelize = require('../data/database');


const User = sequelize.define(
    'user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }
);

module.exports = User;  