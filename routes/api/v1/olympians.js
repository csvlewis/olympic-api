var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
var Event = require('../../../models').Event;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
pry = require('pryjs');

// GET Olympians
router.get('/', function(req, res) {
  if (req.query.age == 'youngest') {
    Olympian.findAll({
      attributes: ['id', 'name', 'team', 'age', 'sport'],
      order: [['age', 'ASC']]
    })
    .then(olympians => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(olympians[0]));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error })
    });
  }
  else if (req.query.age == 'oldest') {
    Olympian.findAll({
      attributes: ['id', 'name', 'team', 'age', 'sport'],
      order: [['age', 'DESC']]
    })
    .then(olympians => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(olympians[0]));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error })
    });
  }
  else {
    Olympian.findAll({
      attributes: ['id', 'name', 'team', 'age', 'sport']
    })
    .then(olympians => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(olympians));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send({ error })
    });
  }
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
