export const SORT_ORDER_ASC = "asc";
export const SORT_ORDER_DESC = "desc";

export const TAGS = {
  history: "History",
  american: "American",
  crime: "Crime",
  french: "French",
  fiction: "Fiction",
  english: "English",
  magical: "Magical",
  mystery: "Mystery",
  love: "Love",
  classic: "Classic",
  memory: "Memory",
  nostalgia: "Nostalgia",
  nature: "Nature",
  tranquility: "Tranquility",
  life: "Life",
  books: "Books",
} as const;

export type TagKey = keyof typeof TAGS;
