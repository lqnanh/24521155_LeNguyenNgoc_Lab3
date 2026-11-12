import { useCallback, useState } from "react";
import { PIANO_KEYS } from "./GrandPiano88/pianoKeys";
import PianoKey from "./GrandPiano88/PianoKey";
import styles from "./PianoKeyboard.module.css";

function PianoKeyboard() {
  const [pressedKeys, setPressedKeys] = useState(() => new Set());

  // Thêm MIDI vào Set khi nhấn phím
  const handlePress = useCallback((midi) => {
    setPressedKeys((prev) => {
      if (prev.has(midi)) return prev;

      const next = new Set(prev);
      next.add(midi);

      return next;
    });
  }, []);

  // Xóa MIDI khỏi Set khi thả phím
  const handleRelease = useCallback((midi) => {
    setPressedKeys((prev) => {
      if (!prev.has(midi)) return prev;

      const next = new Set(prev);
      next.delete(midi);

      return next;
    });
  }, []);

  const whiteKeys = PIANO_KEYS.filter(
    (key) => key.keyType === "white"
  );

  const blackKeys = PIANO_KEYS.filter(
    (key) => key.keyType === "black"
  );

return (
  <main className={styles.piano}>
    <output className={styles.status} aria-live="polite">
      Đang bấm: {pressedKeys.size} phím
    </output>

    <section
      className={styles.keyboard}
      aria-label="Đàn piano 88 phím"
    >
      {PIANO_KEYS.map((key) => (
        <PianoKey
          key={key.midi}
          midi={key.midi}
          noteName={key.noteName}
          keyType={key.keyType}
          isPressed={pressedKeys.has(key.midi)}
          onPress={handlePress}
          onRelease={handleRelease}
        />
      ))}
    </section>
  </main>
);
}

export default PianoKeyboard;