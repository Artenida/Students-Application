import PersonalInfo from "../../components/Account/PersonalInfo";
import ProfilePicture from "../../components/Account/ProfilePicture";
import UserSidebar from "../../components/UserSidebar";

const Account = () => {
  return (
    <div className="pt-16 pb-12 mx-4 md:mx-28 z-50 flex flex-col md:flex-row gap-8">
      <div className="md:w-80">
        <UserSidebar />
      </div>
      <div className="flex gap-4 flex-col ml-16 md:flex-grow xs:mt-24 mt-16 sm:mt-28">
        <ProfilePicture />
        <div className="bg-custom-color1 h-[520px] rounded-xl p-4 md:flex-grow">
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
};

export default Account;
