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
   * A book item entry.
   */
  @Table
  export class Book extends Model {
    /**
     * The book ID.
     */
    @Column
    @NotNull
    @PrimaryKey
    public id!: number;
  
    /**
     * The book title.
     */
    @Column
    @NotNull
    public title!: string;
  
    /**
     * The book genre.
     */
    @Column
    @NotNull
    public genre!: string;
  
    /**
     * The book isbn.
     */
    @Column
    @NotNull
    public isbn!: string;
  }
  