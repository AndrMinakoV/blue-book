// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Убедитесь, что стили подключены правильно

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://162.247.152.9:4000/register', {
        username,
        password,
      });
      console.log('Регистрация успешна:', response.data);
      navigate('/login');
    } catch (error) {
      alert(`Ошибка регистрации: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister();
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
              type="text"
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
          <button type="submit" className="App-login-button">Register</button>
        </form>
      </header>
    </div>
  );
}

export default Register;
