import PersonalInfo from "../../components/Account/PersonalInfo";
import ProfilePicture from "../../components/Account/ProfilePicture";

const Account = () => {
  return (
    <div className="py-20 mx-4 md:mx-28 sm:ml-32 flex gap-6">
      <div className="flex gap-4 flex-col ml-16">
        <ProfilePicture />
        <div className="bg-custom-color1 h-[490px] rounded-xl p-4">
          <PersonalInfo/>
        </div>
      </div>
    </div>
  );
};

export default Account;
