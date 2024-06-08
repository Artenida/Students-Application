import profile from "../../assets/userProfile.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../api/userThunk";

const MyAccount = ({
  username,
  fields,
  email,
  bio,
  profile_picture,
  user_id,
}: {
  username: string;
  fields: string;
  email?: string;
  bio: string;
  profile_picture: string;
  user_id: string;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector(selectUser);
  const userID = currentUser?.user?.id;

  useEffect(() => {
    dispatch(getUser(userID));
  }, [dispatch, userID]);

  const handleProfileClick = () => {
    if(String(userID) === String(user_id)) {
      navigate('/editAccount');
    }
  }
  return (
    <div
      className="flex ml-16 md:ml-0 px-12 md:pr-40 md:pl-12 mt-8 cursor-pointer"
      onClick={handleProfileClick}
    >
      <div className="flex gap-4 relative pt-12 w-full">
        <div className="relative">
          <div className="w-32 h-32 self-center shadow-md overflow-hidden rounded-full border-4">
            <img
              src={`http://localhost:5000/${profile_picture}` || profile}
              alt="Profile"
              className="rounded-full w-32 h-32"
            />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-custom-color3 font-bold ml-2">
            {username}
          </h2>
          <h2 className="text-xl text-custom-color3 ml-2 mt-1">{fields}</h2>
          <div>
            <span className="ml-2 text-custom-color3">{bio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
