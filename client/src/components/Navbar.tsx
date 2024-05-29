import { NavLink } from "react-router-dom";
import logo from "../assets/logo2.png";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const menus = [
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="flex justify-between p-4 fixed w-full bg-white shadow-lg z-50">
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
        className="md:hidden text-xl text-custom-color3 focus:outline-none z-50"
        onClick={toggleNav}
      >
        <FaBars />
      </button>

      {/* Navigation links */}
      <div className={`md:hidden absolute right-0 top-full bg-white shadow-md p-4 ${isNavOpen ? 'block' : 'hidden'}`} style={{ width: "100%" }}>
        {menus?.map((menu: any, index: number) => (
          <NavLink
            key={index}
            to={menu.path}
            className="block text-xl text-black hover:text-custom-color3 my-4"
          >
            {menu.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
