import { useEffect, useRef, useState } from 'react';
import { claimCrate } from '../api/claimCrate';

/**
 * Trả về mảng mới, chỉ đổi số lượng của vật phẩm có id tương ứng.
 * @param {import('../types/pubgVn.js').Crate[]} crates
 * @param {string} crateId
 * @param {number} delta
 */
function changeStock(crates, crateId, delta) {
  return crates.map((crate) =>
    crate.id === crateId ? { ...crate, stock: Math.max(0, crate.stock + delta) } : crate,
  );
}

/**
 * Quản lý danh sách vé/thùng đồ và việc bấm Nhận.
 * Trừ số lượng ngay trên màn hình, khóa vật phẩm đang chờ server trả lời.
 *
 * @param {import('../types/pubgVn.js').Crate[]} initialCrates
 */
export function useCrateClaim(initialCrates = []) {
  const [crates, setCrates] = useState(initialCrates);
  const [pendingIds, setPendingIds] = useState(() => new Set());

  // Chặn bấm trùng ngay lập tức (state chỉ cập nhật ở lần render sau)
  // và giữ AbortController để hủy yêu cầu khi rời trang
  const controllersRef = useRef(new Map());

  useEffect(() => {
    const controllers = controllersRef.current;

    return () => {
      controllers.forEach((controller) => controller.abort());
      controllers.clear();
    };
  }, []);

  async function claim(crateId) {
    const controllers = controllersRef.current;

    if (controllers.has(crateId)) {
      return;
    }

    const crate = crates.find((item) => item.id === crateId);
    if (!crate || crate.stock <= 0) {
      return;
    }

    const controller = new AbortController();
    controllers.set(crateId, controller);

    setPendingIds((previous) => new Set(previous).add(crateId));
    setCrates((previous) => changeStock(previous, crateId, -1));

    try {
      await claimCrate(crateId, { signal: controller.signal });
    } catch (error) {
      if (error?.name === 'AbortError') {
        return;
      }
      // Lỗi khác: trả lại số lượng (bước sau sẽ thêm thông báo lỗi)
      setCrates((previous) => changeStock(previous, crateId, +1));
    } finally {
      controllers.delete(crateId);

      if (!controller.signal.aborted) {
        setPendingIds((previous) => {
          const next = new Set(previous);
          next.delete(crateId);
          return next;
        });
      }
    }
  }

  return { crates, pendingIds, claim };
}