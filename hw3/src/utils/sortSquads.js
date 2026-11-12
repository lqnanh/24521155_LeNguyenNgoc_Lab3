/** Các cột được phép sắp xếp, trùng tên thuộc tính trong dữ liệu đội */
export const SQUAD_SORT_KEYS = ['rankPoints', 'wwcd', 'killPoints'];

/**
 * Chuẩn hóa chữ để tìm kiếm: bỏ dấu tiếng Việt, đổi đ thành d, viết thường.
 * Nhờ vậy gõ "rong lua" vẫn tìm được "Rồng Lửa".
 * @param {string} text
 */
function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('vi')
    .replace(/đ/g, 'd')
    .trim();
}

/**
 * Lọc đội theo tên. Trả về mảng mới, không sửa mảng truyền vào.
 * @template {{ name: string }} T
 * @param {T[]} squads
 * @param {string} query
 * @returns {T[]}
 */
export function filterSquadsByName(squads, query = '') {
  const keyword = normalizeText(query);

  if (keyword === '') {
    return squads;
  }

  return squads.filter((squad) => normalizeText(squad.name).includes(keyword));
}

/**
 * Sắp xếp giảm dần theo cột được chọn. Dùng toSorted() nên mảng gốc giữ nguyên.
 * Hòa điểm thì xét điểm xếp hạng, rồi tới tên đội.
 * @param {import('../types/pubgVn.js').Squad[]} squads
 * @param {string} sortBy
 * @returns {import('../types/pubgVn.js').Squad[]}
 */
export function sortSquads(squads, sortBy = 'rankPoints') {
  const key = SQUAD_SORT_KEYS.includes(sortBy) ? sortBy : 'rankPoints';

  return squads.toSorted(
    (a, b) =>
      b[key] - a[key] ||
      b.rankPoints - a.rankPoints ||
      a.name.localeCompare(b.name, 'vi'),
  );
}

/**
 * Tính danh sách để hiển thị: sắp xếp toàn bộ, gắn thứ hạng, rồi mới lọc.
 * Nhờ đó khi lọc, cột # vẫn giữ đúng thứ hạng thật của đội.
 * @param {import('../types/pubgVn.js').Squad[]} squads
 * @param {string} query
 * @param {string} sortBy
 * @returns {(import('../types/pubgVn.js').Squad & { position: number })[]}
 */
export function getVisibleSquads(squads, query = '', sortBy = 'rankPoints') {
  const ranked = sortSquads(squads, sortBy).map((squad, index) => ({
    ...squad,
    position: index + 1,
  }));

  return filterSquadsByName(ranked, query);
}