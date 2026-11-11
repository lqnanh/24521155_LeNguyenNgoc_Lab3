import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { PADS } from './pads.js';
import useDrumKeyboard from './useDrumKeyboard.js';
import styles from './DrumMachine.module.css';

// Thời gian pad sáng sau mỗi lần đánh (mili giây).
const FLASH_MS = 150;
// Số nhịp gần nhất được giữ trong lịch sử.
const MAX_BEATS = 8;
// Thanh âm lượng: 8 vạch, hạ 1 vạch mỗi DECAY_MS mili giây.
const DECAY_MS = 70;
const METER_SEGMENTS = Array.from({ length: 8 }, (_, i) => ({
  id: `level-${i + 1}`,
  level: i + 1,
}));
const METER_MAX = METER_SEGMENTS.length;

// Bảng tra id pad -> pad, để lấy tên âm khi ghi lịch sử.
const PADS_BY_ID = new Map(PADS.map((pad) => [pad.id, pad]));

function DrumMachine() {
  const nameId = useId();
  const historyId = useId();

  // Map: id pad -> âm thanh gốc đã tải sẵn (chỉ dùng làm "khuôn" để sao chép).
  const audiosRef = useRef(null);
  // Các bản sao đang phát, để dừng hết khi component tắt.
  const activeRef = useRef(new Set());
  // Map: id pad -> bộ hẹn giờ đang chờ tắt đèn của pad đó.
  const timersRef = useRef(new Map());

  // Tập id các pad đang sáng.
  const [litPads, setLitPads] = useState(() => new Set());
  // Tên bản thu người dùng gõ.
  const [recordingName, setRecordingName] = useState('');
  // Tên các nhịp gần nhất, tối đa MAX_BEATS.
  const [beats, setBeats] = useState([]);
  // Thanh âm lượng. "tick" tăng mỗi lần đánh để effect hạ dần luôn tính lại từ đầu.
  const [meter, setMeter] = useState({ level: 0, tick: 0 });

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

  // Hạ thanh âm lượng từng vạch một. Mỗi lần meter đổi, hẹn giờ cũ bị hủy
  // trong cleanup, nên khi component tắt cũng không còn timer nào sót lại.
  useEffect(() => {
    if (meter.level === 0) return undefined;

    const timerId = setTimeout(() => {
      setMeter((prev) => ({ ...prev, level: Math.max(0, prev.level - 1) }));
    }, DECAY_MS);

    return () => clearTimeout(timerId);
  }, [meter]);

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
      const pad = PADS_BY_ID.get(padId);
      if (!source || !pad) return;

      flashPad(padId);
      // Tạo mảng mới, chỉ giữ MAX_BEATS nhịp cuối.
      setBeats((prev) => [...prev, pad.name].slice(-MAX_BEATS));
      // Thanh âm lượng nhảy lên đỉnh.
      setMeter((prev) => ({ level: METER_MAX, tick: prev.tick + 1 }));

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
      <header className={styles.panel}>
        <section className={styles.field}>
          <label className={styles.label} htmlFor={nameId}>
            Tên bản thu
          </label>
          <input
            id={nameId}
            className={styles.input}
            type="text"
            maxLength={40}
            autoComplete="off"
            value={recordingName}
            onChange={(e) => setRecordingName(e.target.value)}
          />
        </section>

        <section className={styles.field}>
          <label className={styles.label} htmlFor={historyId}>
            8 nhịp gần nhất
          </label>
          <output
            id={historyId}
            className={styles.history}
            aria-live="polite"
          >
            {beats.length > 0 ? beats.join(' → ') : 'Chưa có nhịp nào'}
          </output>
        </section>

        {/* Chỉ để nhìn: thông tin nhịp đã có trong <output> cho trình đọc màn hình. */}
        <section className={styles.field} aria-hidden="true">
          <span className={styles.label}>Âm lượng</span>
          <ul className={styles.meter}>
            {METER_SEGMENTS.map((segment) => (
              <li
                key={segment.id}
                className={
                  segment.level <= meter.level
                    ? `${styles.segment} ${styles.segmentOn}`
                    : styles.segment
                }
              />
            ))}
          </ul>
        </section>
      </header>

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
