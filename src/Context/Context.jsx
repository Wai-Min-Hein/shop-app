import { createContext, useEffect, useMemo, useState } from "react";
import { useGetProductsQuery } from "../Api/ProductApi";
import {
  cartProduct,
  cartProductForQauntity,
  favProduct,
  getAllAddedProduct,
  getAllCartProductByUser,
  getAllFavProductByUser,
  getAllNoti,
  getCartProductByUser,
  getCurrentUser,
  getPostAllProduct,
  postAllProduct,
} from "../Api/FireStoreApi";

export const StateContext = createContext();

const StateContextProvider = ({ children }) => {

  const [search, setSearch] = useState("")

  const { data: allProductFetch } = useGetProductsQuery();
  const allProduct = allProductFetch?.products;


  const [allAddedProduct, setAllAddedProduct] = useState([]);
  const [allProductFirebase, setAllProductFirebase] = useState([]);
const[favProducts, setFavProducts] = useState([])

const[cartProducts, setCartProducts] = useState([])



 



  // const allProductToRender = allProduct && allProductFirebase &&  [...allProductFirebase, ...allProduct];
  const allProductToRender =allProductFirebase &&  [...allProductFirebase];


  






  const email = localStorage.getItem("userEmail")
  const[currentUser, setCurrentUser] = useState({})
  // const [admin, setAdmin] = useState([])
  const [allNoti, setAllNoti] = useState([])
 




  useMemo(() => {
    getAllAddedProduct(setAllAddedProduct);
    getPostAllProduct(setAllProductFirebase)
  getCurrentUser(setCurrentUser,email)
  getAllNoti(setAllNoti)




  }, []);


  



const userId = currentUser&& currentUser?.id

const [loading, setLoading] = useState(true)






const favHandle = (productId, product) => {

  favProduct(currentUser?.id, productId,product, cartProducts)

  
}




const cartHandle = (productId, product) => {




  cartProduct(currentUser?.id, productId,  product)

  

  
}
const cartHandleForQuantity = (productId, product, cartProducts) => {




  cartProductForQauntity(currentUser?.id, productId,  product, cartProducts)


  

  
}


// const getProductForQuantity = (setProductForQuantityQuantity,postId ) => {
//    getCartProductByUser(currentUser?.id,setProductForQuantityQuantity,postId)
// }




useEffect(() => {
  userId&& getAllFavProductByUser(setFavProducts,userId ) 
  userId&& getAllCartProductByUser(setCartProducts,userId ) 


}, [currentUser])






  




  const data = {
    currentUser,
    userId,
    allProduct,
    setAllAddedProduct,
    allProductToRender,
    allProductFirebase,
    favProducts,
    setFavProducts,
    favHandle,
    cartHandle,
    cartProducts,
    setCartProducts,
    cartHandleForQuantity,
    setAllProductFirebase,
    search, setSearch,
    allNoti,
    loading, setLoading
    
  };

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

export default StateContextProvider;
