import React from 'react';
import { Link } from 'react-router-dom';

const NoAccess = () => {
  return (
    <div>
      <p>У вас нет доступа.</p>
      <Link to="/login">Перейти на страницу входа</Link>
    </div>
  );
};

export default NoAccess;
