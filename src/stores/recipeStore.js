import { create } from "zustand";

const useRecipeStore = create((get, set) => ({
  recipes: [],
  message: "",
}));

export default useRecipeStore;
