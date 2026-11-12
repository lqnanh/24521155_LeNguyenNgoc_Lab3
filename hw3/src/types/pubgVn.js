/**
 * Loại vật phẩm: vé hoặc thùng đồ.
 * @typedef {'ticket' | 'crate'} CrateKind
 */

/**
 * Một vé hoặc thùng đồ có thể nhận.
 * @typedef {Object} Crate
 * @property {string} id Mã duy nhất, dùng làm key khi hiển thị danh sách
 * @property {CrateKind} kind Loại vật phẩm
 * @property {string} name Tên hiển thị
 * @property {number} price Giá tiền tính bằng đồng, lưu dạng số
 * @property {number} stock Số lượng còn lại
 */

// File này chỉ chứa mô tả kiểu (JSDoc), không chạy gì lúc runtime.
export {};