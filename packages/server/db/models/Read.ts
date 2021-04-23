import {
    Column,
    Model,
    NotNull,
    PrimaryKey,
    Table,
    HasOne,
    Unique,
    UpdatedAt,
  } from "sequelize-typescript";
  
  import { Book } from "./Book";
  import { Access } from "./Access";

  /**
   * Records whether user has marked book as read.
   */
  @Table
  export class Read extends Model {
    /**
     * The read ID.
     */
    @Column
    @NotNull
    @PrimaryKey
    public id!: number;
  
    /**
     * The read book's id.
     */
    @Column
    @NotNull
    @HasOne(() => Book)
    public bookId!: string;

    /**
     * The user id.
     */
    @Column
    @NotNull
    @HasOne(() => Access)
    public accessId!: string;
    
    /**
     * Indicates whether user has marked book as read.
     */
    @Column
    @NotNull
    public read!: boolean;
  }