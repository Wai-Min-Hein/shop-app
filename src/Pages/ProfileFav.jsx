import { Link, useNavigate } from "react-router-dom";

import {AiOutlineHeart} from "react-icons/ai"
import { useContext } from "react";
import { StateContext } from "../Context/Context";
import { deleteFavProduct } from "../Api/FireStoreApi";
import Swal from "sweetalert2";

const ProfileFav = ({favProduct}) => {

    const { setFavProducts, favProducts} = useContext(StateContext)


    const nav = useNavigate()
    const id = favProduct?.id.slice(favProduct?.userId.length+1)




    const productId = favProduct?.id.substring(favProduct?.userId.length+1)
    const rating = Math.round(favProduct?.rating);

  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }

  const HandleFavDel= () => {
    const favProductsAfterDel = favProducts?.filter(favProduct=> 

    favProduct?.id.substring(favProduct?.userId.length+1)!= id
    )

    const delProduct = favProducts?.filter(favProduct=> 

        favProduct?.id.substring(favProduct?.userId.length+1)== id
        )

        deleteFavProduct(delProduct[0]?.id)
    

    setFavProducts(favProductsAfterDel)

  }

  const swalWithButtons = Swal.mixin({
    customClass: {
        confirmButton: "bg-btn text-white px-3 py-2 rounded-md text-xl ml-3 mx-3",
        cancelButton: "bg-red-500 text-white px-3 py-2 rounded-md text-xl",
    },
    buttonsStyling: false
  })

  
  const favDel = () => {
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
            HandleFavDel()
            

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
    <div className="bg-bg-second lg:px-6 px-2 py-4 shadow-lg rounded-md text-center mx-auto w-[300px]  animate__animated animate__bounce">
      <img src={favProduct?.thumbnail} className="h-[120px] mx-auto mb-2" alt="" />

      <h4>{favProduct?.title?.substring(0, 20)}...</h4>
      <p className=" font-para text-[17px] text-para inline-block w-10/12 my-3">
        {favProduct?.description?.substring(0, 35)}...
      </p>

      <div className="flex justify-between items-center">
        <p className="text-btn">{stars}</p>
        <p className="text-btn">${favProduct?.price}</p>
      </div>

      <div className="flex justify-between  items-center">
        
        <Link to={`/detail/${productId}`}>
          <button className="bg-btn px-3 py-2  mt-5   text-lg font-para font-[500] text-icon rounded-md">
            Detail
          </button>
        </Link>
          <button className="bg-red-500 px-3 py-2  mt-5   text-lg font-para font-[500] text-white rounded-md" onClick={favDel}>
            Remove
          </button>
          </div>
        
    </div>
  )
}

export default ProfileFav
