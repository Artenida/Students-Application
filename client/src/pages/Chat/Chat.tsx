import MessageContainer from "../../components/Chat/Messages/MessageContainer";
import Sidebar from "../../components/Chat/Sidebar/Sidebar";

const Chat = () => {
    return (
      <div className='pt-32 px-28 flex h-[500px]'>
        <Sidebar />
        <MessageContainer />
      </div>
    );
  };
  
  export default Chat;
  