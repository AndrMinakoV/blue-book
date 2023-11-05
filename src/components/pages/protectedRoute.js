// ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem('token'); // Проверяем наличие токена

  if (!isAuth) {
    // Если пользователь не аутентифицирован, показываем сообщение
    return <p>NoAccess</p>;
  }

  return children; // Если аутентифицирован, рендерим дочерние компоненты
};

export default ProtectedRoute;
