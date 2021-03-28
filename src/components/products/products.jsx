import React, { useReducer } from "react";
import { dataArray } from "../../thunk";
import {useCart} from "../cart/cartContext";
import "../products/products.css";

export function Products() {

  const {itemsInCart,setItemsInCart} = useCart()
  const wishlist = [];
  const cart = [];

  const addToWishlist = (item) => {
    // if (wishlist.find((i) => i.id === item.id)) {
    //   return dispatchWishlist({
    //     type: "REMOVE_FROM_WISHLIST",
    //     payload: item.id,
    //   });
    // }
    // dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: item });
  };
  const cartHandler=(product)=>{
    if(itemsInCart.length){
      let flag= true
      const newArr= itemsInCart.map((item)=>{
        console.log(item)
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

  const sortedData = getSortedData(dataArray, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll
  });

  return (
    <>
      <fieldset>
        <legend>Sort By</legend>
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
      </fieldset>

      <fieldset style={{ marginTop: "1rem" }}>
        <legend> Filters </legend>
        <label>
          <input
            type="checkbox"
            checked={showInventoryAll}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include Out of Stock
        </label>

        <label>
          <input
            type="checkbox"
            checked={showFastDeliveryOnly}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Fast Delivery Only
        </label>
      </fieldset>

      <div className="card" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredData.map(
          (item) => (
              <div key={item.id} className={"card-box"}>
                <div className={"badge-div"}>
                    <img src={item.image} className={"card-img-lg"} alt={item.productName}/>
                    <i onClick={() => addToWishlist(item)}
                      style={{color:"red"}} className="fa fa-heart fa-2x heart-badge"></i>
                </div>
                <div className={"card-box-container"}>
                    <h3 className={"card-details"}> {item.name} </h3>
                    <div className={"card-details"}>Rs. {item.price}</div>
                    <div className={"card-details"}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                    </div>
                    <div className={"card-details"}>{item.level}</div>
                    {item.fastDelivery ? (
                      <div> Fast Delivery </div>
                    ) : (
                      <div> 3 days minimum </div>
                    )}
                <button
                  onClick={() => cartHandler(item)}
                  className="primary-btn"
                  disabled={!item.inStock}
                >
                  {!item.inStock
                    ? "Out of Stock"
                    : cart.find((i) => i.id === item.id)
                    ? "Add more"
                    : "Add to cart"}
            </button>
                </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
