import { defineStore } from "pinia";

interface EditorState {
  currentNode: any;
  currentNodePos: number;
}

export const useRichEditor = defineStore("richtextEditor", {
  state: (): EditorState => ({
    currentNode: null,
    currentNodePos: -1,
  }),
  actions: {},
  getters: {},
});
