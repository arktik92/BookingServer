"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Reservations",
      [
        {
          date: "2023-09-26T09:12:18.345Z",
          name: "stephanie",
          note: "sunshine",
          status: 1,
          userId: 8,
          spotId: 1,
          roomId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reservations", null, {});
  },
};
