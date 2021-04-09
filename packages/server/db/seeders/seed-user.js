module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
        {
            id: '1',
            email: 'test.admin@gmail.com',
            password: '$2a$10$xYkomxBysjVimxtP7flrTee/iiueeZp5e/FRmu9NKyTpeLpS7O43a'
        },
        {
            id: '2',
            email: 'test.member@gmail.com',
            password: '$2a$10$xYkomxBysjVimxtP7flrTee/iiueeZp5e/FRmu9NKyTpeLpS7O43a',
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
