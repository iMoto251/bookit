import sequelize from "sequelize";
import Sequelize, { QueryInterface } from "sequelize";

module.exports = {
  async up({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.createTable("rating", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      accessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "access",
            key: "id",
          },
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "book",
            key: "id",
          },
      },
      rated: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      scale: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bookitUser: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    //   createdOn: {
    //     type: sequelize.DATE,
    //     allowNull: false,
    //   },
    });
  },
  async down({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.dropTable("rating");
  },
};