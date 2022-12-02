'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Programs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      tanggal_mulai: {
        type: Sequelize.DATE
      },
      tanggal_selesai: {
        type: Sequelize.DATE
      },
      informasi_tambahan: {
        type: Sequelize.STRING
      },
      kode_kegiatan: {
        type: Sequelize.STRING
      },
      status_program: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      id_mitra: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        // references:{
        //  model:'DataMitras',
        //   key:'id'
        // } 
      },
      id_kategori: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Programs');
  }
};