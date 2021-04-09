
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Users', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          autoIncrement: true,
          allowNull: false
        },
        email: {
          type: Sequelize.String(64),
          allowNull: false
        },
        password: {
            type: Sequelize.String(64),
            allowNull: false
        },
      })
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Users')
    }
  }