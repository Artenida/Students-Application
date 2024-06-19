import { Request, Response } from "express";
import Conversation from "../../models/ConversationModel";
import Message from "../../models/MessageModel";
import { getReceiverSocketId, io } from "../../socket/socket";

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user?._id; 

		if (!senderId) {
			res.status(401).json({ error: "Unauthorized - No user provided" });
			return;
		  }

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([newMessage.save(), conversation.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error: any) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user?._id;
		if (!senderId) {
			res.status(401).json({ error: "Unauthorized - No user provided" });
			return;
		  }
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) {
			res.status(200).json([]);
			return;
		  }
	  
		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error: any) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
