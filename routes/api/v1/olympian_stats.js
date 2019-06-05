var express = require("express");
var router = express.Router();
var Olympian = require('../../../models').Olympian;
var Medalist = require('../../../models').Medalist;
var Event = require('../../../models').Event;
const sequelize = require('sequelize');

// GET Olympian Stats
router.get("/", async function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  try {
    const total_olympians = await Olympian.findAndCountAll({})
    const avg_male_weight = await Olympian.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('weight')), 'weight']],
      where: { sex: 'M' }
    })
    const avg_female_weight = await Olympian.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('weight')), 'weight']],
      where: { sex: 'F' }
    })
    const avg_age = await Olympian.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'age']]
    })
    const male_weight_rounded = Math.round(avg_male_weight[0].weight * 10) / 10
    const female_weight_rounded = Math.round(avg_female_weight[0].weight * 10) / 10
    const age_rounded = Math.round(avg_age[0].age * 10) / 10
    const stats = {
      olympian_stats: {
        total_competing_olympians: total_olympians.count,
        average_weight: {
          unit: 'kg',
          male_olympians: male_weight_rounded,
          female_olympians: female_weight_rounded
        },
        average_age: age_rounded
      }
    }
    res.status(200).send(stats);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
})

module.exports = router;
