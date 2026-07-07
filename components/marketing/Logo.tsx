export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const boxSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const textSize = size === "sm" ? "text-base" : "text-lg";

  return (
    <span className="flex items-center gap-2 font-semibold text-secondary">
      <span
        className={`${boxSize} flex items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-dark text-white`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="6" r="2.5" />
          <path d="M12 9v6M9 12h6M8 21l4-6 4 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={textSize}>bodyScore</span>
    </span>
  );
}
