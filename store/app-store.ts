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
import { create } from "zustand";

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

type ExplorerState = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

export const useExplorerStore = create<ExplorerState>((set) => ({
  favorites: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((favorite) => favorite !== id)
        : [...state.favorites, id],
    })),
}));
