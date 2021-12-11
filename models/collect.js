'use strict';

module.exports = (sequelize, DataTypes) => {
    var Collect = sequelize.define('Collect', {
        collectId: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        startsDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endsDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        targetAmount: {
            type: DataTypes.FLOAT(18,2),
            allowNull: false
        },
        minDonationAllowed: {
            type: DataTypes.FLOAT(18,2),
        },
        suggestedDonation: {
            type: DataTypes.FLOAT(18,2),
        },
        
    }, {
        timestamps: false,
    }, );

    Collect.associate = function (models) {};

    return Collect;
};