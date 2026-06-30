
// Get the query string from the browser's address bar
const queryString = window.location.search;
// Turn it into a searchable object
const urlParams = new URLSearchParams(queryString);
// Get the value of the "g" parameter
const gameId = urlParams.get('g');

import { games, gameArt } from './data.js';

// pagegame.html lives in pages/, so asset paths resolve one level up.
const BASE = "../";

const game = games[gameId - 1]; // Subtract 1 to convert to zero-based index

console.log("pagegame.js loaded" + (game ? ` for game: ${game.title}` : " but no game found"));

if (game) {

    // Paint the key art onto the dedicated parallax layer (not the section
    // itself), so it can be translated independently of the hero text.
    document.querySelector("#wp-game-hero-bg").style.background = gameArt(game, BASE);
    document.querySelector("#wp-game-hero-bg").style.backgroundSize = "cover";
    document.querySelector("#wp-game-hero-bg").style.backgroundPosition = "center";
    document.querySelector("#wp-game-hero-bg").style.backgroundRepeat = "no-repeat";

    document.querySelector(".wp-game-title").textContent = game.title;
    document.querySelector(".wp-game-badge").textContent = game.tag + " · " + game.year;
    document.querySelector(".wp-game-lead").textContent = game.lead;
    document.querySelector(".wp-game-text").textContent = game.desc;

}

// Parallax scroll effect (same logic as home.js): shift the hero background
// at a fraction of the scroll speed so it drifts behind the page.
window.addEventListener('scroll', function() {
  // Get current vertical scroll position
  const scrollPosition = window.pageYOffset;

  // Select parallax background element and apply transform based on scroll position
  const bg = document.getElementById('wp-game-hero-bg');
  const speed = -0.3; // Adjust this value for different parallax speeds
  const yPos = -(scrollPosition * speed);
  bg.style.transform = `translateY(${yPos}px)`;

});
