import { useCallback, useEffect, useRef, useState } from 'react';
import { PADS } from './pads.js';
import useDrumKeyboard from './useDrumKeyboard.js';
import styles from './DrumMachine.module.css';

// Thời gian pad sáng sau mỗi lần đánh (mili giây).
const FLASH_MS = 150;

function DrumMachine() {
  // Map: id pad -> âm thanh gốc đã tải sẵn (chỉ dùng làm "khuôn" để sao chép).
  const audiosRef = useRef(null);
  // Các bản sao đang phát, để dừng hết khi component tắt.
  const activeRef = useRef(new Set());
  // Map: id pad -> bộ hẹn giờ đang chờ tắt đèn của pad đó.
  const timersRef = useRef(new Map());
  // Tập id các pad đang sáng.
  const [litPads, setLitPads] = useState(() => new Set());

  useEffect(() => {
    const audios = new Map(
      PADS.map((pad) => {
        const audio = new Audio(pad.sound);
        audio.preload = 'auto';
        return [pad.id, audio];
      }),
    );
    audiosRef.current = audios;
    const active = activeRef.current;
    const timers = timersRef.current;

    return () => {
      audios.forEach((audio) => audio.pause());
      audios.clear();
      active.forEach((voice) => voice.pause());
      active.clear();
      // Hủy mọi bộ hẹn giờ đang chờ khi component tắt.
      timers.forEach((timerId) => clearTimeout(timerId));
      timers.clear();
      audiosRef.current = null;
    };
  }, []);

  // Làm sáng một pad trong FLASH_MS rồi tắt.
  const flashPad = useCallback((padId) => {
    const timers = timersRef.current;

    // Đánh lại khi pad đang sáng: hủy hẹn giờ cũ để đủ 150ms tính từ lần đánh mới.
    clearTimeout(timers.get(padId));

    setLitPads((prev) => new Set(prev).add(padId));

    const timerId = setTimeout(() => {
      timers.delete(padId);
      setLitPads((prev) => {
        const next = new Set(prev);
        next.delete(padId);
        return next;
      });
    }, FLASH_MS);
    timers.set(padId, timerId);
  }, []);

  // Hàm đánh trống duy nhất, dùng chung cho chuột và bàn phím.
  const playPad = useCallback(
    (padId) => {
      const source = audiosRef.current?.get(padId);
      if (!source) return;

      flashPad(padId);

      // Mỗi lần đánh phát một bản sao riêng, nên tiếng mới không cắt tiếng cũ.
      // File đã tải sẵn nên bản sao không phải tải lại.
      const voice = source.cloneNode();
      const active = activeRef.current;
      active.add(voice);
      voice.addEventListener('ended', () => active.delete(voice), { once: true });

      voice.play().catch(() => {
        // Trình duyệt từ chối phát (hoặc thiếu file): bỏ bản sao, không làm vỡ app.
        active.delete(voice);
      });
    },
    [flashPad],
  );

  useDrumKeyboard(playPad);

  return (
    <section className={styles.machine} aria-label="Bàn trống">
      <ul className={styles.grid}>
        {PADS.map((pad) => (
          <li key={pad.id} className={styles.cell}>
            <button
              type="button"
              className={styles.pad}
              aria-pressed={litPads.has(pad.id)}
              onClick={() => playPad(pad.id)}
            >
              <span className={styles.name}>{pad.name}</span>
              <span className={styles.shortcut}>
                Phím {pad.shortcut.replace('Key', '')}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DrumMachine;