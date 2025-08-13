import { create } from "zustand";
import { select, Word } from "../db";

export interface WordStore {
  words: Word[];
  total: number;

  select: any;
}

const useWordStore = create<WordStore>((set) => ({
  words: [],
  total: 0,

  select: async (
    levels: string[],
    page: number,
    pageSize: number,
    is3000: number
  ) => {
    let results = await select(levels, page, pageSize, is3000);
    set({
      ...results,
    });
  },
}));

export default useWordStore;
