
const models = require("../models");

models.sequelize.sync({
    force: true
  }).then(function () {
      console.log('Database is clean!');
  }).catch(function (err) {
    console.log(err, "Error to sync database: " + err);
  });