import CrateCard from './CrateCard';
import styles from './CrateCard.module.css';

const EMPTY_SET = new Set();

export default function CrateDropList({
  crates = [],
  pendingIds = EMPTY_SET,
  canClaim = true,
  closedLabel = 'Chưa mở',
  onClaim = () => {},
}) {
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
            isPending={pendingIds.has(crate.id)}
            canClaim={canClaim}
            closedLabel={closedLabel}
            onClaim={() => onClaim(crate.id)}
          />
        </li>
      ))}
    </ul>
  );
}