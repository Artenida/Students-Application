import { MediumButton, SmallButton } from "./ButtonComponent";

const Bio = () => {
  return (
    <div>
      <h2 className="font-bold text-[20px] text-custom-color3">Bio</h2>
      <textarea name="bio" id="bio" rows={5} className="rounded-xl resize-none mt-2 mb-2 w-full"/>
      <SmallButton children={"Save"} />
    </div>
  );
};

export default Bio;
