import {
  Column,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";

/**
 * A user access entry.
 */
@Table
export class Access extends Model {
  /**
   * The user's ID.
   */
  @Column
  @NotNull
  @PrimaryKey
  public id!: number;

  /**
   * The user's e-mail address.
   */
  @Column
  @Unique
  @NotNull
  public email!: string;

  /**
   * The user's password, hashed with Argon2.
   */
  @Column
  @NotNull
  public password!: string;

  /**
   * When the user was last online.
   */
  @Column
  @NotNull
  @UpdatedAt
  public last_seen!: Date;
}
