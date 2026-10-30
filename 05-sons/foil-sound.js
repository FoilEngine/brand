/* Foil — sound engine (Web Audio, no files).
   Usage: import { Sound } from "./foil-sound.js"; call Sound.unlock() inside a click, then Sound.play("coup").
   Sound list and rules: 04-design-system/sound.md */
const Sound = (() => {
  let ctx = null, out = null, enabled = true, tierGain = 1, jit = 1;
  const E3 = 164.81, Gs3 = 207.65, B3 = 246.94, Ds4 = 311.13, E4 = 329.63, Gs4 = 415.3, B4 = 493.88, Ds5 = 622.25;
  let white = null;
  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.004; comp.release.value = 0.2;
      const top = ctx.createBiquadFilter(); top.type = 'lowpass'; top.frequency.value = 5200;
      out = ctx.createGain(); out.gain.value = 0.55;
      out.connect(top).connect(comp).connect(ctx.destination);
      white = noise(2.0);
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }
  function noise(sec) {
    const b = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * sec), ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  function impulse(sec) {
    const len = Math.ceil(ctx.sampleRate * sec), b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = b.getChannelData(ch); let lp = 0;
      for (let i = 0; i < len; i++) { lp += 0.18 * ((Math.random() * 2 - 1) - lp); d[i] = lp * Math.pow(1 - i / len, 2.6) * 1.6; }
    }
    return b;
  }
  function bus(t, pan0 = 0, pan1 = pan0, dur = 0.3, send = 0.5) {
    const p = ctx.createStereoPanner(); p.pan.setValueAtTime(pan0, t); p.pan.linearRampToValueAtTime(pan1, t + dur);
    const g = ctx.createGain(); g.gain.value = tierGain;
    p.connect(g).connect(out);
    return p;
  }
  /* blade swish: filtered noise, with moving frequency and pan */
  function swish(t, o) {
    const { f = [400, 1500, 700], dur = 0.2, gain = 0.5, pan = [-0.3, 0.3], q = 1.1, attack = 0.35, send = 0.45 } = o;
    const src = ctx.createBufferSource(); src.buffer = white; src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = q;
    const steps = f.length - 1;
    bp.frequency.setValueAtTime(f[0], t);
    f.slice(1).forEach((fr, i) => bp.frequency.exponentialRampToValueAtTime(fr, t + dur * ((i + 1) / steps) * (i === 0 ? attack * steps : 1)));
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2600;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + dur * attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp).connect(lp).connect(g).connect(bus(t, pan[0], pan[1], dur, send));
    src.start(t, Math.random()); src.stop(t + dur + 0.05);
  }
  /* low push of air under the strike */
  function thump(t, f0, f1, dur, gain) {
    const o = ctx.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(f0 * jit, t); o.frequency.exponentialRampToValueAtTime(f1 * jit, t + dur);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(bus(t, 0, 0, dur, 0.15)); o.start(t); o.stop(t + dur + 0.02);
  }
  /* ringing steel, low and muted */
  function ring(t, f, dur, gain, pan = 0, send = 0.8) {
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.setValueAtTime(2200, t); lp.frequency.exponentialRampToValueAtTime(700, t + dur);
    g.connect(lp).connect(bus(t, pan, pan, dur, send));
    [[f, 1], [f * 2.003, 0.28], [f * 2.76, 0.14], [f * 0.5, 0.2]].forEach(([fr, a]) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = fr * jit;
      const og = ctx.createGain(); og.gain.value = a; o.connect(og).connect(g); o.start(t); o.stop(t + dur + 0.02);
    });
  }
  /* warm pad: two detuned triangles per note */
  function pad(t, freqs, dur, gain, stagger = 0) {
    freqs.forEach((f, i) => {
      const ti = t + i * stagger;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, ti);
      g.gain.exponentialRampToValueAtTime(gain, ti + 0.09); g.gain.exponentialRampToValueAtTime(0.0001, ti + dur);
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400;
      g.connect(lp).connect(bus(ti, -0.4 + i * 0.27, -0.4 + i * 0.27, dur, 0.9));
      [-3, 3].forEach((cents) => { const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f; o.detune.value = cents; o.connect(g); o.start(ti); o.stop(ti + dur + 0.02); });
    });
  }
  /* spinning card: pulsing swishes, slower and slower */
  function flutter(t, dur, gain) {
    const src = ctx.createBufferSource(); src.buffer = white; src.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(1300, t); bp.frequency.exponentialRampToValueAtTime(600, t + dur);
    const am = ctx.createGain(); am.gain.value = 0;
    const lfo = ctx.createOscillator(); lfo.type = 'sine';
    lfo.frequency.setValueAtTime(15, t); lfo.frequency.exponentialRampToValueAtTime(2.2, t + dur);
    const depth = ctx.createGain(); depth.gain.value = 0.5; lfo.connect(depth).connect(am.gain);
    const base = ctx.createConstantSource ? ctx.createConstantSource() : null;
    if (base) { base.offset.value = 0.5; base.connect(am.gain); base.start(t); base.stop(t + dur + 0.05); }
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.12); g.gain.setValueAtTime(gain, t + dur * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp).connect(am).connect(g).connect(bus(t, -0.5, 0.2, dur, 0.4));
    src.start(t, Math.random()); src.stop(t + dur + 0.05); lfo.start(t); lfo.stop(t + dur + 0.05);
  }
  /* card edge cutting the air: a very short rustle */
  function flick(t, gain, pan = 0, f0 = 1500, f1 = 700, dur = 0.055) {
    const src = ctx.createBufferSource(); src.buffer = white;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(f0 * jit, t); bp.frequency.exponentialRampToValueAtTime(f1 * jit, t + dur * 0.9);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(bp).connect(g).connect(bus(t, pan, pan, dur, 0)); src.start(t, Math.random()); src.stop(t + dur + 0.02);
  }
  /* card placed: paper rustle and a small weight */
  function card(t, gain = 0.3, pan = 0) { flick(t, gain, pan, 2000, 800, 0.07); thump(t + 0.015, 190, 95, 0.08, gain * 0.55); }
  /* sliding card */
  function slide(t, gain = 0.3, pan = [-0.2, 0.2], dur = 0.16) { swish(t, { f: [700, 1700, 900], dur, gain, pan, q: 0.8, attack: 0.3 }); }
  /* small woody tick */
  function tick(t, gain = 0.15, f = 900, pan = 0) { flick(t, gain * 7, pan, f, f * 0.7, 0.035); thump(t, f * 0.4, f * 0.25, 0.035, gain * 1.6); }
  const N = { A2: 110, B2: 123.47, E3: 164.81, Gs3: 207.65, B3: 246.94, Ds4: 311.13, E4: 329.63, Gs4: 415.3, B4: 493.88 };
  const lib = {
    rotation: (t, o = { dur: 1.1, flicks: [0.03, 0.115, 0.3] }) => {
      o.flicks.forEach((ft, i) => flick(t + ft, 0.32 * (1 - i * 0.18), -0.3 + i * 0.2));
      swish(t, { f: [300, 520, 260], dur: o.dur * 0.6, gain: 0.12, pan: [-0.3, 0.1], q: 0.7, attack: 0.15 });
    },
    coup: (t) => {
      swish(t, { f: [300, 2200, 450], dur: 0.34, gain: 0.95, pan: [-0.8, 0.8], q: 1.0, attack: 0.3, send: 0.6 });
      thump(t + 0.07, 120, 42, 0.28, 0.55);
      ring(t + 0.1, E3, 0.55, 0.14, 0.2);
      ring(t + 0.1, E4, 0.4, 0.06, 0.3);
    },
    vague: (t, d = 1.0) => {
      swish(t, { f: [450, 1150, 600, 1050, 650], dur: d, gain: 0.85, pan: [-0.7, 0.7], q: 1.3, attack: 0.22 });
      swish(t, { f: [180, 380, 220, 360, 200], dur: d, gain: 0.35, pan: [-0.5, 0.5], q: 0.7, attack: 0.3 });
      ring(t + d * 0.92, N.B3, 0.35, 0.05, 0.6);
    },
    lettre: (t, i = 0) => { const notes = [N.E4, N.Gs4, N.B4, 622.25, 659.26, 830.61]; flick(t, 0.35, -0.3 + i * 0.12, 1900, 1100, 0.035); ring(t + 0.004, notes[i % 6], 0.2, 0.11, -0.3 + i * 0.12); },
    engine: (t) => pad(t, [E3, Gs3, B3, Ds4], 1.8, 0.045, 0.05),
    fente: (t) => swish(t, { f: [380, 1500, 650], dur: 0.2, gain: 0.85, pan: [-0.35, 0.35] }),
    retour: (t) => swish(t, { f: [1000, 650, 300], dur: 0.32, gain: 0.42, pan: [0.3, -0.2], q: 0.8, attack: 0.3 }),
    parade: (t) => {
      swish(t, { f: [900, 1700, 800], dur: 0.07, gain: 0.35, pan: [0.1, 0.1], q: 2.2, attack: 0.15 });
      thump(t, 160, 70, 0.12, 0.3);
      ring(t + 0.005, E4, 0.45, 0.14, 0.1, 0.6);
      ring(t + 0.012, B3, 0.4, 0.1, 0.1, 0.6);
    },
    touche: (t) => {
      swish(t, { f: [420, 1900, 600], dur: 0.22, gain: 0.7, pan: [-0.5, 0.5], attack: 0.3 });
      thump(t + 0.05, 110, 45, 0.2, 0.4);
      ring(t + 0.08, E4, 0.45, 0.12, 0.3);
    },
    foil: (t) => { pad(t, [E4, Gs4, B4, Ds5], 0.8, 0.05, 0.09); swish(t, { f: [600, 1600, 900], dur: 0.9, gain: 0.12, pan: [-0.6, 0.6], attack: 0.4 }); },
    pointFaible: (t) => { thump(t, 520, 260, 0.05, 0.22); ring(t + 0.04, E4, 0.5, 0.1, 0.2); },
    erreur: (t) => { thump(t, 150, 90, 0.09, 0.4); thump(t + 0.11, 130, 80, 0.1, 0.4); },

    /* ---- game ---- */
    matchFound: (t) => { swish(t, { f: [300, 900, 400], dur: 0.4, gain: 0.3, pan: [-0.4, 0.4] }); ring(t + 0.15, N.E3, 0.5, 0.1); ring(t + 0.3, N.B3, 0.5, 0.08); },
    gameStart: (t) => { swish(t, { f: [300, 1600, 450], dur: 0.26, gain: 0.6, pan: [-0.8, 0.3] }); swish(t + 0.12, { f: [300, 1500, 450], dur: 0.26, gain: 0.55, pan: [0.8, -0.3] }); thump(t + 0.2, 140, 50, 0.22, 0.4); ring(t + 0.22, N.E3, 0.6, 0.13); ring(t + 0.22, N.B3, 0.5, 0.06); },
    initiative: (t) => { [0, 0.06, 0.13, 0.22, 0.34, 0.5].forEach((d, i) => flick(t + d, 0.18, -0.3 + i * 0.1, 1300, 650, 0.04)); ring(t + 0.62, N.E4, 0.45, 0.12); },
    mulligan: (t) => { [0, 0.12].forEach((d) => slide(t + d, 0.22, [0.2, -0.3], 0.18)); },
    yourTurn: (t) => { pad(t, [N.E3, N.B3], 0.7, 0.05, 0.06); ring(t + 0.08, N.E4, 0.4, 0.1); },
    endTurn: (t) => { swish(t, { f: [900, 500, 260], dur: 0.3, gain: 0.3, pan: [0.3, -0.3], q: 0.8 }); thump(t + 0.15, 120, 70, 0.12, 0.2); },
    timer: (t) => { tick(t, 0.2, 700); tick(t + 0.18, 0.2, 700); },
    victory: (t) => { lib.gameStart(t); pad(t + 0.35, [N.E3, N.Gs3, N.B3, N.E4], 1.6, 0.06, 0.08); },
    defeat: (t) => { ring(t, N.E3, 0.7, 0.1); ring(t + 0.25, N.B2, 0.9, 0.1); swish(t, { f: [600, 300, 160], dur: 0.6, gain: 0.2, pan: [0.2, -0.2], q: 0.7 }); },
    playerLeft: (t) => { ring(t, N.B3, 0.4, 0.06); thump(t + 0.1, 130, 80, 0.1, 0.2); },

    /* ---- card types (in addition to playUnit, playChampion, playSpell, playGear, channel, token) ---- */
    legend: (t) => { swish(t, { f: [200, 700, 300], dur: 0.5, gain: 0.3, pan: [-0.3, 0.3], q: 0.7, attack: 0.5 }); thump(t + 0.2, 100, 45, 0.3, 0.35); ring(t + 0.22, N.E3, 0.7, 0.12); ring(t + 0.3, N.B3, 0.6, 0.07); ring(t + 0.38, N.E4, 0.5, 0.05); },
    battlefield: (t) => { swish(t, { f: [150, 450, 200], dur: 0.6, gain: 0.35, pan: [-0.6, 0.6], q: 0.6, attack: 0.4 }); thump(t + 0.12, 85, 40, 0.3, 0.4); thump(t + 0.24, 75, 38, 0.3, 0.3); ring(t + 0.15, N.B2, 0.6, 0.08); },
    signature: (t) => { swish(t, { f: [400, 1400, 700], dur: 0.28, gain: 0.35, pan: [-0.3, 0.3] }); ring(t + 0.1, N.E4, 0.35, 0.07); ring(t + 0.17, N.Gs4, 0.35, 0.06); ring(t + 0.24, N.B4, 0.4, 0.05); },

    /* ---- booster ---- */
    boosterCut: (t) => { swish(t, { f: [350, 2000, 500], dur: 0.22, gain: 0.6, pan: [-0.7, 0.7], attack: 0.3 }); lib.boosterTear(t + 0.08); },
    cardsRise: (t) => { [0, 0.05, 0.1].forEach((d) => slide(t + d, 0.14, [0, 0], 0.18)); },
    swell: (t, d = 0.5) => swish(t, { f: [160, 520, 760], dur: d, gain: 0.32, pan: [0, 0], q: 0.7, attack: 0.92 }),
    revealCommon: (t) => flick(t, 0.5, 0, 1700, 900, 0.045),
    revealUncommon: (t) => { lib.cardFlip(t); ring(t + 0.04, N.E4, 0.3, 0.08); },
    revealEpic: (t) => { lib.cardFlip(t); thump(t + 0.04, 120, 45, 0.25, 0.4); ring(t + 0.05, N.E3, 0.6, 0.12); ring(t + 0.05, N.B3, 0.55, 0.08); ring(t + 0.12, N.E4, 0.5, 0.06); },
    revealAltart: (t) => { lib.revealEpic(t); lib.foil(t + 0.1); },
    revealShowcase: (t) => { lib.coup(t); pad(t + 0.15, [N.E3, N.Gs3, N.B3, N.E4], 1.4, 0.06, 0.07); lib.foil(t + 0.2); },
    signatureStroke: (t, i = 0) => lib.lettre(t, i),
    revealUltimate: (t) => { thump(t, 70, 35, 0.6, 0.45); lib.coup(t + 0.1); pad(t + 0.25, [N.E3, N.Gs3, N.B3, N.Ds4, N.E4], 2.2, 0.06, 0.09); lib.foil(t + 0.3); ring(t + 0.6, N.B2, 1.0, 0.08); },

    /* ---- start of turn (A B C D) ---- */
    awaken: (t) => { swish(t, { f: [250, 900, 500], dur: 0.35, gain: 0.25, pan: [-0.4, 0.4], q: 0.7, attack: 0.5 }); [0.05, 0.1, 0.15].forEach((d, i) => flick(t + d, 0.1, -0.2 + i * 0.2, 1200, 700, 0.04)); },
    hold: (t) => { tick(t, 0.12, 800); ring(t + 0.03, N.E4, 0.4, 0.1); ring(t + 0.03, N.B3, 0.4, 0.05); },
    channel: (t) => { [0, 0.11].forEach((d, i) => { thump(t + d, 240, 120, 0.07, 0.25); ring(t + d, i ? N.Gs3 : N.E3, 0.35, 0.07, -0.2 + i * 0.4); }); },
    draw: (t) => { slide(t, 0.25, [0.3, -0.1], 0.13); flick(t + 0.1, 0.12, -0.1, 1600, 900, 0.04); },

    /* ---- actions ---- */
    playUnit: (t) => { slide(t, 0.22, [-0.2, 0.1], 0.12); card(t + 0.1, 0.35); },
    playChampion: (t) => { slide(t, 0.3, [-0.3, 0.1], 0.16); card(t + 0.13, 0.45); thump(t + 0.14, 110, 45, 0.25, 0.35); ring(t + 0.16, N.E3, 0.6, 0.11); ring(t + 0.16, N.E4, 0.4, 0.04); },
    playSpell: (t) => { swish(t, { f: [400, 1400, 700], dur: 0.28, gain: 0.35, pan: [-0.3, 0.3] }); ring(t + 0.12, N.E4, 0.4, 0.06); ring(t + 0.19, N.B4, 0.35, 0.035); },
    playGear: (t) => { card(t, 0.25); flick(t + 0.09, 0.2, 0.1, 2200, 1400, 0.03); ring(t + 0.09, N.B3, 0.3, 0.09, 0.1); ring(t + 0.09, N.E4 * 1.19, 0.2, 0.04, 0.1); },
    ability: (t) => { tick(t, 0.14, 1000); ring(t + 0.02, N.B3, 0.3, 0.06); },
    exhaust: (t) => { flick(t, 1.1, 0, 1300, 800, 0.07); },
    move: (t) => swish(t, { f: [300, 900, 400], dur: 0.32, gain: 0.3, pan: [-0.5, 0.5], q: 0.8, attack: 0.4 }),
    showdown: (t) => { swish(t, { f: [300, 1300, 500], dur: 0.24, gain: 0.45, pan: [-0.7, 0] }); swish(t + 0.06, { f: [300, 1300, 500], dur: 0.24, gain: 0.45, pan: [0.7, 0] }); thump(t + 0.18, 90, 40, 0.3, 0.45); ring(t + 0.2, N.E3, 0.5, 0.1); },
    focus: (t) => { tick(t, 0.1, 850); },
    chainAdd: (t) => { card(t, 0.4, 0.2); ring(t + 0.03, N.Gs3, 0.25, 0.08, 0.2); },
    chainResolve: (t) => { ring(t, N.E4, 0.3, 0.07); thump(t, 160, 90, 0.08, 0.2); },
    damage: (t) => { thump(t, 140, 60, 0.12, 0.4); flick(t, 0.15, 0, 900, 400, 0.06); },
    conquer: (t) => { lib.coup(t); ring(t + 0.25, N.B3, 0.5, 0.06); },
    score: (t) => { ring(t, N.E4, 0.35, 0.1); ring(t + 0.1, N.Gs4, 0.4, 0.08); },
    recycle: (t) => slide(t, 0.2, [0.2, -0.3], 0.18),
    trash: (t) => { slide(t, 0.18, [0, 0.4], 0.12); thump(t + 0.1, 120, 70, 0.1, 0.25); },
    banish: (t) => { swish(t, { f: [800, 300, 150], dur: 0.4, gain: 0.5, pan: [0, 0], q: 0.7 }); ring(t, N.B2, 0.5, 0.12); },
    reveal: (t) => { flick(t, 0.4, 0, 1600, 900, 0.06); ring(t + 0.04, N.B3, 0.3, 0.09); },
    shuffle: (t) => { for (let i = 0; i < 10; i++) flick(t + i * 0.035 + Math.random() * 0.01, 0.3, (i % 2 ? 0.2 : -0.2), 1700, 900, 0.035); },
    token: (t) => { thump(t, 320, 160, 0.06, 0.2); ring(t + 0.02, N.E4, 0.25, 0.05); },
    counter: (t) => { tick(t, 0.12, 1100); },
    buff: (t) => { ring(t, N.B3, 0.25, 0.1); ring(t + 0.07, N.E4, 0.3, 0.1); },
    heal: (t) => { pad(t, [N.E4, N.B4], 0.45, 0.06, 0.05); },
    target: (t) => { swish(t, { f: [600, 1200, 800], dur: 0.14, gain: 0.3, pan: [-0.2, 0.2] }); tick(t + 0.12, 0.12, 1000); },
    autopay: (t, n = 3) => { for (let i = 0; i < n; i++) { flick(t + i * 0.06, 0.12, -0.3 + i * 0.2, 1200, 700, 0.04); thump(t + i * 0.06, 220, 140, 0.04, 0.1); } },
    rewind: (t) => { [0, 0.09, 0.2].forEach((d) => tick(t + d, 0.13, 760)); swish(t, { f: [900, 500, 300], dur: 0.35, gain: 0.18, pan: [0.4, -0.4], q: 0.8 }); },
    forward: (t) => { [0, 0.11, 0.2].forEach((d) => tick(t + d, 0.13, 900)); swish(t, { f: [300, 600, 900], dur: 0.3, gain: 0.16, pan: [-0.4, 0.4], q: 0.8 }); },
    emote: (t) => { thump(t, 400, 250, 0.05, 0.2); ring(t + 0.01, N.Gs4, 0.2, 0.08); },
    chat: (t) => { tick(t, 0.08, 1200); tick(t + 0.07, 0.06, 1000); },

    /* ---- deckbuilder ---- */
    deckAdd: (t) => { slide(t, 0.2, [0.3, 0], 0.1); card(t + 0.07, 0.32); },
    deckRemove: (t) => slide(t, 0.28, [0, 0.4], 0.14),
    deckComplete: (t) => { ring(t, N.E4, 0.35, 0.1); ring(t + 0.1, N.Gs4, 0.4, 0.08); ring(t + 0.2, N.B4, 0.45, 0.06); },

    /* ---- boosters (sealed) ---- */
    boosterTear: (t) => {
      for (let i = 0; i < 26; i++) { const d = (i / 26) * 0.34 + Math.random() * 0.012; flick(t + d, 0.22 + 0.25 * Math.sin(Math.PI * i / 26), -0.4 + 0.8 * i / 26, 1400 + Math.random() * 500, 800, 0.02); }
      swish(t, { f: [500, 1300, 700], dur: 0.36, gain: 0.2, pan: [-0.4, 0.4], q: 0.9, attack: 0.5 });
    },
    cardFlip: (t) => { flick(t, 0.7, 0, 1700, 900, 0.05); slide(t + 0.02, 0.12, [-0.1, 0.1], 0.09); },
    rareReveal: (t) => { lib.cardFlip(t); ring(t + 0.06, N.E3, 0.6, 0.12); ring(t + 0.06, N.B3, 0.5, 0.06); thump(t + 0.06, 110, 55, 0.2, 0.25); },
  };
  const TIER = {
    boosterTear: 1, rareReveal: 1, boosterCut: 1, swell: 0.75, revealCommon: 0.55, revealUncommon: 0.75, revealEpic: 1, revealAltart: 1, revealShowcase: 1, revealUltimate: 1, signatureStroke: 1, cardsRise: 0.75, legend: 1, battlefield: 1, signature: 0.75, cardFlip: 0.75, deckComplete: 0.75,
    gameStart: 1, victory: 1, defeat: 1, yourTurn: 1, conquer: 1, showdown: 1, playChampion: 1, touche: 1, foil: 1, coup: 1, rotation: 1, vague: 1, lettre: 1, score: 1, hold: 1, matchFound: 1, initiative: 1, erreur: 1,
    playUnit: 0.75, playSpell: 0.75, playGear: 0.75, draw: 0.75, channel: 0.75, move: 0.75, chainAdd: 0.75, chainResolve: 0.75, damage: 0.75, token: 0.75, buff: 0.75, autopay: 0.75, rewind: 0.75, forward: 0.75, recycle: 0.75, trash: 0.75, banish: 0.75, mulligan: 0.75, endTurn: 0.75, awaken: 0.75, timer: 0.75, shuffle: 0.75, playerLeft: 0.75,
  };
  return {
    play(name, delayMs = 0, arg) {
      if (!enabled || !ensure() || !lib[name]) return;
      tierGain = TIER[name] ?? 0.55;
      jit = 0.975 + Math.random() * 0.05;
      lib[name](ctx.currentTime + 0.02 + delayMs / 1000, arg);
      tierGain = 1; jit = 1;
    },
    unlock() { ensure(); },
    set enabled(v) { enabled = v; }, get enabled() { return enabled; },
  };
})();
export { Sound };
