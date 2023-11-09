// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://162.247.152.9:4000/login', {
        username,
        password,
      });
      console.log('Вход выполнен:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      alert(`Ошибка входа: ${error.response ? error.response.data.message : 'Нет ответа от сервера'}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className='App'>
      <header className="App-header">
        <img src={"https://www.svgrepo.com/show/395898/blue-book.svg"} className="App-logo" alt="logo" />
        <p>BlueBook</p>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-container">
            <input
              id="username"
              type='text'
              className="App-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <input
              id="password"
              type="password"
              className="App-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="App-login-button">Log in</button>
        </form>
      </header>
    </div>
  );
}

export default Login;
