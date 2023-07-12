import { useContext } from 'react'
import NotiComponent from '../Components/NotiComponent';
import { StateContext } from '../Context/Context';
import Loading from '../Components/Loading';

const Noti = () => {

const {allNoti,loading} = useContext(StateContext)




  
  return (
    <>
    
    {
      loading? (<Loading/>): (
        <div className='md:container md:mx-auto my-10'>
      <h1 className='font-header font-bold text-xl'>Notifications</h1> 


    <div className="mt-5">
      {
        allNoti?.map((noti,i) => <NotiComponent key={i} noti={noti}/>)
      }

</div>

    </div>
      )
    }
    </>
  )
}

export default Noti
