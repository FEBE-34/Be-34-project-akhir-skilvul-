'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pilihprogram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.DataPenyandang, { foreignKey: 'id_datapenyandang'})
      this.belongsTo(models.Program, { foreignKey: 'id_program'})

    }
  }
  pilihprogram.init({
    id_program: DataTypes.INTEGER,
    id_datapenyandang: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pilihprogram',
  });
  return pilihprogram;
};