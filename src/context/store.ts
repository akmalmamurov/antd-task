import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  auth: boolean;
  setAuth: (value: boolean) => void;
  logout: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      auth: !!localStorage.getItem("token"), 
      setAuth: (value) => set({ auth: value }),
      logout: () => {
        localStorage.removeItem("token");
        set({ auth: false });
      },
    }),
    {
      name: "antd-task",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
