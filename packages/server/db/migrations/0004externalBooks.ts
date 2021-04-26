import sequelize from "sequelize";
import Sequelize, { QueryInterface } from "sequelize";

module.exports = {
    async up({ context: queryInterface }: { context: QueryInterface }) {
      await queryInterface.createTable("externalBooks", {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        bookId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      });
    },
    async down({ context: queryInterface }: { context: QueryInterface }) {
      await queryInterface.dropTable("externalRatings");
    },
  };