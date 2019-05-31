'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define('Sport', {
    OlympianId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {});
  Sport.associate = function(models) {
    Sport.belongsTo(models.Olympian);
    Sport.belongsTo(models.Event);
  };
  return Sport;
};
