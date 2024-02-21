import { create } from "zustand";

const useUserStore = create((set) => ({
  isLoggedIn: false,
  loginMessage: "",
  registerMessage: "",
  currentUserId: null,
}));

export default useUserStore;
