import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  uuid: null,
  token: null,
  dbName: null,
  setUuid: (value) => set({ uuid: value }),
  setToken: (token) => set({ token }),
  activeMenu: "location",
  setActiveMenu: (menu) => set({ activeMenu: menu }),
  setDbName: (db) => {
    const name = 'photosdb-' + db;
    // localStorage.setItem('photos_db_name', name); // persistir
    set({ dbName: name });
  },
});

export const useGlobalStore = create(
  import.meta.env.MODE === "development" ? devtools(store) : store
);
