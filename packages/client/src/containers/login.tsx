import * as React from "react";
import { useState } from "react";
import * as Logo from "../images/logo.svg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit() {
    console.log(email + " " + password);
  }


  return (
    <div className="login">
      <div className="login__brand">
        <div className="login__logo">
          <img src={Logo} height={100} />
        </div>
      </div>
      <div className="Login">
      <form onSubmit={handleSubmit}>
          <p>Email</p>
          <input
            autoFocus
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button onClick={handleSubmit} type="submit" disabled={!validateForm()}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
}
