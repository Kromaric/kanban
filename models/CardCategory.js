'use strict';
module.exports = (sequelize, DataTypes) => {
  const CardCategory = sequelize.define('CardCategory', {
    cardId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {});

  CardCategory.associate = function(models) {
    // Pas de relation directe nécessaire ici car elle est définie dans Card et Category
  };

  return CardCategory;
};
