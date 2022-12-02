'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasOne(models.DataPenyandang, { foreignKey: 'id_user'})

      this.hasOne(models.DataMitra, { foreignKey: 'id_user'})
      this.hasOne(models.DataPenyandang, { foreignKey: 'id_user'})
      this.hasOne(models.KontakPribadi, { foreignKey: 'id_user'})
      this.hasOne(models.UploadBerkas, { foreignKey: 'id_user'})
    }
  }
  
  User.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    posisi: DataTypes.STRING,
    resetpasswordLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};