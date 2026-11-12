const BLACK_KEY_PITCH_CLASSES = new Set([1, 3, 6, 8, 10]);

const NOTE_NAMES = [
  "C", "C#", "D", "D#", "E", "F",
  "F#", "G", "G#", "A", "A#", "B",
];

const FIRST_MIDI = 21;
const LAST_MIDI = 108;


export const PIANO_KEYS = Array.from(
  { length: LAST_MIDI - FIRST_MIDI + 1 },
  (_, index) => {
    const midi = FIRST_MIDI + index;
    const pitchClass = midi % 12;
    const octave = Math.floor(midi / 12) - 1;

    return {
      midi,
      noteName: `${NOTE_NAMES[pitchClass]}${octave}`,
      keyType: BLACK_KEY_PITCH_CLASSES.has(pitchClass)
        ? "black"
        : "white",
      frequencyHz: 440 * 2 ** ((midi - 69) / 12),
    };
  }
);

// Kiểm tra số lượng phím.
const whiteKeys = PIANO_KEYS.filter(
  (key) => key.keyType === "white"
);

const blackKeys = PIANO_KEYS.filter(
  (key) => key.keyType === "black"
);

if (PIANO_KEYS.length !== 88) {
  throw new Error(`Expected 88 keys, received ${PIANO_KEYS.length}`);
}

if (whiteKeys.length !== 52) {
  throw new Error(`Expected 52 white keys, received ${whiteKeys.length}`);
}

if (blackKeys.length !== 36) {
  throw new Error(`Expected 36 black keys, received ${blackKeys.length}`);
}

if (PIANO_KEYS[0].midi !== 21 || PIANO_KEYS[87].midi !== 108) {
  throw new Error("Invalid MIDI range");
}