// models/column.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define('Column', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Column.associate = function(models) {
    Column.hasMany(models.Card, {
      foreignKey: 'columnId',
      as: 'cards',
      onDelete: 'CASCADE'
    });
  };

  return Column;
};
