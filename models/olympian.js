'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    sex: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    team: DataTypes.STRING
  }, {});
  Olympian.associate = function(models) {
    Olympian.hasOne(models.Sport, { onDelete: 'cascade' });
    Olympian.hasMany(models.Medalist, { onDelete: 'cascade' });
    Olympian.belongsToMany(models.Event, {through: models.Medalist});  };
  return Olympian;
};
