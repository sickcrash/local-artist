import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pagine/Login';
import Home from './pagine/Home';
import Navbar from './componenti/Navbar';
import Signup from './pagine/Signup';
import Dashboard from './pagine/Dashboard';
import { AuthProvider } from './componenti/AuthContext';
import app from './firebase'

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
