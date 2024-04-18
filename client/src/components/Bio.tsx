import { SmallButton } from "./ButtonComponent";

const Bio = () => {
  return (
    <div>
      <h2 className="font-bold text-[20px] text-custom-color3">Bio</h2>
      <textarea name="bio" id="bio" rows={5} className="rounded-xl resize-none mt-2 mb-2 w-full p-4 border border-custom-color2 focus:border-custom-color3 focus:outline-none"/>
      <SmallButton children={"Save"} />
    </div>
  );
};

export default Bio;
