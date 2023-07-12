
import { SwiperSlide, Swiper } from "swiper/react";
import { A11y, Navigation,Pagination, Scrollbar } from "swiper";
import { useState } from "react";
const DetailProduct = ({slideImages,product}) => {
    
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / (height*1.5);
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setZoom(1.5);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setZoom(1);
  };
  
  const renderBullet = (index, className) => {
    return `
    <span class="${className}">

    <img  src="${slideImages[index]}" alt="" />
    </span>
    `;
  };
  return (
    <div className="basis-[40%] w-[20rem] h-full lg:sticky lg:top-0">
        
          
          {slideImages ? (
            <div className="relative">
            <Swiper
              modules={[Scrollbar, A11y, Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{
                el: ".swiper-pagination-img",
                clickable: true,
                renderBullet: renderBullet,
              }}
            >
              {slideImages?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div
                   className="overflow-hidden border border-gray w-[18rem] h-[18rem] md:w-[20rem] md:h-[20rem] lg:w-[25rem] lg:h-[25rem] grid place-items-center"
                   onMouseMove={handleMouseMove}
                   onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}
                  >

                  <img 
                  style={{
                    transform: `translate(-${position.x*50 }px, -${
                      position.y*50 
                    }px) scale(${zoom})`,
                    transition: "transform 0.1s ease ",
                  }}
                  src={image} className="w-2/3 h-2/3 object-contain" alt="" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination-img flex items-center justify-around"></div>
            </div>
          ) : (
            <div
                   className="overflow-hidden border border-gray w-[18rem] h-[18rem] md:w-[20rem] md:h-[20rem] lg:w-[25rem] lg:h-[25rem] grid place-items-center"
                   onMouseMove={handleMouseMove}
                   onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}
                  >

                  <img 
                  style={{
                    transform: `translate(-${position.x*50 }px, -${
                      position.y*50 
                    }px) scale(${zoom})`,
                    transition: "transform 0.1s ease ",
                  }}
                  src={product?.thumbnail} className="w-2/3 h-2/3 object-contain" alt="" />
                  </div>
          )}
        </div>
  )
}

export default DetailProduct
