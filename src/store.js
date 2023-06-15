import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "./features/modal/modalSlice";
import userReducer from "./features/user/userSlice";
import taskReducer from "./features/task/taskSlice"
import taskDetailReducer from "./features/task/taskDetailSlice"
import usersReducer from "./features/user/usersSlice"
import projectReducer from "./features/project/projectSlice"
import projectDetailReducer from "./features/project/projectDetailSlice"
import filesReducer from "./features/file/filesSlice"
import folderReducer from "./features/folder/folderSlice"
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer, modal: modalReducer, task: taskReducer, taskDetail: taskDetailReducer,users: usersReducer, project: projectReducer, projectDetail: projectDetailReducer, files: filesReducer, folder: folderReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
