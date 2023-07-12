import { useContext } from "react"
import { deleteCartProduct } from "../Api/FireStoreApi"
import { StateContext } from "../Context/Context"
import Swal from "sweetalert2"
import { Link, useNavigate } from "react-router-dom"

const ProfileCart = ({cartProduct}) => {

  const { cartProducts, setCartProducts} = useContext(StateContext)


  const nav = useNavigate()
  const id = cartProduct?.id.slice(cartProduct?.userId.length+1)



  const productId = cartProduct?.id.substring(cartProduct?.userId.length+1)
  const rating = Math.round(cartProduct?.rating);

let stars = "";
for (let i = 1; i <= 5; i++) {
  if (i <= rating) {
    stars += "★";
  } else {
    stars += "☆";
  }
}



const swalWithButtons = Swal.mixin({
  customClass: {
      confirmButton: "bg-btn text-white px-3 py-2 rounded-md text-xl ml-3 mx-3",
      cancelButton: "bg-red-500 text-white px-3 py-2 rounded-md text-xl",
  },
  buttonsStyling: false
})



const HandleCartDel= () => {
  const favProductsAfterDel = cartProducts?.filter(cartProduct=> 

  cartProduct?.id.substring(cartProduct?.userId.length+1)!= id
  )

  const delProduct = cartProducts?.filter(cartProduct=> 

      cartProduct?.id.substring(cartProduct?.userId.length+1)== id
      )

      deleteCartProduct(delProduct[0]?.id)
  

      setCartProducts(favProductsAfterDel)

}




const cartDel = () => {
  swalWithButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
          HandleCartDel()
          

        swalWithButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
}


return (
  <div className="bg-bg-second lg:px-6 px-2 py-4 shadow-lg rounded-md text-center mx-auto w-[200px] lg:w-[300px]  animate__animated animate__bounce">
    <img src={cartProduct?.thumbnail} className="h-[120px] mx-auto mb-2" alt="" />

    <h4>{cartProduct?.title?.substring(0, 20)}...</h4>
    <p className=" font-para text-[17px] text-para inline-block w-10/12 my-3">
      {cartProduct?.description?.substring(0, 35)}...
    </p>

    <div className="flex justify-between items-center">
      <p className="text-btn">{stars}</p>
      <p className="text-btn">${cartProduct?.price}</p>
    </div>

    <div className="flex justify-between  items-center">
      
      <Link to={`/detail/${productId}`}>
        <button className="bg-btn px-3 py-2  mt-5   text-lg font-para font-[500] text-icon rounded-md">
          Detail
        </button>
      </Link>
        <button className="bg-red-500 px-3 py-2  mt-5   text-lg font-para font-[500] text-white rounded-md" onClick={cartDel}>
          Remove
        </button>
        </div>

        
      
  </div>
)
}

export default ProfileCart
