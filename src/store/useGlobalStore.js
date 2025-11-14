import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  uuid: null,
  token: null,
  setUuid: (value) => set({ uuid: value }),
  setToken: (token) => set({ token }),
  activeMenu: "location",
  setActiveMenu: (menu) => set({ activeMenu: menu }),
});

export const useGlobalStore = create(
  import.meta.env.MODE === "development" ? devtools(store) : store
);
