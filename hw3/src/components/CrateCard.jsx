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
  isPending = false,
  canClaim = true,
  closedLabel = 'Chưa mở',
  onClaim = () => {},
}) {
  const isSoldOut = stock <= 0;

  let buttonText = 'Nhận';
  let buttonLabel = `Nhận ${name}`;

  if (isPending) {
    buttonText = 'Đang nhận…';
    buttonLabel = `Đang nhận ${name}`;
  } else if (isSoldOut) {
    buttonText = 'Hết hàng';
    buttonLabel = `${name} đã hết`;
  } else if (!canClaim) {
    buttonText = closedLabel;
    buttonLabel = `${name}: ${closedLabel}`;
  }

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
        disabled={isPending || isSoldOut || !canClaim}
        aria-busy={isPending}
        aria-label={buttonLabel}
      >
        {buttonText}
      </button>
    </article>
  );
}