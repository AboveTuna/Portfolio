
// Game Data
// Local paths are stored bare (relative to assets/); full https:// URLs (e.g.
// Steam's CDN) are used as-is. Each rendering script passes its own base path
// (to the site root) into the helpers below, so the same data works from
// index.html (root) and from pages in the pages/ folder.
// Loaded as a plain <script> before each page script (not a module), so the
// site also works when the HTML files are opened straight from disk.
// `id` must be unique (it's the ?g= in each game page's URL); array order is
// the order cards appear in. `trailer.src` is an HLS (.m3u8) stream.
const games =
[
    { title: "Brainrot", tag: "FRIENDSLOP", year: "2025", id: "01", link: "https://store.steampowered.com/app/3365140/BrainRot/", store: "Steam", platform: "Windows", developer: "AboveTuna", released: "Feb 26, 2025", img: "game_art/brainrot.jpg",
    screens: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3365140/ss_8444ae4af44a0cb95c1fcee2f2b61dfd2abc3608.1920x1080.jpg?t=1740586638",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3365140/ss_06d797d31c2e7e214e2f0db0ca8c155eece4ed0a.1920x1080.jpg?t=1740586638",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3365140/ss_6c4a2013c80fc54a2dfa51d06370cba5d63734fa.1920x1080.jpg?t=1740586638",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3365140/ss_8a0f8524ffbf7acedae3a1dfe7ba4353ae934396.1920x1080.jpg?t=1740586638",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3365140/ss_372b9d8df0a05af1103d6ab9ac2dcd6d5baba7e0.1920x1080.jpg?t=1740586638",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3365140/ss_74ac3067e0d7dd3c721bcf5f4c3ae2f7fb77b86e.1920x1080.jpg?t=1740586638"
    ],
    trailer: {
        src: "https://video.akamai.steamstatic.com/store_trailers/3365140/809064/fb0b6ca1248b7f179b91c95a75504952011300a6/1750844263/hls_264_master.m3u8?t=1739434556",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257087086/30195a6bd664b4a30ae72e73ef1cd8c726d0f10a/movie_600x337.jpg?t=1739434556"
    },
    tags: ["Casual", "Arcade", "3D Platformer", "Funny", "Memes"],
    lead: "A party pvp game based on brainrot trends.",
    desc: "Compete against your friends in a series of brainrot related minigames to become the brainrot champ.\n\n" +
        "This is a casual party game based on popular brainrot trends and memes.\n\n" +
        "• A lobby can host up to 16 players\n" +
        "• There are currently 4 game modes\n\n" +
        "Each minigame has its own unique challenge related to the meme the minigame is based off.\n\n" +
        "Players earn brainrot in various ways each minigame. The player with the most brainrot at the end of all the minigames WIN!\n\n" +
        "WARNING: Play at own risk, may cause serious brainrot."
    },

    { title: "Hidden in Plain Cake", tag: "PARTY GAME", year: "2026", id: "02", link: "https://store.steampowered.com/app/4974600/Hidden_in_Plain_Cake/", store: "Steam", platform: "Windows", developer: "AboveTuna & Snappy", released: "Oct 31, 2026",
    img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4974600/e6b57d93e23140895b1c521bb6254868e01b4920/capsule_616x353.jpg?t=1793445181",
    screens: [
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4974600/71335b50191476c1f30ea1f7fd0dce0f6bb96ab5/ss_71335b50191476c1f30ea1f7fd0dce0f6bb96ab5.1920x1080.jpg?t=1793445181",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4974600/21c5ba7cb29d0e4f61c0c647d1bee364a82d9bda/ss_21c5ba7cb29d0e4f61c0c647d1bee364a82d9bda.1920x1080.jpg?t=1793445181",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4974600/01c48b0c35439946e893c0c269eb7f5d2065ebed/ss_01c48b0c35439946e893c0c269eb7f5d2065ebed.1920x1080.jpg?t=1793445181",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4974600/a67e9625abab2a88b1c01e51068816976405d667/ss_a67e9625abab2a88b1c01e51068816976405d667.1920x1080.jpg?t=1793445181",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4974600/2a227b03c1763d1861984c4f2dc562471e8562cc/ss_2a227b03c1763d1861984c4f2dc562471e8562cc.1920x1080.jpg?t=1793445181",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4974600/eb263eb2bb450fe87156aab473f5c7e88a695268/ss_eb263eb2bb450fe87156aab473f5c7e88a695268.1920x1080.jpg?t=1793445181",
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4974600/91df25cd8f99c4a8c6eee56796a09b3e18274927/ss_91df25cd8f99c4a8c6eee56796a09b3e18274927.1920x1080.jpg?t=1793445181"
    ],
    trailer: {
        src: "https://video.akamai.steamstatic.com/store_trailers/4974600/669805491/738c885dfc0a7442a7782e3bb4a5e9f8e31bd7fa/1786785089/hls_264_master.m3u8?t=1786785783",
        poster: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/257389202/ebcb26b86cb5eb02d1906472397394a570bf6d5f/movie_600x337.jpg?t=1786785783"
    },
    tags: ["Party Game", "Multiplayer", "Hidden Object", "Character Customization", "Free to Play"],
    lead: "Sculpt, slice, and paint real cake into perfect copies of everyday objects — then invite your friends online to spot the fake. Every cut reveals the sponge layers inside. Fool them, or get sliced open trying.",
    desc: "Is It Real or Cake? 🎂\n\n" +
        "🔪 Hide in Plain Sight\n" +
        "Hidden in Plain Cake is a multiplayer party game about sculpting your way out of trouble. Every round you start as a lump of cake. Slice it, carve it, build it up and paint it until it looks like it belongs — hope nobody looks too closely.\n\n" +
        "🎂 Modes\n" +
        "Cake Hunt — Hunters chase the hidden cakes. Get caught and you join the hunt.\n" +
        "Cake Royale — Free-for-all. Every player is a cake and a hunter at once: hide your own disguise, then go and find everyone else's.\n" +
        "Bake Battle — Vote on a theme and sculpt it. Then fly around everyone else's cake as a ghost and hold up a score from 0 to 10, drawn by hand on a little board that the game reads. Best total wins.\n" +
        "Caketionary — Take turns picking a theme and sculpting it while everyone else flies around you as a ghost, guessing. Guess first for the most points.\n" +
        "Caketionary Cherry — Teams of two. The cake is dealt a secret theme and sculpts it; the ghost has to guess it before the clock runs out.\n" +
        "Playground — No hiding phase, no pressure. Play solo or with friends until the clock runs out.\n\n" +
        "🎉 Features\n" +
        "• Online multiplayer up to 12 players: host or join lobbies.\n" +
        "• Freeform sculpting (lasso cuts, plane cuts, depth limited carving, add volume & smoothing).\n" +
        "• Paint tools: brush, lines, shape fills and blur.\n" +
        "• Hunter powerups, taunts and kill cam for the last catch.\n" +
        "• Proximity voice chat: keep your voice down when the hunters get close.\n" +
        "• Sculpt and paint your hunter's head too!\n" +
        "• 1,000 themes to sculpt in Bake Battle and Caketionary.\n\n" +
        "Can you spot the cake or will you be the cake?"
    },

    { title: "Project Deep", tag: "FISHING SIM", year: "2026", id: "03", link: "https://abovetuna.itch.io/project-deep", store: "Itch", platform: "Windows", developer: "AboveTuna", released: "In development", img: "game_art/projectdeep.jpg", screens: ["game_art/projectdeep_shot1.jpg", "game_art/projectdeep_shot2.jpg", "game_art/projectdeep_shot3.jpg"],
    tags: ["Action", "3D", "Horror", "Singleplayer"],
    lead: "Capture fish with a harpoon and upgrade equipment to descend deeper.",
    desc: "Project Deep is a fishing simulation game where players explore underwater worlds and catch various fish species." }

];

// `base` is the path from the calling page back to the site root.
// index.html (root) passes "" ; pages in pages/ pass "../".
function assetUrl(path, base = "") {
  return /^https?:\/\//.test(path) ? path : `${base}assets/${path}`;
}
function gameArt(game, base = "") {
  return `url('${assetUrl(game.img, base)}')`;
}
function gameHref(game, base = "") {
  return `${base}pages/pagegame.html?g=${game.id}`;
}
