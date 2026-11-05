import { useCallback, useEffect, useRef } from 'react';
import { PADS } from './pads.js';
import styles from './DrumMachine.module.css';

function DrumMachine() {
  // Map: id pad -> đối tượng Audio dùng lại cho mọi lần bấm.
  const audiosRef = useRef(null);

  // Chuẩn bị sẵn đúng 1 âm thanh cho mỗi pad khi component xuất hiện.
  useEffect(() => {
    const audios = new Map(
      PADS.map((pad) => {
        const audio = new Audio(pad.sound);
        audio.preload = 'auto';
        return [pad.id, audio];
      }),
    );
    audiosRef.current = audios;

    return () => {
      audios.forEach((audio) => audio.pause());
      audios.clear();
      audiosRef.current = null;
    };
  }, []);

  // Hàm đánh trống duy nhất. Sau này phím tắt cũng sẽ gọi hàm này.
  const playPad = useCallback((padId) => {
    const audio = audiosRef.current?.get(padId);
    if (!audio) return;

    audio.currentTime = 0; // đánh lại từ đầu nếu âm đang vang
    audio.play().catch(() => {
      // Trình duyệt từ chối phát (hoặc thiếu file): bỏ qua, không làm vỡ app.
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