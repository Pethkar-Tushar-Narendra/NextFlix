import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
  value: AuthState;
};

type AuthState = {
  fetch: string;
};

const initialState = {
  value: {
    fetch: "movie",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    action1: () => {
      return initialState;
    },
    action2: (state, action: PayloadAction<string>) => {
      return {
        value: {
          fetch: action.payload,
        },
      };
    },
  },
});

export const { action1, action2 } = auth.actions;
export default auth.reducer;
