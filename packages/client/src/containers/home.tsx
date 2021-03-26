import * as React from "react";

export default function HomePage() {
  return (
      <div className="home">
        <h1 className="home__head">Welcome to BookIt!</h1>
      <p>BookIt is a book recommendation website that recommends books based on genre, authors, and past books you've read input into our system</p>
      <a href="/#/recommendation">Recommendation</a>
      </div>
  );
}
