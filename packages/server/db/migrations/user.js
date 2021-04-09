
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Users', {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          defaultValue: Sequelize.UUIDV1,
          autoIncrement: true,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
      })
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Users')
    }
  }