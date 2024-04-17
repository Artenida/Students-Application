const Account = () => {
  return (
    <div className="my-20 mx-4 md:mx-28 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex gap-4 flex-col">
        <div className="bg-custom-color1 h-[300px] rounded-xl p-4">Profile picture</div>
        <div className="bg-custom-color1 h-[450px] rounded-xl p-4">Personal info</div>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="bg-custom-color1 h-[200px] rounded-xl p-4">Bio</div>
        <div className="bg-custom-color1 h-[250px] rounded-xl p-4">Interests</div>
        <div className="bg-custom-color1 h-[300px] rounded-xl p-4">Social media accounts</div>
      </div>
    </div>
  );
};

export default Account;
