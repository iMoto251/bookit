import { h } from 'preact';
import Header from '../components/header';

export default function HomePage() {
    return (
      <div>
        <Header />
        <div class="login">
          <div className="login__brand">
            <div className="login__logo">Home Page</div>
          </div>
        </div>
      </div>
    );
  }