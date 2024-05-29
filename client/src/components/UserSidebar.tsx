import { FaRegUserCircle } from "react-icons/fa";
import { SideLinks } from "../components/SideLinks";
import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";

const UserSidebar = () => {
  const { currentUser } = useAppSelector(selectUser);

  return (
    <div className="sm:max-h-screen md:h-[900px] md:w-80 flex flex-col md:flex-row">
      <div className={`opacity-90 p-5 duration-300 relative`}>
          <SideLinks />
      </div>
    </div>
  );
};

export default UserSidebar;
