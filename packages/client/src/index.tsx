import { h, Component, render } from "preact";

export class Login extends Component {
  render() {
    return (
      <div class="login">
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
            <button type="submit" class="form__submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

render(<Login />, document.body);
