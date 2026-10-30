# Foil Engine — brand kit

Everything you need to use the Foil identity: logos, animations, banners, sounds, tokens and documentation.

Foil was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

## Contents

### 01-logos
- `svg/`: the vector source files, with text converted to outlines (no fonts required).
  - `foil-mark-*`: the mark alone (the card and the foil blade).
  - `foil-horizontal-*`: mark, "Foil", wave and "ENGINE" in a row. `foil-horizontal-compact-*`: the same without the wave, for small sizes.
  - `foil-vertical-*`: mark on top, "Foil", wave and "ENGINE" below. This is the primary logo.
  - `foil-wordmark-*`: "Foil ENGINE" alone.
- Each logo comes in four variants:
  - `dark`: for dark backgrounds, foil card, paper text, ENGINE in brass;
  - `light`: for light backgrounds, foil card, ink text, ENGINE in dark brass;
  - `ink`: single color, ink;
  - `paper`: single color, paper.
- `png/`: each SVG at 512, 1024 and 2048 px wide, on a transparent background.
- `favicons/`: `favicon.ico` (16, 32, 48), `favicon.svg`, PNGs from 16 to 64 px (ink and paper), `apple-touch-icon-180.png`, app icons at 192, 512 and 1024, and a 500 px avatar for GitHub or Discord.

Usage rules: below 24 px, always use the single-color version. The wave only appears when "Foil" is taller than 32 px. Never join "Foil" and "ENGINE", and never give them the same color in the color versions. Details in `04-design-system/README.md`.

### 02-motion
- `logo-vertical.mp4` (1080 × 1080, 5 s, with sound) and `.gif`.
- `logo-horizontal.mp4` (1920 × 1080, with sound) and `.gif`.
- `logo-story.mp4` (1080 × 1920, with sound), for stories and vertical formats.
- `booster-opening.mp4` (1920 × 1080, with sound) and `.gif`: opening an Origins booster with a signed card. The cards are placeholders: in the app, they will be the real images.

Videos are 60 frames per second (H.264, AAC audio). GIFs are 30 frames per second (25 for the booster) and, by nature, have no sound.

### 03-reseaux (social media)
Each banner comes in `dark` and `light`:

| File | Size |
| --- | --- |
| `x-twitter-header` | 1500 × 500 |
| `linkedin-banner` | 1584 × 396 |
| `discord-banner` | 960 × 540 |
| `twitch-banner` | 1200 × 480 |
| `open-graph` (link preview) | 1200 × 630 |
| `github-social-preview` | 1280 × 640 |
| `youtube-banner` (content kept inside the central safe area) | 2560 × 1440 |
| `instagram-post` | 1080 × 1080 |
| `instagram-story` | 1080 × 1920 |

The square avatar is in `01-logos/favicons/avatar-github-discord-500.png`.

### 04-design-system
- `README.md`: the brand book (name, tone, logo, colors, typography, shapes, voice, components).
- `motion.md`: curves, durations and every gesture, including the logo entrance and the booster opening.
- `sound.md`: the complete sound palette, with its levels.
- `cartes.md` (cards): what the databases return, rarities, treatments, promos, and boosters per set with their sources.
- `tokens.json`: the source tokens.
- `tokens.css`: the same as CSS variables, light and dark themes, ready to import.

### 05-sons (sounds)
- `wav/`: the 66 sounds, one file per sound (48 kHz, stereo), trimmed at the end of the sound.
- `foil-sound.js`: the sound engine, as a JavaScript module. Every sound is synthesized live, with no audio files: this is the version to use in the website and the simulator. The WAVs are for video, social media and listening.

### 06-polices (fonts)
Bodoni Moda (headings and wordmark), Inter Tight (interface) and JetBrains Mono (data), as TTF, with their licenses. All three are under the SIL Open Font License: free to use, including commercially, and redistributable with their license.

### 07-demo
`foil-motion-et-son.html`: the interactive demo of every gesture and every sound, usable offline. Keep the `webfonts/` folder next to the file.
