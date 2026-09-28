import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  BarChart3,
  Bell,
  Network,
  Plus,
  Shield,
  Smartphone,
  Tablet,
  UserRoundCheck,
} from "lucide-react";
import { NodusLogo, NodusMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SITE = "nodusapp.app";
const PHONE_DISPLAY = "+58 412 856 2043";
const PHONE_TEL = "+584128562043";

const MODULES = [
  {
    title: "Organigrama",
    body: "Ministerios, líderes y responsabilidades, visibles de un vistazo.",
    icon: Network,
  },
  {
    title: "Asistencia",
    body: "Quién está, quién falta y cómo va cada grupo, sin papel suelto.",
    icon: UserRoundCheck,
  },
  {
    title: "Avisos",
    body: "Comunica a la congregación sin depender del hilo del chat.",
    icon: Bell,
  },
  {
    title: "Reportes",
    body: "Números claros para pastores y líderes, listos cuando se necesitan.",
    icon: BarChart3,
  },
] as const;

const PROBLEMS = [
  "Los grupos de WhatsApp se vuelven el archivo de la iglesia, y nadie encuentra nada.",
  "La asistencia se anota a mano, se cuenta a ojo o simplemente no se registra.",
  "Los avisos se entierran entre mensajes y llegan tarde, o no llegan.",
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function sanitizeSlug(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\.nodusapp\.app.*$/, "")
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 48);
}

export function LandingPage() {
  const [enterOpen, setEnterOpen] = useState(false);

  function handleInstall() {
    scrollToId("instalar");
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-bg">
        <div className="page-wrap safe-header flex items-center justify-between gap-3">
          <a href="#inicio" className="shrink-0 rounded-md" aria-label="Nodus, inicio">
            <NodusLogo />
          </a>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              className="hidden sm:inline-flex"
              onClick={handleInstall}
            >
              Instalar
            </Button>
            <Button variant="ghost" size="md" onClick={() => setEnterOpen(true)}>
              Entrar
            </Button>
          </div>
        </div>
      </header>

      <main id="contenido">
        <Hero onInstall={handleInstall} onEnter={() => setEnterOpen(true)} />
        <Problem />
        <Modules />
        <Install />
        <Trust />
        <FinalCta onInstall={handleInstall} />
      </main>

      <SiteFooter />
      <EnterDialog open={enterOpen} onOpenChange={setEnterOpen} />
    </div>
  );
}

function ProductMock() {
  const groups = [
    { name: "Casa de Luz", count: "32" },
    { name: "Jóvenes", count: "18" },
    { name: "Intercesión", count: "11" },
  ];

  return (
    <div className="stagger-in relative mx-auto w-full max-w-[17.5rem] shrink-0 lg:mx-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(0 212 255 / 0.08), transparent 68%)",
        }}
      />
      <div className="rounded-xl border border-border bg-bg p-2.5 shadow-[var(--shadow-border)]">
        <div className="overflow-hidden rounded-lg bg-surface">
          <div className="flex items-center justify-between px-4 pt-3 text-sm font-normal text-muted">
            <span>9:41</span>
            <span className="h-1.5 w-12 rounded-full bg-elevated" />
          </div>
          <div className="px-4 pt-4">
            <NodusLogo markClassName="size-5" className="text-sm" />
          </div>
          <p className="px-4 pt-5 font-sans text-sm font-medium text-fg">Hoy</p>
          <ul className="mt-3 flex flex-col gap-2 px-4">
            {groups.map((group) => (
              <li
                key={group.name}
                className="flex items-center justify-between rounded-md bg-elevated px-3 py-2.5"
              >
                <span className="text-sm font-normal text-fg">{group.name}</span>
                <span className="text-sm font-medium text-accent">{group.count}</span>
              </li>
            ))}
          </ul>
          <p className="px-4 py-5 text-center text-sm font-normal text-muted">
            Asistencia · Organigrama · Avisos
          </p>
        </div>
      </div>
    </div>
  );
}

function Hero({
  onInstall,
  onEnter,
}: {
  onInstall: () => void;
  onEnter: () => void;
}) {
  return (
    <section
      id="inicio"
      className="hero-wash border-b border-border"
      aria-labelledby="frase"
    >
      <div className="page-wrap flex flex-col items-start gap-10 py-16 sm:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-32">
        <div className="flex w-full min-w-0 flex-col items-start gap-8 lg:max-w-xl">
          <div className="stagger-in flex items-center gap-3 text-muted">
            <NodusMark className="size-10 sm:size-12" />
            <span className="font-display text-sm font-medium tracking-wide text-fg sm:text-base">
              Nodus
            </span>
          </div>
          <h1
            id="frase"
            className="stagger-in max-w-3xl font-display text-hero font-medium tracking-tight text-fg"
          >
            Organiza tu congregación con claridad
          </h1>
          <div className="stagger-in flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Button size="xl" className="w-full sm:w-auto" onClick={onInstall}>
              Instalar Nodus
            </Button>
            <Button
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={onEnter}
            >
              Entrar
            </Button>
          </div>
        </div>
        <ProductMock />
      </div>
    </section>
  );
}

function Problem() {
  const listRef = useRef<HTMLOListElement>(null);
  const [phase, setPhase] = useState<"idle" | "armed" | "shown">("idle");

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("shown");
      return;
    }
    setPhase("armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPhase("shown");
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="problema"
      className="border-b border-border py-16 sm:py-24"
      aria-labelledby="problema-titulo"
    >
      <div className="page-wrap grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <h2
          id="problema-titulo"
          className="font-display text-section font-medium tracking-tight"
        >
          Lo que se pierde entre mensajes
        </h2>
        <ol ref={listRef} className="flex flex-col gap-6">
          {PROBLEMS.map((line, i) => (
            <li
              key={line}
              className={cn(
                "line-reveal flex gap-4",
                phase === "armed" && "is-armed",
                phase === "shown" && "is-shown",
              )}
            >
              <span className="font-sans text-sm font-medium text-accent">
                0{i + 1}
              </span>
              <p className="text-lead font-normal text-muted">{line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section
      id="modulos"
      className="border-b border-border py-16 sm:py-24"
      aria-labelledby="modulos-titulo"
    >
      <div className="page-wrap">
        <h2
          id="modulos-titulo"
          className="mb-10 font-display text-section font-medium tracking-tight sm:mb-14"
        >
          Cuatro módulos, una congregación
        </h2>
        <ul className="grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2">
          {MODULES.map((mod) => (
            <li key={mod.title} className="bg-bg p-6 sm:p-8">
              <mod.icon
                className="mb-5 size-6 text-accent"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <h3 className="font-sans text-base font-medium tracking-tight">
                {mod.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm font-normal leading-normal text-muted">
                {mod.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Install() {
  return (
    <section
      id="instalar"
      className="border-b border-border py-16 sm:py-24"
      aria-labelledby="instalar-titulo"
    >
      <div className="page-wrap">
        <h2
          id="instalar-titulo"
          className="mb-4 font-display text-section font-medium tracking-tight"
        >
          Cómo se instala
        </h2>
        <p className="mb-10 max-w-xl text-lead font-normal text-muted">
          Sin tiendas. En Android se descarga el APK. En iPhone, iPad y tablet se
          agrega a la pantalla de inicio.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <Smartphone className="size-5 text-accent" strokeWidth={1.6} />
              <h3 className="font-sans text-base font-medium">Android</h3>
            </div>
            <p className="text-sm font-normal leading-normal text-muted">
              Descarga el APK desde nodusapp.app e instálalo en tu teléfono. Si el
              sistema pregunta, permite instalar desde este origen.
            </p>
          </article>

          <article className="rounded-xl bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <Tablet className="size-5 text-accent" strokeWidth={1.6} />
              <h3 className="font-sans text-base font-medium">iOS y tablet</h3>
            </div>
            <p className="mb-6 text-sm font-normal leading-normal text-muted">
              Nodus es una PWA. No se instala desde una tienda: se agrega a la
              pantalla de inicio, en tres pasos.
            </p>
            <ol className="flex flex-col gap-4">
              {PWA_STEPS.map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-elevated text-accent">
                    <step.icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-sans text-sm font-medium text-fg">{step.title}</p>
                    <p className="mt-1 text-sm font-normal leading-normal text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="border-b border-border py-16 sm:py-24" aria-label="Espacio y privacidad">
      <div className="page-wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div id="congregacion">
          <h2 className="font-display text-section font-medium tracking-tight">
            Cada iglesia, su espacio
          </h2>
          <p className="mt-4 max-w-md text-lead font-normal text-muted">
            Cada congregación vive en su propio subdominio. Espacio propio,
            datos separados: nada se mezcla con otra iglesia.
          </p>
          <p className="mt-6 inline-flex items-baseline gap-0 rounded-md bg-elevated px-4 py-3 font-sans text-sm font-normal tracking-wide text-fg">
            <span className="text-accent">tu-iglesia</span>
            <span className="text-muted">.{SITE}</span>
          </p>
        </div>
        <div id="privacidad">
          <Shield className="mb-5 size-6 text-accent" strokeWidth={1.6} />
          <h2 className="font-display text-section font-medium tracking-tight">
            Privacidad por congregación
          </h2>
          <p className="mt-4 max-w-md text-lead font-normal text-muted">
            Cada congregación controla su información. Los registros, avisos y
            reportes pertenecen a esa iglesia y no se comparten entre espacios.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onInstall }: { onInstall: () => void }) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="cta-final">
      <div className="page-wrap flex flex-col items-start gap-8">
        <h2
          id="cta-final"
          className="max-w-2xl font-display text-hero font-medium tracking-tight"
        >
          Organiza tu congregación con claridad
        </h2>
        <Button size="xl" onClick={onInstall}>
          Instalar Nodus
        </Button>
      </div>
    </section>
  );
}

function SiteFooter() {
  const items: { key: string; node: ReactNode }[] = [
    { key: "name", node: "Nodus" },
    {
      key: "web",
      node: (
        <a href={`https://${SITE}`} className="hover:text-fg">
          {SITE}
        </a>
      ),
    },
    {
      key: "phone",
      node: (
        <a href={`tel:${PHONE_TEL}`} className="hover:text-fg">
          {PHONE_DISPLAY}
        </a>
      ),
    },
  ];

  return (
    <footer className="border-t border-border py-8">
      <div className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
        {items.map((item, i) => (
          <span key={item.key} className="inline-flex items-center gap-3">
            {i > 0 ? (
              <span className="text-subtle" aria-hidden="true">
                ·
              </span>
            ) : null}
            {item.node}
          </span>
        ))}
      </div>
    </footer>
  );
}

function EnterDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [raw, setRaw] = useState("");
  const slug = useMemo(() => sanitizeSlug(raw), [raw]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!slug) return;
    window.location.assign(`https://${slug}.${SITE}`);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setRaw("");
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Entrar a tu congregación</DialogTitle>
          <DialogDescription>
            Cada iglesia tiene su subdominio. Escribe el nombre de tu espacio.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-5 flex flex-col gap-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2" htmlFor="subdominio">
            <span className="text-sm font-medium text-fg">Subdominio</span>
            <Input
              id="subdominio"
              name="subdominio"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder="tu-iglesia"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              inputMode="url"
            />
          </label>
          <p className="font-sans text-sm font-normal tracking-wide text-muted">
            {slug ? (
              <>
                <span className="text-accent">{slug}</span>
                <span>.{SITE}</span>
              </>
            ) : (
              <span>tu-iglesia.{SITE}</span>
            )}
          </p>
          <Button type="submit" className="w-full" disabled={!slug}>
            Entrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SafariMark({ className, strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m16.5 7.5-2.2 6.8-6.8 2.2 2.2-6.8z" />
    </svg>
  );
}

function IosShareMark({ className, strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v10" />
      <path d="m8 8 4-4 4 4" />
      <path d="M7 12.5v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}

const PWA_STEPS = [
  {
    n: "01",
    title: "Abre Safari",
    body: "Entra a nodusapp.app desde Safari en tu iPhone, iPad o tablet.",
    icon: SafariMark,
  },
  {
    n: "02",
    title: "Toca Compartir",
    body: "El icono de cuadrado con flecha, en la barra inferior o superior.",
    icon: IosShareMark,
  },
  {
    n: "03",
    title: "Agregar a pantalla de inicio",
    body: "Confirma. Nodus queda como app, junto al resto de iconos.",
    icon: Plus,
  },
] as const;
