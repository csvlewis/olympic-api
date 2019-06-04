var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
var Event = require('../../../models').Event;
const sequelize = require('sequelize');
const Op = sequelize.Op;

[sequelize.fn('array_agg', sequelize.col('name'), 'events')]


// GET All Events
router.get('/', function(req, res) {
  Event.findAll({
    attributes: ['sport', [sequelize.fn('array_agg', sequelize.col('title')), 'events']],
    group: 'sport'
  })
  .then(events => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(events));
  })
  .catch(error => {
    eval(pry.it)
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error })
  });
})

// GET All Medalists for an Event
router.get('/:id/medalists', function(req, res) {
  var EventId = req.params.id
  Event.findOne({
    where: {
      id: EventId
    },
    attributes: ['title'],
    include: [{
      model: Medalist,
      where: { medal: { [Op.not]: 'NA' } },
      attributes: ['name', 'team', 'age', 'medal']
    }]
  })
  .then(medalists => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(medalists));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error })
  });
})

module.exports = router;
