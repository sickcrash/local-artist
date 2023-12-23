import { useState } from 'react';
import './Login.css';
import { useAuth } from '../componenti/AuthContext';
import RedirectLoggedIn from '../componenti/RedirectLoggedIn';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            navigate("/dashboard")
        } catch (error) {
            console.error('Login failed:', error.message);
            setError(error.message)
        }
    };

    return (
        <RedirectLoggedIn>
            <div className='main'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label for="username">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label for="password">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Entra</button>
                </form>
                <p>Non hai un account? <a href="#/signup">Registrati</a></p>
                <p style={{color:"red"}}>{error}</p>
            </div>
        </RedirectLoggedIn>
    );
}

export default Login
