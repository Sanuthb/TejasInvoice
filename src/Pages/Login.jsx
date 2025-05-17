import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (name === 'admin@gmail.com' && password === 'admin') {
      // Redirect to home or dashboard
      navigate('/home');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Left Side */}
      <div className="w-1/2 bg-amber-50 flex flex-col justify-center gap-10 p-12">
        <div>
          <Typography variant="h1" className="text-[#1976d2] font-bold">
            Welcome Back!
          </Typography>
          <Typography variant="body1" className="text-[#4d91d4] mt-4">
            Manage your events seamlessly with our platform.
          </Typography>
        </div>

        <div>
          <Typography variant="h3" className=" font-bold">
            Tejas Event Management
          </Typography>
          <Typography variant="caption" className="text-[#ff8343]">
            Powered by Street2Site
          </Typography>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <Box
          component="form"
          className="w-full max-w-md"
          onSubmit={handleLogin}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography variant="h4" className="text-gray-800 font-bold mb-6">
            Login to your account
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              py: 1.5,
              mt: 2,
            }}
          >
            Sign In
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
