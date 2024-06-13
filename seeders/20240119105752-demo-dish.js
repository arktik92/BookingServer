'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Dishes', [{
        name: 'Poulet',
        price: 10,
        description: 'Poulet frit',
        quantity: 10,
        category: "Viande",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Boeuf',
        price: 12,
        description: 'Boeuf frit',
        quantity: 10,
        category: "Viande",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Vegetarien',
        price: 8,
        description: 'Vegetarien',
        quantity: 10,
        category: "Vegetarien",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Poisson',
        price: 12,
        description: 'Poisson frit',
        quantity: 10,
        category: "Poisson",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Dishes', null, {});
  }
};
