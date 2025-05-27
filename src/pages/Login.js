import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      setMessage('Login successful! Token: ' + res.data.token);
    } catch (err) {
      setMessage(err.response.data.msg || 'Error logging in');
    }
  };

  return (
    <div className="form-container">
      <h2>App Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
        <Link to="/forgot-password">Forgot Password?</Link>
        <br></br>
        <Link to="/register"> Register </Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
export default Login;