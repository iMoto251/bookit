import * as React from "react";

function SideNavFilters(){
  return(
    <div className="rec__sidenav">
      <div className="rec__filters">
          <select name="authors" id="authors">
            <option value="Dickenson">Dickenson</option>
            <option value="Poe">Poe</option>
            <option value="Smith">Smith</option>
          </select>
          <select name="price" id="price">
            <option value="0">Free</option>
            <option value="20">Under 20</option>
            <option value="40">Under 40</option>
          </select>
          <select name="genre" id="genre">
            <option value="Horror">Horror</option>
            <option value="Scifi">Sci-Fi</option>
            <option value="Nonfiction">Non-Fiction</option>
          </select>
        </div>
    </div>
  )
}

export default function Recommendation() {
  return (
    <div className="rec">
      <SideNavFilters />
        <div className="rec__body">
          <div>
            <h1 className="rec__title">Book Title</h1>
            <p className="rec__desc">Author, Genre, Short Description, ISBN</p>
          </div>
          <hr />
          <div>
            <h1 className="rec__title">Book Title</h1>
            <p className="rec__desc">Author, Genre, Short Description, ISBN</p>
          </div>
          <hr />
          <div>
            <h1 className="rec__title">Book Title</h1>
            <p className="rec__desc">Author, Genre, Short Description, ISBN</p>
          </div>
          <hr />
          <div>
            <h1 className="rec__title">Book Title</h1>
            <p className="rec__desc">Author, Genre, Short Description, ISBN</p>
          </div>
          <hr />
          <div>
            <h1 className="rec__title">Book Title</h1>
            <p className="rec__desc">Author, Genre, Short Description, ISBN</p>
          </div>
          <hr />
          <div>
            <h1 className="rec__title">Book Title</h1>
            <p className="rec__desc">Author, Genre, Short Description, ISBN</p>
          </div>
      </div>
    </div>
  );
}
