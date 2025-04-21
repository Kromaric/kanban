// models/category.js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Category.associate = function(models) {
    Category.belongsToMany(models.Card, {
      through: 'CardCategories',
      foreignKey: 'categoryId',
      otherKey: 'cardId',
      as: 'cards'
    });
  };

  return Category;
};
