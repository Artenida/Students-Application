import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser, signOutSuccess } from "../redux/user/userSlice";
import profile from "../assets/userProfile.jpg";
import { IoHome } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosChatbubbles } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa6";

export type SidebarRoutes = {
  path: string;
  name: string;
  icon: ReactNode;
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(selectUser);
  const imagePath = currentUser?.user?.profile_picture
    ? currentUser?.user?.profile_picture.replace(/\\/g, "/")
    : "";
  const userId = currentUser.user.id;

  const menu: SidebarRoutes[] = [
    {
      path: "/",
      icon: <IoHome />,
      name: "Home",
    },
    {
      path: "/forum",
      icon: <IoIosPeople />,
      name: "Forum",
    },
    {
      path: "/events",
      icon: <FaVideo />,
      name: "Events",
    },
    {
      path: "/chat",
      icon: <IoIosChatbubbles />,
      name: "Char",
    },
    {
      path: "/board",
      icon: <FaClipboardList />,
      name: "Board",
    },
    {
      path: `/writers/${userId}`,
      icon: <MdAccountCircle />,
      name: "My space",
    }
  ];

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    navigate("/");
  };

  return (
    <div className="bg-custom-color4 text-white py-4 fixed overflow-y-auto">
      <div>
        <div className="mt-2 sm:mx-2 md:mx-4">
          { currentUser && currentUser.user && currentUser?.user?.profile_picture ? (
            <img
              src={`http://localhost:5000/${imagePath}`}
              alt="post profile"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full"
            />
          ) : (
            <img
              src={profile}
              alt="Profile"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full"
            />
          )}
        </div>
        <div>
          <div className="h-screen">
            {menu.map((item: SidebarRoutes, index: number) => (
              <NavLink key={index} to={item.path}>
                <div className="flex flex-col items-center mt-8 p-2">
                  {item.icon}
                  <span className="hidden md:block">{item.name}</span>
                </div>
              </NavLink>
            ))}
            <div className="flex flex-col items-center mt-8 p-2 cursor-pointer">
              <RiLogoutBoxLine
                onClick={() => {
                  handleSignOut();
                }}
              />
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
