import styles from './SquadLeaderboard.module.css';

export default function SquadLeaderboard({ squads = [] }) {
  if (squads.length === 0) {
    return <p className="arena-section__placeholder">Chưa có đội nào trên bảng xếp hạng.</p>;
  }

  return (
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
        {squads.map((squad, position) => (
          <tr key={squad.id}>
            <td className={styles.rank}>{position + 1}</td>
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
  );
}