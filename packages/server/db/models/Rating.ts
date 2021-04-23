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
   * A rating entry for given bookid and userid.
   */
  @Table
  export class Rating extends Model {
    /**
     * The rating id.
     */
    @Column
    @NotNull
    @PrimaryKey
    public id!: number;
  
    /**
     * The user that rated the book.
     */
    @Column
    @NotNull
    @HasOne(() => Access)
    public accessId!: number;
  
    /**
     * The id of the book rated.
     */
    @Column
    @NotNull
    @HasOne(() => Book)
    public bookId!: number;
  
    /**
     * The rating given by user for bookid.
     */
    @Column
    @NotNull
    public rated!: number;

    /**
     * The upper limit for the given rating (1-[5] or 1-[10]).
     */
    @Column
    @NotNull
    public scale!: number;

    /**
     * The upper limit for the given rating (1-[5] or 1-[10]).
     */
     @Column
     @NotNull
     public bookitUser!: boolean;
  }