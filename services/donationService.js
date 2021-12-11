const models = require("../models");
const Donation = models.Donation;
const User = models.User

var donationService = {};

donationService.getAll = async(collectId, filter, sorterBy, sorterDirection, pageSize, offset) => {
    let order = [sorterBy, sorterDirection]

    if (sorterBy == "user"){
        order = [User, 'email', sorterDirection]
    }

    return await Donation.findAll(
        {
          where: {
            collectId: collectId
          },
          include: [{
            model: User,
            where: {
              email: {
                [models.Sequelize.Op.substring]: filter
              }
            }
          }],
          order: [order],
          limit: pageSize,
          offset: offset
        }
    )    
}

donationService.findByPk = async (pk) => {
    return await Donation.findByPk(pk)
}

donationService.create = async (donation) => {
    return await Donation.create(donation)
}

donationService.update = async (oldDonation, newDonation) => {
    return await oldDonation.update(newDonation)
}

donationService.destroyByPk = async (pk) => {
    return await Donation.destroy({
        where: {
            donationId: pk
        }
    })
}

donationService.count = async (collectId) => {
    return await Donation.count(
        {
            where: {
                collectId: collectId
            }
        }
    )
}

donationService.getTotalDonors = async (collectId) => {
    return await Donation.count(
        {
            where: {
                collectId: collectId
            },
            distinct: true,
            col: 'Donation.userId'
        })
}

donationService.getTotalRaised = async (collectId) => {
    return await Donation.sum(
        'amount',
        {
            where: {
                collectId: collectId
            }
        }
    )
}


module.exports = donationService;