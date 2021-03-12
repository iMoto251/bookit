import * as React from "react";

export default function LoginPage() {
  return (
    <div className="login">
      <div className="login__brand">
        <div className="login__logo">BookIt!</div>
      </div>
      <div className="login__form">
        <div className="form">
          <div className="form__group">
            <div className="form__label">E-Mail</div>
            <div className="form__field">
              <input
                className="form__input"
                type="email"
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div className="form__group">
            <div className="form__label">Password</div>
            <div className="form__field">
              <input
                className="form__input"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="form__group">
            <button type="button" className="form__submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
