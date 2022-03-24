"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.products, {
        as: "products",
        foreignKey: {
          name: "idProduct",
        },
      });
      cart.belongsTo(models.Users, {
        as: "userOrder",
        foreignKey: {
          name: "idUser",
        },
      });
      cart.belongsTo(models.toppings, {
        as: "toppings",
        foreignKey: {
          name: "idTopping",
        },
      });
      cart.hasMany(models.transactions, {
        as: "transactions",
        foreignKey: {
          name: "idCart",
        },
      });
    }
  }
  cart.init(
    {
      idUser: DataTypes.INTEGER,
      idProduct: DataTypes.INTEGER,
      idTopping: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart",
    }
  );
  return cart;
};
