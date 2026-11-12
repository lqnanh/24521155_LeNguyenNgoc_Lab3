import { formatVnd } from '../utils/formatVnd';
import styles from './CrateCard.module.css';

const KIND_LABELS = {
  ticket: 'Vé',
  crate: 'Thùng đồ',
};

export default function CrateCard({
  name,
  kind = 'crate',
  price = 0,
  stock = 0,
  onClaim = () => {},
}) {
  const isSoldOut = stock <= 0;

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <p className={styles.kind}>{KIND_LABELS[kind]}</p>
        <h3 className={styles.name}>{name}</h3>
      </header>

      <dl className={styles.details}>
        <dt>Giá</dt>
        <dd>{formatVnd(price)}</dd>
        <dt>Còn lại</dt>
        <dd>{stock}</dd>
      </dl>

      <button
        type="button"
        className={styles.claimButton}
        onClick={onClaim}
        disabled={isSoldOut}
        aria-label={isSoldOut ? `${name} đã hết` : `Nhận ${name}`}
      >
        {isSoldOut ? 'Hết hàng' : 'Nhận'}
      </button>
    </article>
  );
}