# Cards, rarities and treatments

What Foil receives from the databases, and how each case is displayed. Foil never redraws a card: it displays the official image, and the design system only acts on what surrounds it (rarity frame, halo, sheen, motion, sound).

## What the databases return

**Riftcodex** (open API, no key): one entry per printing, with these fields:

- `classification.rarity`: the base rarity (Common, Uncommon, Rare, Epic…), `classification.type` (Unit, Spell, Gear, Legend, Battlefield, Rune…) and `classification.supertype` (Champion, Token…).
- `metadata.alternate_art`, `metadata.overnumbered` and `metadata.signature`: three booleans.
- `collector_number`, `riftbound_id` (for example `ogn-011-298`), `set.set_id` and `set.label`.
- `media.image_url` and `media.artist`.
- `orientation`: `portrait` or `landscape`. Battlefields are landscape.

Riftcodex says **neither whether a card is foil, nor whether it is a promo**. Both pieces of information come from the TCGplayer catalog: each product there has "print types" (normal or foil), a catalog rarity (Common, Uncommon, Rare, Epic, Showcase, Promo) and a dedicated set for promos. The two sources will therefore need to be cross-referenced: Riftcodex for gameplay, TCGplayer for printings and prices. Both share the TCGplayer identifier (`tcgplayer_id`).

**The collector number also carries the information**, which makes it possible to check the flags:

| Marker | Meaning | Example |
| --- | --- | --- |
| Suffix `a` | Alternate art | `007a/298` |
| Number above the set total | Overnumbered | `238/219` |
| Asterisk | Signature (signed overnumbered) | `299*/298` |
| Suffix `b` or another letter | Product variant (often a box set promo) | `202b` |
| Prefix `R` | Rune | `R04` |
| Prefix `T`, and `//` for a double-sided card | Token | `T06 // T04` |

## Base rarities

| Rarity | Foil in boosters | Foil token | Frame around the card |
| --- | --- | --- | --- |
| Common | No (except in the foil slot) | `rarity-common` | Thin, stone |
| Uncommon | No (except in the foil slot) | `rarity-uncommon` | Thin, teal |
| Rare | Always | `rarity-rare` | Thin, magenta, short anticipation halo on reveal |
| Epic | Always | `rarity-epic` | Thin, orange, long anticipation halo on reveal |

## Collector treatments

They add to the base rarity. An epic alt art is still an epic in play.

| Treatment | How to recognize it | Foil treatment |
| --- | --- | --- |
| **Alt art** | `alternate_art`, suffix `a` | `laiton` frame, center reveal, foil sheen |
| **Special art** | Radiance variant (K/DA theme, for example). Identify by name or catalog | Same as alt art |
| **Overnumbered** | `overnumbered`, number above the set total | `laiton` frame, center reveal, logo strike sound, foil pad and chord |
| **Signed** | `signature`, asterisk in the number | Same as overnumbered, then the signature is revealed by a left-to-right sweep, in brass, before returning to white. Sound: the pen strokes of ENGINE |
| **Ultimate** | Only one card per set that has one (Baron Nashor in Unleashed, Packed Amphitheater in Radiance). It has no flag: identify by name or catalog rarity | The highest tier: longer wait, darker room, bigger card, `revealUltimate` sound |
| **Foil** | Catalog information, not Riftcodex. It is a property of the copy, not of the card | Iridescent veil and sheen on flip |
| **Metal** | Prize wall rewards (for example metal Leona). Catalog only | `steel` sheen instead of the foil sheen: the brand's steel |
| **Textured or alt art rune** | Prefix `R` and catalog variant | Out of scope for now |

## Promos

Promos are versions of existing cards that carry the PROMO stamp. They never come out of boosters. You get them:

- by taking part in Nexus Nights (weekly in-store events, 3-card packs, about 25 cards per season with one headline card);
- at set launch events (Release Events, Pre-Rift);
- as a judge at an official event;
- at the tournament prize wall (including metal cards);
- in box sets: Arcane Box Set, Worlds Bundle, Vault Bundles.

In Foil, a promo is shown with a "Promo" badge and its origin (Nexus Night, Release Event, Judge, Prize wall, Box set) on the card's detail page. For gameplay, it is the same card: the promo shares the rules of the normal version.

## Booster contents

Tokens and runes are not simulated. Foil's booster therefore contains 13 cards instead of 14.

| Set | Structure | Source |
| --- | --- | --- |
| Origins | 7 commons, 3 uncommons, 2 "rare or better" slots (always foil), 1 foil slot of any rarity, 1 token or rune | Official (Riot, "Collectability in Riftbound: Origins") |
| Spiritforged, Unleashed, Vendetta | Same structure as Origins | Retailer product pages |
| Radiance | 7 commons, 3 uncommons, 1 foil slot (common, uncommon, rare or epic), 1 rare or epic, 1 showcase slot (rare, epic, alt art, special art, overnumbered or ultimate), 1 token or rune | Riot's Radiance presentation, as reported by the press |

Reveal order in Foil: the commons, the uncommons, the foil slot card, then the two "rare or better" slots. Any collector card is always revealed last.

## Pull rates

Riot only publishes some of the rates. The others come from counts of boosters opened by the community. Foil stores them in each set's data, never hard-coded, so they can be corrected.

| | Origins | Unleashed | Radiance |
| --- | --- | --- | --- |
| Epic | ~1 in 4 boosters (official) | ~27% (community, 168 boosters) | ~27% (community, 330 boosters) |
| Alt art | ~2 per 24-pack box (official) | 2 to 4 per box (community) | Alt art or special art ~9% (community) |
| Overnumbered | ~1 per 3 boxes (official) | ~1.7% (community) | ~1.2% (community) |
| Signed | 1 in 10 overnumbered (official) | Same ratio assumed | None seen in 330 boosters |
| Ultimate | None | ~0.1% (community) | 1 in 4,000 (official) |
| Foil slot | Mostly common or uncommon, can go up to rare or epic (official, no numbers) | Same | Same |

Values used for the foil slot, in the absence of published numbers: common 62%, uncommon 30%, rare 6%, epic 2%. To be replaced as soon as a reliable count exists.

Sources: [Collectability in Riftbound: Origins](https://playriftbound.com/en-us/news/announcements/collectability-in-riftbound-origins/) · [TCGtalk, Unleashed](https://tcgtalk.com/guides/unleashed-riftbound-pull-rates-box-opening) · [Nerdsnack, Radiance](https://nerdsnack.com/?p=9565) · [Riftcodex, card model](https://riftcodex.com/docs/endpoints/cards) · [TCGOdds, rarity guide](https://tcgodds.pages.dev/riftbound/rarity-guide/) · [Riftbound.gg, promo list](https://riftbound.gg/riftbound-promo-cards-list-how-get/)
