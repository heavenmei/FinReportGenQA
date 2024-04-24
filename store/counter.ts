import { defineStore } from "pinia";

interface CounterState {
  active_comp: string;
  content: string;
  login_dialog: boolean;
}

// @ts-ignore
export const useCounter = defineStore("counter", {
  state: (): CounterState => ({
    active_comp: "",
    content: "",
    login_dialog: false,
  }),

  actions: {},
  getters: {},
  persist: process.client && {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
    paths: ["setting"],
  },
});
