import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  jobKey: null,
  setJobKey: (key) => set({ jobKey: key }),

  // Menú activo por defecto
  activeMenu: "location",
  setActiveMenu: (menu) => set({ activeMenu: menu }),
});

export const useJobStore = create(
  import.meta.env.MODE === "development" ? devtools(store) : store
);
