
// Parallax scroll effect
window.addEventListener('scroll', function() {
  // Get current vertical scroll position
  const scrollPosition = window.pageYOffset;

  // Select parallax background element and apply transform based on scroll position
  const bg = document.getElementById('wp-hero-bg');
  const speed = -0.3; // Adjust this value for different parallax speeds
  const yPos = -(scrollPosition * speed);
  bg.style.transform = `translateY(${yPos}px)`;

});

// Game Scrollbar

const scrollbar = document.querySelector(".wp-games-scroller-inner");
const gameTemplate = document.querySelector(".wp-card-template");

import { games, gameArt, gameHref } from "./data.js"; // Import the games array from data.js

// index.html lives at the site root, so paths resolve with no prefix.
const BASE = "";

// Function to generate and append game cards
function appendGameCards() {
  games.forEach((game) => {
    const gameCard = gameTemplate.content.cloneNode(true);

    gameCard.querySelector(".wp-card-art").style.background = gameArt(game, BASE);
    gameCard.querySelector(".wp-card-art").style.backgroundSize = "cover";
    gameCard.querySelector(".wp-card-art").style.backgroundPosition = "center";
    gameCard.querySelector(".wp-card-art").style.backgroundRepeat = "no-repeat";
    gameCard.querySelector(".wp-card-art").style.backgroundAttachment = "fixed";

    gameCard.querySelector(".wp-card-title").textContent = game.title;
    gameCard.querySelector(".wp-card-tag").textContent = game.tag;
    gameCard.querySelector(".wp-card-year").textContent = game.year;
    gameCard.querySelector(".wp-card-desc").textContent = game.lead;
    gameCard.querySelector(".wp-card-link").setAttribute("href", gameHref(game, BASE));

    scrollbar.appendChild(gameCard);
  });
}

// Fill the track with TWO identical copies of the list so the loop has something to scroll into seamlessly.
appendGameCards();
appendGameCards();

// Distance of one full set of cards
let loopWidth = 0;
function measureLoopWidth() {
  const cards = scrollbar.querySelectorAll(".wp-card-link");
  // card[games.length] is the first card of the second copy.
  if (cards.length > games.length) {
    loopWidth = cards[games.length].offsetLeft - cards[0].offsetLeft;
  }
}
measureLoopWidth();
// Card widths are fixed, but remeasure on resize in case layout shifts.
window.addEventListener("resize", measureLoopWidth);

/* --- CLICK AND DRAG CORE ENGINE --- */

let isHovering = false;
let isDown = false;
let hasMoved = false; // true once the pointer drags past the threshold

let currentTranslate = 0;     // live rendered offset
let dragStartTranslate = 0;   // offset captured at the moment a drag begins
let startX;                   // pointer x captured at the moment a drag begins

// Mouse Enters the Container Window
scrollbar.addEventListener("mouseenter", () => {
  isHovering = true;
  // Pause the auto-scroll when the user hovers over the container
  scrollbar.style.animationPlayState = "paused";
});
// Mouse Leaves the Container Window
scrollbar.addEventListener("mouseleave", () => {
  isHovering = false;

  if (!isDown) return;
  isDown = false;
  scrollbar.classList.remove("is-grabbing");
});

// Mouse Down
scrollbar.addEventListener("mousedown", (e) => {
  isDown = true;
  hasMoved = false; // reset: a new press starts as a potential click
  startX = e.pageX;
  dragStartTranslate = currentTranslate; // anchor the drag to where it is now
});
// Mouse Button Released
scrollbar.addEventListener("mouseup", () => {
  if (!isDown) return;
  isDown = false;
  scrollbar.classList.remove("is-grabbing");
});

//Mouse Moving
scrollbar.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  e.preventDefault(); // Stop text highlights or image drag ghosts

  // Calculate how many pixels the mouse shifted
  const moveX = e.pageX - startX;

  // Only count it as a drag once the pointer passes a small threshold
  if (!hasMoved && Math.abs(moveX) > 4) {
    hasMoved = true;
    scrollbar.classList.add("is-grabbing");
  }

  // Offset from the position the drag started at
  currentTranslate = dragStartTranslate + moveX;

});

// After a drag remove click 
scrollbar.addEventListener("click", (e) => {
  if (hasMoved) {
    e.preventDefault();
    e.stopPropagation();
    hasMoved = false;
  }
}, true);

let lastTime = 0;
function updateLoop(currentTime) {

  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Auto-scroll only when the user is neither dragging nor hovering
  if (!isNaN(deltaTime) && deltaTime < 0.1 && !isDown && !isHovering) {
    //Multiply your value by deltaTime
    currentTranslate -= deltaTime * 60; // Adjust the multiplier for speed
  }

  // Seamless loop
  if (loopWidth > 0) {
    while (currentTranslate <= -loopWidth) {
      currentTranslate += loopWidth;
      dragStartTranslate += loopWidth;
    }
    while (currentTranslate > 0) {
      currentTranslate -= loopWidth;
      dragStartTranslate -= loopWidth;
    }
  }

  scrollbar.style.transform = `translateX(${currentTranslate}px)`;
  requestAnimationFrame(updateLoop);
}
updateLoop();
