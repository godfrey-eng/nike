export function Swoosh({ light = false }: { light?: boolean }) {
  return (
    <svg
      aria-label="Nike"
      className="swoosh"
      viewBox="0 0 72 26"
      role="img"
      fill={light ? "#ffffff" : "#111111"}
    >
      <path d="M7.3 13.1C3.2 17.9 1 21.6 2.6 23.8c1.5 2 5.1 1.7 9.2.1L69.9 1.5c.7-.3.6-.9-.2-.7L13.4 16.2c-2.1.6-4 .8-5.3.1-1.2-.6-1.5-1.7-.8-3.2Z" />
    </svg>
  );
}