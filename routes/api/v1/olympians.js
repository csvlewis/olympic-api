var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
pry = require('pryjs');

// GET all Olympians
router.get('/', function(req, res) {
  Olympian.findAll({
    attributes: ['id', 'name', 'team', 'age', 'sport']
  })
  .then(olympians => {
    addTotalMedalsWon(olympians)
    .then(result => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(result));
    })
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error })
  });
});

// function addTotalMedalsWon(olympians) {
//   return new Promise((resolve, reject) => {
//     resolve(olympians.map(async function(olympian) {
//       var r = olympian.toJSON()
//       r.total_medals_won = await olympian.getTotalMedals()
//       return r
//     })
//     )
//   })
// }
//
// const getMedalsWon = async (id) => {
//   const allMedals = await Medalist.findAll({
//     where: {OlympianId: id, medal: {[Op.not]: 'NA'}}
//   })
//   return await allMedals.length
// }

module.exports = router;
