// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import { useNavigate } from 'react-router-dom'; // Используйте useNavigate для реализации навигации

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Хук для навигации

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });
      console.log('Вход выполнен:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
// В блоке try/catch измените строки с вызовом alert

} catch (error) {
    if (error.response) {
      // Ошибка от сервера, сервер вернул ответ со статусом ошибки
      alert(`Ошибка входа: ${error.response.data}`);
    } else if (error.request) {
      // Запрос был сделан, но ответ не был получен
      alert('Ошибка входа: Нет ответа от сервера');
    } else {
      // Что-то пошло не так при настройке запроса
      alert(`Ошибка входа: ${error.message}`);
    }
  }
  
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  // ...ваш предыдущий импорт и начало функции...

  return (
    <div className='App'>
      <header className="App-header">
        <img src={"https://www.svgrepo.com/show/395898/blue-book.svg"} className="App-logo" alt="logo" />
        <p>BlueBook</p>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-container">
            <label htmlFor="email"></label>
            <input
              className="App-input"
              id="email"
              type='email' // используйте type='text' для логина, если он не является электронной почтой
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Nickname" // Плейсхолдер в поле ввода
            />
          </div>
          <div className="input-container">
            <label htmlFor="password"></label>
            <input
              className="App-input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password" // Плейсхолдер в поле ввода
            />
          </div>
          <button type="submit" className="App-login-button">Log in</button>
        </form>
      </header>
    </div>
  );
  
  // ...ваш экспорт компонента...
  
}

export default Login;
