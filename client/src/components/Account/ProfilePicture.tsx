import profile from "../../assets/home.png";
import { SmallButton } from "../ButtonComponent"
import cover from "../../assets/cover3.jpg"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/user/userSlice";
import { getUser, updateProfilePicture } from "../../api/userThunk";

const ProfilePicture = () => {
  const [image, setImage] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(selectUser);
  const { user } = useAppSelector(selectUser);
  
  const userId = currentUser?.user?.id;
  const imagePath =
    user && user.profile_picture
      ? user?.profile_picture.replace(/\\/g, "/")
      : "";

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("userId", userId ?? "");
    formData.append("files", image ?? "");

    try {
      dispatch(updateProfilePicture(formData));
      dispatch(getUser(userId));
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

    return (
        <div className="h-[300px] rounded-xl -z-50">
        <div className="bg-custom-color1 h-[300px] rounded-xl relative">
            <img
              src={cover}
              alt="cover"
              className="w-full h-[120px] rounded-t-xl"
            />
           <label htmlFor="file" className="cursor-pointer">
                <img
                  src={
                    selectedImage ||
                    (user &&
                      user?.profile_picture &&
                      `http://localhost:5000/${imagePath}`) ||
                    profile
                  }
                  alt="Profile"
                  className="absolute top-16 w-[80px] h-[80px] rounded-lg border border-custom-color3 mx-4"
                  />
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
          <div className="text-custom-color3 p-4 mt-8">
            <h3 className="font-bold text-[20px] text-custom-color3">Your photo</h3>
            <h6>This will be displayed on your profile</h6>
            <div className="flex gap-4 pt-4">
              {/* <SmallButton children={"Upload new"} /> */}
              <SmallButton children={"Save"} onClick={handleUpload}/>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProfilePicture