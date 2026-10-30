# Foil

Simulation engine and AI for the Riftbound TCG. It plays against you, and it plays ahead of you.

Foil is an unofficial, free community project. Notice to display on the website and in the app:

> Foil was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.

This policy allows fan projects to use Riot's assets (cards, illustrations, card backs), provided the project stays free: no subscription, no paid content, no crowdfunding. It also forbids using Riot's logos and trademarks in the project's identity. They may therefore appear on the cards themselves, but never in Foil's logo, name or communication.

## The name

The name is **Foil**. "Engine" says what it is: Foil is an engine. The two words are never joined and never share the same color.

- In a heading or logo: "Foil" alone, or "Foil" followed by "ENGINE" as a descriptor.
- In running text: "Foil". "Foil Engine" only when you need to say what the product is (first mention, introduction).
- Never "FoilEngine" joined, nor "FOIL ENGINE" as a single block.
- The technical package name stays `foilengine` (npm, GitHub), because "foil" alone is already taken.


*Foil* has three meanings, and the brand draws on all three:

- **The foil card**: the holographic card, the one you tilt under the light. It is the brand's visual signature.
- **The fencing foil**: the duel, precision, the touch. It is the brand's structure: straight lines, sharp angles, a touch red.
- **The literary *foil***: the adversary who reveals the hero's weaknesses. It is the AI's role.

The foil is the weapon of precision and strategy. You don't win by hitting hard, but by reading your opponent, waiting for the opening and landing the touch. That is exactly what the AI does.

The idea that ties it all together: **the engine finds the weak point.** It crosses blades with your deck, reveals where it gives way, and shows it with a red touch.

## The tone: noble, without pomp

Foil has the bearing of a fencing hall: mastery, restraint, exact gestures. Nobility comes from precision, not decoration.

- **Yes**: an elegant didone for headings, plenty of space, fine rules, an aged gold (`laiton`, brass) in rare touches, a calm and courteous tone.
- **No**: crests, coats of arms, crowns, parchment textures, flat gilding, gothic fonts. That would be costume, not nobility.

## Principles

1. **En garde, then the touch.** The interface is calm and clean. Everything is still until something happens, then motion is fast and decisive.
2. **Foil is only for what matters.** The holographic sheen appears in only two places: the logo, and the moments when the AI acts. If everything shines, nothing stands out.
3. **The numbers are honest.** A winrate is always shown with its sample size and interval (`54.2% ± 1.1 · n=10000`). The engine does not round to impress.
4. **The weak point is shown, not guessed.** When the AI identifies a weakness (a card, a play, a matchup), it marks it with the WeakPoint component and gives its cost in numbers.
5. **Rules rather than shadows.** Interface surfaces are separated by `hairline` rules. The `shadow-card` shadow is reserved for game cards lying on the table.

## The cards

Foil does not draw cards. It displays the official Riftbound cards as they are, front and back:

- **Main deck cards**: the standard official Riftbound back.
- **Legends and battlefields**: the official black back.
- **Runes**: the official white back. Not handled yet.

The design system takes care of everything around the card: the rarity frame, the halo, the foil sheen, game states and motion. It never touches the card's content.

## Logo

The mark is a tilted playing card, pierced by a fencing foil. The blade cuts the card in two, and the space around the blade is cut out of the card (not painted), so the logo works on any background.

| File | When to use it |
| --- | --- |
| `foilengine-mark-foil.svg` | Primary version on a light background (`paper`). Website, app header, social media. |
| `foilengine-mark-foil-dark.svg` | Primary version on a dark background. |
| `foilengine-mark-ink.svg` | Single color on a light background: favicon, monochrome, print, sizes below 24px. |
| `foilengine-mark-paper.svg` | Single color on a dark background. |

Rules:

- Below 24px, always the single-color version. At that size the foil gradient turns into a smudge.
- Clear space: the width of the foil's guard (one eighth of the logo's size) all around.
- The wordmark: "Foil" in `display` (Bodoni Moda 600), color `ink`. Then "Engine" in Inter Tight 600, uppercase, letter-spacing 0.32em, color `laiton`, about a quarter of the height of "Foil", aligned on its baseline and separated by a space at least as wide as the "l".
- Vertical lockup (primary logo): the mark on top, "Foil" centered below, the foil wave under "Foil", and "ENGINE" to the right of "Foil".
- Horizontal lockup (headers, simulator bar): the mark, then "Foil" with its wave, then "ENGINE".
- The wave is the trace of the foil: a two-crest wave, in the foil gradient, under "Foil" only. It only appears when there is room to read it (above 32px height for "Foil"); below that, the lockup is shown without the wave.
- Do not recolor the card other than in `ink`, `paper` or foil. Do not straighten the card: its 12° tilt is part of the brand.
- On screen, the foil version may react to the pointer (see Motion). In every other case, it stays still.

## Two surfaces, one brand

| | Showcase website | Simulator |
| --- | --- | --- |
| Default theme | Piste (light) | Night (dark), for long sessions |
| Headings | `display` (Bodoni Moda) | `heading` (Inter Tight). No Bodoni on the game screen |
| Density | Airy (`space-12` to `space-16` between sections) | Compact (`space-2` to `space-4`) |
| Foil | Logo, hero, captures of AI moments | AI plays, end of simulation |
| Sound | Off by default, can be turned on | On by default, can be muted at any time |

What never changes from one surface to the other: the logo, the `signal` red, the straight lines, the motion grammar and the sound palette.

## Color

Two themes: **Piste** (light) and **Night** (dark).

- **The base is neutral**: `paper`, `paper-raised`, `ink`, `ink-muted`, `hairline` and `steel` make up 95% of any surface.
- **A single red**: `signal`, the red of the touch. It goes on the action that matters (confirm a play, concede), on scored points and on keyboard focus. Never two `signal` buttons in the same view. For text, use `signal-text`.
- **`laiton`, the aged gold (brass)**, brings the noble touch: the rule under a website heading, the frame of a legend or of a reference result, the divider of an important section. Always as a 1px rule or a very small ornament, never as a flat fill, never for body text. At most one `laiton` element per screen.
- **`win` green** for what is favorable (victory, winrate above 50%). The red/green pair never carries information on its own: a number or an icon always goes with it.
- **The foil** (`foil-cyan`, `foil-violet`, `foil-pink`, `foil-gold`) is only used as a gradient, laid over `foil-base`. None of these four tones is used as an interface fill, text color or border.

## Typography

Three families, each with a fixed role:

- **`display`: Bodoni Moda.** A high-contrast didone. Its fine serifs echo the blade. Reserved for the wordmark and the showcase website's headings (`display-xl`, `display-l`, `display-m`), never for body text or the simulator.
- **`sans`: Inter Tight.** All interface text. `label` is the only uppercase style, with 0.08em letter-spacing.
- **`mono`: JetBrains Mono.** Everything that comes out of the engine: numbers, logs, game notation. As soon as a number is a simulation result, it is set in `data` or `data-l`.

All three are on Google Fonts:
`https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400..900&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap`

## Shapes and spacing

- 4px grid (`space-1` to `space-16`).
- By default, everything has sharp corners (`radius-none`). Controls get `radius-sm` (2px). Only game cards have a real rounding (`radius-card`), so they are recognizable at first glance.
- **Piste lines** are the brand's pattern: thin vertical `steel` rules, like the markings on a fencing piste (center line, en-garde lines). Use them to structure a board, a game timeline or a section background, with three to five lines, never more.

## Voice

- Brand documents and the product interface are in English, because the Riftbound community is international.
- The tone is that of a fencing master: calm, courteous, precise. Say what happened, with the number, without familiarity or emphasis. "Simulated 10,000 games. Your list wins 54.2% ± 1.1." rather than "Great news, your deck is awesome!".
- The AI talks about its plays as analysis, not as a victory: "Opening found on the left battlefield." rather than "Gotcha!".
- No exclamation marks, no emoji, no superlatives.
- Game terms use Riftbound's official vocabulary (legend, battlefield, rune, might). Don't translate them, and don't reinvent them.

## Components

- **FoilSurface**: the holographic surface. It is the only place in the system where the foil tones appear.
- **Button**: primary `ink`, critical `signal`, secondary as an outline.
- **GameCard**: a game card on the table, with its "played by the AI" state.
- **WeakPoint**: the weak-point marker placed by the AI.

Motion design is detailed in the Motion section, and sound in the Sound section.
