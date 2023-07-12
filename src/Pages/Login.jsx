import LoginComponent from "../Components/LoginComponent"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.Config';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const nav = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(res?.accessToken)
        nav("/home")})
  }, [])
  return (
    <div className="bg-background w-screen h-screen relative">


      {/* <div className="color bg-[#f72585] absolute top-0 left-0 w-full h-[15rem] z-[1] blur-[10rem]"></div>
      <div className="color bg-[#ffc300] absolute bottom-0 right-0 w-[50vw] h-[15rem] z-10 blur-[10rem]"></div>
      <div className="color "></div>
      <div className="color bg-[#4cc9f0] absolute bottom-[30%] right-[40%] w-[20vw] h-[15rem] z-10 blur-[10rem]"></div> 
      <div className="color "></div> */}
      
      <LoginComponent/>
    </div>
  )
}

export default Login
