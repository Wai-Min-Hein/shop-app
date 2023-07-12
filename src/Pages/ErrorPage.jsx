import { useContext } from "react"
import { Link } from "react-router-dom"
import { StateContext } from "../Context/Context"
import Loading from "../Components/Loading";


const ErrorPage = () => {
  const {loading} = useContext(StateContext)
  return (
    <>
    {loading? (<Loading/>): (
      <div className='grid place-items-center h-screen'>
      <h1 className="text-2xl text-red-500">Page do not exist</h1>
      <Link to='/home'>Go Home</Link>
      
    </div>
    )}
    </>
  )
}

export default ErrorPage
