
// Game Data
// Paths are stored bare (image filename + id). Each rendering script passes its
// own base path (to the site root) into the helpers below, so the same data
// works from index.html (root) and from pages in the pages/ folder.
export const games =
[
    { title: "Mania", tag: "MOBA", year: "2026", id: "01", link: "https://example.com/mania", img: "game_art/mania.png", screens: ["game_art/mania_shot1.png", "game_art/mania_shot2.png", "game_art/mania_shot3.png"],
    roles: ["Gameplay Programming", "Multiplayer & Networking", "Backend Engineering"],
    lead: "A mobile online multiplayer battle arena game, set in a vibrant fantasy world.",
    desc: "Mania is a top-down extraction shooter where players compete in fast-paced matches. \n" +
        "For this project, my focus was on developing the networking and multiplayer aspects of the game. " +
        "I used Microsoft Azure PlayFab to handle the backend, including matchmaking, player data storage, and real-time multiplayer functionality."
    },

    { title: "Project Deep", tag: "FISHING SIM", year: "2026", id: "02", link: "https://abovetuna.itch.io/project-deep", img: "game_art/projectdeep.png", screens: ["game_art/projectdeep_shot1.png", "game_art/projectdeep_shot2.png", "game_art/projectdeep_shot3.png"],
    roles: ["Game Design", "Gameplay Programming", "3D Art"],
    lead: "Capture fish with a harpoon and upgrade equipment to decent deeper. ",
    desc: "Project Deep is a fishing simulation game where players explore underwater worlds and catch various fish species." },
      
    { title: "Silksong 3D", tag: "FAN-MADE", year: "2026", id: "03", link: "https://example.com/silksong3d", img: "game_art/silksong.png",
    roles: ["3D Art", "Gameplay Programming", "Level Design"],
    lead: "A 3D recreation of Hollow Knight Silksong.",
    desc: "Silksong 3D is a fan-made 3D adaptation of the popular Hollow Knight Silksong game." },

    { title: "Dungeon Conquest", tag: "PLATOFORMER", year: "2025", id: "04", link: "https://abovetuna.itch.io/dungeon-conquest", img: "game_art/dungeonconquest.png", screens: ["game_art/dungeonconquest_shot1.png", "game_art/dungeonconquest_shot2.png", "game_art/dungeonconquest_shot3.png"],
    roles: ["2D Art", "Gameplay Programming", "Level Design"],
    lead: "Play as a mage fighting against steampunk machines, but you only cast spells when you jump!",
    desc: "Dungeon Conquest is a platformer where players control a mage fighting against steampunk machines, but can only cast spells when jumping." },

    { title: "Brainrot", tag: "FRIENDSLOP", year: "2025", id: "05", link: "https://store.steampowered.com/app/3365140/BrainRot/", img: "game_art/brainrot.png", screens: ["game_art/brainrot_shot1.png", "game_art/brainrot_shot2.png", "game_art/brainrot_shot3.png"],
    roles: ["Multiplayer & Networking", "Gameplay Programming", "UI / UX"],
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
