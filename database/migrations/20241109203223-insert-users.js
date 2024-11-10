'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: "1",
      username: "shekhar",
      name: "Shekhar",
      email: 'shekhar@company.com',
      phone: "7879553208",
      password: "95550b619db62e9587f8c3a6093c94e4:dc83bf5d5854a93d03a2f441995da3ed",
      roleId: 1,
    }, {
      id: "2",
      name: "Admin",
      username: "admin",
      email: 'admin@company.com',
      phone: "9999999999",
      password: "2d6ac3f1da8d995594a436a4ddacf623:add5fb4b473e8223a8d5ad15bff453df",
      roleId: 2,
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.delete('users', { where: { id: "1" } });
    await queryInterface.delete('users', { where: { id: "2" } });
    await queryInterface.delete('users', { where: { id: "3" } });
  }
};
