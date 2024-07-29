import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";
import todosReducer from "./app/todosSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});
