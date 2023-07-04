
import { useContext, useMemo, useState} from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { StateContext } from "../Context/Context";
import { getCurrentUser } from "../Api/FireStoreApi";
const AllProductComponent = ({product, filterCommentByProduct}) => {

  const email = localStorage.getItem("userEmail");


  const [currentUser, setCurrentUser] = useState({});
  const ifAdmin = currentUser?.email == "waiminhein@gmail.com" ? true : false;



useMemo(() => {
  getCurrentUser(setCurrentUser, email);

}, [])
 




  const{  favProducts, favHandle, cartHandle, cartProducts} = useContext(StateContext)
const [cartQuantity, setCartQuantity] = useState(1)
  

  let productToAdd = {...product, quantity:cartQuantity, totalPrice:product?.price * cartQuantity}
    
  const rating = Math.round(product?.rating);

  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }

const isFavorited = favProducts?.find(favProduct => product?.id == favProduct?.id.substring(favProduct?.userId.length+1))
const isCarted = cartProducts?.find(cartProduct => product?.id == cartProduct?.id.substring(cartProduct?.userId.length+1))













  

  return (
    <div className="bg-bg-second px-6 py-4 shadow-lg rounded-md text-center !mx-auto w-[300px] relative">
      {
          ifAdmin&&filterCommentByProduct?.length>0 && (
            <span className=" w-5 h-5 text-gray-200 rounded-full bg-red-600 absolute top-0 right-0 inline-block">{filterCommentByProduct?.length}</span>
          )
      }
      <img
        src={product?.thumbnail}
        className="h-[120px] mx-auto rounded-md mb-2"
        alt=""
      />

      <h4 className="text-lg font-head font-[700]">
        {product?.title?.substring(0, 20)}...
      </h4>
      <p className=" font-para text-[17px] text-para inline-block w-10/12 my-3">
        {product?.description?.substring(0, 35)}...
      </p>

      <div className="flex justify-between items-stretch">
        <p className="text-btn">{stars}</p>
        <p className="text-btn">${product?.price}</p>
      </div>

      {ifAdmin ? (
        <div className="mt-5">
        

        
        <Link to={`/detail/${product?.id}`} state={product}>
        <button className="bg-btn px-3 py-2  text-lg font-para font-[500] w-full text-icon rounded-md ">
          Detail
        </button>
        </Link>
        
      </div>
      ): (
<div className="flex items-stretch justify-between  mt-4">
<button
  
  className={isCarted? "px-4 py-2  rounded-md text-md font-[500] text-white font-para bg-red-500": "px-4 py-2  rounded-md text-md font-[500] text-icon font-para bg-btn"}
  onClick={()=> (cartHandle(product?.id, productToAdd))}

>
  {
    isCarted?"Added": "Add to Cart"
  }
    
  
</button>


<Link to={`/detail/${product?.id}`} state={product}>
<button className="bg-btn px-3 py-2  text-lg font-para font-[500]  text-icon rounded-md">
  Detail
</button>
</Link>
<button
  onClick={()=> (favHandle(product?.id, product))}
  className="bg-btn px-3 py-2  rounded-md"
>
  {
    isFavorited? <AiFillHeart className=" text-xl  text-icon" />: <AiOutlineHeart className=" text-xl  text-icon" />
  }


  
  
</button>
</div>
      )}

      



    </div>
  )
}

export default AllProductComponent
