# Motion

Motion follows a fencing bout: still in guard, one decisive action, then a return to calm that settles gently. Starts are sharp, arrivals are slow, and that contrast is what makes it fluid. Nothing loops. Every game action has its sound (Sound section), at a volume that depends on its importance, and it fires at the same instant as the motion.

Playable demo of both logos and every gesture, with sound: [Foil Engine — Motion and sound](https://claude.ai/artifact/L3r6QeMqEfKMHE2FvobHjr).

## Curves and durations

```css
:root {
  --dur-instant: 160ms;  /* hover, pressing a control */
  --dur-strike: 150ms;   /* the strike itself: blade, cut-through */
  --dur-lunge: 260ms;    /* lunge: place, open, confirm */
  --dur-recover: 360ms;  /* return to guard */
  --dur-sweep: 900ms;    /* foil sheen */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* sharp start, arrival that settles: the default */
  --ease-strike: cubic-bezier(0.5, 0, 0.1, 1);   /* sword strike: winds up, then hits */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* return to guard, wave, sheen */
}
```

**The damped spring.** When an element takes a hit (parry, touch, impact on the logo), it oscillates and settles: amplitude × e^(−5t) × cos(2π × 1.8 × t) over about 500ms. It is the system's only "bounce", and it is only used for an impact.

## The gestures

| Gesture | What it means | Motion | Sound |
| --- | --- | --- | --- |
| **Guard** | Rest | Nothing | Silence |
| **Lunge** | User action | 260ms `--ease-out`. A card comes from the hand, straightening up (−8° to 0°) and returning to full size (0.94 to 1) | Depends on the action (Sound section) |
| **Parry** | An opponent's attack is blocked | The element's edge lights up (a light rule that fades out in 420ms), and the element takes the hit with the damped spring (7px) | Depends on the action (Sound section) |
| **Riposte** | The AI answers your play | Parry, then a 40ms pause, then a lunge in `--ease-strike` toward the opponent, then a touch | `touche` |
| **Touch** | Point scored, unit destroyed | A red blade cuts across the element at the logo's angle (560ms `--ease-strike`), the element rotates 3° with the spring, and the number changes afterwards | `touche` |
| **Return to guard** | Close, cancel | 360ms `--ease-in-out`, slows down and settles | Depends on the action (Sound section) |

Reserved for the engine:

| Gesture | What it means | Motion | Sound |
| --- | --- | --- | --- |
| **Foil sheen** | The AI makes a play, a simulation finishes | A wide, soft iridescent sheen crosses the card once, in 900ms `--ease-in-out` | `foil` |
| **Weak point** | The AI marks a weakness | The diamond appears with a quarter turn (300ms `--ease-out`), a ripple escapes from it and fades, then a touch cuts across the target and the number appears | `touche` |

## The logo

Two animated versions, played only once per session on arrival, and skippable with a click.

### Vertical (about 3.1 s): website, loading screen, social media

1. **Spin** (1150ms, exponential ease-out): the foil card arrives spinning one and a half times, slightly tilted backwards (14°, straightening up), and grows from 88% to 100%. The light follows the angle: the card brightens when facing forward, darkens in profile, and the sheen glides over its surface as it turns. Sound: `rotation`.
2. **The strike** (150ms `--ease-strike`): the blade cuts through diagonally and the cut-out is traced along with it. A white flash runs along the cut-out, an air streak slices the screen along the blade's axis, and the card takes the hit in 3D with the damped spring. Sound: `coup`.
3. **Foil** (640ms `--ease-out`): the word rises 16px, is revealed from bottom to top and goes from blurred to sharp.
4. **The wave** (1000ms `--ease-in-out`): the foil's tip, a point of light with a halo, traces a foil wave under "Foil". Sound: `vague`.
5. **ENGINE**: the letters appear one by one, quickly (65ms apart, 340ms each), from blurred to sharp. Each letter has its note, and the six climb the chord. Sound: `lettre`.

### Horizontal (about 2.8 s): website header, simulator bar

Same sequence, shorter. The card spins only once (950ms). After the strike, "Foil" comes out of the blade from left to right, as if drawn, instead of rising. The wave and ENGINE follow as in the vertical version.

After that, the logo is at rest. Only the card's sheen still follows the pointer.

## Booster opening

Contents and order follow each set's data (Cards section). There are no runes or tokens.

1. **The booster arrives** (360ms `--ease-out`).
2. **The blade slices off the top**: an air streak crosses the top of the booster, and the seal strip flies off spinning (520ms).
3. **The cards rise** out of the booster, while the booster sinks and fades out.
4. **They line up face down** (official back), in two rows: the 7 commons on top, the 6 others below (480ms `--ease-out`, 30ms apart).
5. **The commons flip in a cascade**, all together, 70ms apart.
6. **The six other cards flip one by one**, with a wait that grows with rarity:
   - **Uncommon**: simple flip (320ms).
   - **Rare**: a `rarity-rare` halo rises for 420ms, then the card flips.
   - **Epic**: the halo rises for 700ms and the card lifts 6px before flipping.
   - **Alt art, overnumbered, signed**: the room darkens, the card comes to the center and grows (760ms), flips in one go (`--ease-strike`), and the foil sheen crosses it. On a signed card, the image's real signature (mask extracted once per card) is then revealed by a left-to-right sweep (720ms), in brass, then returns to white. The card stays at the center for a moment, then goes back to its place.
   - **Ultimate**: like the overnumbered, slower and more solemn. A 400ms wait, a darker room, a bigger card, and a 1100ms rise.
   - **Foil**: the card keeps an iridescent veil, and the sheen crosses it right after it flips, whatever its rarity.

Rarity colors (`rarity-*`) are only used for the frame around the card, the label and the halo. Pull rates come from each set's data, never from a hard-coded value.

## Interactive foil

On the logo and on a `FoilSurface`, the sheen follows the pointer, like a card tilted under a lamp. It follows without inertia. When the pointer leaves, the sheen returns to the center in `--dur-recover`. On mobile, it can follow the device's tilt, after a user action. The foil is never animated at rest.

## Reduced motion

With `prefers-reduced-motion: reduce`: no more movement, rotation or spring, and every transition becomes a 160ms fade. The sheen no longer moves. The logo appears directly in its final state. Sound does not depend on this setting: it has its own switch.
