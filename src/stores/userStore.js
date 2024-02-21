import { create } from "zustand";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  loginMessage: "",
  registerMessagePartOne: "",
  registerMessagePartTwo: "",
  currentUserId: null,
  resetUser: () => set({ isLoggedIn: false, currentUserId: null }),
}));

export default useUserStore;
