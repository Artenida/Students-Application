import logo from "../assets/logo2.png";
import Login from "../pages/Auth/Login";
import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";
import { MediumButton, SmallButton } from "./ButtonComponent";

const Navbar = () => {
    const {isLoggedIn} = useAppSelector(selectUser);

  return (
    <div className="flex justify-between p-4 fixed w-full bg-white shadow-lg z-50">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt=""
          className="w-[50px] h-[50px] rounded-full ml-32"
        />
        <h1 className="text-custom-color3 font-semibold text-3xl">
          Edu<span className="text-custom-color4">Connect</span>
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
