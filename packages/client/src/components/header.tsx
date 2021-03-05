import { h } from 'preact';
import { BrowserRouter as Router, Link } from 'react-router-dom';
const homeLink : string = '/';

export default function Header() {
    return(
        <Router>
            <div>
                <nav class="nav">
                    <h1>
                        <a href='/'>Home </a>
                        <a href='/login'>Login </a>
                        <a href='/help'>Help </a>
                    </h1>
                </nav>
            </div>
        </Router>
        
    )
}