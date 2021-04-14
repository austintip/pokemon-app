import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className="App-header">
            <h2 className="Header_text">Hello, Header</h2>
            <nav>
                <Link to="/">Home</Link>{' | '}
            </nav>
        </header>
    );
}

export default Header;