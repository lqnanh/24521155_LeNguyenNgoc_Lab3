import { memo } from "react";
import styles from "./PianoKey.module.css";

function PianoKey({
    midi,
    noteName,
    keyType = "white",
    isPressed = false,
    isTabStop = false,
    onPress,
    onRelease,
    onFocusKey,
}) {
    const isBlack = keyType === "black";

    function handlePointerDown(event) {
        if (event.button !== 0) return;

        event.preventDefault();
        onPress?.(midi);
    }

    function handleKeyDown(event) {
        if (event.key !== " " && event.key !== "Enter") return;

        event.preventDefault();

        if (event.repeat) return;

        onPress?.(midi);
    }

    function handleKeyUp(event) {
        if (event.key !== " " && event.key !== "Enter") return;

        event.preventDefault();
        onRelease?.(midi);
    }

    return (
        <button
            type="button"
            data-midi={midi}
            data-key-type={keyType}
            onFocus={() => onFocusKey?.(midi)}
            onBlur={() => onRelease?.(midi)}
            className={[
                styles.key,
                isBlack ? styles.blackKey : styles.whiteKey,
                isPressed ? styles.pressed : "",
            ].filter(Boolean).join(" ")}
            aria-label={noteName}
            aria-pressed={isPressed}
            onPointerDown={handlePointerDown}
            onPointerUp={() => onRelease?.(midi)}
            onPointerLeave={() => onRelease?.(midi)}
            onPointerCancel={() => onRelease?.(midi)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
        >
            <span className={styles.noteName}>{noteName}</span>
        </button>
    );
}

export default memo(PianoKey);