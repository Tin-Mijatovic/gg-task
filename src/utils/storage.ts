export const getFavorites = (): number[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export function setFavorites(favorites: number[]) {
  localStorage.setItem("favorites", JSON.stringify([...favorites]));
}
