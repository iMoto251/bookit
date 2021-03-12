import * as React from "react";
import { Link } from "react-router-dom";
import * as Logo from "../images/logo.svg";

export default function Header() {
  return (
    <div>
      <nav className="nav">
        <h1>  
          <ul className="nav__bar">
            <a href='/'><img src={Logo} height={50} /></a>
            <Link to="/" className="nav__links">Home </Link>
            <Link to="/login" className="nav__links">Login </Link>
            <Link to="/help" className="nav__links">Help</Link>
          </ul>
        </h1>
      </nav>
    </div>
  );
}
