"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
      cateId: DataTypes.STRING,
      brandId: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      describe: DataTypes.STRING,
      status: DataTypes.STRING,
      // info 
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      country:DataTypes.STRING,
      note:DataTypes.STRING

      
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
