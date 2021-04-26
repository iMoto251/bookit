import {
    Column,
    Model,
    NotNull,
    PrimaryKey,
    Table,
    HasMany,
    Unique,
    UpdatedAt,
  } from "sequelize-typescript";
  
  /**
   * A book from the goodbooks dataset
   */
  @Table
  export class ExternalBooks extends Model {
    /**
     * The book id
     */
    @Column
    @NotNull
    @PrimaryKey
    public book_id!: number;
  
    /**
     * Book id from goodreads
     */
    @Column
    @NotNull
    public goodreads_book_id!: number;
  
    /**
     * Most popular versions of book
     */
    @Column
    @NotNull
    public best_book_id!: number;

    /**
     * Id pointing to all versions of book as one entity
     */
     @Column
     @NotNull
     public work_id!: number;

     /**
     * Number of book versions
     */
      @Column
      @NotNull
      public books_count!: number;

    /**
     * The book isbn
     */
     @Column
     @NotNull
     public isbn!: number;

    /**
     * Other isbn format
     */
      @Column
      @NotNull
      public isbn13!: string;

    /**
     * Book's author(s)
     */
     @Column
     @NotNull
     public authors!: string;

     /**
     * Year book was published
     */
      @Column
      @NotNull
      public original_publication_year!: number;

      /**
     * Original book title
     */
     @Column
     @NotNull
     public original_title!: number;

     /**
     * Number of ratings for book
     */
      @Column
      @NotNull
      public ratings_count!: number;

     /**
     * Number of ratings for all versions of book
     */
     @Column
     @NotNull
     public work_ratings_count!: number;

     /**
     * Number of text reviews of book
     */
      @Column
      @NotNull
      public work_text_reviews_count!: number;

    /**
     * Number of 1 star ratings
     */
     @Column
     @NotNull
     public ratings_1!: number;

     /**
     * Number of 2 star ratings
     */
      @Column
      @NotNull
      public ratings_2!: number;

      /**
     * Number of 3 star ratings
     */
     @Column
     @NotNull
     public ratings_3!: number;

     /**
     * Number of 4 star ratings
     */
      @Column
      @NotNull
      public ratings_4!: number;

      /**
     * Number of 5 star ratings
     */
     @Column
     @NotNull
     public ratings_5!: number;

     /**
     * Url to cover image
     */
      @Column
      @NotNull
      public image_url!: number;

      /**
     * Url for smaller book cover image
     */
     @Column
     @NotNull
     public small_image_url!: string;
    

  }

