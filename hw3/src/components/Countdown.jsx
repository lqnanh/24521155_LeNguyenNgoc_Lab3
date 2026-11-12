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

function formatRemaining(ms) {
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

export default function Countdown({ targetTime, remainingMs = 0, isOpen = false }) {
  const target = new Date(targetTime);
  const hasTarget = Number.isFinite(target.getTime());

  if (!hasTarget) {
    return <p className="arena-section__placeholder">Chưa có giờ thả hàng.</p>;
  }

  const { totalSeconds, text } = formatRemaining(remainingMs);

  return (
    <dl className="countdown">
      <dt className="countdown__term">{isOpen ? 'Hàng đã được thả' : 'Thả hàng sau'}</dt>
      <dd className="countdown__value">
        <time dateTime={`PT${totalSeconds}S`}>{isOpen ? 'Đã mở' : text}</time>
      </dd>

      <dt className="countdown__term">Giờ thả hàng</dt>
      <dd className="countdown__target">
        <time dateTime={target.toISOString()}>{targetFormatter.format(target)}</time>
      </dd>
    </dl>
  );
}