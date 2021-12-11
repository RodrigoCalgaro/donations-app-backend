'use strict';

module.exports = (sequelize, DataTypes) => {
    var Donation = sequelize.define('Donation', {
        donationId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        collectId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    }, {
        timestamps: false,
    }, );

    Donation.associate = function (models) {
        models.Donation.belongsTo(models.Collect, {
            foreignKey: 'collectId',
        });
        models.Collect.hasMany(models.Donation, {
            foreignKey: 'collectId',
        });

        models.Donation.belongsTo(models.User, {
            foreignKey: 'userId',
        });
        models.User.hasMany(models.Donation, {
            foreignKey: 'userId',
        });
    };

    return Donation;
};