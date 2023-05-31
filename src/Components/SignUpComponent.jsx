import { useNavigate } from "react-router-dom";
import { registerApi } from "../Api/AuthApi";
import { useState } from "react";
import "../../Css/output.css";
import { postUserData } from "../Api/FireStoreApi";
import { getUniqueID } from "../Common/UuId/UniqueId";
import { toast } from "react-toastify";

const SignUp = () => {
  const nav = useNavigate();

  const [credentials, setCredentials] = useState({});

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
      return err;
    }
  };

  const showPassword = () => {
    const pass = document.getElementById("pass");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  };
  return (
    <div className="container mx-auto">
      <div className="">
        <div className="flex items-center justify-normal">
          <h1 className="text-xl font-[700] text-primary">Linkined</h1>
          <img className="w-[2rem]" alt="" />
        </div>
        <div className="flex items-center justify-center h-[80vh]">
          <form action="" className="mx-auto w-[50%]">
            <h1 className="text-2xl font-para">
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
                className="  border-[#212121]  rounded-sm px-4 py-2 border-2 w-full"
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
                className="  border-[#212121]  rounded-sm px-4 py-2 border-2 w-full"
              />
            </div>
            <div className="">
              <label htmlFor="password">Password</label>
              <div className=" flex justify-between items-center  border-[#212121]  rounded-sm px-4 py-2 border-2 w-full">
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  type="passward"
                  id="password"
                  className="flex-1 focus:outline-none"
                />
                <span
                  className="cursor-pointer select-none"
                  onClick={() => showPassword()}
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
            <p>
              Already on linkined?{" "}
              <span
                className="text-primary cursor-pointer "
                onClick={() => nav("/")}
              >
                sign in
              </span>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
