import Sequelize, { QueryInterface } from "sequelize";

module.exports = {
  async up({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.createTable("session", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      accessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "access",
          key: "id",
        },
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdOn: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.dropTable("session");
  },
};
