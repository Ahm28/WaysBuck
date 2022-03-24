"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class toppings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      toppings.hasMany(models.cart, {
        as: "cart",
        foreignKey: {
          name: "idTopping",
        },
      });
    }
  }
  toppings.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "toppings",
    }
  );
  return toppings;
};
