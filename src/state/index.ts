import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import global from "src/state/global";

const store = configureStore({
  reducer: {
    global,
  },
  middleware: [...getDefaultMiddleware({ thunk: false })],
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
