type IconProps = {
  name: "search" | "heart" | "bag" | "chevron" | "arrow" | "instagram" | "x" | "youtube";
  size?: number;
};

export function Icon({ name, size = 21 }: IconProps) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.25 4.25" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    bag: (
      <>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" />
      </>
    ),
    x: (
      <>
        <path d="M5 4 19 20" />
        <path d="M19 4 5 20" />
      </>
    ),
    youtube: (
      <>
        <path d="M21 12c0 2.2-.2 4.1-.5 5-.2.8-.8 1.4-1.6 1.6-1.4.4-6.9.4-6.9.4s-5.5 0-6.9-.4A2.3 2.3 0 0 1 3.5 17c-.3-.9-.5-2.8-.5-5s.2-4.1.5-5c.2-.8.8-1.4 1.6-1.6C6.5 5 12 5 12 5s5.5 0 6.9.4c.8.2 1.4.8 1.6 1.6.3.9.5 2.8.5 5Z" />
        <path d="m10 9 5 3-5 3V9Z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}