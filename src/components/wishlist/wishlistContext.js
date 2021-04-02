import {createContext,useContext,useState,useEffect} from "react";


export const WishListContext = createContext();

export const WishListProvider = ({children})=>{


    const [itemsInWishList,setitemsInWishList] = useState([])
    useEffect(()=>{
        const itemsInWishList = JSON.parse(localStorage.getItem("wishListItems"))
        if(itemsInWishList){
            setitemsInWishList(itemsInWishList)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("wishListItems",JSON.stringify(itemsInWishList))
    },[itemsInWishList])

   

    return (
        <WishListContext.Provider value={{itemsInWishList,setitemsInWishList}}>
            {children}
        </WishListContext.Provider>
    )
}

export const useWishList = ()=>{
    return useContext(WishListContext)
}
