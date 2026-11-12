const targetFormatter = new Intl.DateTimeFormat('vi-VN', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatDuration(ms) {
  // Làm tròn lên: còn 0,4 giây vẫn hiện 00:00:01, chỉ hiện 0 khi đã thật sự tới giờ
  const totalSeconds = Math.ceil(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return {
    totalSeconds,
    text: days > 0 ? `${days} ngày ${clock}` : clock,
  };
}

export default function Countdown({
  targetTime,
  remainingMs = 0,
  closesInMs = 0,
  isOpen = false,
  isExpired = false,
}) {
  const target = new Date(targetTime);
  const hasTarget = Number.isFinite(target.getTime());

  if (!hasTarget) {
    return <p className="arena-section__placeholder">Chưa có giờ thả hàng.</p>;
  }

  let term = 'Thả hàng sau';
  let duration = formatDuration(remainingMs);

  if (isExpired) {
    term = 'Đợt thả hàng';
    duration = null;
  } else if (isOpen) {
    term = 'Đóng sau';
    duration = formatDuration(closesInMs);
  }

  return (
    <dl className="countdown">
      <dt className="countdown__term">{term}</dt>
      <dd className={isExpired ? 'countdown__value countdown__value--ended' : 'countdown__value'}>
        {duration === null ? (
          'Đã kết thúc'
        ) : (
          <time dateTime={`PT${duration.totalSeconds}S`}>{duration.text}</time>
        )}
      </dd>

      <dt className="countdown__term">Giờ thả hàng</dt>
      <dd className="countdown__target">
        <time dateTime={target.toISOString()}>{targetFormatter.format(target)}</time>
      </dd>
    </dl>
  );
}