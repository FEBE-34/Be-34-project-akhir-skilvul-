'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KategoriProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Program, {foreignKey: 'id_kategori'})
      // KategoriProgram.hasMany(models.Program, {
      //   as:'Programs',
      //   foreignKey: "id_kategori",
      // });
    }
  }
  KategoriProgram.init({
    nama: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    gambar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KategoriProgram',
  });
  return KategoriProgram;
};