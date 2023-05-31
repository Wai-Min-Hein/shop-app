import { useNavigate } from 'react-router-dom'
import SignUpComponent from '../Components/SignUpComponent'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase.Config'
const SignUp = () => {
  
  const nav = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(res?.accessToken)
       nav('/home')
     
      
    })
  }, [])
  return (
    <div>
      <SignUpComponent/>
       
    </div>
  )
}

export default SignUp
