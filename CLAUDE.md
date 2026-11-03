# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website for AboveTuna, an indie game studio founded by Dior Zaverdino: plain HTML, CSS, and vanilla JS. Site copy speaks as the studio ("we"); Dior appears only as the founder in the About section. The repo and GitHub Pages path are still named `Portfolio`. There is no build step, package manager, linter, or test suite (Node is not installed on this machine).

- **Preview locally:** `python3 -m http.server 8123` from the repo root, then open http://localhost:8123 (`.claude/launch.json` defines this as the `portfolio` preview).
- **Deploy:** pushing to `main` runs `.github/workflows/static.yml`, which uploads the whole repo as-is to GitHub Pages (https://abovetuna.github.io/Portfolio/). GitHub Pages is case-sensitive but macOS is not, so asset paths must match filename case exactly.

## Architecture

Pages: `index.html` (site root: hero, games scroller, about), plus `pages/gamelibrary.html` (all games grid), `pages/pagegame.html` (one game's detail page), and `pages/contactpage.html`. Each has a matching script in `scripts/`.

**Game data is a single source of truth in `scripts/data.js`.** It defines the global `games` array and the `assetUrl(path, base)` / `gameArt(game, base)` / `gameHref(game, base)` helpers. These are deliberately plain globals, not ES modules: each page loads `data.js` with a classic `<script>` *before* its page script, so the site also works when opened from `file://` (browsers block module scripts there). Keep that load order, and don't reintroduce `import`/`export`.

**Asset paths:** `img` and `screens` entries are either paths relative to `assets/` (e.g. `game_art/brainrot.jpg`) or full `https://` URLs; `assetUrl` passes URLs through unchanged. The Steam games (Brainrot, Hidden in Plain Cake) load their screenshots, trailers, and the Hidden in Plain Cake key art directly from Steam's CDN. The Steam app details API (`https://store.steampowered.com/api/appdetails?appids=<appid>`) lists current screenshot and trailer URLs. Each page script declares a `BASE` constant giving the path back to the site root (`""` for `index.html`, `"../"` for anything in `pages/`) and passes it into the helpers.

**Game detail routing:** cards link to `pages/pagegame.html?g=<id>`. `pagegame.js` finds the game whose `id` matches numerically (`?g=1` and `?g=01` both work), and redirects to the library if none does. Ids only need to be unique; array order controls the order of cards on the site. The game page also sets the tab title and points its store buttons (Play Now, Wishlist now) at `game.link`. On the detail page, `tags` (the store's genre tags, shown as pills), `screens`, and `trailer` are optional, and each one's section (plus the hero "Watch trailer" button) hides when absent. `developer`, `released`, `platform` and `store` fill the Details card. `desc` is rendered with `white-space: pre-line`, so `\n` / `\n\n` in the string become line and paragraph breaks.

**Trailers:** Steam only serves trailers as HLS (`.m3u8`) streams, so `trailer.src` is an HLS URL. `attachTrailer` in `pagegame.js` plays it natively where the browser supports HLS (Safari) and otherwise loads hls.js from cdnjs on demand. Nothing downloads until the visitor presses play.

**Cards:** `index.html` and `gamelibrary.html` each contain an identical `<template class="wp-card-template">` that `home.js` / `library.js` clone and fill in. Edit both templates together. The home scroller appends copies of the list until the track covers one loop plus the viewport (`fillTrack`), and uses `cards[games.length]` to measure one loop's width for the seamless auto-scroll/drag loop.

**Contact form:** `contact.js` validates client-side, then opens the visitor's email app with a pre-filled `mailto:` to the address on the page. There is no backend.

## Styling

All styles live in one `styles.css`, split into sections by banner comments (shared components, then per-page sections, then animations and media queries). Every class/id is prefixed `wp-`. The shared horizontal gutter is the `--wp-gutter` token. Headings use Fredoka (`.wp-heading`) and body text uses Plus Jakarta Sans. Each page loads both from Google Fonts, and that `<link>` needs `rel="stylesheet"`. `.wp-reveal` elements fade in through a CSS keyframe animation alone; no JS is involved. The parallax hero layers (`#wp-hero-bg`, `#wp-game-hero-bg`) are oversized with `scale(1.06)`, so the scroll handlers must keep that scale in the transform they write. Mobile layout lives in the media queries at the end of the file: the navbar becomes two rows below 560px, and grids stack below 760px.

Local images are JPEGs sized for how they're displayed (hero 1920px wide, key art 720×460, About photo 1400px). Convert new screenshots/art the same way (e.g. `sips -s format jpeg -s formatOptions 82 in.png --out out.jpg`) rather than committing multi-MB PNGs.
