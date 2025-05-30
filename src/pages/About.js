import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function About() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if no token
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUser(res.data))
      .catch(err => {
        setError(err.response.data.msg || 'Error fetching user');
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>About This App</h2>
        <p>This is a MERN stack login application built to demonstrate user authentication using JWT.</p>
        <p>Developed by: Satish</p>
        <p>Version: 1.0.0</p>
      </div>
    </div>
  );
}

export default About;