import { FaSignOutAlt } from "react-icons/fa";
import { PiCardsFill } from "react-icons/pi";
import { MdAddBox } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export const Menus = [
  {
    title: "Sign out",
    icon: <FaSignOutAlt />,
    path: "/signout",
  },
  {
    title: "Delete account",
    icon: <MdDelete />,
    path: "/delete",
  },
];
