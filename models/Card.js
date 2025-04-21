// models/card.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Card.associate = function(models) {
    Card.belongsTo(models.Column, {
      foreignKey: 'columnId',
      as: 'column'
    });

    Card.belongsToMany(models.Category, {
      through: 'CardCategories',
      foreignKey: 'cardId',
      otherKey: 'categoryId',
      as: 'categories'
    });
  };

  return Card;
};
