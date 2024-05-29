import PersonalInfo from "../../components/Account/PersonalInfo";
import ProfilePicture from "../../components/Account/ProfilePicture";
import UserSidebar from "../../components/UserSidebar";

const Account = () => {
  return (
    <div className="pt-16 pb-12 mx-4 md:mx-28 sm:ml-32 z-50">
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
