'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Dishes', [{
        name: 'Poulet',
        price: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Boeuf',
        price: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Vegetarien',
        price: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Poisson',
        price: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dishes', null, {});
  }
};
