import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import postReducer from './forum/postSlice'
import eventReducer from './forum/eventSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist'

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    event: eventReducer,
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
