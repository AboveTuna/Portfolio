
// Game Data
// Paths are stored bare (image filename + id). Each rendering script passes its
// own base path (to the site root) into the helpers below, so the same data
// works from index.html (root) and from pages in the pages/ folder.
export const games =
[
    { title: "Mania", tag: "MOBA", year: "2026", id: "01", img: "game_art/mania.png",
    lead: "A mobile online multiplayer battle arena game, set in a vibrant fantasy world.",
    desc: "Mania is a top-down extraction shooter where players compete in fast-paced matches." },

    { title: "Project Deep", tag: "FISHING SIM", year: "2026", id: "02", img: "game_art/projectdeep.png",
    lead: "Capture fish with a harpoon and upgrade equipment to decent deeper. ",
    desc: "Project Deep is a fishing simulation game where players explore underwater worlds and catch various fish species." },
      
    { title: "Silksong 3D", tag: "FAN-MADE", year: "2026", id: "03", img: "game_art/silksong.png",
    lead: "A 3D recreation of Hollow Knight Silksong.",
    desc: "Silksong 3D is a fan-made 3D adaptation of the popular Hollow Knight Silksong game." },

    { title: "Dungeon Conquest", tag: "PLATOFORMER", year: "2025", id: "04", img: "game_art/dungeonconquest.png",
    lead: "Play as a mage fighting against steampunk machines, but you only cast spells when you jump!",
    desc: "Dungeon Conquest is a platformer where players control a mage fighting against steampunk machines, but can only cast spells when jumping." },

    { title: "Brainrot", tag: "FRIENDSLOP", year: "2025", id: "05", img: "game_art/brainrot.png",
    lead: "Compete against your friends in a series of brainrot minigames.",
    desc: "Brainrot is a collection of minigames designed for competitive play with friends." }

];

// `base` is the path from the calling page back to the site root.
// index.html (root) passes "" ; pages in pages/ pass "../".
export function gameArt(game, base = "") {
  return `url('${base}assets/${game.img}')`;
}
export function gameHref(game, base = "") {
  return `${base}pages/pagegame.html?g=${game.id}`;
}
