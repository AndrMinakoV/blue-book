import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Styles from the first file
import './css/main.css'; // Styles from the second file
import './css/navbar.css'; // Styles from the second file
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root') || document.getElementById('app'); // Check both potential root elements
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
