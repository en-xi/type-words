import { create } from "zustand";
import { select, selectA1, selectAll, Word } from "../db";

export interface WordStore {
  words: Word[];
  total: number;
  fetch: any;
  selectA1: any;
  select: any;
}

const useWordStore = create<WordStore>((set) => ({
  words: [],
  total: 0,
  fetch: async () => {
    set({ words: await selectAll() });
  },
  selectA1: async () => {
    console.log("result: ", await selectA1());
    set({ words: await selectA1() });
  },
  select: async (
    levels: string[],
    page: number,
    pageSize: number,
    is3000: number
  ) => {
    console.log(levels, page, pageSize, is3000);

    let results = await select(levels, page, pageSize, is3000);
    set({
      ...results,
    });
  },
}));

export default useWordStore;
