import sequelize from "sequelize";
import Sequelize, { QueryInterface } from "sequelize";

module.exports = {
  async up({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.createTable("access", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastSeen: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdOn: {
        type: sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.dropTable("access");
  },
};
