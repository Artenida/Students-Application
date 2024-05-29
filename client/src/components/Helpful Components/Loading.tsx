import loading from "../../assets/loadingGif.gif";

const Loading = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <img className="h-[100px]" src={loading} alt="Loading" />
      <h1 className="text-[50px] font-bold">Loading...</h1>
    </div>
  );
};

export default Loading;
