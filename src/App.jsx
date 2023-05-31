// import { Route, Routes } from 'react-router-dom';
// import Home from './Pages/Home';
import { useEffect } from 'react';
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

const App = () => {
  const nav = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(!res?.accessToken)
        nav('/')
      
    })
  }, [])

  const location = useLocation();

  const showNavBar = location.pathname !== "/signup"&& location.pathname !== "/";

  
  return (
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
  )
}

export default App
