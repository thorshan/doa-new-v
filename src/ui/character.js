const rawCharacters = {
  "佐藤": "assets/characters/satou-keiko.png",
  "佐藤　けい子": "assets/characters/satou-keiko.png",
  "山田": "assets/characters/yamada-ichirou.png",
  "山田　一郎": "assets/characters/yamada-ichirou.png",
  "ミラー": "assets/characters/mike-mila.png",
};

export const CHARACTERS = Object.fromEntries(
    Object.entries(rawCharacters).map(([key, path]) => [key, `/${path}`])
);
