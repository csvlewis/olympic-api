var fs = require('fs');
var csv =  require('fast-csv');
const Event = require('./models').Event;
const Olympian = require('./models').Olympian;
const Medalist = require('./models').Medalist;
pry = require('pryjs');

let counter  = 0;
let csvStream = csv.fromPath("./public/olympics.csv", {headers: true})
.on('data', (record)=>  {
  csvStream.pause();
  let name = record.Name;
  let sex = record.Sex;
  let age = record.Age;
  let height = record.Height;
  if (record.Weight == 'NA'){
    var weight = null
  }
  else{
    var weight = record.Weight
  }
  let team = record.Team;
  let sport = record.Sport;
  let title = record.Event;
  let medal = record.Medal;
  const createModels = async function() {
    try {
      const event = await Event.findOrCreate({
        where: {
          title: title,
          sport: sport
        }
      })

      const olympian = await Olympian.findOrCreate({
        where: {
          name: name,
          sex: sex,
          age: age,
          height: height,
          weight: weight,
          team: team,
          sport: sport
        }
      })

      const olympian_id = olympian[0].id;
      const event_id = event[0].id;
      const medalist = await Medalist.findOrCreate({
        where: {
          OlympianId: olympian_id,
          EventId: event_id,
          name: name,
          team: team,
          age: age,
          medal: medal
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
  createModels()


  counter ++;
  csvStream.resume();
})
.on('end',function(end) {
  console.log('Finised Importing');
})
.on('err',function(err) {
  return console.log(err);
});

setTimeout(function() {
  process.exit();
}, 30000);
