import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export function NodusLogo({ className, markClassName, wordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <NodusMark className={cn("size-9", markClassName)} />
      {wordmark ? (
        <span className="font-display text-lg font-semibold tracking-wide">Nodus</span>
      ) : null}
    </span>
  );
}

/** Ícono de la app Nodus (el mismo de la PWA): tres nodos, naranja, cian y blanco. */
export function NodusMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-96.webp"
      alt=""
      width={96}
      height={96}
      decoding="async"
      className={cn("rounded-[22%] shadow-[var(--shadow-border)]", className)}
    />
  );
}
