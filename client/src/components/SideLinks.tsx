import { NavLink, useNavigate } from "react-router-dom";
import { deleteUser } from "../api/userThunk";
import { useState } from "react";
import { Dialog } from "./Helpful Components/Dialog";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser, signOutSuccess } from "../redux/user/userSlice";
import {
  FaEnvelope,
  FaFileContract,
  FaNewspaper,
  FaPenAlt,
  FaRegCalendarCheck,
  FaSignOutAlt,
  FaUnlockAlt,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

export const SideLinks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(selectUser);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const userId = currentUser.user.id;

  const ProfileManagement = [
    {
      title: "My posts",
      icon: <FaNewspaper />,
      path: `/writers/${userId}`,
    },
    {
      title: "My events",
      icon: <FaRegCalendarCheck />,
      path: `/myEvents`,
    },
    {
      title: "Change Password",
      icon: <FaUnlockAlt />,
      path: `/changePassword`,
    },
  ];

  const AccountManagement = [
    {
      title: "Delete account",
      icon: <MdDelete />,
      path: "/delete",
    },
  ];

  const Information = [
    {
      title: "Terms and Conditions",
      icon: <FaFileContract />,
      path: "/terms",
    },
  ];

  const Support = [
    {
      title: "Contact Support",
      icon: <FaEnvelope />,
      path: "/contact",
    },
  ];

  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUser(currentUser.user.id));
    console.log("User account deleted successfully");
    dispatch(signOutSuccess());
    navigate("/");
    setIsDeleteDialogOpen(false);
  };

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    navigate("/login");
  };

  return (
    <div className="h-screen fixed pt-12 md:ml-16 sm:ml-12">
      <h2 className="text-xl font-semibold text-custom-color3">
        Profile Management
      </h2>
      {ProfileManagement?.map((menu: any, index: number) => (
        <div key={index}>
          <NavLink
            to={menu.path}
            className="flex items-center gap-x-4
            cursor-pointer p-3 hover:bg-custom-color1 rounded-md mt-2"
          >
            <span className="block float-left">{menu.icon}</span>
            <span className={`text-base font-medium flex-1 duration-200`}>
              {menu.title}
            </span>
          </NavLink>
        </div>
      ))}

      <h2 className="text-xl font-semibold text-custom-color3 mt-6">
        Account Management
      </h2>
      <div
        className="flex items-center gap-x-4
            cursor-pointer p-4 hover:bg-custom-color1 rounded-md mt-2"
      >
        <span className="block float-left">
          <FaSignOutAlt
            onClick={() => {
              handleSignOut();
            }}
          />
        </span>
        <span className={`text-base font-medium flex-1 duration-200`}>
          Sign out
        </span>
      </div>
      {AccountManagement?.map((menu: any, index: number) => (
        <div key={index}>
          <NavLink
            to={menu.path}
            className="flex items-center gap-x-4
            cursor-pointer p-4 hover:bg-custom-color1 rounded-md mt-2"
          >
            <span className="block float-left">{menu.icon}</span>
            <span className={`text-base font-medium flex-1 duration-200`}>
              {menu.title}
            </span>
          </NavLink>
        </div>
      ))}

      <h2 className="text-xl font-semibold text-custom-color3 mt-6">
        Information
      </h2>
      {Information?.map((menu: any, index: number) => (
        <div key={index}>
          <NavLink
            to={menu.path}
            className="flex items-center gap-x-4
            cursor-pointer p-4 hover:bg-custom-color1 rounded-md mt-2"
          >
            <span className="block float-left">{menu.icon}</span>
            <span className={`text-base font-medium flex-1 duration-200`}>
              {menu.title}
            </span>
          </NavLink>
        </div>
      ))}

      <h2 className="text-xl font-semibold text-custom-color3 mt-6">Support</h2>
      {Support?.map((menu: any, index: number) => (
        <div key={index}>
          <NavLink
            to={menu.path}
            className="flex items-center gap-x-4
            cursor-pointer p-4 hover:bg-custom-color1 rounded-md mt-2"
          >
            <span className="block float-left">{menu.icon}</span>
            <span className={`text-base font-medium flex-1 duration-200`}>
              {menu.title}
            </span>
          </NavLink>
        </div>
      ))}

      <Dialog
        isOpen={isDeleteDialogOpen}
        message="Are you sure you want to delete your account?"
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
