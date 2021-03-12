import * as React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
const homeLink: string = "/";

export default function Header() {
  return (
    <div>
      <nav className="nav">
        <h1>
          <Link to="/">Home</Link>
          <Link to="/login">Login </Link>
          <Link to="/help">Help </Link>
        </h1>
      </nav>
    </div>
  );
}
