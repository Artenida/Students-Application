import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Conversation {
  id: string;
  username: string;
}
export interface Message {
  _id: string;
  message: string;
  timestamp: number;
  shouldShake?: boolean;
}

export interface ConversationState {
  selectedConversation: Conversation | null;
  messages: Message[];
}

const initialState: ConversationState = {
  selectedConversation: null,
  messages: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setSelectedConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.selectedConversation = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload];
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { setSelectedConversation, addMessage, setMessages } =
  conversationSlice.actions;

export default conversationSlice.reducer;
