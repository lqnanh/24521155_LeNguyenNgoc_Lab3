import CrateCard from './CrateCard';
import styles from './CrateCard.module.css';

export default function CrateDropList({ crates = [] }) {
  if (crates.length === 0) {
    return <p className="arena-section__placeholder">Chưa có vé hoặc thùng đồ nào.</p>;
  }

  return (
    <ul className={styles.list}>
      {crates.map((crate) => (
        <li key={crate.id}>
          <CrateCard
            name={crate.name}
            kind={crate.kind}
            price={crate.price}
            stock={crate.stock}
          />
        </li>
      ))}
    </ul>
  );
}