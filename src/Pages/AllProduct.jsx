import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { StateContext } from "../Context/Context";
import AllProductComponent from "../Components/AllProductComponent";
import { getAllComment } from "../Api/FireStoreApi";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Loading from "../Components/Loading";

const AllProduct = () => {
  const { allProductToRender, search,loading } = useContext(StateContext);

//   const ref = useRef()

//   const { scrollY } = useScroll()

//   const [topVal, setTopVal] = useState(0)


//   const btnVariant = {
//     open: {top: `${(topVal+400)}px`, transition:{duration:1.5}},
//     closed: {top: 0, transition:{duration:1.5}}
//   }

// useMotionValueEvent(scrollY, "change", (latest) => {
//   setTopVal(latest)
// })




// useEffect(() => {
//   const handleClick = (e) => {
//     const x= e.pageX
//     const y = e.pageY
//     console.log(x)
//     btn.style.transform = `translate(${x*0.05}px, ${y*0.05}px)`
//   };

//   const divElement = document.getElementById('myDiv');
//   const btn = document.querySelector('.btn');

//   if (divElement) {
//     divElement.addEventListener('mouseover', (e) => handleClick(e));
//   }

//   return () => {
//     if (divElement) {
//       divElement.removeEventListener('mouseover', handleClick);
//     }
//   };
// }, []);







  const filterItems = search
    ? allProductToRender?.filter(
        (product) =>
          product?.title.toLowerCase().includes(search) ||
          product?.description.toLowerCase().includes(search)
      )
    : [];

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(filterItems);
  }, [search]);

  const [allComment, setAllComment] = useState([]);

  useMemo(() => {
    getAllComment(setAllComment);
  }, []);

  const filterComment = allComment?.filter((comment) => comment.seen == false);


  return (
   <>
   {loading? (<Loading/>): (
     <div  id="myDiv" className="container mx-auto relative">
    

<div className=" flex flex-wrap gap-5 justify-start items-stretch mt-10">

     {/* {
      allProductToRender?.map(product => (
        <AllProductComponent key={product?.id} product={product} filterComment={filterComment}/>
      ))
     } */}
     {search==="" ? (
       allProductToRender?.map(product => (
        <AllProductComponent key={product?.id} product={product} filterComment={filterComment}/>
      ))
     ): (
        items?.length<=0? (
          <h1 className="text-head text-3xl font-para mt-24">
           No Products found
         </h1>
        ): (
          items?.map(product => (
            <AllProductComponent key={product?.id} product={product} filterComment={filterComment}/>
          ))

        )
     )}
     </div>

    
   </div>
   )}
   </>
  );
};

export default AllProduct;
