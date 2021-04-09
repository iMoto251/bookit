module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
        {
            id: '87cf44fe-cc1f-4fa7-a936-d15dbb122bcc',
            email: 'test.admin@gmail.com',
            password: '$2a$10$xYkomxBysjVimxtP7flrTee/iiueeZp5e/FRmu9NKyTpeLpS7O43a'
        },
        {
            id: '436e49ad-3b04-40d6-b8da-f6d26f45ed17',
            email: 'test.member@gmail.com',
            password: '$2a$10$xYkomxBysjVimxtP7flrTee/iiueeZp5e/FRmu9NKyTpeLpS7O43a',
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
