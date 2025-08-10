import { Dexie, type EntityTable } from "dexie";
import words from "../assets/data/words.json";

// Typing for your entities (hint is to move this to its own module)
export interface Word {
  id: number;
  name: string;
  level: string;
  is_3000: number;
  phonetic_uk: string;
  phonetic_us: string;
  part_of_speech: string;
  definition: string;
  example: string;
  audio_uk: string;
  audio_us: string;
  url: string;
  definitions: Definition[];
}

export interface Definition {
  level?: string;
  examples: string[];
  definition: string;
}

// Database declaration (move this to its own module also)
const db = new Dexie("WordDatabase") as Dexie & {
  words: EntityTable<Word, "id">;
};
db.version(2).stores({
  words: "id, level, is_3000, [level+is_3000]", // Add compound index
});

let run = () => {
  (words as Word[]).forEach((item) => {
    db.words.add({
      ...item,
    });
  });
};

run();

let selectAll = () => db.words.toArray();

let selectA1 = () => db.words.where("level").equals("A1").toArray();
let select = async (
  levels: string[],
  page: number,
  pageSize: number,
  is_3000: number
) => {
  if (is_3000 === 1 || is_3000 === 0) {
    // Create compound keys for the query
    const compoundKeys = levels.map((level) => [level, is_3000]);

    let total = await db.words
      .where("[level+is_3000]")
      .anyOf(compoundKeys)
      .count();
    let words = await db.words
      .where("[level+is_3000]")
      .anyOf(compoundKeys)
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return { words, total };
  } else if (is_3000 === 2) {
    let total = await db.words.where("level").anyOf(levels).count();
    let words = await db.words
      .where("level")
      .anyOf(levels)
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return { words, total };
  } else {
    throw Error('the value of "is_3000" is invalid!');
  }
};

export default db;

export { select, selectA1, selectAll };
