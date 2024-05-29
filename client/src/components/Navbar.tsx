import { NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import NavLinks from "./Navlink";
import { IoMdMenu } from "react-icons/io";
import { Dialog } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);

  const toggleMobileMenu = () => {
    setMobile(!mobile);
  };

  return (
    <header className="flex justify-between items-center p-4 fixed w-full bg-white shadow-lg z-50">
      <Link to={"/forum"}>
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt=""
            className="w-[50px] h-[50px] rounded-full ml-4 md:ml-32"
          />
          <h1 className="text-custom-color3 font-semibold text-3xl">
            Edu<span className="text-custom-color4">Connect</span>
          </h1>
        </div>
      </Link>
      <div>
        <div className="hidden md:flex mr-8">
          <ul className="flex mt-2 gap-8">
            <NavLinks closeMobileMenu={toggleMobileMenu} />
          </ul>
        </div>

        <div className="mr-4 md:hidden flex justify-center">
          <button onClick={() => setMobile(true)}>
            <IoMdMenu className="text-2xl" />
          </button>
        </div>
      </div>

      <Dialog className={"md:hidden"} open={mobile} onClose={setMobile}>
        <div className="fixed top-0 right-0 z-50 overflow-y-auto bg-white px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-text/10 w-full max-w-screen max-h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt=""
                className="w-[50px] h-[50px] rounded-full ml-4 md:ml-32"
              />
              <h1 className="text-custom-color3 font-semibold text-3xl">
                Edu<span className="text-custom-color4">Connect</span>
              </h1>
            </div>
            <button
              className="mr-4 inline-flex items-center justify-center rounded-md hover:bg-custom-color transition duration-100"
              onClick={() => setMobile(false)}
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          <div className="-my-2 divide-y">
            <ul className="pt-8 ml-4 space-y-4 mb-4">
              <NavLinks closeMobileMenu={toggleMobileMenu} />
            </ul>
          </div>
        </div>
      </Dialog>
    </header>
  );
};

export default Navbar;
