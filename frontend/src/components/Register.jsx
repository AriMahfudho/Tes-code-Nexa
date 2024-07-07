import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3100/api/auth/register', { username, password });
      history.push('/login');
    } catch (error) {
      setError('Registration failed');
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginLeft : "600px",  flexDirection: 'column', width: '300px', padding: '20px', border: '2px solid white', borderRadius: '10px' }}>
        <h2>Register</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '8px', fontSize: '14px', cursor: 'pointer', marginTop: '10px',marginBottom: '10px' }}>Register</button>
        <button type="button" onClick={() => history.push('/login')} style={{ padding: '8px', fontSize: '12px', cursor: 'pointer' }}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default Register;
