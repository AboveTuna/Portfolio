
// Get the query string from the browser's address bar
const queryString = window.location.search;
// Turn it into a searchable object
const urlParams = new URLSearchParams(queryString);
// Get the value of the "g" parameter
const gameId = urlParams.get('g');

// games, gameArt, assetUrl come from data.js (loaded before this script)

// pagegame.html lives in pages/, so asset paths resolve one level up.
const BASE = "../";

const game = games.find((g) => Number(g.id) === Number(gameId));

if (game) {

    document.title = `${game.title} — AboveTuna`;

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

    // Both store buttons (Play Now + the hero's Wishlist now) go to this game's page.
    document.querySelectorAll(".wp-cta-buy, .wp-cta-wishlist").forEach((a) => {
        a.setAttribute("href", game.link);
    });
    if (game.developer) document.querySelector(".wp-detail-developer").textContent = game.developer;
    if (game.released) document.querySelector(".wp-detail-released").textContent = game.released;
    if (game.platform) document.querySelector(".wp-detail-platform").textContent = game.platform;
    if (game.store) document.querySelector(".wp-detail-store").textContent = game.store;

    // Trailer: hook the stream up to the player and make "Watch trailer"
    // jump down to it. Hide both if the game has no trailer.
    const trailerSection = document.querySelector(".wp-trailer-section");
    const trailerBtn = document.querySelector(".wp-cta-trailer");
    const video = document.querySelector(".wp-trailer");

    if (game.trailer) {
        video.poster = game.trailer.poster;
        attachTrailer(video, game.trailer.src);

        trailerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            trailerSection.scrollIntoView({ behavior: "smooth", block: "center" });
            video.play().catch(() => {}); // stream may still be attaching; the player's own button still works
        });
    } else {
        trailerSection.style.display = "none";
        trailerBtn.style.display = "none";
    }

    // Tags: one pill per store tag. Hide the label if none.
    const tagRow = document.querySelector(".wp-tag-row");
    const tagLabel = document.querySelector(".wp-tags-label");
    if (game.tags && game.tags.length) {
        tagRow.innerHTML = "";
        game.tags.forEach((tag) => {
            const pill = document.createElement("span");
            pill.className = "wp-tag";
            pill.textContent = tag;
            tagRow.appendChild(pill);
        });
    } else {
        tagLabel.style.display = "none";
        tagRow.style.display = "none";
    }

    // Screenshots: one lazy-loaded image tile per screenshot (they sit below
    // the fold). If the game has none, hide the whole section instead of
    // leaving empty placeholder boxes.
    const shotsSection = document.querySelector(".wp-shots-section");
    const shotsScroll = document.querySelector(".wp-shots-scroll");

    if (game.screens && game.screens.length) {
        shotsScroll.innerHTML = ""; // drop the static placeholder tiles
        game.screens.forEach((src, i) => {
            const shot = document.createElement("div");
            shot.className = "wp-shot";
            const img = document.createElement("img");
            img.src = assetUrl(src, BASE);
            img.alt = `${game.title} screenshot ${i + 1}`;
            img.loading = "lazy";
            img.decoding = "async";
            shot.appendChild(img);
            shotsScroll.appendChild(shot);
        });
    } else {
        shotsSection.style.display = "none";
    }

} else {
    // Missing or unknown ?g= — send the visitor to the full list instead of
    // showing an empty template.
    location.replace("gamelibrary.html");
}

// Steam only serves trailers as HLS streams (.m3u8). Safari plays those
// natively; other browsers get hls.js, fetched only when it's needed.
const HLS_JS = "https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js";

function attachTrailer(video, src) {
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        return;
    }
    const script = document.createElement("script");
    script.src = HLS_JS;
    script.onload = () => {
        if (!Hls.isSupported()) return;
        // Don't download any video until the visitor presses play.
        const hls = new Hls({ autoStartLoad: false });
        hls.loadSource(src);
        hls.attachMedia(video);
        video.addEventListener("play", () => hls.startLoad(), { once: true });
    };
    document.head.appendChild(script);
}

// Parallax scroll effect (same logic as home.js): shift the hero background
// at a fraction of the scroll speed so it drifts behind the page.
const heroBg = document.getElementById('wp-game-hero-bg');
window.addEventListener('scroll', function() {
  const speed = -0.3; // Adjust this value for different parallax speeds
  const yPos = -(window.scrollY * speed);
  // keep the CSS scale(1.06) so the layer stays oversized while it moves
  heroBg.style.transform = `translateY(${yPos}px) scale(1.06)`;
}, { passive: true });
