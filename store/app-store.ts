import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" as "light" | "dark" },
  reducers: {
    toggle: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    set: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
    },
  },
});

export const { toggle, set: setTheme } = themeSlice.actions;
export const store = configureStore({ reducer: { theme: themeSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
