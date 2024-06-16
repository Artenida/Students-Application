import MessageContainer from "../../components/Chat/Messages/MessageContainer";
import Sidebar from "../../components/Chat/Sidebar/Sidebar";

const Chat = () => {
    return (
      <div className='pt-32 pl-56 flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden'>
        <Sidebar />
        <MessageContainer />
      </div>
    );
  };
  
  export default Chat;
  