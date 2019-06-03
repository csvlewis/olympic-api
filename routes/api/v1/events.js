var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
var Event = require('../../../models').Event;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GET All Events
router.get('/', function(req, res) {
  Event.findAll({})
  .then(medalists => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(medalists));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ error })
  });
})

// GET All Medalists for an Event
router.get('/:id/medalists', function(req, res) {
  var EventId = req.params.id
  Medalist.findAll({
    where: {
      EventId: EventId,
      medal: {[Op.not]: 'NA'}
    }
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
