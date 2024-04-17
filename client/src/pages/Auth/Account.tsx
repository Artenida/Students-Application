import profile from "../../assets/home.png";
import { SmallButton } from "../../components/ButtonComponent";

const Account = () => {
  return (
    <div className="my-20 mx-4 md:mx-28 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex gap-4 flex-col">
        <div className="bg-custom-color1 h-[300px] rounded-xl">
          <div className="bg-custom-color1 h-[300px] rounded-xl relative">
              <img
                src={profile}
                alt="cover"
                className="w-full h-[120px] rounded-t-xl"
              />
              <img
                src={profile}
                alt="Profile"
                className="absolute top-16 w-[80px] h-[80px] rounded-lg border border-custom-color3 mx-4"
              />
            <div className="text-custom-color3 p-4 mt-8">
              <h3 className="font-semibold">Your photo</h3>
              <h6>This will be displayed on your profile</h6>
              <div className="flex gap-4 pt-2">
                <SmallButton children={"Upload new"} />
                <SmallButton children={"Save"} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-custom-color1 h-[450px] rounded-xl p-4">
          Personal info
        </div>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="bg-custom-color1 h-[200px] rounded-xl p-4">Bio</div>
        <div className="bg-custom-color1 h-[250px] rounded-xl p-4">
          Interests
        </div>
        <div className="bg-custom-color1 h-[300px] rounded-xl p-4">
          Social media accounts
        </div>
      </div>
    </div>
  );
};

export default Account;
