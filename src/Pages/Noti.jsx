import { useContext } from 'react'
import NotiComponent from '../Components/NotiComponent';
import { StateContext } from '../Context/Context';

const Noti = () => {

const {allNoti} = useContext(StateContext)




  
  return (
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

export default Noti
