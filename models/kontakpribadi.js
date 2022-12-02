'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KontakPribadi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'id_user'})
    }
  }
  KontakPribadi.init({
    no_hp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kota: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    desa: DataTypes.STRING,
    kode_pos: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KontakPribadi',
  });
  return KontakPribadi;
};