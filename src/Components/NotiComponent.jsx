import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { getCurrentUser, updateNoti } from "../Api/FireStoreApi";
import { StateContext } from "../Context/Context";

const NotiComponent = ({ noti }) => {
  const [currentUser, setCurrentUser] = useState({});
  const email = localStorage.getItem("userEmail");

  const userId = currentUser?.userId;

  const notiId = noti?.id;

  const [hasSeenUserForNoti, setHasSeenUserForNoti] = useState([
    ...noti?.hasSeenUser,
  ]);


  const checkUserIdExisted = hasSeenUserForNoti.includes(userId); 

  const notiSectionRef = useRef(null);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  if (hasBeenSeen) {
    if (!checkUserIdExisted) {
      setHasSeenUserForNoti([...hasSeenUserForNoti, userId]);
    }
  }

  const notiToUpdate = { ...noti, hasSeenUser: hasSeenUserForNoti };

useEffect(() => {
     updateNoti(notiId, notiToUpdate);

} , [hasBeenSeen])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHasBeenSeen(true);


          observer.unobserve(entry.target);
        }
      });
    });

    if (notiSectionRef.current) {
      observer.observe(notiSectionRef.current);
    }

    return () => {
      if (notiSectionRef.current) {
        observer.unobserve(notiSectionRef.current);
      }
    };
  }, []);

  useMemo(() => {
    getCurrentUser(setCurrentUser, email);
  }, []);

  return (
    <div
      ref={notiSectionRef}
      className=" bg-gray-300 px-5 py-6  rounded-md w-full md:w-[80%] mt-5"
    >
      <div className="flex flex-col md:flex-row items-start md:justify-start md:items-center gap-4">
        <img src={noti?.profileUrl} className="w-10 h-10 rounded-full" alt="" />

        <div className="">
          <p className="text-[1rem] md:text-lg font-para font-light">
            {`Dear user, we added " ${noti?.notiStatus} " product on our website. So you can enjoy our new product.`}{" "}
            <br /> Thank you for using our website.{" "}
          </p>
        </div>
      </div>
      <div className="text-end">
        <span className="">{noti.timeStamp}</span>
      </div>
    </div>
  );
};

export default NotiComponent;
