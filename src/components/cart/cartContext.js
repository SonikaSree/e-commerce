import {createContext,useContext,useState,useEffect} from "react";


export const CartContext = createContext();

export const CartProvider = ({children})=>{


    const [itemsInCart,setItemsInCart] = useState([])
    useEffect(()=>{
        const itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"))
        if(itemsInCart){
            setItemsInCart(itemsInCart)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("itemsInCart",JSON.stringify(itemsInCart))
    },[itemsInCart])

   

    return (
        <CartContext.Provider value={{itemsInCart,setItemsInCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = ()=>{
    return useContext(CartContext)
}
