import { memo, useCallback } from "react";
import styles from "./PianoKey.module.css";

function PianoKey({
  midi,
  noteName,
  keyType = "white",
  isPressed = false,
  onPress,
  onRelease,
}) {
  const isBlack = keyType === "black";

  const handlePress = useCallback(() => {
    onPress(midi);
  }, [midi, onPress]);

  const handleRelease = useCallback(() => {
    onRelease(midi);
  }, [midi, onRelease]);

  function handleKeyDown(event) {
    if (event.key !== " " && event.key !== "Enter") return;

    event.preventDefault();

    if (event.repeat) return;

    handlePress();
  }

  function handleKeyUp(event) {
    if (event.key !== " " && event.key !== "Enter") return;

    event.preventDefault();
    handleRelease();
  }

  return (
    <button
      type="button"
      className={`${styles.key} ${
        isBlack ? styles.blackKey : styles.whiteKey
      } ${isPressed ? styles.pressed : ""}`}
      aria-label={noteName}
      aria-pressed={isPressed}
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onPointerLeave={handleRelease}
      onPointerCancel={handleRelease}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <span className={styles.noteName}>{noteName}</span>
    </button>
  );
}

export default memo(PianoKey);