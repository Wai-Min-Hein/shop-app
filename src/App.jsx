// import { Route, Routes } from 'react-router-dom';
// import Home from './Pages/Home';
import { useContext, useEffect, useState } from 'react';
import '../Css/output.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.Config';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Home from '../src/Pages/Home'
import AllProduct from './Pages/AllProduct';
import Detail from './Pages/Detail';
import NavBar from './Pages/NavBar';
import Noti from './Pages/Noti';
import { getCurrentUser } from './Api/FireStoreApi';
import { StateContext } from './Context/Context';
import Loading from './Components/Loading';

const App = () => {
  const nav = useNavigate()
const {currentUser,userId} = useContext(StateContext)
console.log(userId)
const [loading, setLoading] = useState(false)
useEffect(() => {
  if( userId) setLoading(false)
  else{setLoading(true)}
}, [userId])



  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(!res?.accessToken)
        nav('/')
    })

  }, [])
 


  const location = useLocation();

  const showNavBar = location.pathname !== "/signup"&& location.pathname !== "/";

  
  return (
      <>
      {loading? (
        <Loading/>
      ): (
        <div className=''>
        {showNavBar&& <NavBar/>}
       
       <Routes>
 
         <Route path='/' element={<Login/>}/>
         {/* <Route path='signup' element={<SignUp/>}/> */}
 
         <Route path='*' element={<ErrorPage/>}/>
         <Route path='/allproduct' element={<AllProduct/>}/>
         <Route path='/home' element={<Home/>}/>
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/detail/:id' element={<Detail/>}/>
         <Route path='/notification' element={<Noti/>}/>
       </Routes>
     </div>
      )}
      </>
  )
}

export default App
