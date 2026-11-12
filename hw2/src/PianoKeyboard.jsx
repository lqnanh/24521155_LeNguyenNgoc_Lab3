import { useCallback, useEffect, useRef, useState } from "react";
import { PIANO_KEYS } from "./GrandPiano88/pianoKeys";
import PianoKey from "./GrandPiano88/PianoKey";
import { PolyphonicSynth } from "./audio/PolyphonicSynth";
import styles from "./PianoKeyboard.module.css";

// Tra cứu thông tin phím theo midi, tạo một lần ở cấp module
const KEY_BY_MIDI = new Map(PIANO_KEYS.map((key) => [key.midi, key]));

function PianoKeyboard() {
  const [pressedKeys, setPressedKeys] = useState(() => new Set());
  const [activeMidi, setActiveMidi] = useState(PIANO_KEYS[0].midi);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(() => []);
  const keyboardRef = useRef(null);
  const [synth] = useState(() => new PolyphonicSynth());

  // Ref để handler đọc trạng thái mới nhất mà không phải đưa vào deps
  const isRecordingRef = useRef(false);
  const startedAtRef = useRef(0);
  const lastPressAtRef = useRef(null);
  const heldNotesRef = useRef(new Map()); // midi → { id, pressedAt }
  const nextIdRef = useRef(0);

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

  // Bấm phím: phát âm, thêm MIDI vào Set, và nếu đang ghi thì xếp nốt vào hàng đợi
  const handlePress = useCallback(
    (midi) => {
      synth.noteOn(midi);

      setPressedKeys((prev) => {
        if (prev.has(midi)) return prev;

        const next = new Set(prev);
        next.add(midi);

        return next;
      });

      if (!isRecordingRef.current || heldNotesRef.current.has(midi)) return;

      const pressedAt = performance.now();
      const previousAt = lastPressAtRef.current ?? startedAtRef.current;
      const id = nextIdRef.current;
      nextIdRef.current += 1;

      heldNotesRef.current.set(midi, { id, pressedAt });
      lastPressAtRef.current = pressedAt;

      const { frequencyHz } = KEY_BY_MIDI.get(midi);

      setRecording((prev) => [
        ...prev,
        {
          id,
          midi,
          freqHz: frequencyHz,
          durationMs: null,
          deltaMs: pressedAt - previousAt,
        },
      ]);
    },
    [synth]
  );

  // Thả phím: nhả âm, xóa MIDI khỏi Set, và điền thời lượng nếu nốt đang được ghi
  const handleRelease = useCallback(
    (midi) => {
      synth.noteOff(midi);

      setPressedKeys((prev) => {
        if (!prev.has(midi)) return prev;

        const next = new Set(prev);
        next.delete(midi);

        return next;
      });

      const held = heldNotesRef.current.get(midi);
      if (!held) return;

      heldNotesRef.current.delete(midi);
      const durationMs = performance.now() - held.pressedAt;

      setRecording((prev) =>
        prev.map((event) =>
          event.id === held.id ? { ...event, durationMs } : event
        )
      );
    },
    [synth]
  );

  // Bật hoặc tắt ghi âm. Bật ghi sẽ xóa lần ghi trước.
  const handleToggleRecord = useCallback(() => {
    if (!isRecordingRef.current) {
      isRecordingRef.current = true;
      startedAtRef.current = performance.now();
      lastPressAtRef.current = null;
      heldNotesRef.current = new Map();
      setRecording([]);
      setIsRecording(true);
      return;
    }

    isRecordingRef.current = false;
    setIsRecording(false);

    // Chốt thời lượng cho các nốt còn đang giữ tại lúc dừng
    const now = performance.now();
    const finishedDurations = new Map();
    for (const { id, pressedAt } of heldNotesRef.current.values()) {
      finishedDurations.set(id, now - pressedAt);
    }
    heldNotesRef.current = new Map();

    if (finishedDurations.size > 0) {
      setRecording((prev) =>
        prev.map((event) =>
          finishedDurations.has(event.id)
            ? { ...event, durationMs: finishedDurations.get(event.id) }
            : event
        )
      );
    }
  }, []);

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
      <header className={styles.toolbar}>
        <output className={styles.status} aria-live="polite">
          Đang bấm: {pressedKeys.size} phím
          {" · "}
          {isRecording
            ? `Đang ghi: ${recording.length} nốt`
            : `Đã ghi: ${recording.length} nốt`}
        </output>

        <button
          type="button"
          className={styles.recordButton}
          aria-pressed={isRecording}
          onClick={handleToggleRecord}
        >
          Ghi
        </button>
      </header>

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