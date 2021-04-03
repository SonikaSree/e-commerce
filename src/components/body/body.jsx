import { useState } from "react";
import "./body.css"
import logoN from "../../assets/logo.jpeg";
import logo from "../../assets/shopping-online.jpg";
import Cart from "../cart/cart";
import Products from "../products/products";
import WishList from "../wishlist/wishlist";
import Home from "../home/home";

export default function Body() {
  const [page, setPage] = useState("Home");
  const changePage = (currentPage) => {
    setPage(currentPage);
  };
  return (
    <div className="App">
      <div className="app-header">
      <header className="header flex">
        <img src={logo} className="logoImg"></img>
        <span>
        <nav>
          <ul>
            <button onClick={() => changePage("Cart")}><i class="fal fa-shopping-cart fa-3x"></i> </button>
            <button onClick={() => changePage("WishList")}> <i class="fal fa-heart fa-3x"></i> </button>
          </ul>
        </nav> 
        </span> 
      </header>
      <nav className="navigator flex">
        <ul>
          <button className="font-custom" onClick={() => changePage("Home")}>Home</button>
          <button className="font-custom" onClick={() => changePage("Products")}> Products </button>
        </ul>
      </nav>
      </div>
      
      
      {page === "Cart" ? <Cart/> : page ==="Products" ? 
      <Products/> : page ==="WishList" ? <WishList/> : <Home/>} 
      
    </div>
  );
}