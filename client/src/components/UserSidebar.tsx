import { FaRegUserCircle, FaBars } from "react-icons/fa";
import { SideLinks } from "../components/SideLinks";
import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";
import { useState } from "react";

const UserSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="md:hidden fixed p-4">
        <button
          className="text-2xl text-custom-color3 ml-12 mt-4 xs:ml-16 xs:mt-8 sm:mt-12 sm:ml-32"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>
      
      <div className={`md:w-80 h-screen fixed pt-12 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <SideLinks />
      </div>
    </div>
  );
};

export default UserSidebar;
