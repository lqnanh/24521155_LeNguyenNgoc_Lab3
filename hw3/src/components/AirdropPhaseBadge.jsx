import styles from './AirdropPhaseBadge.module.css';

const PHASE_INFO = {
  WARMUP: {
    label: 'Khởi động',
    description: 'Sắp tới giờ thả hàng, hãy chuẩn bị.',
  },
  AIRDROP_LIVE: {
    label: 'Đang thả hàng',
    description: 'Có thể nhận vé và thùng đồ ngay bây giờ.',
  },
  LOOTED_OUT: {
    label: 'Đã hết hàng',
    description: 'Toàn bộ vé và thùng đồ đã được nhận.',
  },
  EXPIRED: {
    label: 'Đã kết thúc',
    description: 'Đợt thả hàng này đã đóng.',
  },
};

export default function AirdropPhaseBadge({ phase = 'WARMUP' }) {
  const resolvedPhase = phase in PHASE_INFO ? phase : 'WARMUP';
  const info = PHASE_INFO[resolvedPhase];

  return (
    <output
      className={styles.badge}
      data-phase={resolvedPhase}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={styles.dot} aria-hidden="true" />
      <strong className={styles.label}>Trạng thái: {info.label}</strong>
      <span className={styles.description}>{info.description}</span>
    </output>
  );
}