import { useContext } from "react";
import LandingPage from "./LandingPage";
import { StateContext } from "../Context/Context";
import Loading from "../Components/Loading";

const Home = () => {

  const {loading} = useContext(StateContext)
  
  
  return (
    <>
    {loading? (<Loading/>): (
      <div className=" ">
      <div className="container mx-auto">

        <div className="">
          <LandingPage />

        
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default Home;
