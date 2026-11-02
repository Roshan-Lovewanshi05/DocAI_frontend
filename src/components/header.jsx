import { FcDocument } from "react-icons/fc";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <FcDocument/>
                <span>DocAI</span>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="#">Features</Link>
                <Link to="#">How It Works</Link>
                <Link to="#">About</Link>
            </nav>
            <div className="auth-buttons">
                <Link to="/login"> <button className="login-btn">Login</button></Link>
                 <Link to="/sign-up"><button className="signup-btn">Sign-Up</button></Link>
            </div>
        </header>
    )
    
};
export default Header;
