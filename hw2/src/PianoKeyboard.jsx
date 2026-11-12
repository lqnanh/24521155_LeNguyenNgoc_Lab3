import { useCallback, useEffect, useRef, useState } from "react";
import { PIANO_KEYS } from "./GrandPiano88/pianoKeys";
import PianoKey from "./GrandPiano88/PianoKey";
import { PolyphonicSynth } from "./audio/PolyphonicSynth";
import styles from "./PianoKeyboard.module.css";

function PianoKeyboard() {
  const [pressedKeys, setPressedKeys] = useState(() => new Set());
  const [activeMidi, setActiveMidi] = useState(PIANO_KEYS[0].midi);
  const keyboardRef = useRef(null);
  const [synth] = useState(() => new PolyphonicSynth());

  // Dọn âm thanh khi unmount hoặc khi rời khỏi trang
  useEffect(() => {
    const handlePageHide = () => {
      synth.dispose();
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      synth.dispose();
    };
  }, [synth]);

  // Bấm phím: phát âm, rồi thêm MIDI vào Set
  const handlePress = useCallback(
    (midi) => {
      synth.noteOn(midi);

      setPressedKeys((prev) => {
        if (prev.has(midi)) return prev;

        const next = new Set(prev);
        next.add(midi);

        return next;
      });
    },
    [synth]
  );

  // Thả phím: nhả âm, rồi xóa MIDI khỏi Set
  const handleRelease = useCallback(
    (midi) => {
      synth.noteOff(midi);

      setPressedKeys((prev) => {
        if (!prev.has(midi)) return prev;

        const next = new Set(prev);
        next.delete(midi);

        return next;
      });
    },
    [synth]
  );

  // Ghi nhớ phím đang được focus (roving tabindex)
  const handleFocusKey = useCallback((midi) => {
    setActiveMidi(midi);
  }, []);

  // Di chuyển focus giữa các phím bằng mũi tên / Home / End
  function handleKeyboardKeyDown(event) {
    const index = PIANO_KEYS.findIndex((key) => key.midi === activeMidi);
    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = Math.min(index + 1, PIANO_KEYS.length - 1);
        break;
      case "ArrowLeft":
        nextIndex = Math.max(index - 1, 0);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = PIANO_KEYS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    const nextMidi = PIANO_KEYS[nextIndex].midi;
    setActiveMidi(nextMidi);
    keyboardRef.current
      ?.querySelector(`[data-midi="${nextMidi}"]`)
      ?.focus();
  }

  return (
    <main className={styles.piano}>
      <output className={styles.status} aria-live="polite">
        Đang bấm: {pressedKeys.size} phím
      </output>

      <section
        ref={keyboardRef}
        className={styles.keyboard}
        aria-label="Đàn piano 88 phím"
        onKeyDown={handleKeyboardKeyDown}
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
            onFocusKey={handleFocusKey}
          />
        ))}
      </section>
    </main>
  );
}

export default PianoKeyboard;