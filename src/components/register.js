import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Используем useNavigate

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Заменяем useHistory на useNavigate

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/register', {
        username,
        email,
        password,
      });
      console.log('Регистрация успешна:', response.data);
      navigate('/login'); // Перенаправляем пользователя на страницу входа
    } catch (error) {
      console.error('Ошибка регистрации:', error.response.data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister();
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Имя пользователя:
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="email">
          Электронная почта:
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          Пароль:
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
