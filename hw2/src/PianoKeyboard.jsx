import { useCallback, useEffect, useId, useRef, useState } from "react";
import { PIANO_KEYS } from "./GrandPiano88/pianoKeys";
import PianoKey from "./GrandPiano88/PianoKey";
import { PolyphonicSynth } from "./audio/PolyphonicSynth";
import styles from "./PianoKeyboard.module.css";

// Tra cứu thông tin phím theo midi, tạo một lần ở cấp module
const KEY_BY_MIDI = new Map(PIANO_KEYS.map((key) => [key.midi, key]));

// Các tốc độ phát lại được phép
const PLAYBACK_SPEEDS = [
  { value: 0.5, label: "Chậm (0.5×)" },
  { value: 1, label: "Thường (1×)" },
  { value: 2, label: "Nhanh (2×)" },
];

/**
 * Chờ ms mili giây. Có thể bị hủy sớm bằng cancelSleeps.
 * @param {number} ms
 * @param {{ timers: Set<object> }} controller
 * @returns {Promise<void>}
 */
function sleep(ms, controller) {
  return new Promise((resolve) => {
    const entry = { timer: null, resolve };
    entry.timer = setTimeout(() => {
      controller.timers.delete(entry);
      resolve();
    }, ms);
    controller.timers.add(entry);
  });
}

/**
 * Hủy tất cả các lần chờ đang có và giải phóng promise của chúng ngay lập tức.
 * @param {{ timers: Set<object> }} controller
 */
function cancelSleeps(controller) {
  for (const entry of controller.timers) {
    clearTimeout(entry.timer);
    entry.resolve();
  }
  controller.timers.clear();
}

/**
 * Phát lại các sự kiện theo thứ tự FIFO. Mỗi nốt tắt sau durationMs,
 * nhưng không chặn việc bật nốt kế tiếp.
 * @param {Array<{ midi: number, durationMs: number, deltaMs: number }>} events
 * @param {number} speed
 * @param {{ cancelled: boolean, timers: Set<object>, playingMidis: Set<number> }} controller
 * @param {PolyphonicSynth} synth
 */
async function playEvents(events, speed, controller, synth) {
  const releases = [];

  for (const event of events) {
    await sleep(event.deltaMs / speed, controller);
    if (controller.cancelled) return;

    synth.noteOn(event.midi);
    controller.playingMidis.add(event.midi);

    releases.push(
      sleep(event.durationMs / speed, controller).then(() => {
        if (controller.cancelled) return;
        synth.noteOff(event.midi);
        controller.playingMidis.delete(event.midi);
      })
    );
  }

  await Promise.all(releases);
}

function PianoKeyboard() {
  const [pressedKeys, setPressedKeys] = useState(() => new Set());
  const [activeMidi, setActiveMidi] = useState(PIANO_KEYS[0].midi);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(() => []);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const keyboardRef = useRef(null);
  const [synth] = useState(() => new PolyphonicSynth());
  const speedId = useId();

  // Ref để handler đọc trạng thái mới nhất mà không phải đưa vào deps
  const isRecordingRef = useRef(false);
  const startedAtRef = useRef(0);
  const lastPressAtRef = useRef(null);
  const heldNotesRef = useRef(new Map()); // midi → { id, pressedAt }
  const nextIdRef = useRef(0);
  const playbackRef = useRef(null); // { cancelled, timers, playingMidis } khi đang phát

  // Dừng phát lại: hủy các lần chờ, tắt các nốt đang phát, rồi xóa trạng thái phát
  const stopPlayback = useCallback(() => {
    const controller = playbackRef.current;
    if (!controller) return;

    controller.cancelled = true;
    cancelSleeps(controller);

    for (const midi of controller.playingMidis) {
      synth.noteOff(midi);
    }
    controller.playingMidis.clear();

    playbackRef.current = null;
    setIsPlaying(false);
  }, [synth]);

  // Dọn âm thanh khi unmount hoặc khi rời khỏi trang
  useEffect(() => {
    const handlePageHide = () => {
      stopPlayback();
      synth.dispose();
    };

    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      stopPlayback();
      synth.dispose();
    };
  }, [synth, stopPlayback]);

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
    if (playbackRef.current) return;

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

  // Phát lại đoạn đã ghi, theo tốc độ đang chọn
  const handlePlay = useCallback(() => {
    if (playbackRef.current || isRecordingRef.current || recording.length === 0) {
      return;
    }

    const controller = {
      cancelled: false,
      timers: new Set(),
      playingMidis: new Set(),
    };
    playbackRef.current = controller;
    setIsPlaying(true);

    playEvents(recording, speed, controller, synth).finally(() => {
      if (playbackRef.current !== controller) return;

      playbackRef.current = null;
      setIsPlaying(false);
    });
  }, [recording, speed, synth]);

  // Đổi tốc độ, chỉ nhận các giá trị trong PLAYBACK_SPEEDS
  const handleSpeedChange = useCallback((event) => {
    const next = Number(event.target.value);
    if (PLAYBACK_SPEEDS.some((option) => option.value === next)) {
      setSpeed(next);
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

  // Trạng thái suy ra được, tính trực tiếp khi render
  const canPlay = !isPlaying && !isRecording && recording.length > 0;

  return (
    <main className={styles.piano}>
      <header className={styles.toolbar}>
        <output className={styles.status} aria-live="polite">
          Đang bấm: {pressedKeys.size} phím
          {" · "}
          {isRecording
            ? `Đang ghi: ${recording.length} nốt`
            : `Đã ghi: ${recording.length} nốt`}
          {isPlaying ? " · Đang phát" : ""}
        </output>

        <button
          type="button"
          className={styles.recordButton}
          aria-pressed={isRecording}
          disabled={isPlaying}
          onClick={handleToggleRecord}
        >
          Ghi
        </button>

        <fieldset className={styles.playback}>
          <legend className={styles.visuallyHidden}>Phát lại</legend>

          <label htmlFor={speedId}>Tốc độ</label>
          <select
            id={speedId}
            className={styles.select}
            value={speed}
            disabled={isPlaying}
            onChange={handleSpeedChange}
          >
            {PLAYBACK_SPEEDS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={styles.controlButton}
            disabled={!canPlay}
            onClick={handlePlay}
          >
            Phát
          </button>

          <button
            type="button"
            className={styles.controlButton}
            disabled={!isPlaying}
            onClick={stopPlayback}
          >
            Dừng
          </button>
        </fieldset>
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