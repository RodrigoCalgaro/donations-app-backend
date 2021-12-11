const moment = require('moment');
const collectService = require("../services/collectService");
const donationService = require("../services/donationService");


var collectController = {};


/* Get Collect */
collectController.get = async (req, res) => {

  try {
    let collect = await collectService.findByPk(1)

    if (!collect) {
      collect = {
        collectId: 1,
        startsDate: new Date(),
        endsDate: new Date(), 
        targetAmount: 10000
      }

      collect = await collectService.create(collect)
    }

    let today = moment();
    let endsDate = moment(collect.endsDate)
    let remainingDays = endsDate.diff(today, 'days') + 1

    if (remainingDays < 0) {
      remainingDays = 0;
    }

    let totalDonors = await donationService.getTotalDonors(collect.collectId)

    let totalRaised = await donationService.getTotalRaised(collect.collectId)

    let stillNeeded = (collect.targetAmount > totalRaised) ? (collect.targetAmount - totalRaised) : 0;
    let percentageRaised = parseFloat(100 - ((stillNeeded * 100) / collect.targetAmount).toFixed(2));

    res.status(200).json({
      ...collect.dataValues,
      totalDonors,
      totalRaised,
      stillNeeded,
      percentageRaised,
      remainingDays
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error"
    })
  }
};

/* Update */
collectController.update = async (req, res) => {
  let reqCollect = req.body

  try {
    let collect = await collectService.findByPk(1);

    if (collect) {

      let updatedCollect = await collectService.update(collect, reqCollect)

      res.status(200).json(updatedCollect);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error"
    })
  }

};


module.exports = collectController;