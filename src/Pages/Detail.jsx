
import {  useParams } from "react-router-dom";
import DetailComponent from "./DetailComponent";
import { StateContext } from "../Context/Context";
import { useContext } from "react";

const Detail = () => {
  const {
    allProductToRender,
    
  } = useContext(StateContext);
  
  const { id } = useParams();
  const product = allProductToRender?.filter((item) => item?.id == id)[0];




 
  return (
    <div className="container mx-auto">

      {
        product? (
      <DetailComponent product={product}/>

        ): (
          <div className="">No Product</div>
        )
      }


      
    </div>
  );
};

export default Detail;
