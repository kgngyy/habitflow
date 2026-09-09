interface Props {
  value: number; // 0..100
}

export default function ProgressBar({ value }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className="progressbar"
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progressbar__fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}
