import styles from "./PianoKey.module.css";

function PianoKey({ noteName, keyType = "white", isPressed = false, onPress, onRelease }) {
  const isBlack = keyType === "black";

  return (
    <button
      type="button"
      className={`${styles.key} ${
        isBlack ? styles.blackKey : styles.whiteKey
      } ${isPressed ? styles.pressed : ""}`}
      aria-label={noteName}
      aria-pressed={isPressed}
      onPointerDown={onPress}
      onPointerUp={onRelease}
      onPointerLeave={onRelease}
      onPointerCancel={onRelease}
    >
      <span className={styles.noteName}>{noteName}</span>
    </button>
  );
}

export default PianoKey;