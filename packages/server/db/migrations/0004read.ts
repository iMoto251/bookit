import sequelize from "sequelize";
import Sequelize, { QueryInterface } from "sequelize";

module.exports = {
  async up({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.createTable("read", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "book",
            key: "id",
          },
      },
      accessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "access",
            key: "id",
          },
      },
      read: {
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
    await queryInterface.dropTable("read");
  },
};