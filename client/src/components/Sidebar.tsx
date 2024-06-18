import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser, signOutSuccess } from "../redux/user/userSlice";
import profile from "../assets/userProfile.jpg";
import { IoIosPeople } from "react-icons/io";
import { FaVideo } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosChatbubbles } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import logo from "../assets/logo1.png"

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
      path: "/forum",
      icon: <IoIosPeople />,
      name: "Forum",
    },
    {
      path: "/createPost",
      icon: <MdAddBox />,
      name: "Share post",
    },
    {
      path: "/events",
      icon: <FaVideo />,
      name: "Events",
    },
    {
      path: "/createEvent",
      icon: <IoMdNotifications />,
      name: "Share event",
    },
    {
      path: "/loginChat",
      icon: <IoIosChatbubbles />,
      name: "Chat",
    },
    {
      path: `/writers/${userId}`,
      icon: <MdAccountCircle />,
      name: "My space",
    }
  ];

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    navigate("/loginChat");
  };

  return (
    <div className="bg-custom-color4 text-white fixed overflow-y-auto">
      <div>
        <div className="mt-32 mx-3 md:mx-6">
          <Link to={`/writers/${userId}`}>
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
          </Link>
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
              <span className="hidden md:block">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
