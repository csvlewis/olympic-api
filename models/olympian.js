pry = require('pryjs');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    team: DataTypes.STRING,
    sport: DataTypes.STRING
  }, {});
  Olympian.associate = function(models) {
    Olympian.hasMany(models.Medalist, { onDelete: 'cascade' });
    Olympian.belongsToMany(models.Event, {through: models.Medalist});
  };

  Olympian.prototype.getTotalMedals = function() {
    var id = this.id;
    sequelize.query("SELECT COUNT(*) FROM \"Medalists\" m WHERE m.\"OlympianId\" = 1 AND m.medal != \'NA\'", { type: sequelize.QueryTypes.SELECT })
    .then(function(medals) {
      return medals[0].count
    })
  }
  return Olympian;
};
