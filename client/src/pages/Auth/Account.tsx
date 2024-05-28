import { useState } from "react";
import PersonalInfo from "../../components/Account/PersonalInfo";
import ProfilePicture from "../../components/Account/ProfilePicture";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch } from "../../redux/hooks";
import { signOutSuccess } from "../../redux/user/userSlice";
import UserSidebar from "../../components/UserSidebar";

const Account = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    navigate("/login");
  };

  return (
    <div className="pt-28 pb-12 mx-4 md:mx-28 sm:ml-32">
      <UserSidebar />
      <div className="flex gap-4 flex-col ml-16">
        <ProfilePicture />
        <div className="bg-custom-color1 h-[520px] rounded-xl p-4">
          <PersonalInfo/>
        </div>
      </div>
    </div>
  );
};

export default Account;
