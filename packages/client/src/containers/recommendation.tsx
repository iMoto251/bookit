import * as React from "react";

function SideNavFilters(){
  return(
    <div className="rec__sidenav">
      <h3>Author</h3>
        <p>
          <input type="checkbox" id="Dickenson"/>
          <label>Dickenson</label>
        </p>
        <p>
          <input type="checkbox" id="Poe"/>
          <label>Poe</label>
        </p>
        <p>
          <input type="checkbox" id="Smith"/>
          <label>Smith</label>
        </p>
      <h3>Price</h3>
        <input type="range" min="1" max="100" value="50" id="myRange" />
      <h3>Genre</h3>
        <p>
          <input type="checkbox" id="Horror"/>
          <label>Horror</label>
        </p>
        <p>
          <input type="checkbox" id="Mystery"/>
          <label>Mystery</label>
        </p>
        <p>
          <input type="checkbox" id="Romance"/>
          <label>Romance</label>
        </p>
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
