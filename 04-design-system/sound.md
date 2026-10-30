# Sound

Foil's sound is the air a blade cuts through, and a brief, low steel. Sounds are dry, nothing is piercing, and every game action has its own, at a volume that depends on its importance.

Playable demo of every sound: [Foil Engine — Motion and sound](https://claude.ai/artifact/L3r6QeMqEfKMHE2FvobHjr).

## Principles

1. **Dry.** No echo or reverb. The steel rings briefly (under half a second) and stops.
2. **Air, paper, steel.** Only three materials: the breath (a blade or a card passing), the rustle and small weight of a card being placed, and the low steel that rings.
3. **Low and muted.** Nothing above 2.5 kHz in the body of the sounds, and a master filter at 5.2 kHz. The steel rings between B2 and G#4 (123 to 415 Hz). Only the writing of ENGINE goes up to G#5 (830 Hz).
4. **It moves in space.** The swishes cross the stereo field in the direction of the gesture: a card going toward the opponent moves right, a recycle comes back left.
5. **A single key: E.** The steel plays the notes of the foil chord (E, G#, B, D#). Two sounds played together never clash.
6. **Never exactly the same twice.** Each sound varies by ±2.5% in pitch and uses different noise on every play, so that an action repeated a hundred times per game never becomes mechanical.
7. **Three levels.**
   - **Loud** (full volume): moments that change the game. Start and end, your turn, showdown, conquer, point scored, champion, the AI playing.
   - **Medium** (−2.5 dB): game actions. Play, cast, draw, channel, move, the chain, damage.
   - **Subtle** (−5 dB): small gestures. Exhaust, focus, counters, targeting, emotes, messages.

## The logo

| Sound | Moment |
| --- | --- |
| `rotation` | The card spins: a small rustle each time it passes edge-on, more and more spaced out |
| `coup` | The foil strikes: a big left-to-right swish, a low push of air, the steel on E3 |
| `vague` | The wave under Foil: a swish that undulates with it, doubled by a low layer, and a B note that closes it |
| `lettre` | Each letter of ENGINE: a quick pen stroke and a short note, climbing the chord an octave above the steel (E4 to G#5) |

## The game

| Sound | When | Level | Construction |
| --- | --- | --- | --- |
| `matchFound` | Opponent found | Loud | Swish, then low E and B |
| `gameStart` | Game start | Loud | Two crossing blades (fencing salute), low push, steel |
| `initiative` | First player roll | Loud | Slowing rustles, then a note that lands on the result |
| `mulligan` | Cards sent back at mulligan | Medium | Two slides toward the deck |
| `yourTurn` | Start of your turn | Loud | E-B pad and a clear note on E4 |
| `endTurn` | End of turn | Medium | Falling swish and a small weight |
| `timer` | Time almost up | Medium | Two ticks |
| `victory` | Victory | Loud | The game-start salute, then the full chord |
| `defeat` | Defeat | Loud | E then low B, falling |
| `playerLeft` | Opponent disconnected | Medium | A note and a dull thud |

### Start of turn (A, B, C, D)

| Sound | When | Level | Construction |
| --- | --- | --- | --- |
| `awaken` | Cards ready up | Medium | Rising swish and three rustles |
| `hold` | Point scored by holding a battlefield | Loud | Tick and steel on E and B |
| `channel` | Runes channeled (turn phase) | Medium | One stone placed per rune (low weight and an E note, then G#) |
| `draw` | Draw | Medium | Card slide and rustle |

### Cards

| Sound | When | Level | Construction |
| --- | --- | --- | --- |
| `playUnit` | Unit played | Medium | Slide, then card placed |
| `playChampion` | Champion played | Loud | Card placed with weight, low push and steel on E3 |
| `playSpell` | Spell cast | Medium | Swish and two notes (E, B) |
| `playGear` | Gear attached | Medium | Card placed and a small metallic clink on B |
| `ability` | Ability activated | Subtle | Tick and B |
| `exhaust` | Card exhausted | Subtle | Rustle |
| `move` | Unit moved | Medium | Swish that crosses in the direction of the move |
| `recycle` | Card recycled | Medium | Slide toward the deck |
| `trash` | Card discarded | Medium | Slide and dull weight |
| `banish` | Card banished | Medium | Fading swish and low B |
| `reveal` | Card revealed | Subtle | Rustle and B |
| `shuffle` | Deck shuffled | Medium | A burst of rustles |

### Combat and score

| Sound | When | Level | Construction |
| --- | --- | --- | --- |
| `showdown` | A showdown starts | Loud | Two converging blades, low push, E3 |
| `focus` | Focus passes | Subtle | Tick |
| `chainAdd` | Effect added to the chain | Medium | Card placed and G# |
| `chainResolve` | The chain resolves | Medium | E and a small weight |
| `damage` | Damage dealt | Medium | Dull thud |
| `touche` | Unit destroyed | Loud | Strike swish, push of air, steel on E4 |
| `conquer` | Battlefield conquered | Loud | The logo strike, and a B that extends it |
| `score` | Point scored | Loud | Two rising notes (E, G#) |
| `buff` | Might increased | Subtle | Two rising notes (B, E) |
| `heal` | Heal | Subtle | Soft E-B pad |

### Tools

| Sound | When | Level | Construction |
| --- | --- | --- | --- |
| `autopay` | Automatic payment | Medium | One stone tick per exhausted rune |
| `rewind` | Rewind | Medium | Three slowing ticks, right-to-left swish |
| `forward` | Forward | Medium | Three accelerating ticks, left-to-right swish |
| `counter` | Counter changed | Subtle | Tick |
| `target` | Target chosen | Subtle | Small swish and tick |
| `emote` | Emote received | Subtle | Small weight and G# |
| `chat` | Message received | Subtle | Double tick |
| `erreur` | Action refused by the engine | Loud | Two dull thuds |
| `foil` | The AI makes a play, a simulation finishes | Loud | Foil chord arpeggiated over a wide swish |

## Outside the game

The card library is silent: search, filters, scrolling, hover and a card's detail page have no sound. Motion is enough.

### Deckbuilder ("Full" mode only)

| Sound | When | Level | Construction |
| --- | --- | --- | --- |
| `deckAdd` | Card added to the deck | Subtle | Slide and card placed |
| `deckRemove` | Card removed from the deck | Subtle | Slide moving away |
| `deckComplete` | The deck becomes complete and valid | Medium | Three rising notes (E, G#, B) |

Saving, importing and exporting stay silent, with just an on-screen message.

### Booster opening (sealed)

| Sound | Moment | Level | Construction |
| --- | --- | --- | --- |
| `boosterCut` | The blade slices off the top of the booster | Loud | Blade swish, then a burst of rustles crossing from left to right |
| `cardsRise` | The cards come out of the booster | Medium | Three slides close together |
| `swell` | Wait before a rare or better card | Medium | A low swish that rises, longer at each rarity tier |

The booster contains 13 cards: 7 commons, 3 uncommons, 2 rares or better and 1 foil of any rarity. The commons flip in a cascade, each with its rustle. The six other cards flip one by one, each with the sound of its rarity. A foil adds the `foil` sound to that of its rarity.

Each rarity has its reveal, and the intensity goes up a notch at each tier:

| Rarity | Sound | What you hear |
| --- | --- | --- |
| Common | `revealCommon` | A rustle, barely |
| Uncommon | `revealUncommon` | Flip and an E note |
| Rare | `swell`, then `rareReveal` | Short wait, flip, steel on E3 and B3 |
| Epic | Long `swell`, then `revealEpic` | Longer wait, low push, E-B-E chord |
| Alt art | `swell`, then `revealAltart` | The epic plus the foil chord |
| Overnumbered | `swell`, then `revealShowcase` | The logo strike, the full pad and the foil chord |
| Signed | Like the overnumbered, then `signatureStroke` × 6 | During the signature sweep, the same pen strokes as the writing of ENGINE |
| Ultimate | `swell`, then `revealUltimate` | A very low push, the logo strike, the five-note pad, the foil chord, and a low B that rings out |

### Card types

Each type has its gesture and its sound when it arrives on the table:

| Type | Sound | Construction |
| --- | --- | --- |
| Unit | `playUnit` | Slide, then card placed |
| Champion | `playChampion` | Card placed with weight, low push, steel on E3 |
| Legend | `legend` | Slow swish, low push and three rising notes (E, B, E): presence |
| Spell | `playSpell` | Swish and two notes (E, B) |
| Signature card | `signature` | The spell, with three notes of the foil chord (E, G#, B) |
| Gear | `playGear` | Card placed and a small metallic clink |
| Battlefield | `battlefield` | Wide, low swish, two dull weights: ground settling in |

Every sound is synthesized live with the Web Audio API: zero files, tweakable in code, identical on the showcase website and the simulator.

## Settings

- **Simulator**: sound on by default, with three settings. "Full" plays everything, "Essential" keeps only the loud and medium levels, and "Off" mutes everything. A mute button is always visible in the top bar, and a volume setting is in the options.
- **Showcase website**: sound off by default. The visitor turns it on with a click, and the choice is remembered in their browser.
- The browser only allows sound after a user action. The logo entrance is therefore silent until the visitor has turned sound on.
