import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Declare navigate

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://autozone-backend.onrender.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        // Store the token securely (localStorage, cookies, etc.)
        localStorage.setItem('authToken', token);
        // Redirect to a protected route
        window.location.href = 'https://autozone-backend.netlify.app/';
      } else {
        // Handle login error
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h2 className='text-center'>Login</h2>
            </div>
            <div className='card-body'>
              <div className='mb-3 text-center'>
                <img
                  src='https://sabooautozone.com/static/media/logo.e6e45f945dfdd434642e.webp'
                  alt='Logo'
                  className='img-fluid mb-3'
                />
              </div>
              {error && <p className='text-danger'>{error}</p>}
              <form>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Email'
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Password</label>
                  <div className='input-group'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className='form-control'
                      placeholder='Password'
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='button'
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary w-100'
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
