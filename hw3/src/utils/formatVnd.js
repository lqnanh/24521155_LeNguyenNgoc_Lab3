const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

/**
 * Định dạng số tiền (đồng) để hiển thị, ví dụ 150000 -> "150.000 ₫".
 * @param {number} amount
 * @returns {string}
 */
export function formatVnd(amount) {
  return vndFormatter.format(amount);
}