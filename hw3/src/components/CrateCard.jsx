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
  const isDisabled = isPending || isSoldOut || !canClaim;

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

  // Không dùng disabled vì nút bị disabled sẽ mất focus,
  // đẩy người dùng bàn phím về đầu trang. Tự chặn click ở đây.
  function handleClick() {
    if (isDisabled) return;
    onClaim();
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
        onClick={handleClick}
        aria-disabled={isDisabled}
        aria-busy={isPending}
        aria-label={buttonLabel}
      >
        {buttonText}
      </button>
    </article>
  );
}