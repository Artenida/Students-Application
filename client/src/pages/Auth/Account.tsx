import PersonalInfo from "../../components/PersonalInfo";
import ProfilePicture from "../../components/ProfilePicture";
import SocialAccounts from "../../components/SocialAccounts";
import Studies from "../../components/Studies";

const Account = () => {
  return (
    <div className="my-20 mx-4 md:mx-28 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex gap-4 flex-col">
        <ProfilePicture />
        <div className="bg-custom-color1 h-[490px] rounded-xl p-4">
          <PersonalInfo/>
        </div>
      </div>
      <div className="flex justify-center gap-4 flex-col">
        <div className="bg-custom-color1 h-[200px] rounded-xl p-4">
        <Studies />
        </div>
        <div className="bg-custom-color1 h-[400px] rounded-xl p-4">
          <SocialAccounts />
        </div>
      </div>
    </div>
  );
};

export default Account;
