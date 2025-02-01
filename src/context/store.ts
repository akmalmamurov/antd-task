import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  auth: boolean;
  setAuth: (value: boolean) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      auth: !!localStorage.getItem("token"), 
      setAuth: (value) => set({ auth: value }), 
    }),
    {
      name: "antd-task",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useStore;
