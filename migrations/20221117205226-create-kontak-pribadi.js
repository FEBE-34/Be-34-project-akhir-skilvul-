'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KontakPribadis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_hp: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      provinsi: {
        type: Sequelize.STRING
      },
      kota: {
        type: Sequelize.STRING
      },
      kecamatan: {
        type: Sequelize.STRING
      },
      desa: {
        type: Sequelize.STRING
      },
      kode_pos: {
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
    await queryInterface.dropTable('KontakPribadis');
  }
};