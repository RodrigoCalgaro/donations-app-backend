const donationService = require("../services/donationService");

var donationController = {};

/* Get All */
donationController.getAll = async (req, res) => {

  let filter = ""
  if (req.query.filter) {
    filter = req.query.filter
  }

  let sorterBy = "donationId"
  if (req.query.sorterBy && (req.query.sorterBy == "donationId" || req.query.sorterBy == "date" || req.query.sorterBy == "amount" || req.query.sorterBy == "user")) {
    sorterBy = req.query.sorterBy;
  }

  let sorterDirection = "DESC";
  
  if (req.query.sorterDirection && (req.query.sorterDirection == 'asc' || req.query.sorterDirection == 'desc')){
    sorterDirection = req.query.sorterDirection.toUpperCase();
  }

  let pageSize = 1
  if (req.query.pageSize){
    pageSize = parseInt(req.query.pageSize);
  }

  let page = 0
  let pageNumber = 0
  if (req.query.pageNumber){
    pageNumber = parseInt(req.query.pageNumber)
    page = pageNumber - 1
  }

  let offset = (page * pageSize)

  try {

    let totalCount = await donationService.count(1);

    let donations = await donationService.getAll(1, filter, sorterBy, sorterDirection, pageSize, offset)

    let donationsDTO = donations.map(donation => {
      return {
        donationId: donation.donationId,
        date: donation.date,
        amount: donation.amount,
        userEmail: donation.User.email,
      }
    })

    let xPagination = {
      totalCount,
      pageSize,
      currentPage: pageNumber,
      pageNumber
    }

    res.set('x-pagination', JSON.stringify(xPagination));
    res.set('Access-Control-Expose-Headers', 'x-pagination')

    res.status(200).json(donationsDTO);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error"
    });
  }
};

/* Add */
donationController.add = async (req, res) => {
  let amount = req.body.amount;
  let date = new Date();
  let collectId = 1;
  let userId = req.user.dataValues.userId;

  let donation = {
    date,
    amount,
    collectId,
    userId
  }

  try {
    let newDonation = await donationService.create(donation)

    res.status(201).json()
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error"
    });
  }
};

/* Get by Id */
donationController.get = async (req, res) => {
  try {
    let donation = await donationService.findByPk(req.params.id);

    res.status(200).json(donation);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error"
    });
  }
};

/* Update By Id */
donationController.update = async (req, res) => {
  let reqDonation = req.body

  try {
    let donation = await donationService.findByPk(req.params.id);

    if (donation) {
      let updatedDonation = await donationService.update(donation, reqDonation)

      res.status(200).json(updatedDonation);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error"
    });
  }
};

/* Delete by Id */
donationController.delete = async (req, res) => {

  try {

    let donation = await donationService.destroyByPk(req.params.id);

    res.status(200).json();

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal error"
    });
  }

};


module.exports = donationController;