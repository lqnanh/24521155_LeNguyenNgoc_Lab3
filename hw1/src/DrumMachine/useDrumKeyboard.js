import { useEffect } from 'react';
import { PADS_BY_CODE } from './pads.js';

// Các thẻ mà người dùng đang gõ chữ: bỏ qua phím tắt.
const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

function useDrumKeyboard(onPlay, isEnabled = true) {
  useEffect(() => {
    if (!isEnabled) return undefined;

    function handleKeyDown(e) {
      if (e.repeat) return; // đang giữ phím: mỗi lần nhấn chỉ đánh một lần
      if (e.ctrlKey || e.metaKey || e.altKey) return; // tránh đè lên Ctrl+S, Ctrl+A...
      if (TYPING_TAGS.has(e.target.tagName)) return; // đang gõ trong ô nhập

      const pad = PADS_BY_CODE.get(e.code); // e.code dạng 'KeyW'
      if (!pad) return; // không phải phím của pad

      onPlay(pad.id);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPlay, isEnabled]);
}

export default useDrumKeyboard;