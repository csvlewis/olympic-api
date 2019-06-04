var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
var Event = require('../../../models').Event;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GET Olympians
router.get("/", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  if (req.query.age == 'oldest')
    Olympian.findAll({
      include: [{
        model: Medalist,
        where: { medal: {[Op.not]: 'NA'}},
        required: false
      }],
      attributes: ['name', 'team', 'age', 'sport'],
      order: [['age', 'DESC']]
    })
    .then(olympians => {
      olympian = olympians[0]
      let formattedOlympian = {
        name: olympian.name,
        team: olympian.team,
        age: olympian.age,
        sport: olympian.sport,
        total_medals_won: olympian.Medalists.length
      };
      return formattedOlympian;
    })
    .then(olympian => {
      res.status(200).send({olympian: olympian});
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ error })
    });
  else if (req.query.age == 'youngest')
    Olympian.findAll({
      include: [{
        model: Medalist,
        where: { medal: {[Op.not]: 'NA'}},
        required: false
      }],
      attributes: ['name', 'team', 'age', 'sport'],
      order: [['age', 'ASC']]
    })
    .then(olympians => {
      olympian = olympians[0]
      let formattedOlympian = {
        name: olympian.name,
        team: olympian.team,
        age: olympian.age,
        sport: olympian.sport,
        total_medals_won: olympian.Medalists.length
      };
      return formattedOlympian;
    })
    .then(olympian => {
      res.status(200).send({olympian: olympian});
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ error })
    });
  else
    Olympian.findAll({
      include: [{
        model: Medalist,
        where: { medal: {[Op.not]: 'NA'}},
        required: false
      }],
      attributes: ['name', 'team', 'age', 'sport']
    })
    .then(olympians => {
      return olympians.map(function (olympian) {
        let formattedOlympian = {
          name: olympian.name,
          team: olympian.team,
          age: olympian.age,
          sport: olympian.sport,
          total_medals_won: olympian.Medalists.length
        };
        return formattedOlympian;
      })
    })
    .then(olympians => {
      res.status(200).send({olympians: olympians});
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({ error })
    });
});

module.exports = router;
