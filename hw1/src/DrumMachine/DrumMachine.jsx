import { useCallback, useEffect, useRef } from 'react';
import { PADS } from './pads.js';
import styles from './DrumMachine.module.css';

function DrumMachine() {
  // Map: id pad -> âm thanh gốc đã tải sẵn (chỉ dùng làm "khuôn" để sao chép).
  const audiosRef = useRef(null);
  // Các bản sao đang phát, để dừng hết khi component tắt.
  const activeRef = useRef(new Set());

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

    return () => {
      audios.forEach((audio) => audio.pause());
      audios.clear();
      active.forEach((voice) => voice.pause());
      active.clear();
      audiosRef.current = null;
    };
  }, []);

  // Hàm đánh trống duy nhất. Sau này phím tắt cũng sẽ gọi hàm này.
  const playPad = useCallback((padId) => {
    const source = audiosRef.current?.get(padId);
    if (!source) return;

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
  }, []);

  return (
    <section className={styles.machine} aria-label="Bàn trống">
      <ul className={styles.grid}>
        {PADS.map((pad) => (
          <li key={pad.id} className={styles.cell}>
            <button
              type="button"
              className={styles.pad}
              aria-pressed={false}
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