import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import eventRoutes from './routes/eventRoutes';
import commentRoutes from './routes/commentRoutes';
import categoryRoutes from './routes/categoryRoutes';
import chatAuthRoutes from './routes/chatAuthRoutes';
import messageRoutes from './routes/messageRoutes';
import chatUserRoutes from './routes/chatUserRoutes';
import connectToMongoDB from './connectToMongoDB';
import cookieParser from 'cookie-parser';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const userSocketMap: Record<string, string> = {};

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId !== 'undefined') {
    userSocketMap[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

const base_url = process.env.BASE_URL || '/';
app.use(`${base_url}auth`, authRoutes);
app.use(`${base_url}users`, userRoutes);
app.use(`${base_url}posts`, postRoutes);
app.use(`${base_url}events`, eventRoutes);
app.use(`${base_url}comments`, commentRoutes);
app.use(`${base_url}categories`, categoryRoutes);
app.use(`${base_url}authChat`, chatAuthRoutes);
app.use(`${base_url}messages`, messageRoutes);
app.use(`${base_url}usersChat`, chatUserRoutes);

const PORT = process.env.DEV_PORT || 5000;
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost:${PORT}`);
});
