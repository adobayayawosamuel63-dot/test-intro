let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(value: boolean) {
  muted = value;
}

export function isMuted() {
  return muted;
}

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, duration: number, type: OscillatorType, gainValue: number) {
  const audio = context();
  if (!audio || muted) return;

  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audio.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(gainValue, audio.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
  osc.connect(gain).connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.02);
}

export function playCorrect() {
  tone(660, 0, 0.12, "sine", 0.18);
  tone(990, 0.09, 0.16, "sine", 0.16);
}

export function playWrong() {
  tone(200, 0, 0.18, "sawtooth", 0.1);
  tone(150, 0.1, 0.22, "sawtooth", 0.09);
}

export function playTick() {
  tone(880, 0, 0.05, "square", 0.04);
}

export function playFinish() {
  [523, 659, 784, 1046].forEach((freq, i) => tone(freq, i * 0.1, 0.22, "sine", 0.13));
}
