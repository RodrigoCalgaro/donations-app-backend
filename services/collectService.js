const models = require("../models");
const Collect = models.Collect;


var collectService = {};

collectService.create = async (collect) => {
    return await Collect.create(collect)
}

collectService.findByPk = async (pk) => {
    return await Collect.findByPk(pk)
}

collectService.update = async (oldCollect, newCollect) => {
    return await oldCollect.update(newCollect)
}




module.exports = collectService;