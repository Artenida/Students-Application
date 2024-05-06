import PersonalInfo from "../../components/Account/PersonalInfo";
import ProfilePicture from "../../components/Account/ProfilePicture";
import SocialAccounts from "../../components/Account/SocialAccounts";
import Studies from "../../components/Account/Studies";

const Account = () => {
  return (
    <div className="py-20 mx-4 md:mx-28 sm:ml-32 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex gap-4 flex-col ml-16">
        <ProfilePicture />
        <div className="bg-custom-color1 h-[490px] rounded-xl p-4">
          <PersonalInfo/>
        </div>
      </div>
      <div className="flex justify-center gap-4 flex-col">
        <div className="bg-custom-color1 h-[200px] rounded-xl p-4 ml-16">
        <Studies />
        </div>
        <div className="bg-custom-color1 h-[400px] rounded-xl p-4 ml-16">
          <SocialAccounts />
        </div>
      </div>
    </div>
  );
};

export default Account;
