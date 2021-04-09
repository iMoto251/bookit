module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
          id: '0',
          email: 'wlk@gmail.com',
          password: 'pass'
        }], {});
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
  };