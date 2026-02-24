const rawAvatars = {
    1: "assets/avatars/001-ramen.png",
    2: "assets/avatars/002-woman.png",
    3: "assets/avatars/003-daruma.png",
    4: "assets/avatars/004-man.png",
    5: "assets/avatars/005-samurai.png",
    6: "assets/avatars/006-fan.png",
    7: "assets/avatars/007-man-1.png",
    8: "assets/avatars/008-avatar.png",
    9: "assets/avatars/009-man-2.png",
    10: "assets/avatars/010-samurai-1.png",
    11: "assets/avatars/011-samurai-2.png",
    12: "assets/avatars/012-man-3.png",
    13: "assets/avatars/013-maneki-neko.png",
    14: "assets/avatars/014-sushi.png",
    15: "assets/avatars/015-ninja.png",
    16: "assets/avatars/016-ninja-1.png",
    17: "assets/avatars/017-ninja-2.png",
    18: "assets/avatars/018-tea.png",
    19: "assets/avatars/019-shiba-inu.png",
    20: "assets/avatars/021-tori.png",
    21: "assets/avatars/020-mount-fuji.png"
};

export const AVATAR = Object.fromEntries(
    Object.entries(rawAvatars).map(([key, path]) => [key, `/${path}`])
);