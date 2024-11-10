'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      id: "1",
      name: "User",
      code: "user",
      isAllow: false
    }, {
      id: "2",
      name: "Admin",
      code: "admin",
      isAllow: false
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.delete('roles', { where: { id: "1" } });
    await queryInterface.delete('roles', { where: { id: "2" } });
    await queryInterface.delete('roles', { where: { id: "3" } });
  }
};
