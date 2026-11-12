import styles from "./PianoKey.module.css";

function PianoKey({
  noteName,
  keyType = "white",
  isPressed = false,
  onPress,
  onRelease,
}) {
  const isBlack = keyType === "black";

  function handleKeyDown(event) {
    if (event.key !== " " && event.key !== "Enter") return;

    event.preventDefault();

    if (event.repeat) return;

    onPress?.();
  }

  function handleKeyUp(event) {
    if (event.key !== " " && event.key !== "Enter") return;

    event.preventDefault();
    onRelease?.();
  }

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
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <span className={styles.noteName}>{noteName}</span>
    </button>
  );
}

export default PianoKey;