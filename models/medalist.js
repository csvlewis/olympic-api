'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medalist = sequelize.define('Medalist', {
    OlympianId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    age: DataTypes.INTEGER,
    medal: DataTypes.STRING
  }, {});
  Medalist.associate = function(models) {
    Medalist.belongsTo(models.Olympian);
    Medalist.belongsTo(models.Event);
  };
  return Medalist;
};
