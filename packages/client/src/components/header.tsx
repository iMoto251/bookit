import * as React from "react";
import { Link } from "react-router-dom";
import * as Logo from "../images/logo.svg";

export default function Header() {
  return (
    <div>
      <nav>
        <ul className="nav">
          <li>
            <a href='/' className="nav__logo"><img src={Logo} height={50} /></a>
            <Link to="/help" className="nav__links">Help</Link>
            <Link to="/login" className="nav__links">Login</Link>
            <Link to="/" className="nav__links" >Home</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
