const FAKE_DELAY_MS = 1000;

/**
 * Hàm giả gọi server để nhận vé hoặc thùng đồ (chưa có server thật).
 * Luôn thành công sau 1 giây. Hỗ trợ hủy bằng AbortController.
 *
 * @param {string} crateId
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ crateId: string, claimedAt: number }>}
 */
export function claimCrate(crateId, { signal } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    function handleAbort() {
      clearTimeout(timeoutId);
      reject(signal.reason);
    }

    const timeoutId = setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);
      resolve({ crateId, claimedAt: Date.now() });
    }, FAKE_DELAY_MS);

    signal?.addEventListener('abort', handleAbort, { once: true });
  });
}