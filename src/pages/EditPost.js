import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => {
        setError(err.response.data.msg || 'Error fetching post');
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/blog');
    } catch (err) {
      setError(err.response.data.msg || 'Error updating post');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <div className="form-group">
            <button type="submit">Update Post</button>
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditPost;