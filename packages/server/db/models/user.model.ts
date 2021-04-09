
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize("mysql://root:asd123@localhost:3306/mydb");

export interface UserAttributes {
    id: number;
    password: string;
    email: string;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};

export function createUser (sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("Users", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
}