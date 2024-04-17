import profile from "../assets/home.png";
import { SmallButton } from "./ButtonComponent"
import cover from "../assets/cover3.jpg"

const ProfilePicture = () => {
    return (
        <div className="h-[300px] rounded-xl">
        <div className="bg-custom-color1 h-[300px] rounded-xl relative">
            <img
              src={cover}
              alt="cover"
              className="w-full h-[120px] rounded-t-xl"
            />
            <img
              src={profile}
              alt="Profile"
              className="absolute top-16 w-[80px] h-[80px] rounded-lg border border-custom-color3 mx-4"
            />
          <div className="text-custom-color3 p-4 mt-8">
            <h3 className="font-bold text-[20px] text-custom-color3">Your photo</h3>
            <h6>This will be displayed on your profile</h6>
            <div className="flex gap-4 pt-4">
              {/* <SmallButton children={"Upload new"} /> */}
              <SmallButton children={"Save"} />
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProfilePicture