
// Game Library page — reuses the same games data + card template as the
// home page, but lays the cards out in a vertical, wrapping grid instead
// of the horizontal auto-scroller.
// games, gameArt, gameHref come from data.js (loaded before this script) —
// same source of truth as index.html.

// gamelibrary.html lives in pages/, so paths resolve one level up.
const BASE = "../";

const grid = document.querySelector(".wp-library-grid");
const gameTemplate = document.querySelector(".wp-card-template");

// Build a single card from a game object (mirrors script.js).
function buildGameCard(game) {
  const gameCard = gameTemplate.content.cloneNode(true);

  const art = gameCard.querySelector(".wp-card-art");
  art.style.background = gameArt(game, BASE);
  art.style.backgroundSize = "cover";
  art.style.backgroundPosition = "center";
  art.style.backgroundRepeat = "no-repeat";

  gameCard.querySelector(".wp-card-title").textContent = game.title;
  gameCard.querySelector(".wp-card-tag").textContent = game.tag;
  gameCard.querySelector(".wp-card-year").textContent = game.year;
  gameCard.querySelector(".wp-card-desc").textContent = game.lead;
  gameCard.querySelector(".wp-card-link").setAttribute("href", gameHref(game, BASE));

  return gameCard;
}

// Render every game once into the grid.
function renderLibrary() {
  games.forEach((game) => grid.appendChild(buildGameCard(game)));
}

renderLibrary();
