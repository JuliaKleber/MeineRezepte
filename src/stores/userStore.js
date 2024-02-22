import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      loginMessage: "",
      registerMessagePartOne: "",
      registerMessagePartTwo: "",
      deleteAccountMessage: "",
      currentUserId: null,
      resetUser: () => set({ isLoggedIn: false, currentUserId: null }),
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
