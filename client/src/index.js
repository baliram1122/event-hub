import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Provider } from 'react-redux';
import store from './store';
import { AuthContextProvider } from './context/AuthContext';
import { EventContextProvider } from './context/EventContext';


ReactDOM.render(
  <div>
    <EventContextProvider>
      <AuthContextProvider>
        <Provider store={store} >
          <App />
        </Provider>
      </AuthContextProvider>
    </EventContextProvider>
  </div>,
  document.getElementById('root')
);
