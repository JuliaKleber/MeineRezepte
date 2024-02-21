import { create } from "zustand";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  loginMessage: "",
  registerMessagePartOne: "",
  registerMessagePartTwo: "",
  currentUserId: null,
}));

export default useUserStore;
