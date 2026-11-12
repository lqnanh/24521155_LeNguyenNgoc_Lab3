import { useEffect, useState } from 'react';

const TICK_MS = 200;

/**
 * Đếm ngược tới thời điểm thả hàng.
 * Không trừ dần: mỗi lần cập nhật chỉ lấy lại giờ hiện tại, còn thời gian
 * còn lại luôn tính bằng mốc đích trừ giờ hiện tại.
 *
 * @param {number | string | Date} targetTime Thời điểm đích (ms, chuỗi ISO hoặc Date)
 * @returns {{ remainingMs: number, isOpen: boolean }}
 */
export function usePubgAirdropTimer(targetTime) {
  const targetMs = new Date(targetTime).getTime();
  const isValidTarget = Number.isFinite(targetMs);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isValidTarget) {
      return undefined;
    }

    function tick() {
      const current = Date.now();
      setNow(current);

      // Đã tới giờ thì không cần chạy tiếp
      if (current >= targetMs) {
        clearInterval(intervalId);
      }
    }

    // Trình duyệt làm chậm setInterval khi tab bị ẩn,
    // nên lúc người dùng quay lại tab phải tính lại ngay
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        setNow(Date.now());
      }
    }

    const intervalId = setInterval(tick, TICK_MS);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [targetMs, isValidTarget]);

  const remainingMs = isValidTarget ? Math.max(0, targetMs - now) : 0;
  const isOpen = isValidTarget && remainingMs === 0;

  return { remainingMs, isOpen };
}