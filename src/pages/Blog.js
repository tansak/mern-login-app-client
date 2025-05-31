import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPosts(res.data))
      .catch(err => {
        setError(err.response.data.msg || 'Error fetching posts');
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      setError(err.response.data.msg || 'Error deleting post');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Blog Posts</h2>
        <Link to="/create-post" className="create-post-link">Create New Post</Link>
        {error && <p className="error">{error}</p>}
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>By: {post.user.name}</p>
              <p>Posted: {new Date(post.createdAt).toLocaleDateString()}</p>
              <Link to={`/edit-post/${post._id}`}>Edit</Link>
              <button onClick={() => handleDelete(post._id)} className="delete-button">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;