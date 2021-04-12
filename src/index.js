import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CartProvider} from "./components/cart/cartContext";
import {WishListProvider} from "./components/wishlist/wishlistContext";
import {BrowserRouter as Router} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
     <Router>
      <CartProvider>
        <WishListProvider>
         <App />
        </WishListProvider>
      </CartProvider>
     </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
