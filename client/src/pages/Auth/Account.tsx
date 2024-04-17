import Bio from "../../components/Bio";
import Interests from "../../components/Interests";
import PersonalInfo from "../../components/PersonalInfo";
import ProfilePicture from "../../components/ProfilePicture";
import SocialAccounts from "../../components/SocialAccounts";

const interests = [
  {id: 1, text: "UI Design"},
  {id: 2, text: "Framer"},
  {id: 3, text: "Startups"},
  {id: 4, text: "UX"},
  {id: 5, text: "Crypto"},
  // {id: 6, text: "Mobile Apps"},
  // {id: 7, text: "Webflow"},
]

const Account = () => {
  return (
    <div className="my-20 mx-4 md:mx-28 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex gap-4 flex-col">
        <ProfilePicture />
        <div className="bg-custom-color1 h-[490px] rounded-xl p-4">
          <PersonalInfo />
        </div>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="bg-custom-color1 h-[280px] rounded-xl p-4">
          <Bio />
        </div>
        <div className="bg-custom-color1 h-[200px] rounded-xl p-4">
        <Interests interests={interests} />
        </div>
        <div className="bg-custom-color1 h-[300px] rounded-xl p-4">
          <SocialAccounts />
        </div>
      </div>
    </div>
  );
};

export default Account;
