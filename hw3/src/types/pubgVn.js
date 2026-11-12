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

/**
 * Một đội trên bảng xếp hạng.
 * @typedef {Object} Squad
 * @property {string} id Mã duy nhất, dùng làm key khi hiển thị danh sách
 * @property {string} name Tên đội
 * @property {number} wwcd Số lần WWCD (Winner Winner Chicken Dinner, tức số trận thắng)
 * @property {number} rankPoints Điểm xếp hạng
 * @property {number} killPoints Điểm hạ gục
 */

// File này chỉ chứa mô tả kiểu (JSDoc), không chạy gì lúc runtime.
export {};