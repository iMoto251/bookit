import {
    Column,
    CreatedAt,
    HasOne,
    Model,
    NotNull,
    PrimaryKey,
    Table,
  } from "sequelize-typescript";
  
  import { Access } from "./Access";
  
  /**
   * An active user session.
   */
  @Table
  export class Session extends Model {
    /**
     * The session's ID.
     */
    @Column
    @NotNull
    @PrimaryKey
    public id!: number;
  
    /**
     * The associated access user.
     */
    @Column
    @NotNull
    @HasOne(() => Access)
    public accessId!: number;
  
    /**
     * The token used to resume this session.
     */
    @Column
    @NotNull
    public token!: string;
  
    /**
     * The session's expiry date.
     */
    @Column
    @NotNull
    public expires!: Date;
  
    /**
     * When the session was created.
     */
    @Column
    @NotNull
    @CreatedAt
    public createdOn!: Date;
  }
  