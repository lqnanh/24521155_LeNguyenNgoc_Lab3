import { useEffect, useState } from 'react';

const TICK_MS = 200;

/** Thời gian mở của một đợt thả hàng: 10 phút */
export const AIRDROP_LIVE_DURATION_MS = 10 * 60 * 1000;

/**
 * Tính trạng thái đợt thả hàng theo thời gian.
 * LOOTED_OUT phụ thuộc số lượng còn lại nên không tính ở đây.
 *
 * @param {number} now Giờ hiện tại (ms)
 * @param {number} opensAt Giờ mở (ms)
 * @param {number} closesAt Giờ đóng (ms)
 * @returns {'WARMUP' | 'AIRDROP_LIVE' | 'EXPIRED'}
 */
function getTimePhase(now, opensAt, closesAt) {
  if (now < opensAt) {
    return 'WARMUP';
  }
  if (now < closesAt) {
    return 'AIRDROP_LIVE';
  }
  return 'EXPIRED';
}

/**
 * Đếm ngược tới thời điểm thả hàng và tính trạng thái đợt thả hàng.
 * Không trừ dần: mỗi lần cập nhật chỉ lấy lại giờ hiện tại, còn thời gian
 * còn lại luôn tính bằng mốc đích trừ giờ hiện tại.
 *
 * @param {number | string | Date} targetTime Thời điểm mở (ms, chuỗi ISO hoặc Date)
 * @param {number} [liveDurationMs] Mở bao lâu thì hết hạn
 * @returns {{
 *   remainingMs: number,
 *   closesInMs: number,
 *   isOpen: boolean,
 *   isExpired: boolean,
 *   phase: 'WARMUP' | 'AIRDROP_LIVE' | 'EXPIRED',
 * }}
 */
export function usePubgAirdropTimer(targetTime, liveDurationMs = AIRDROP_LIVE_DURATION_MS) {
  const opensAt = new Date(targetTime).getTime();
  const closesAt = opensAt + liveDurationMs;
  const isValidTarget = Number.isFinite(opensAt) && Number.isFinite(closesAt);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!isValidTarget) {
      return undefined;
    }

    function tick() {
      const current = Date.now();
      setNow(current);

      // Đã hết hạn thì trạng thái không đổi nữa, dừng đồng hồ
      if (current >= closesAt) {
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
  }, [opensAt, closesAt, isValidTarget]);

  if (!isValidTarget) {
    return {
      remainingMs: 0,
      closesInMs: 0,
      isOpen: false,
      isExpired: false,
      phase: 'WARMUP',
    };
  }

  const phase = getTimePhase(now, opensAt, closesAt);

  return {
    remainingMs: Math.max(0, opensAt - now),
    closesInMs: Math.max(0, closesAt - now),
    isOpen: phase !== 'WARMUP',
    isExpired: phase === 'EXPIRED',
    phase,
  };
}