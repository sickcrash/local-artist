import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './AuthContext';
import { useEffect, useState } from 'react';

function Navbar() {
    const { currentUser } = useAuth();
    const [urlactive, setUrlactive] = useState('')
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/dashboard' || location.pathname === '/signup')
            setUrlactive("attivo")
        else setUrlactive("")
    }, [location.pathname])
    
    return (
        <nav>
            <NavLink activeclassname="active" to="/">
                Home
            </NavLink>
            <NavLink activeclassname="active" className={urlactive}  to="/login">
                {currentUser ? "Profilo" : "Accedi"}
            </NavLink>
        </nav>
    );
}

export default Navbar;
