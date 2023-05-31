import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../Api/AuthApi";
import "../../Css/output.css";
import { toast } from "react-toastify";
import { getUniqueID } from "../Common/UuId/UniqueId";
import { postUserData } from "../Api/FireStoreApi";
import { AnimatePresence, motion } from "framer-motion";
// import GoogleButton from "react-google-button";

const LoginComponent = () => {
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({});

  const login = async () => {
    try {
      let res = await loginApi(credentials.email, credentials.password);
      toast.success("Signed In to your account!");
      localStorage.setItem("userEmail", res.user.email);
      nav("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };


  const register = async () => {
    try {
      let res = await registerApi(credentials?.email, credentials?.password);
      const obj = {
        name: credentials?.name,
        email: credentials?.email,
        userId: getUniqueID(),
      };
      postUserData(obj);

      nav("/home");
      localStorage.setItem("userEmail", res.user.email);
      toast.success("Account Created successfully");
    } catch (err) {
      toast.error("Can't create your account.Please try again.");

      return err;
    }
  };

  const ref = useRef();

  const showPassword = () => {
    const pass = document.getElementById("pass");

    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  };

  const showPassword1 = () => {
    const pass = document.getElementById("password");

    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  };


  const [loginActive , setLoginActive] = useState(true)
  const [signUpActive , setSignUpActive] = useState(false)


  const variant = {
    open: { x: 0, opacity: 1,display:"block", transition: { duration: 0.4 } },
    closed: { x: -100,display:"none", opacity: 0, transition: { duration: 0.4 } },
  };
  const variant1 = {
    open: { x: 0, opacity: 1,display:"block", transition: { duration: 0.4 } },
    closed: { x: 100,display:"none", opacity: 0, transition: { duration: 0.4 } },
  };


  return (
    <div className="container mx-auto z-20 relative grid place-items-center h-screen">
      <div className="bg-[rgba(255,255,255,0.1)] shadow-lg rounded-md px-4 py-6 relative overflow-hidden">
      {/* lg:w-[40vw] xl:w-[30vw] w-[75vw] md:w-[50vw] h-[28rem] */}
        <div className="absolute top-0 left-0 w-full flex justify-start">
          <button onClick={() => (setLoginActive(true), setSignUpActive(false))} className={`w-full py-3 ${loginActive? "border-b-2  border-primary": ""}`}>Login</button>
          <button onClick={() => (setLoginActive(false), setSignUpActive(true))} className={`w-full py-3 ${signUpActive? "border-b-2 border-primary": ""}`}>Sign Up</button>
        </div>

        <div className="">

          <AnimatePresence>

        <motion.div
        // key={1}
        initial={{ x: -100, opacity: 0 }}
        animate={loginActive ? "open" : "closed"}

        variants={variant}
        className={`flex items-center justify-start flex-col px-12 py-14 ${loginActive? "": ""}`}>
          <form action="" className="w-full mx-auto mt-5">
            <div className="mb-5">
              <h1 className="text-header text-3xl font-para font-[700] mb-3">
                Login In
              </h1>
              <p>Stay updated on your professional world</p>
            </div>
            <div className="">
              <input
                className="focus:outline-none bg-[rgba(255,255,255,0.1)] border-none rounded-full shadow-md px-4 py-2  border-2 w-full font-para text-[rgba(0,0,0.9)]"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                type="email"
                placeholder="Email or Phone"
              />
            </div>
            <div className="mt-5 flex justify-between bg-[rgba(255,255,255,0.1)] shadow-md rounded-full items-center  border-none px-4 py-2  w-full">
              <input
                ref={ref}
                id="pass"
                className="focus:outline-none bg-transparent"
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                type="password"
                placeholder="Password"
              />
              <span
                className="cursor-pointer select-none"
                onClick={() => showPassword()}
              >
                show
              </span>
            </div>

            <div className="mt-5 grid">
              <button
                type="submit"
                onClick={(e) => (e.preventDefault(), login())}
                className=" bg-primary px-3 py-2 rounded-md text-white text-lg"
              >
                sign in
              </button>
            </div>
            <hr />
            {/* <GoogleButton
            className="!font-para !rounded-md mt-5 !w-full"
            // onClick={GoogleSignIn}
          /> */}
            {/* <p className="mt-5">
              New to Linkined?{" "}
              <span
                className="text-[#0a66c2] cursor-pointer select-none"
                onClick={() => nav("/signup")}
              >
                join now
              </span>{" "}
            </p> */}
          </form>
        </motion.div>
        </AnimatePresence>

        <AnimatePresence>
        
          <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={signUpActive ? "open" : "closed"}

        variants={variant1}
          className={`flex items-center justify-start flex-col px-12 py-14 ${signUpActive? "": ""}`}>
            <form action="" className="mx-auto w-full mt-5">
              <h1 className="text-xl font-para">
                Make the most of your professional life
              </h1>

              <div className="">
                <label htmlFor="name" className="">
                  Your Name
                </label>
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, name: e.target.value })
                  }
                  type="text"
                  id="name"
                  autoFocus
                  className="  bg-[rgba(255,255,255,0.1)] border-none rounded-full shadow-md focus:outline-none px-4 py-2 border-2 w-full"
                />
              </div>
              <div className="">
                <label htmlFor="email" className="">
                  Email or Phone
                </label>
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  type="email"
                  id="email"
                  className="   bg-[rgba(255,255,255,0.1)] border-none rounded-full shadow-md focus:outline-none px-4 py-2  w-full"
                />
              </div>
              <div className="">
                <label htmlFor="password">Password</label>
                <div className="  bg-[rgba(255,255,255,0.1)] border-none rounded-full shadow-md focus:outline-none px-4 py-2 flex justify-between  w-full">
                  <input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    type="passward"
                    id="password"
                    className="flex-1 focus:outline-none bg-transparent "
                  />
                  <span
                    className="cursor-pointer select-none"
                    onClick={() => showPassword1()}
                  >
                    show
                  </span>
                </div>
              </div>
              <button
                className="bg-primary text-white rounded-xl text-center font-para w-full py-3 mt-3"
                onClick={(e) => {
                  e.preventDefault(), register();
                }}
              >
                Agree & Join
              </button>
              {/* <p>
                Already on linkined?{" "}
                <span
                  className="text-primary cursor-pointer "
                  onClick={() => nav("/")}
                >
                  sign in
                </span>{" "}
              </p> */}
            </form>
          </motion.div>
        </AnimatePresence>


          </div>
      </div>
    </div>
  );
};

export default LoginComponent;
