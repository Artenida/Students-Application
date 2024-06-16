import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext, AuthUser } from "./AuthContext";
import { io, Socket } from "socket.io-client";

interface SocketContextValue {
  socket: Socket | null;
  onlineUsers: any[]; // Adjust the type according to your data structure
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketContextProvider");
  }
  return context;
};

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]); // Adjust the type according to your data structure
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("https://chat-app-yt.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  const contextValue: SocketContextValue = {
    socket,
    onlineUsers,
  };

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};
