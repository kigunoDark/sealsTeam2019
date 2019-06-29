const Sequelize = require('sequelize');
const sequelize = require('../data/database');


const User = sequelize.define(
    'luser', {
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
        },
        avatar:{
            type:Sequelize.TEXT,
            defaultValue: 'avatar.jpg'
        },
        cookie:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        email:{
            type:Sequelize.TEXT,
            allowNull:false
        },
        phone:{
            type:Sequelize.TEXT,
            allowNull:false
        }
    }
);


module.exports = User;