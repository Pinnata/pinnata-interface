import { createAction, createReducer } from "@reduxjs/toolkit";

// Typings
export enum Page {
  EARN = "earn",
  FARM = "farm", 
  POSITIONS = "positions",
  SUPPLY = "supply",
  WITHDRAW = "withdraw",
  ADD = "add",
  NEW = "new",
  REMOVE = "remove",
}

interface GlobalState {
  currentPage?: Page;
}

const initialState: GlobalState = {
  currentPage: Page.EARN,
};

// Actions
export const setCurrentPage = createAction<{ nextPage: Page }>(
  "global/setCurrentPage"
);

// Reducer
export default createReducer(initialState, (builder) =>
  builder.addCase(setCurrentPage, (state, action) => {
    const { nextPage } = action.payload;
    return { ...state, currentPage: nextPage };
  })
);
