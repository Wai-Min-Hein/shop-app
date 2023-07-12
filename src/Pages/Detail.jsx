
import {  useParams } from "react-router-dom";
import DetailComponent from "./DetailComponent";
import { StateContext } from "../Context/Context";
import { useContext } from "react";
import Loading from "../Components/Loading";

const Detail = () => {
  const {
    allProductToRender,loading
    
  } = useContext(StateContext);
  
  const { id } = useParams();
  const product = allProductToRender?.filter((item) => item?.id == id)[0];



 
  return (
    <div className="container mx-auto">

      {
        product? (
      <DetailComponent product={product}/>

        ): (
          <Loading/>
        )
      }


      
    </div>
  );
};

export default Detail;
