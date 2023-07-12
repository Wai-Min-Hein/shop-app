import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase.Config";


export const registerApi =async (email, password) => {
    try{
        const response = createUserWithEmailAndPassword(auth, email, password)
        
        return response
    }
    catch(error) {
        console.log(error)
        
    }



    

    

   
}

export const loginApi =async (email, password) => {
    try{
        const response = signInWithEmailAndPassword(auth, email, password)
        return response
    }
    catch(error){
        console.log(error)
    }

 
}

export const logOutApi = () => {
  try{
    signOut(auth)
  }
  catch(err){
    return err

  }
}