import { useState } from 'react';
import './Login.css';
import RedirectLoggedIn from '../componenti/RedirectLoggedIn';
import { useAuth } from '../componenti/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
            navigate("/login")
        } catch (error) {
            console.error('Registration failed:', error.message);
            setError(error.message)
        }
    }

    return (
        <RedirectLoggedIn>
            <div>
                <h1>Registrazione</h1>
                <form onSubmit={handleSignup}>
                    <label for="username">Username:</label>
                    <input type="text" value={email} required
                        onChange={(e) => setEmail(e.target.value)} />

                    <label for="password">Password:</label>
                    <input type="password" value={password} required
                        onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Registrati</button>
                </form>
                <p>Hai già un account? <a href="/Login">Effettua il login</a></p>
                <p style={{color:"red"}}>{error}</p>
            </div>
        </RedirectLoggedIn>
    );
}

export default Signup
