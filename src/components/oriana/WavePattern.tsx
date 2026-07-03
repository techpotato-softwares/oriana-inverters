export function WavePattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0 60C120 90 240 30 360 60C480 90 600 30 720 55C840 80 960 40 1080 60C1200 80 1320 45 1440 60V120H0V60Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M0 70C160 95 320 50 480 70C640 90 800 55 960 72C1120 88 1280 60 1440 75V120H0V70Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M0 80C200 100 400 65 600 82C800 98 1000 70 1200 85C1300 92 1370 88 1440 90V120H0V80Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  )
}
