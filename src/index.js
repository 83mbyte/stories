import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './redux/storeGenerate';
import { Provider } from "react-redux";
import ScrollToTop from "../src/components/common/ScrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>  {/* create Context */}
      <ScrollToTop />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
