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
  export class ExternalRatings extends Model {
    /**
     * The user's ID.
     */
    @Column
    @NotNull
    @PrimaryKey
    public userId!: number;
  
    /**
     * The user's e-mail address.
     */
    @Column
    @NotNull
    public bookId!: number;
  
    /**
     * The user's password, hashed with Argon2.
     */
    @Column
    @NotNull
    public rating!: number;

  }