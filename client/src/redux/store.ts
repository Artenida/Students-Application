import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import postReducer from './forum/postSlice'
import chatReducer from './chat/chatUsersSlice'
import commentsReducer from './forum/commentSlice'
import eventReducer from './forum/eventSlice'
import categoriesReducer from './forum/categoriesSlice'
import conversationReducer from './chat/conversationSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { persistStore } from 'redux-persist'

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    comments: commentsReducer,
    event: eventReducer,
    categories: categoriesReducer,
    conversation: conversationReducer,
    chatUser: chatReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false
      }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
