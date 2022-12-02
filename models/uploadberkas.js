'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UploadBerkas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'id_user'})
    }
  }
  UploadBerkas.init({
    file_ktp: DataTypes.STRING,
    file_dokter: DataTypes.STRING,
    file_tambahan: DataTypes.STRING,
    id_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UploadBerkas',
  });
  return UploadBerkas;
};