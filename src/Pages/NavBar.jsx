import { AiOutlineSearch } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";

import { FaUserCircle } from "react-icons/fa";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOutApi } from "../Api/AuthApi";

import "../../Css/output.css";
import { getAllNoti, getCurrentUser } from "../Api/FireStoreApi";
import { StateContext } from "../Context/Context";
import { motion } from "framer-motion";
const NavBar = ({ profileUrl }) => {
  const nav = useNavigate();
  const { search, setSearch } = useContext(StateContext);

  //

  const searchHandler = (e) => {
    setSearch(e.target.value);
    nav("/allproduct");
  };

  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(!modal);
  };

  const signOut = () => {
    logOutApi();
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(false);

  const activeHandler = () => {
    setActive(!active);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [currentUser, setCurrentUser] = useState({});
  const email = localStorage.getItem("userEmail");
  const currentProfileUrl = currentUser?.profileUrl;

  const [allNoti, setAllNoti] = useState([]);

  const currentUserId = currentUser?.userId;

  useMemo(() => {
    getCurrentUser(setCurrentUser, email);
    getAllNoti(setAllNoti);
  }, []);

  const hasSeen = allNoti?.filter(
    (noti) => !noti?.hasSeenUser.includes(currentUserId)
  );

  const inputRef = useRef();

  const screenWidth = window.innerWidth < 768;

  const inputVariant = {
    open: screenWidth
      ? { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.1 } }
      : { y: 0, opacity: 0, transition: { duration: 0.4, delay: 0.1 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay: 0.9 } },
  };

  const variant = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.2 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay: 0.8 } },
  };

  const variant2 = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay: 0.7 } },
  };

  const variant3 = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.4 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay: 0.6 } },
  };

  const variant4 = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.5 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay: 0.5 } },
  };

  const variant5 = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.6 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay: 0.4 } },
  };

  const variant6 = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.7 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay: 0.3 } },
  };

  const variant7 = {
    open: { y: 0, opacity: 1, transition: { duration: 0.4, delay: 0.8 } },
    closed: { y: 100, opacity: 0, transition: { duration: 0.4, delay: 0.2 } },
  };

  const navVariant = {
    open: { opacity: 1, scale: 50, transition: { duration: 1.2 } },
    closed: { opacity: 0, scale: 0, transition: { duration: 0.6, delay: 0.9 } },
  };

  const logoVariant = {
    open: { zIndex: 0, transition: { duration: 0 } },
    closed: { zIndex: 1000, transition: { duration: 0, delay: 0.9 } },
  };

  const btnVariant = {
    open: {
      backgroundColor: "rgba(79, 196, 207, 0)",
      transition: { duration: 0.4 },
    },
    closed: {
      backgroundColor: "#4fc4cf",
      transition: { duration: 0.3, delay: 1.3 },
    },
  };

  const ulVariant = {
    open: active
      ? { display: "flex", transition: { duration: 0.1 } }
      : { display: "none", transition: { duration: 0.1 } },
    closed: { display: "none", transition: { duration: 0.3, delay: 1.4 } },
  };

  const divVariant = {
    open: active
      ? { display: "block", transition: { duration: 0.3 } }
      : { display: "none", transition: { duration: 0.3 } },
    closed: { display: "none", transition: { duration: 0.3, delay: 1.4 } },
  };

  return (
    <nav className="bg-bg flex items-center justify-between gap-5 z-50  rounded-xl md:px-8 py-3 px-5 sticky top-0 shadow-xl container mx-auto">
      <div className="flex items-center justify-between gap-5">
        <motion.h1
          initial={{ zIndex: 1000 }}
          animate={active ? "open" : "closed"}
          variants={logoVariant}
          className={`font-header font-semibold text-lg cursor-pointer  `}
          onClick={() => nav("/home")}
        >
          Shopio
        </motion.h1>

        <div className="">
          <motion.div
            initial={{ display: "none" }}
            animate={active ? "open" : "closed"}
            variants={divVariant}
            className={`fixed top-0 left-0 lg:w-[20vw] md:w-[30vw] h-screen overflow-hidden  `}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? "open" : "closed"}
              variants={navVariant}
              className={` bg-gray-300 absolute right-[10%] top-0  w-10 h-10 rounded-full inline-block z-10`}
            ></motion.div>
          </motion.div>
          <motion.button
            initial={{ backgroundColor: "#4fc4cf" }}
            animate={active ? "open" : "closed"}
            variants={btnVariant}
            onClick={activeHandler}
            className={`self-end relative  w-[2.5rem] h-[2.5rem] z-50 rounded-full ${
              active ? "nav-active bg-transparent" : ""
            }`}
          >
            <span className={`nav-btn z-50 ${active ? "  " : ""}`}></span>
          </motion.button>

          <motion.div
            initial={{ display: "none" }}
            animate={active ? "open" : "closed"}
            variants={divVariant}
            className={`fixed top-0 left-0 lg:w-[20vw] md:w-[30vw] z-40 h-screen  ${
              active ? "" : "tohidden"
            }`}
          >
            <motion.ul
              initial={{ display: "none" }}
              animate={active ? "open" : "closed"}
              variants={ulVariant}
              className={`flex justify-center duration-300 z-[999] h-full text-btn-text font-[500] text-lg mx-5 font-para items-stretch flex-col ${
                active ? "" : "hidden"
              }`}
            >
              <motion.li
                ref={inputRef}
                initial={{ y: 100, opacity: 0 }}
                animate={active ? "open" : "closed"}
                variants={inputVariant}
                className={`bg-bg shadow-lg flex mx-auto w-full justify-between py-1 px-4 items-center rounded-full mb-4 opacity-[1]   md:opacity-0  ${
                  active ? "inline-block  " : ""
                }`}
              >
                <input
                  autoFocus
                  value={search}
                  onChange={searchHandler}
                  type="text"
                  placeholder="Search products here..."
                  className="focus:outline-none bg-transparent flex-1 font-para"
                />
              </motion.li>
              <Link to={"/allproduct"}>
                <motion.li
                  initial={{ y: 100, opacity: 0 }}
                  animate={active ? "open" : "closed"}
                  variants={variant}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2, delay: 0 },
                  }}
                  exit={{ y: 100 }}
                  onClick={activeHandler}
                  className="px-3 py-2 rounded-md bg-btn"
                >
                  All Product
                </motion.li>
              </Link>

              <Link to={"/"}>
                <motion.li
                  initial={{ y: 100, opacity: 0 }}
                  animate={active ? "open" : "closed"}
                  variants={variant2}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1, delay: 0 },
                  }}
                  onClick={() => (scrollTop(), activeHandler())}
                  className="my-3 px-3 py-2 rounded-md bg-btn"
                >
                  Home
                </motion.li>
              </Link>

              <Link to={"/"}>
                <motion.li
                  initial={{ y: 100, opacity: 0 }}
                  animate={active ? "open" : "closed"}
                  variants={variant3}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1, delay: 0 },
                  }}
                  onClick={() => activeHandler()}
                  className="px-3 py-2 rounded-md bg-btn"
                >
                  Popular Products
                </motion.li>
              </Link>

              <Link to={"/"}>
                <motion.li
                  initial={{ y: 100, opacity: 0 }}
                  animate={active ? "open" : "closed"}
                  variants={variant4}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1, delay: 0 },
                  }}
                  onClick={() => activeHandler()}
                  className="my-3 px-3 py-2 rounded-md bg-btn"
                >
                  Featured Products
                </motion.li>
              </Link>

              <Link to={"/"}>
                <motion.li
                  initial={{ y: 100, opacity: 0 }}
                  animate={active ? "open" : "closed"}
                  variants={variant5}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1, delay: 0 },
                  }}
                  onClick={() => activeHandler()}
                  className="px-3 py-2 rounded-md bg-btn"
                >
                  Deal Products
                </motion.li>
              </Link>

              <Link to={"/"}>
                <motion.li
                  initial={{ y: 100, opacity: 0 }}
                  animate={active ? "open" : "closed"}
                  variants={variant6}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1, delay: 0 },
                  }}
                  onClick={() => activeHandler()}
                  className="my-3 px-3 py-2 rounded-md bg-btn"
                >
                  New Products
                </motion.li>
              </Link>

              <Link to={"/"}>
                <motion.li
                  initial={{ y: 100, opacity: 0 }}
                  animate={active ? "open" : "closed"}
                  variants={variant7}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1, delay: 0 },
                  }}
                  onClick={() => activeHandler()}
                  className="px-3 py-2 rounded-md bg-btn"
                >
                  Footer
                </motion.li>
              </Link>
            </motion.ul>
          </motion.div>
        </div>
      </div>

      <div className="bg-bg shadow-lg md:flex mx-auto lg:w-[40rem] xl:w-[45rem]  md:w-[22rem] justify-between py-2 px-4 items-center rounded-full hidden">
        <input
          value={search}
          onChange={searchHandler}
          autoFocus
          type="text"
          placeholder="Search products here..."
          className="focus:outline-none bg-transparent  mx-5 font-para w-full"
        />
        <AiOutlineSearch className="text-xl" />
      </div>

      <span
        className=" bg-slate-300 p-2 relative rounded-full cursor-pointer"
        onClick={() => nav("/notification")}
      >
        <IoIosNotifications className="text-3xl" />

        {hasSeen.length >0 && (<span className="absolute text-white bg-red-500 w-5 h-5 text-center rounded-full top-[-3px] right-0 inline-block">{hasSeen.length}</span>)}
      </span>

      <div className="">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={showModal}
        >
          <div className="">
            {!currentProfileUrl ? (
              <FaUserCircle className="text-4xl cursor-pointer" />
            ) : (
              <img
                src={currentProfileUrl}
                alt=""
                className="rounded-full w-[2.5rem] h-[2.5rem]"
              />
            )}
          </div>
          <h4 className="text-lg font-para pl-2">{currentUser?.name}</h4>
        </div>
        <div
          className={`bg-bg shadow-lg  absolute  mt-5 right-0 px-6 py-4 rounded-lg flex justify-stretch flex-col ${
            !modal ? "hidden" : ""
          }`}
        >
          <h6 className="text-lg font-header mb-2">{currentUser?.name}</h6>
          <button
            className="border-nav border-2 px-4 py-1 rounded-full block font-header text-para tracking-wider text-md"
            onClick={() => (nav("/profile"), showModal())}
          >
            View Profile
          </button>
          <button
            className="border-nav border-2 px-4 py-1 rounded-full block mt-3 font-header text-para tracking-wider text-md"
            onClick={signOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

{
  /* <div
        className={`flex flex-col mr-auto    ${
          active
            ? "bg-gray-300 lg:w-[20vw] w-[50vw] md:w-[40vw] h-screen fixed top-0 left-0 rounded-sm"
            : "bg-btn p-5 rounded-full cursor-pointer select-none"
        }`}
        onClick={!active ? activeHandler : console.log("")}
      >
        <button
          onClick={activeHandler}
          className={`self-end relative ${
            active ? "nav-active px-10 py-10" : ""
          }`}
        >
          <span className={`nav-btn z-20 ${active ? "  " : ""}`}></span>
        </button>

        {active ? (
          <ul className="flex justify-center h-full text-btn-text font-[500] text-lg mx-5 font-para items-stretch flex-col">
            <li className="bg-bg shadow-lg flex mx-auto w-full justify-between py-1 px-4 items-center rounded-full mb-4 md:hidden">
              <input
                autoFocus
                value={search}
                onChange={searchHandler}
                type="text"
                placeholder="Search products here..."
                className="focus:outline-none bg-transparent flex-1 font-para"
              />
            </li>
            <Link to={"/allproduct"}>
              <li
                onClick={activeHandler}
                className="px-3 py-2 rounded-md bg-btn hover:scale-90 duration-150 active:translate-y-[-5px]"
              >
                All Product
              </li>
            </Link>

            <Link to={"/"}>
              <li
                onClick={() => (scrollTop(), activeHandler())}
                className="my-3 px-3 py-2 rounded-md bg-btn hover:scale-90 duration-150 active:translate-y-[-5px]"
              >
                Home
              </li>
            </Link>

            <Link to={"/"}>
              <li
                onClick={() => activeHandler()}
                className="px-3 py-2 rounded-md bg-btn hover:scale-90 duration-150 active:translate-y-[-5px]"
              >
                Popular Products
              </li>
            </Link>

            <Link to={"/"}>
              <li
                onClick={() => activeHandler()}
                className="my-3 px-3 py-2 rounded-md bg-btn hover:scale-90 duration-150 active:translate-y-[-5px]"
              >
                Featured Products
              </li>
            </Link>

            <Link to={"/"}>
              <li
                onClick={() => activeHandler()}
                className="px-3 py-2 rounded-md bg-btn hover:scale-90 duration-150 active:translate-y-[-5px]"
              >
                Deal Products
              </li>
            </Link>

            <Link to={"/"}>
              <li
                onClick={() => activeHandler()}
                className="my-3 px-3 py-2 rounded-md bg-btn hover:scale-90 duration-150 active:translate-y-[-5px]"
              >
                New Products
              </li>
            </Link>

            <Link to={"/"}>
              <li
                onClick={() => activeHandler()}
                className="px-3 py-2 rounded-md bg-btn hover:scale-90 duration-150 active:translate-y-[-5px]"
              >
                Footer
              </li>
            </Link>
          </ul>
        ) : (
          ""
        )}


      </div>   */
}
