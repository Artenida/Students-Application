import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { io, Socket } from 'socket.io-client';

interface SocketContextValue {
  socket: Socket | null;
  onlineUsers: any[];
}

const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketContextProvider');
  }
  return context;
};

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:5000', {
        query: { userId: authUser._id },
        withCredentials: true,
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [authUser]);

  const contextValue: SocketContextValue = {
    socket,
    onlineUsers,
  };

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};
