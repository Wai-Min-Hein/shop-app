import { useContext, useEffect, useMemo, useRef, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { StateContext } from "../Context/Context";
import {
  allCartDel,
  allFavDel,
  deleteCartProduct,
  deleteFavProduct,
  deletePost,
  favProduct,
  getAllCommentByPost,
  getAllUserData,
  getCartProductByUser,
  getCurrentUser,
  postComment,
  updateAllProduct,
} from "../Api/FireStoreApi";

// import { AiOutlineComment } from "react-icons/ai";
import moment from "moment/moment";
import Comment from "./Comment";
import Swal from "sweetalert2";
import { Modal } from "antd";

const DetailComponent = ({product}) => {
  
 

    const { id } = useParams();


  
  const {
    allProductToRender,
    favProducts,
    cartProducts,
    cartHandleForQuantity,
  } = useContext(StateContext);
  const [img, setImg] = useState(null);

  const [productForQuantity, setProductForQuantity] = useState({});

  const ApiProductQuantity = productForQuantity[0]?.quantity;

  const totalPrice = productForQuantity[0]?.totalPrice;

  const [cartQuantity, setCartQuantity] = useState(null);
  const [alluser, setAllUser] = useState([]);

  const [reply, setReply] = useState("");

  // let productToAdd = {
  //   ...product,
  //   quantity: ApiProductQuantity&&cartQuantity,
  //   totalPrice: product?.price * (ApiProductQuantity&&cartQuantity),
  // }

  const nav = useNavigate();

  const increaseQuantity = () => setCartQuantity((qty) => qty + 1);

  const decreaseQuantity = () => setCartQuantity((qty) => qty - 1);

  const [currentUser, setCurrentUser] = useState({});
  const email = localStorage.getItem("userEmail");

  const commentRef = useRef();
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);


  const addCommentHandler = (event) => {
    const inputComment = event.target.value;
    inputComment.length > 0 && setReply("");
    // const realComment =reply.length > 0 ? `${reply} , ${inputComment}` : inputComment;

    setComment(inputComment);
  };

 

  const rating = Math.round(product?.rating);

  const ifAdmin = currentUser?.email == "waiminhein@gmail.com" ? true : false;

  useMemo(() => {
    getCurrentUser(setCurrentUser, email);
    getAllCommentByPost(setAllComment, id);
    getAllUserData(setAllUser);
  }, []);

  useMemo(() => {
    const des = product && product?.description;

    des && getCartProductByUser(setProductForQuantity, des);
  }, [product]);

  useEffect(() => {
    const des = product && product?.description;

    des && getCartProductByUser(setProductForQuantity, des);
  }, [cartQuantity, product]);

  useMemo(() => {
    setCartQuantity(ApiProductQuantity);
  }, [ApiProductQuantity]);

  const getTime = () => moment().format("llll");

  const commentAddFunction = () => {
    const addComment = {
      postId: id,
      comment,
      ...currentUser,
      time: getTime(),
      seen:false
    };
    postComment(addComment);
    commentRef.current.value = "";
    setComment('')



  };

  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }



  
  const handleAllFavDel = () => {
    const delProduct = allProductToRender?.filter(
      (product) => product?.id == id
    )[0];

    const favProductIds = favProducts?.filter(
      (fav) => fav?.thumbnail == delProduct?.thumbnail
    )[0];

    const productId = favProductIds?.id;

    favProductIds&& allFavDel(productId);
  };

  const handleAllCartDel = () => {
    const delProduct = allProductToRender?.filter(
      (product) => product?.id == id
    )[0];

    const cartProductIds = cartProducts?.filter(
      (cart) => cart?.thumbnail == delProduct?.thumbnail
    )[0];

    const productId = cartProductIds?.id;

    cartProductIds&& allCartDel(productId);




  };


 const [updateTitle, setUpdateTitle] = useState(product?.title)
 const [updateDescription, setUpdateDescription] = useState(product?.description)
 const [updatePrice, setUpdatePrice] = useState(product?.price)
 const [updateBrand, setUpdateBrand] = useState(product?.brand)
 const [updateCategory, setUpdateCategory] = useState(product?.category)
 const [updateRating, setUpdateRating] = useState(product?.rating)

 const [updateData, setUpdateData] = useState({...product, title: updateTitle, description: updateDescription, price: updatePrice, brand: updateBrand,category: updateCategory, rating: updateRating })

 useEffect(() =>{
    setUpdateData({...product, title: updateTitle, description: updateDescription, price: updatePrice, brand: updateBrand,category: updateCategory, rating: updateRating })
 }, [updateTitle, updateDescription, updatePrice, updateBrand, updateCategory, updateRating])


 const productId = product?.id
const updateProduct = () => {
    updateAllProduct(productId, updateData)
}





  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handleEditProduct = () => {
    const editProduct = allProductToRender?.filter(
      (product) => product?.id == id
    )[0];

  }
  









  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-btn text-white px-3 py-2 rounded-md text-xl ml-3 mx-3",
      cancelButton: "bg-red-500 text-white px-3 py-2 rounded-md text-xl",
    },
    buttonsStyling: false,
  });

  const delPost = () => {
    swalWithButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePost(id, nav)
          handleAllFavDel()
          handleAllCartDel()

          swalWithButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };




  return (
    <div className="container mx-auto">

      <div className="mt-16 mb-8 lg:flex justify-between items-start mx-auto px-5 md:px-0">
        <div className=" basis-40% flex flex-col items-baseline justify-between mb-8 lg:mb-0">
          {product?.images ? (
            <img
              src={img ? img : product?.images[0]}
              className="h-[20rem] max-w-[15rem] md:max-w-[18rem] lg:max-w-[25rem] rounded-md"
              alt=""
            />
          ) : (
            <img
              src={product?.thumbnail}
              className="h-[20rem] max-w-[15rem] md:max-w-[18rem] lg:max-w-[25rem] rounded-md"
              alt=""
            />
          )}
          <div className="flex flex-wrap justify-center gap-3 items-center mt-10 object-contain">
            {product?.images?.map((img, i) => (
              <button
                onClick={(e) => setImg(e.target.src)}
                key={i}
                className="w-[3rem] h-[3rem]"
              >
                <img
                  src={img}
                  className="w-full rounded-sm object-contain"
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>

        <div className="font-para self-stretch basis-[50%] mt-20 lg:mt-auto">
          <h5 className=" text-para font-[700] text-2xl capitalize tracking-widest inline-block basis-2/5">
            {product?.title}
          </h5>
          <h2 className="font-[500] text-xl">{product?.brand}</h2>
          <span className="text-btn text-xl">{stars}</span>
          <h2 className="font-[500] text-xl mt-3 mb-1 capitalize">
            {product?.category}
          </h2>
          <p className=" text-lg text-gray-500 capitalize">{product?.description}</p>

          {/* <p className="text-lg text-gray-500">
            You can get this product with {product?.discountPercentage}%
            discount.
          </p> */}
          <div className="mt-auto">
            <p className="text-xl mt-5 font-600] ">
              Price : $ {product?.price}
            </p>

            <p className={ApiProductQuantity? 'text-xl mt-5 font-[500] ': 'hidden'}>
              Quantity : {cartQuantity ? cartQuantity : 1}
            </p>
            <p className={ApiProductQuantity? 'text-xl mt-5 font-[500] ': 'hidden'}>
              Total Price For this Product : ${" "}
              {totalPrice ? totalPrice : product?.price}
            </p>
          </div>

          {!ifAdmin && (
            <div
            className={
              ApiProductQuantity ? "flex justify-start mt-5" : "hidden"
            }
          >
            <button
              className="bg-btn px-3 py-2 rounded-lg text-white mr-5"
              onClick={() => {
                increaseQuantity(ApiProductQuantity),
                  cartHandleForQuantity(
                    id,
                    {
                      ...product,
                      quantity: cartQuantity + 1,
                      totalPrice: product?.price * (cartQuantity + 1),
                    },

                    cartProducts
                  );
              }}
            >
              Increase Quantity
            </button>
            <button
              className="bg-btn px-3 py-2 rounded-lg text-white"
              onClick={() => {
                cartQuantity > 1 &&
                  (decreaseQuantity(ApiProductQuantity),
                  cartHandleForQuantity(
                    id,
                    {
                      ...product,
                      quantity: cartQuantity - 1,
                      totalPrice: product?.price * (cartQuantity - 1),
                    },
                    cartProducts
                  ));
              }}
            >
              Decrease
            </button>
            {/* <button className="flex justify-center items-center ml-5">
              <AiOutlineComment className="text-4xl"/>
              <p className="text-xl">Comments</p> </button> */}
          </div>
          )}

          

          <div className="flex items-stretch justify-start gap-5 mt-3">
            {/* <button
                className={
                  isCarted
                    ? "px-4 py-2  rounded-md text-md font-[500] text-white font-para bg-red-500"
                    : "px-4 py-2  rounded-md text-md font-[500] text-icon font-para bg-btn"
                }
                onClick={() => cartHandle(id, productToAdd)}
              >
                {isCarted ? "Added" : "Add to Cart"}
              </button>

              <button
                className="bg-btn px-3 py-2  rounded-md"
                onClick={() => favHandle(id, product)}
              >
                {isFavorited ? (
                  <AiFillHeart className=" text-xl  text-icon" />
                ) : (
                  <AiOutlineHeart className=" text-xl  text-icon" />
                )}
              </button> */}

            {ifAdmin && (
              <div className="flex items-center justify-start gap-3">

              <button
                className="px-4 py-2 bg-red-500 rounded-md text-md font-[500] text-white font-para"
                onClick={delPost}
              >
                Delete Product
              </button>
              <button
                className="px-4 py-2 bg-btn rounded-md text-md font-[500] text-white font-para"
                onClick={() => (showModal(), handleEditProduct())}
              >
                Edit Product
              </button>
              </div>
            )}
          </div>
          <form className="mt-5">
            <input
              type="text"
              placeholder="Add a comment for this Product"
              className="border border-1 border-btn-text rounded-full px-5 py-2 focus:outline-none w-[50%] inline-block"
              onChange={addCommentHandler}
              ref={commentRef}
              value={comment}
              autoFocus
            />
            <button
              type="submit"
              className="bg-btn px-3 py-2 rounded-lg text-white inline-block ml-5"
              onClick={(e) => {
                e.preventDefault();
                comment.length > 0 && commentAddFunction();
              }}
            >
              Add comment
            </button>
          </form>

          {allComment?.map((comment, i) => (
            <Comment
              key={i}
              comment={comment}
              ifAdmin={ifAdmin}
              currentUser={currentUser}
              getTime={getTime}
              id={id}
              setReply={setReply}
              reply={reply}
              setComment={setComment}

            />
          ))}
        </div>
      </div>

      <Modal
            title="Add New Product"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <button
                type="submit"
                key="submit"
                className="bg-btn px-4 py-1 rounded-md"
                onClick={()=> (updateProduct(), handleOk())}
              >
                Update product
              </button>,
            ]}
          >
              <form action="" id="addProductForm" className="my-8">
                <input
                  type="text"
                  name="title"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="Title"
                  autoFocus
                />

<textarea
                  name="description"
                  
                  // value={addProduct?.description}
                  placeholder="Description"
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  id=""
                  cols="30"
                  rows="5"
                  required
                ></textarea>

                <input
                  name="price"
                  
                  // value={addProduct?.price}

                  type="number"
                  value={updatePrice}
                  onChange={(e) => setUpdatePrice(e.target.value)}
                  placeholder="Price"
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  required
                />
                {/* <input
                  type="number"
                  name="discountPercentage"
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="DiscountPercentage"
                  required
                  
                /> */}

                <input
                  type="text"

                  name="brand"
                  
                  value={updateBrand}
                  onChange={(e) => setUpdateBrand(e.target.value)}
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="Brand"
                  required
                  
                />
                <input
                  type="text"
                  name="category"
                  
                  value={updateCategory}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="Category"
                  required
                  
                />
                <input
                  type="number"
                  name="rating"
                  
                  value={updateRating}
                  onChange={(e) => setUpdateRating(e.target.value)}
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="Rating"
                  required
                  
                />

              </form>
          </Modal>

      
    </div>
  );
};

export default DetailComponent;
