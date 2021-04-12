import { useState } from "react";
import "./body.css"
import logoN from "../../assets/logo.jpeg";
import logo from "../../assets/shopping-online.jpg";
import Cart from "../cart/cart";
import Products from "../products/products";
import WishList from "../wishlist/wishlist";
import Home from "../home/home";
import { Routes,Route,useNavigate } from 'react-router-dom';


export default function Body() {
  const [page, setPage] = useState("Home");
  let navigate = useNavigate();
  const changePage = (currentPage) => {
    navigate(`/${currentPage}`)
  };
  return (
    <div className="App">
      <div className="app-header">
      <header className="header flex">
        <img src={logo} className="logoImg"></img>
        <span>
        <nav>
          <ul>
            <button onClick={() => changePage("cart")}><i class="fal fa-shopping-cart fa-3x"></i> </button>
            <button onClick={() => changePage("wishlist")}> <i class="fal fa-heart fa-3x"></i> </button>
          </ul>
        </nav> 
        </span> 
      </header>
      <nav className="navigator flex">
        <ul>
          <button className="font-custom" onClick={() => changePage("")}>Home</button>
          <button className="font-custom" onClick={() => changePage("products")}> Products </button>
        </ul>
      </nav>
      </div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
      </Routes>      
    </div>
  );
}