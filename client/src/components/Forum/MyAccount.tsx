import { FaEdit } from "react-icons/fa";
import profile from "../../assets/userProfile.jpg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../api/userThunk";

const MyAccount = ({
  username,
  email,
  bio,
  profile_picture,
  user_id,
}: {
  username: string;
  email: string;
  bio: string;
  profile_picture: string;
  user_id: string;
}) => {
  const dispatch = useAppDispatch();
  const { currentUser, user } = useAppSelector(selectUser);
  const userID = currentUser?.user?.id;

  useEffect(() => {
    dispatch(getUser(userID));
  }, [dispatch, userID]);
  
  return (
    <div className="flex flex-col justify-center md:flex-row -z-50 ml-24 mt-8">
    <div className="flex flex-col relative gap-4 pt-12 w-full md:pl-48">
      <div className="relative">
        {user?.id === user_id ? (
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <Link key={user_id} to={`/editAccount`}>
              <FaEdit />
            </Link>
          </div>
        ) : null}
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full border-4">
          <label>
            <img
              src={`http://localhost:5000/${profile_picture}` || profile}
              alt="Profile"
              className="rounded-full w-32 h-32"
            />
          </label>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl text-custom-color3 font-bold ml-2">
          {username}
        </h2>
        {currentUser?.user?.id === user_id && (
          <div className="pt-2">
            <span className="ml-2 text-lg text-custom-color3">{email}</span>
          </div>
        )}
        <div>
          <span className="ml-2 text-custom-color3">{bio}</span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default MyAccount;
