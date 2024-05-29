import { FaBars } from "react-icons/fa";
import { SideLinks } from "../components/SideLinks";
import { useState } from "react";
import { Dialog } from "@mui/material";
import { IoClose } from "react-icons/io5";

const UserSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed p-4">
        <button
          className="text-2xl text-custom-color3 ml-12 mt-4 xs:ml-16 xs:mt-8 sm:mt-12 sm:ml-32"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar for Larger Screens */}
      <div className="hidden md:block md:w-80 h-screen fixed pt-12">
        <SideLinks />
      </div>

      {/* Dialog for Mobile Screens */}
      <Dialog
        className="md:hidden"
        open={isSidebarOpen}
        onClose={setIsSidebarOpen}
      >
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-text/10 w-full max-w-screen">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-custom-color3 ml-4">
              Menu
            </h2>
            <button
              className="mr-4 inline-flex items-center justify-center rounded-md hover:bg-custom-color transition duration-100"
              onClick={toggleSidebar}
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          <SideLinks />
        </div>
      </Dialog>
    </div>
  );
};

export default UserSidebar;
