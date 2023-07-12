import LoginComponent from "../Components/LoginComponent"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.Config';
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import { StateContext } from "../Context/Context";
const Login = () => {
  const nav = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(res?.accessToken)
        nav("/home")})
  }, [])
  const {loading} = useContext(StateContext)
  return (
    <>
    {loading? (<Loading/>): (
      <div className="bg-background w-screen h-screen relative">


     
      
      <LoginComponent/>
    </div>
    )}
    </>
  )
}

export default Login
