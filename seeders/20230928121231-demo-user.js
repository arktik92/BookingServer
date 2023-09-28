'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPasswordStephanie = await bcrypt.hash("imAprincess", salt);
   
      await queryInterface.bulkInsert('Users', [{
        role: "admin",
        firstName: "stephanie",
        lastName: "de monaco",
        email: "stephdemonaco@princesse.com",
        phoneNumber: "0606060606",
        password: await bcrypt.hash("imAprincess", salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        role: "user",
        firstName: "stephane",
        lastName: "de monaco",
        email: "stephdemonaco@prince.com",
        phoneNumber: "0606060601",
        password: await bcrypt.hash("imTheBoss", salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
