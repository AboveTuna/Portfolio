
// Parallax scroll effect
const heroBg = document.getElementById('wp-hero-bg');
window.addEventListener('scroll', function() {
  const speed = -0.3; // Adjust this value for different parallax speeds
  const yPos = -(window.scrollY * speed);
  // keep the CSS scale(1.06) so the layer stays oversized while it moves
  heroBg.style.transform = `translateY(${yPos}px) scale(1.06)`;
}, { passive: true });

// Game Scrollbar

const scrollbar = document.querySelector(".wp-games-scroller-inner");
const gameTemplate = document.querySelector(".wp-card-template");

// games, gameArt, gameHref come from data.js (loaded before this script)

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

// With only a few games, two copies can be narrower than a wide screen, leaving
// an empty gap just before the loop wraps. Keep adding copies until the track
// covers one full loop plus the viewport.
function fillTrack() {
  while (loopWidth > 0 && scrollbar.offsetWidth < loopWidth + window.innerWidth) {
    appendGameCards();
  }
}
fillTrack();

// Card widths are fixed, but remeasure on resize in case layout shifts.
window.addEventListener("resize", () => {
  measureLoopWidth();
  fillTrack();
});

/* --- CLICK AND DRAG CORE ENGINE --- */

let isHovering = false;
let isDown = false;
let hasMoved = false; // true once the pointer drags past the threshold

let currentTranslate = 0;     // live rendered offset
let dragStartTranslate = 0;   // offset captured at the moment a drag begins
let startX;                   // pointer x captured at the moment a drag begins

// Mouse Enters the Container Window
scrollbar.addEventListener("mouseenter", () => {
  isHovering = true; // pauses the auto-scroll (see updateLoop)
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

// Visitors who ask their OS for reduced motion get a still row they can drag.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let lastTime = 0;
function updateLoop(currentTime) {

  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Auto-scroll only when the user is neither dragging nor hovering
  if (!isNaN(deltaTime) && deltaTime < 0.1 && !isDown && !isHovering && !reduceMotion.matches) {
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
