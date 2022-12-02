'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UploadBerkas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_ktp: {
        type: Sequelize.STRING
      },
      file_dokter: {
        type: Sequelize.STRING
      },
      file_tambahan: {
        type: Sequelize.STRING
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Users',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UploadBerkas');
  }
};