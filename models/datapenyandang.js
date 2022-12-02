'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataPenyandang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     this.belongsTo(models.User, {foreignKey: 'id_user'})
      this.hasMany(models.pilihprogram,{foreignKey:'id_datapenyandang'})

      // this.belongsToMany(models.Program, { through: "pilihprograms",foreignKey: 'id_program'})
      // DataPenyandang.belongsTo(models.User,{
      //   as:'Users',
      //   foreignKey: 'id_user'
      // })
    }
  }
  
  DataPenyandang.init({
    nama: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    agama: DataTypes.STRING,
    nik: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DataPenyandang',
  });
  return DataPenyandang;
};