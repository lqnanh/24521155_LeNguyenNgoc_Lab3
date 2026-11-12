import { useId } from 'react';
import styles from './SquadLeaderboard.module.css';

const SORT_OPTIONS = [
  { value: 'rankPoints', label: 'Điểm xếp hạng' },
  { value: 'wwcd', label: 'Số lần WWCD' },
  { value: 'killPoints', label: 'Điểm hạ gục' },
];

export default function LeaderboardControls({
  query = '',
  sortBy = 'rankPoints',
  onQueryChange = () => {},
  onSortByChange = () => {},
}) {
  const queryId = useId();
  const sortById = useId();

  function handleSubmit(event) {
    // Nhấn Enter trong ô tìm không được tải lại trang
    event.preventDefault();
  }

  return (
    <form role="search" className={styles.controls} onSubmit={handleSubmit}>
      <label htmlFor={queryId} className={styles.label}>
        Tìm tên đội
      </label>
      <input
        id={queryId}
        type="search"
        className={styles.field}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Ví dụ: Rồng Lửa"
        autoComplete="off"
      />

      <label htmlFor={sortById} className={styles.label}>
        Sắp xếp theo
      </label>
      <select
        id={sortById}
        className={styles.field}
        value={sortBy}
        onChange={(event) => onSortByChange(event.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}