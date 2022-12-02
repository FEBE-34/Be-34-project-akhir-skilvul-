'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataMitra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'id_user'})
      this.hasMany(models.Program, {foreignKey: 'id_mitra'})
      // DataMitra.hasMany(models.Program, {
      //   foreignKey: "id_mitra",
      // });
    }
  }
  DataMitra.init({
    nama_mitra: DataTypes.STRING,
    nama_perusahaan: DataTypes.STRING,
    bidang: DataTypes.STRING,
    jumlah_anggota: DataTypes.INTEGER,
    alamat: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DataMitra',
  });
  return DataMitra;
};