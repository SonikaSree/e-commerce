import React, { useReducer} from "react";
import { dataArray } from "../../thunk";
import {useCart} from "../cart/cartContext";
import {useWishList} from "../wishlist/wishlistContext";
import "../products/products.css";

export default function Products() {
  const {itemsInCart,setItemsInCart} = useCart();
  const {itemsInWishList,setitemsInWishList} = useWishList();


  const addToWishlist = (product) => {
    if (itemsInWishList.length){
      let flag= true
      const newArr= itemsInWishList.map((item)=>{
        if(item.id === product.id){
          flag = false
          if (item.wishlisted){
            const newItem = {...item,wishlisted:false}
            return newItem
          }else{
            const newItem = {...item,wishlisted:true}
            return newItem
          } 
        }return item
      })
      if (!flag){
        setitemsInWishList((newArr))
      }
      if(flag){
        setitemsInWishList((itemsInWishList)=> [...itemsInWishList,{...product,wishlisted:true}])
      }
      
    }else{
      setitemsInWishList((itemsInWishList)=> [...itemsInWishList,{...product,wishlisted:true}])
    }
  };

  const cartHandler=(product)=>{
    if(itemsInCart.length){
      let flag= true
      const newArr= itemsInCart.map((item)=>{
        if(item.id === product.id){
          flag = false
          const newItem = {...item,qty:item.qty+1}
          return newItem
        }return item
      })
      if(!flag){
        setItemsInCart((newArr))
      }
      if(flag){
        setItemsInCart((itemsInCart)=> [...itemsInCart,{...product,qty:1}])
      }
    }else{
      setItemsInCart((itemsInCart)=> [...itemsInCart,{...product,qty:1}])
    }
  }

  function filterSortData(state, action) {
    switch (action.type) {
      case "TOGGLE_INVENTORY":
        return (state = {
          ...state,
          showInventoryAll: !state.showInventoryAll
        });

      case "TOGGLE_DELIVERY":
        return (state = {
          ...state,
          showFastDeliveryOnly: !state.showFastDeliveryOnly
        });
      case "SORT":
        return {
          ...state,
          sortBy: action.payload
        };
      default:
        return state;
    }
  }
  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy },
    dispatch
  ] = useReducer(filterSortData,{showInventoryAll: true,showFastDeliveryOnly: false,sortBy: null});
  

  // Sort Function
  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  }

  // Filter Products
  function getFilteredData(
    productList,
    { showFastDeliveryOnly, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  // Wishlist Products

  function getWishListedData(filteredData){
    const wishListedData = filteredData.map((item)=>{
      const itemInWishList = itemsInWishList.find((wishListItem) =>{
        if(wishListItem.id === item.id){
          return wishListItem
        }return null
      })
      if (itemInWishList){
        const wishListValue = itemInWishList.wishlisted;
        const newItem = {...item,wishlisted:wishListValue}
        return newItem
      }else{
        const newItem = {...item,wishlisted:false}
        return newItem
      }
    }) 
    return wishListedData

  }

  const sortedData = getSortedData(dataArray, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll
  });
  const wishListedData = getWishListedData(filteredData);

  return (
    <div className="products-body">
    <div className="products-sidebar">
      <div className="product-sort">
        <h3>Sort</h3>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
            }
            checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
          ></input>{" "}
          Price - High to Low
        </label>
        <br></br>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
            }
            checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
          ></input>{" "}
          Price - Low to High
        </label>
      </div>
      <br></br>
      <div className="product-filter">
      <h3>Filter</h3>
      <label>
          <input
            type="checkbox"
            checked={showInventoryAll}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include Out of Stock
        </label>
        <br></br>
        <label>
          <input
            type="checkbox"
            checked={showFastDeliveryOnly}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Fast Delivery Only
        </label>
      </div>
    </div>
    <div className="card" style={{ display: "flex", flexWrap: "wrap" }}>
        {wishListedData.map(
          (item) => (
              <div key={item.id} className={"card-box"}>
                <div className={"badge-div"}>
                    <img src={item.image} className={"card-img-lg"} alt={item.productName}/>
                    <i onClick={() => addToWishlist(item)}
                      style={{color: item.wishlisted && item.wishlisted ? "red" :"white"}} className="fa fa-heart fa-2x fa-border-outer heart-badge"></i>
                </div>
                <div className={"card-box-container"}>
                    <h3 className={"card-details"}> {item.name} </h3>
                    <div className={"card-details"}>Rs. {item.price}</div>
                    <div className={"card-details"}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                    <div className={"card-details"}>{item.level}</div>
                    <div className={"card-details"}>
                    {item.fastDelivery ? (
                      <div> Fast Delivery </div>
                    ) : (
                      <div> 3 days minimum </div>
                    )}
                    </div>
                </div>
                <button
                  onClick={() => cartHandler(item)}
                  className="primary-btn"
                  disabled={!item.inStock}
                >
                  {!item.inStock
                    ? "Out of Stock"
                    : itemsInCart.find((i) => i.id === item.id)
                    ? "Add more"
                    : "Add to cart"}
            </button>
                
            </div>
          )
        )}
      </div>
    </div>
      
  );
}
