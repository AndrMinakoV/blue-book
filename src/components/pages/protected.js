// protected.js
import React from 'react';
import LogoutButton from '../elements/buttons/logoutButton';
const Protected = () => {
  return <div className='App'>
        <h1 className='protected-h1'>Это защищённый маршрут!</h1>
    <header className="App-header">
          <LogoutButton/>
          </header>
          </div>;
};

export default Protected;
