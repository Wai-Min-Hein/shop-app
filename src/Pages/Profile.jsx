import { useContext, useMemo, useRef, useState } from "react";
import {
  getAllUserData,
  getCurrentUser,
  postAddProduct,
  postAllProduct,
  postNotiData,
  postUserData,
  updateUserData,
} from "../Api/FireStoreApi";

import NavBar from "./NavBar";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.Config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { getUniqueID } from "../Common/UuId/UniqueId";
import { uploadImage, uploadProfileImage, uploadRelatedImage } from "../Api/ImageUploadApi";
import { StateContext } from "../Context/Context";
import ProfileFav from "./ProfileFav";
import { SwiperSlide, Swiper } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from "swiper";

import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProfileCart from "./ProfileCart";
import moment from "moment";

const Profile = () => {
  const { favProducts, cartProducts } = useContext(StateContext);

  const totalPrice = cartProducts?.reduce((pv, cv) => pv + cv?.totalPrice, 0);

  const [progresspercent, setProgressPercent] = useState(0);

  const [profileUrl, setProfileUrl] = useState("");
  const [relatedImages, setRelatedImages] = useState([])

  const [fileExisted, SetFileExisted] = useState(null);
  const [relatedFileExisted, setRelatedFileExisted] = useState(null);
  const [relatedLinkExisted, setRelatedLinkExisted] = useState(null);

  const [imageLinkExisted, setImageLinkExisted] = useState(null);

  const checkFile = (file) => {
    SetFileExisted(file);
  };
  const checkRelatedFile = (file) => {
    setRelatedFileExisted(file)
  };

  const checkImageLink = (event) => {
    setImageLinkExisted(event.target.value);
  };

  const [urlImage, setUrlImage] = useState("");

  const nav = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) nav("/");
    });
  }, []);
  const [currentUser, setCurrentUser] = useState({});

  const email = localStorage.getItem("userEmail");

  const ifAdmin = currentUser?.email == "waiminhein@gmail.com" ? true : false;

  const adminName = currentUser?.name + " (Admin)";
  const userName = currentUser?.name + " (User)";

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

  const [alluser, setAllUser] = useState([]);


  useMemo(() => {
    getCurrentUser(setCurrentUser, email);
    getAllUserData(setAllUser);

  }, []);

  // const[favProducts, setFavProducts] = useState([])
  // const userId = currentUser?.id

  // useEffect(() => {
  //   userId&& getAllFavProductByUser(setFavProducts,userId )

  // }, [currentUser])

  const docId = currentUser?.id;
  const updateData = { ...currentUser, profileUrl };

  useEffect(() => {
    profileUrl && currentUser && updateUserData(docId, updateData);
  }, [currentUser, profileUrl]);

  const [addProduct, setAddProduct] = useState({});
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setAddProduct({ ...addProduct, ...input });
  };

  const [addProductItemData, setAddProductItemData] = useState({});
  console.log(addProductItemData)

  useEffect(() => {
    let addProductItem = urlImage && {
      id: getUniqueID(),
      ...addProduct,
      thumbnail: urlImage,
      relatedImages
    };
    setAddProductItemData(addProductItem);
  }, [urlImage,relatedImages]);

  const addProductItem = () => {
    // postAddProduct(addProductItemData);
    postAllProduct(addProductItemData);

    handleCancel();
  };


  const fileRef = useRef();

  const editProfile = () => {
    fileRef.current.click();
  };

  const getTime = () => moment().format("llll");


  const [noti, setNoti] = useState({})

const adminData = alluser?.filter(user => user?.email == 'waiminhein@gmail.com')[0]

  const getNotiStatus = (event) => {
    let notiStatus = event.target.value
    let data = {
      notiStatus,
      timeStamp: getTime(),
      hasSeenUser: [],
      ...adminData

    }

    setNoti(data)
  }

  const addNotiStatus = () => postNotiData(noti)
  const [inputRelatedImages, setInputRelatedImages] = useState(false)
  const [relatedImagesCount, setRelatedImagesCount] = useState(0)
  const btnDisable = inputRelatedImages ? (relatedImages.length>=relatedImagesCount? false: true) : false
 


const handleUploadRelatedImage = (event) => {
  event.target.files ? setInputRelatedImages(true):setInputRelatedImages(false)
  checkRelatedFile(event.target.files)
  setRelatedImagesCount(event.target.files.length)
  uploadRelatedImage(
         event.target.files,
      setRelatedImages,
      setProgressPercent
    )


}
  return (
    <div className="md:container md:mx-auto px-6 md:px-0">
      {/* <NavBar profileUrl={profileUrl} /> */}

      <div className="bg-bg-cart px-10 py-8 shadow rounded-md mt-8 w-full lg:w-[75%] mx-auto grid place-items-center">
      <div className="mb-5">
            <img src={currentUser?.profileUrl} className="block w-[7rem] h-[7rem] md:w-[10rem] md:h-[10rem] rounded-full  border-[5px] border-gray-50" alt="" />
          </div>
        <h1 className="">{ifAdmin ? adminName : userName}</h1>
        <div className="flex flex-col items-center">
          
          {ifAdmin && (
            <button
              form="addProductForm"
              type="submit"
              onClick={showModal}
              className="xl:w-[30rem]  lg:w-[25rem] md:w-[20rem] sm:w-[15rem] w-[12rem] bg-bg-second px-3 py-2 rounded-full  mt-4 !hover:text-para"
            >
              Add New Product
            </button>
          )}

          <button
            onClick={editProfile}
            className="xl:w-[30rem] lg:w-[25rem] md:w-[20rem] sm:w-[15rem] w-[12rem] bg-bg-second px-3 py-2 rounded-full  mt-4 !hover:text-para"
          >
            Edit Profile Image
          </button>
          <input
            ref={fileRef}
            type="file"
            onChange={(event) =>
              uploadProfileImage(
                event.target.files[0],
                setProfileUrl,
                setProgressPercent
              )
              // , checkFile(event.target.files[0])
            }
            className="hidden"
          />

          <Modal
            title="Add New Product"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <button
                type="submit"
                key="submit"
                onClick={() => (addProductItem(), addNotiStatus(), nav('/allproduct'))}
                className={`bg-btn px-4 py-1 rounded-md ${btnDisable? 'opacity-60': ''}`}
                disabled={btnDisable}
              >
                {btnDisable? <span>Loading ...</span>: <span>Add</span>}
                
              </button>,
            ]}
          >
              <form action="" id="addProductForm" className="my-8">
                <input
                  type="text"
                  name="title"
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="Title"
                  required
                  onChange={(event) => (getInput(event), getNotiStatus(event))}
                  autoFocus
                />

                <textarea
                  name="description"
                  onChange={(event) => getInput(event)}
                  // value={addProduct?.description}
                  placeholder="Description"
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  id=""
                  cols="30"
                  rows="5"
                  required
                ></textarea>

                <input
                  name="price"
                  onChange={(event) => getInput(event)}
                  // value={addProduct?.price}

                  type="number"
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
                  onChange={(event) => getInput(event)}
                /> */}

                <input
                  type="text"
                  name="brand"
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="Brand"
                  required
                  onChange={(event) => getInput(event)}
                />
                <input
                  type="text"
                  name="category"
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="Category"
                  required
                  onChange={(event) => getInput(event)}
                />
                <input
                  type="number"
                  name="rating"
                  className="w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none "
                  placeholder="Rating"
                  required
                  onChange={(event) => getInput(event)}
                />

                <input
                  type="text"
                  name="thumbnail"
                  className={
                    !fileExisted
                      ? `w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none`
                      : `hidden`
                  }
                  placeholder="Image Link"
                  onChange={(event) => (
                    checkImageLink(event), setUrlImage(event.target.value)
                  )}
                  required
                />

                <p className="block mt-3 text-center">Or</p>

                <input
                  type="file"
                  onChange={(event) => (
                    uploadImage(
                      event.target.files[0],
                      setUrlImage,
                      setProgressPercent
                    ),
                    checkFile(event.target.files[0])
                  )}
                  className={
                    !imageLinkExisted
                      ? `form-input mt-3 block w-full rounded-md bg-gray-300 border-transparent  focus:bg-white focus:ring-0`
                      : `hidden`
                  }
                />
                <h6 className="mt-4">Related Images</h6>
                <input
                onChange={handleUploadRelatedImage}
                className={`${relatedLinkExisted? 'hidden': ''}`}
                
                type="file" multiple name="" id="" />
                <input type="text" placeholder="Related Images" 
                onChange={(event) => (setRelatedImages(event.target.value.split(', '), setRelatedLinkExisted(event.target.value)))}
                  className={`w-full px-4 py-2 mt-3 border border-bg-second focus:outline-none ${relatedFileExisted? 'hidden': ''}`}
                  name="" id="" />
              </form>
          </Modal>
        </div>
      </div>

      <div className={ifAdmin ? "hidden" : ""}>
        <div className="lg:px-2 xl:px-28 md:px-15 px-5 text-head text-xl font-head font-[500] mt-10">
          <div className="flex justify-between items-center">
            <h1 className="text-head text-2xl font-head font-[700]">
              Your Favorite Products
            </h1>

            <div className={favProducts.length > 0 ? "flex gap-3" : "hidden"}>
              <div className="product-prev bg-btn p-2 text-para rounded-full hover:translate-y-[-4px] active:translate-y-[-1px] duration-200 cursor-pointer">
                <FiArrowLeft />
              </div>
              <div className="product-next bg-btn p-2 text-para rounded-full text-lg hover:translate-y-[-4px] active:translate-y-[-1px] duration-200 cursor-pointer">
                <FiArrowRight />
              </div>
            </div>
          </div>

          {favProducts?.length > 0 ? (
            <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-6 justify-center items-center mt-16 pb-6">
              <Swiper
                // cssMode={true}
                navigation={{
                  prevEl: ".product-prev",
                  nextEl: ".product-next",
                }}
                // pagination={true}
                // mousewheel={true}
                keyboard={true}
                spaceBetween={50}
                slidesPerView={favProducts.length > 2 ? 3 : favProducts.length}
                // scrollbar={{ draggable: true }}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
                // breakpoints={{
                //   // when window width is >= 640px
                //   640: {
                //     slidesPerView: 1,
                //   },
                //   // when window width is >= 768px
                //   768: {
                //     slidesPerView: 2,
                //   },
                //   1024: {
                //     slidesPerView: 3,
                //   },
                // }}
              >
                {favProducts?.map((favProduct) => (
                  <SwiperSlide className="pb-5" key={favProduct.id}>
                    <ProfileFav favProduct={favProduct} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <h1 className="mt-5">You have no favorite Product</h1>
          )}
        </div>

        <div className="lg:px-2 xl:px-28 md:px-15 px-5 text-head text-xl font-head font-[500] my-10">
          <div className="flex justify-between items-center">
            <h1 className="text-head text-2xl font-head font-[700]">
              Your Carts
            </h1>

            <div className={cartProducts.length > 3 ? "flex gap-3" : "hidden"}>
              <div className="product-prev bg-btn p-2 text-para rounded-full hover:translate-y-[-4px] active:translate-y-[-1px] duration-200 cursor-pointer">
                <FiArrowLeft />
              </div>
              <div className="product-next bg-btn p-2 text-para rounded-full text-lg hover:translate-y-[-4px] active:translate-y-[-1px] duration-200 cursor-pointer">
                <FiArrowRight />
              </div>
            </div>
          </div>
          {cartProducts?.length > 0 ? (
            <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-6 justify-center items-center mt-16 pb-6">
              <Swiper
                // cssMode={true}
                navigation={{
                  prevEl: ".product-prev",
                  nextEl: ".product-next",
                }}
                // pagination={true}
                // mousewheel={true}
                keyboard={true}
                spaceBetween={50}
                slidesPerView={
                  cartProducts.length > 2 ? 3 : cartProducts.length
                }
                // scrollbar={{ draggable: true }}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="mySwiper"
                // breakpoints={{
                //   // when window width is >= 640px
                //   640: {
                //     slidesPerView: 1,
                //   },
                //   // when window width is >= 768px
                //   768: {
                //     slidesPerView: 2,
                //   },
                //   1024: {
                //     slidesPerView: 3,
                //   },
                // }}
              >
                {cartProducts?.map((cartProduct) => (
                  <SwiperSlide className="pb-5" key={cartProduct.id}>
                    <ProfileCart
                      cartProduct={cartProduct}
                      totalPrice={totalPrice}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <h1 className="mt-5">You have no cart</h1>
          )}
          <div className="text-end ">
            <h1>Total Price for all Your Products : $ {totalPrice}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
