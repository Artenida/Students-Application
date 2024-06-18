import MessageContainer from "../../components/Chat/Messages/MessageContainer";
import Sidebar from "../../components/Chat/Sidebar/Sidebar";

const Chat = () => {
    return (
      <div className='pt-32 pl-24 md:pl-32 flex justify-center gap-2'>
        <Sidebar />
        <MessageContainer />
      </div>
    );
  };
  
  export default Chat;
  