import { PUBG_VN_SQUADS } from '../data/squads.js';

const DELAY_MS = 1200;
const FAIL_RATE = 0.35;

function createAbortError() {
  return new DOMException('Yêu cầu đã bị hủy', 'AbortError');
}

export function fetchKraftonPubgTelemetry(squadId, { signal } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(createAbortError());
      return;
    }

    const onAbort = () => {
      clearTimeout(timerId);
      reject(createAbortError());
    };

    const timerId = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);

      if (Math.random() < FAIL_RATE) {
        reject(new Error('Mất tín hiệu vệ tinh'));
        return;
      }

      const squad = PUBG_VN_SQUADS.find((item) => item.id === squadId);
      if (!squad) {
        reject(new Error('Không tìm thấy đội'));
        return;
      }

      resolve({ ...squad });
    }, DELAY_MS);

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}