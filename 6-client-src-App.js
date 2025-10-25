import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, TextField, Button, Box, Alert } from '@mui/material';
import { Add, Delete, Logout, Person } from '@mui/icons-material';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    document.title = 'BlogSphere - Personal Blog Platform';
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserInfo(token);
      fetchPosts(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      handleLogout();
    }
  };

  const fetchPosts = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const endpoint = showLogin ? '/auth/login' : '/auth/register';
      const data = showLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(`${API_URL}${endpoint}`, data);

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      setSuccess(response.data.message);
      fetchPosts(response.data.token);
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setPosts([]);
    setFormData({ username: '', email: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username' || name === 'email' || name === 'password') {
      setFormData({ ...formData, [name]: value });
    } else {
      setNewPost({ ...newPost, [name]: value });
    }
  };

  const handlePostSubmit = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      if (editingId) {
        await axios.put(`${API_URL}/posts/${editingId}`, newPost, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/posts`, newPost, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setNewPost({ title: '', content: '', author: '' });
      setEditingId(null);
      fetchPosts(token);
    } catch (error) {
      alert('Failed to save post');
    }
  };

  const handleEdit = (post) => {
    setNewPost({ title: post.title, content: post.content, author: post.author });
    setEditingId(post._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`${API_URL}/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchPosts(token);
      } catch (error) {
        alert('Failed to delete');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Login/Register Page
  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <Card sx={{ p: 4, borderRadius: 3, boxShadow: 5 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea' }}>
              📝 BlogSphere
            </Typography>
            <Typography variant="h6" align="center" gutterBottom sx={{ mb: 3 }}>
              {showLogin ? 'Login to Your Account' : 'Create New Account'}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={handleAuthSubmit}>
              {!showLogin && (
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              )}
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, py: 1.5, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                {showLogin ? 'Login' : 'Register'}
              </Button>
            </form>

            <Button
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                setShowLogin(!showLogin);
                setError('');
                setSuccess('');
              }}
            >
              {showLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  // Main Blog Dashboard
  return (
    <div>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>📝 BlogSphere Dashboard</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Person />
            <Typography>{user?.username}</Typography>
            <Button color="inherit" startIcon={<Logout />} onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#667eea' }}>
            {editingId ? '✏️ Edit Post' : '➕ Create New Post'}
          </Typography>
          <TextField label="Title" name="title" value={newPost.title} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField label="Author" name="author" value={newPost.author} onChange={handleInputChange} fullWidth margin="normal" placeholder={user?.username} />
          <TextField label="Content" name="content" value={newPost.content} onChange={handleInputChange} fullWidth multiline rows={4} margin="normal" />
          <Button variant="contained" startIcon={<Add />} onClick={handlePostSubmit} sx={{ mt: 2 }}>
            {editingId ? 'Update' : 'Add Post'}
          </Button>
          {editingId && (
            <Button variant="outlined" onClick={() => { setEditingId(null); setNewPost({ title: '', content: '', author: '' }); }} sx={{ mt: 2, ml: 2 }}>
              Cancel
            </Button>
          )}
        </Card>

        <Typography variant="h5" sx={{ mb: 2 }}>📚 My Blog Posts ({posts.length})</Typography>
        {posts.length === 0 ? (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 5 }}>
            No posts yet. Create your first post above! 🎉
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {posts.map(post => (
              <Grid key={post._id} item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{post.title}</Typography>
                    <Typography color="primary" variant="subtitle2">By {post.author}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {post.content.substring(0, 100)}...
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      {formatDate(post.createdAt)}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button size="small" onClick={() => handleEdit(post)}>Edit</Button>
                      <Button size="small" color="error" startIcon={<Delete />} onClick={() => handleDelete(post._id)}>Delete</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}

export default App;