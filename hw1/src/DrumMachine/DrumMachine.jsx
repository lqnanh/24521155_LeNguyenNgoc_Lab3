import { PADS } from './pads.js';
import styles from './DrumMachine.module.css';

function DrumMachine() {
  return (
    <section className={styles.machine} aria-label="Bàn trống">
      <ul className={styles.grid}>
        {PADS.map((pad) => (
          <li key={pad.id} className={styles.cell}>
            <button
              type="button"
              className={styles.pad}
              aria-pressed={false}
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