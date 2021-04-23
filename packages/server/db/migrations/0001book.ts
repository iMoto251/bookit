import sequelize from "sequelize";
import Sequelize, { QueryInterface } from "sequelize";

module.exports = {
  async up({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.createTable("book", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    //   createdOn: {
    //     type: sequelize.DATE,
    //     allowNull: false,
    //   },
    });
  },
  async down({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.dropTable("book");
  },
};