// import Swiper core and required modules
import  { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.min.css";

// import { FiArrowLeft } from "react-icons/fi";
// import { FiArrowRight } from "react-icons/fi";
// import { RxDot } from "react-icons/rx";

import laptpo from "../../img/laptop.png";
import laptpo2 from "../../img/laptop2.png";
import phone from "../../img/phone.png";
import cloth from "../../img/shirt.png";
import shoe from "../../img/shoe.png";
import { useNavigate } from "react-router-dom";




const LandingPage = () => {
  const nav = useNavigate()
  const menu = [laptpo2, phone, cloth, shoe]
const renderBullet = (index, className) => 
  {


    return `
    
    
    <img class="${className}" src="${menu[index]}" alt="" />
    
    
    `;
  }

  return (
    <div className="container mx-auto mt-10 relative pb-28">







      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay,EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: ".go-next",
          prevEl: ".go-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: renderBullet
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
       
    
      >
        <SwiperSlide key={1}>
          <div className=" flex md:justify-between md:items-center gap-5 md:gap-0 flex-col-reverse md:flex-row  mt-12 px-16 home-slide rounded-lg">
            
            <div className="px-2 basis-[100%] md:basis-[60%] animate__animated animate__backInLeft">
              <h4 className="font-head font-[600]  text-xl text-header">
                Upgrade Your Productivity with Our High-Performance Laptop
              </h4>
              <p className="font-para font-[400] w-full md:w-10/12 text-lg text-para tracking-[1px] leading-7 my-5">
                Upgrade your tech game with our selection of top-performing
                laptops. Shop now for the latest models and take advantage of
                our competitive prices.
              </p>
              <button onClick={() => nav('/detail/k4Yj0u5G9M5oRjd3qlOR')} className="bg-btn px-3 py-2 rounded-md text-btn-text text-lg">
                Checkout
              </button>
            </div>
            <div className="basis-[100%] md:basis-[40%] text-left animate__animated animate__backInRight">
              <img
                src={laptpo}
                className=" rounded-md w-[80%] mx-auto"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key={2}>
          <div className=" flex md:justify-between md:items-center gap-5 flex-col-reverse md:flex-row  mt-12 px-16 rounded-lg">
            <div className="px-2 basis-[100%] md:basis-[60%] animate__animated animate__backInLeft">
              <h4 className="font-head font-[600] text-xl text-header">
                Upgrade to the Ultimate Phone Experience Today!
              </h4>
              <p className="font-para font-[400] w-full md:w-10/12 text-lg text-para tracking-[1px] leading-7 my-5">
                Get the ultimate phone experience with our powerful device.
                Enjoy stunning visuals and lightning-fast performance Upgrade to
                the best phone today!
              </p>
              <button className="bg-btn px-3 py-2 rounded-md text-btn-text text-lg">
                Checkout
              </button>
            </div>
            <div className=" basis-[100%] md:basis-[40%] text-left animate__animated animate__backInRight">
              <img src={phone} className="h-[25rem] mx-auto" alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key={3}>
          <div className=" flex md:justify-between md:items-center gap-5 flex-col-reverse md:flex-row  mt-12 px-16 rounded-lg">
            <div className="px-2 basis-[100%] md:basis-[60%] animate__animated animate__backInLeft">
              <h4 className="font-head font-[600] text-xl text-header">
                Revamp Your Style with Our Premium Fabrics
              </h4>
              <p className="font-para font-[400] w-full md:w-10/12 text-lg text-para tracking-[1px] leading-7 my-5">
                Upgrade your wardrobe with our premium quality fabrics.
                Comfortable, stylish, and affordable clothing options available.
                Shop now!
              </p>
              <button className="bg-btn px-3 py-2 rounded-md text-btn-text text-lg">
                Checkout
              </button>
            </div>
            <div className=" basis-[100%] md:basis-[40%] text-left animate__animated animate__backInRight">
              <img src={cloth} className=" h-[25rem] rounded-md" alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide key={4}>
          <div className=" flex md:justify-between md:items-center gap-5 flex-col-reverse md:flex-row  mt-12 px-16 rounded-lg">
            <div className="px-2 basis-[100%] md:basis-[60%] animate__animated animate__backInLeft">
              <h4 className="font-head font-[600] text-xl text-header">
                Step Up Your Style and Comfort with Premium Shoes
              </h4>
              <p className="font-para font-[400] w-full md:w-10/12 text-lg text-para tracking-[1px] leading-7 my-5">
                Elevate your style and comfort with our premium shoes. Crafted
                with the finest materials, our shoes provide the perfect blend
                of functionality and fashion.
              </p>
              <button className="bg-btn px-3 py-2 rounded-md text-btn-text text-lg">
                Checkout
              </button>
            </div>
            <div className=" basis-[100%] md:basis-[40%] text-left animate__animated animate__backInRight">
              <img
                src={shoe}
                className="w-full object-contain h-[25rem] rounded-lg"
                alt=""
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* <div className="slider-btn">
        <div className="go-prev bg-btn p-2 cursor-pointer text-para mx-3 active:scale-75 duration-200 rounded-full text-xl absolute left-0 top-[50%] z-10">
          <FiArrowLeft />
        </div>
        <div className="go-next bg-btn p-2 text-para mx-3  active:scale-75 duration-200 rounded-full text-xl absolute right-0 top-[50%] z-10">
          <FiArrowRight />
        </div>
      </div> */}

      <div className="swiper-pagination ">
      </div>
    </div>
  );
};

export default LandingPage;
