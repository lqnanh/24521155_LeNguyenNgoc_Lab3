import styles from './SquadLeaderboard.module.css';

export default function SquadLeaderboard({
  squads = [],
  totalCount = squads.length,
  query = '',
}) {
  const trimmedQuery = query.trim();
  const resultText =
    trimmedQuery === ''
      ? `${totalCount} đội`
      : `Tìm thấy ${squads.length}/${totalCount} đội`;

  let emptyMessage = null;
  if (totalCount === 0) {
    emptyMessage = 'Chưa có đội nào trên bảng xếp hạng.';
  } else if (squads.length === 0) {
    emptyMessage = `Không tìm thấy đội nào khớp với “${trimmedQuery}”.`;
  }

  return (
    <>
      {/* Luôn có sẵn trên trang để trình đọc màn hình báo số kết quả khi gõ */}
      <output className={styles.resultCount} aria-live="polite">
        {resultText}
      </output>

      {emptyMessage ? (
        <p className="arena-section__placeholder">{emptyMessage}</p>
      ) : (
        <table className={styles.table}>
          <caption className={styles.visuallyHidden}>
            Bảng xếp hạng {squads.length} đội: số lần WWCD, điểm xếp hạng và điểm hạ gục
          </caption>
          <thead>
            <tr>
              <th scope="col" className={styles.rank}>
                #
              </th>
              <th scope="col">Đội</th>
              <th scope="col" className={styles.numeric}>
                <abbr title="Winner Winner Chicken Dinner – số trận thắng">WWCD</abbr>
              </th>
              <th scope="col" className={styles.numeric}>
                Điểm xếp hạng
              </th>
              <th scope="col" className={styles.numeric}>
                Điểm hạ gục
              </th>
            </tr>
          </thead>
          <tbody>
            {squads.map((squad) => (
              <tr key={squad.id}>
                <td className={styles.rank}>{squad.position}</td>
                <th scope="row" className={styles.name}>
                  {squad.name}
                </th>
                <td className={styles.numeric}>{squad.wwcd}</td>
                <td className={styles.numeric}>{squad.rankPoints}</td>
                <td className={styles.numeric}>{squad.killPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}