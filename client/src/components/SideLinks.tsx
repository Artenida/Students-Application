import { Menus } from "../constants/constants";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteUser } from "../api/userThunk";
import { useState } from "react";
import { Dialog } from "./Dialog";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUser, signOutSuccess } from "../redux/user/userSlice";

export const SideLinks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(selectUser);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    navigate("/");
  };

  return (
    <div>
      {Menus.map((menu: any, index: number) => (
        <div key={index}>
          {menu.title === "Sign out" || menu.title === "Delete account" ? (
            <div
              onClick={
                menu.title === "Sign out" ? handleSignOut : handleDeleteAccount
              }
              className="text-red-600 text-lg flex items-center gap-x-4
                  cursor-pointer p-4 hover:bg-custom-color2 rounded-md mt-2"
            >
              <span className="text-2xl block float-left">{menu.icon}</span>
              <span
                className={`text-base font-medium flex-1 duration-200 `}
              >
                {menu.title}
              </span>
            </div>
          ) : (
            <NavLink
              to={menu.path}
              className="text-custom-color3 text-lg flex items-center gap-x-4
                  cursor-pointer p-4 hover:bg-custom-color2 rounded-md mt-2"
            >
              <span className="text-2xl block float-left">{menu.icon}</span>
              <span
                className={`text-base font-medium flex-1 duration-200`}
              >
                {menu.title}
              </span>
            </NavLink>
          )}
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
