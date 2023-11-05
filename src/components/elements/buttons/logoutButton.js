import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Удалить токен из localStorage или из другого хранилища
    localStorage.removeItem('token');

    // Перенаправить пользователя на страницу входа
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Exit</button>
  );
}

export default LogoutButton;
