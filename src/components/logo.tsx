import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export function NodusLogo({
  className,
  markClassName,
  wordmark = true,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <NodusMark className={cn("size-8", markClassName)} />
      {wordmark ? (
        <span className="font-display text-lg font-semibold tracking-wide">
          Nodus
        </span>
      ) : null}
    </span>
  );
}

export function NodusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-accent", className)}
      aria-hidden="true"
    >
      <circle cx="16" cy="7" r="2.4" fill="currentColor" />
      <circle cx="7.5" cy="22.5" r="2.4" fill="currentColor" />
      <circle cx="24.5" cy="22.5" r="2.4" fill="currentColor" />
      <path
        d="M16 9.4 8.8 20.6M16 9.4l7.2 11.2M9.9 22.5h12.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
