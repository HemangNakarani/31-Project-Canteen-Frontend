import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './Context/UserContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(

  <UserProvider>
       <App />
  </UserProvider>
   ,
  document.getElementById('root')
);

reportWebVitals();