import React from "react";
import { useLocation } from "react-router-dom";
import Signin from "../../Components/Register/Signin";
import Signup from "../../Components/Register/Singup";
import "./Auth.css";
import image from "../../images/phone.png";


const Auth = () => {
  const location = useLocation();
  return (
    <div>
      <div class="flex items-center justify-center h-[100vh]">
        <div className="relative mr-10 hidden lg:block">
        <div className=" h-[39.0rem] w-[27rem]">
        <img
              className="h-full w-full"
              src={image}
              alt="Instagram Homepage"
            />
            <div className="mobileWallpaper rounded-3xl absolute top-6 h-[33.7rem] w-[15.2rem] w- right-12"></div>
          </div>
        </div>

        <div className="form md:w-[35vw] lg:w-[22vw]">
          {location.pathname === "/login" ? <Signin /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
