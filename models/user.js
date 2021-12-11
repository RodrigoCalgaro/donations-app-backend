'use strict';

module.exports = (sequelize, DataTypes) => {
    const roles = {
        admin: 'admin',
        user: 'user'
    };

    var User = sequelize.define('User', {
        userId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(roles.admin, roles.user),
            defaultValue: roles.user
        },
    }, {
        timestamps: true
    }, );

    User.associate = function (models) {
    };

    User.roles = roles;

    return User;
};