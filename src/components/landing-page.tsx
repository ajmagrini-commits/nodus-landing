import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { NodusLogo, NodusMark } from "@/components/logo";
import { InstallTutorial } from "@/components/install-tutorial";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const SITE = "nodusapp.app";
/** Mismo texto de autoría que la app (version-tarjeta.tsx · lineaCopyright). El año sale del reloj. */
const COPYRIGHT_TITULAR = "Naví Consultores 1260";
const lineaCopyright = (anio = new Date().getFullYear()) =>
  `© ${anio} ${COPYRIGHT_TITULAR}. Todos los derechos reservados.`;

/** Lista pública de congregaciones activas (Consola Matriz). Solo nombre, slug y dirección. */
const CONGREGACIONES_URL =
  import.meta.env.VITE_CONGREGACIONES_URL ||
  "https://coro.nodusapp.app/api/congregaciones-publicas";

type Congregacion = { nombre: string; slug: string; url: string };

/** Respaldo si la lista no responde: nunca un campo libre. */
export const CONGREGACIONES_RESPALDO: Congregacion[] = [
  { nombre: "CCN Coro", slug: "coro", url: "https://coro.nodusapp.app/login" },
];

const MODULOS = [
  {
    id: "ruta",
    titulo: "Ruta al Éxito",
    texto: "Diez pasos en casa, rumbo al Encuentro. Cada Ruta con su avance, paso a paso.",
    img: "/capturas/ruta.webp",
    color: "#FF8C00",
  },
  {
    id: "encuentros",
    titulo: "Encuentros",
    texto: "Inscripciones, abonos y fechas en un solo lugar, con la tasa del día.",
    img: "/capturas/encuentros.webp",
    color: "#00D4FF",
  },
  {
    id: "esfordi",
    titulo: "ESFORDI",
    texto: "La Escuela de Formación Discipular: clases, materias y quién va al día.",
    img: "/capturas/esfordi.webp",
    color: "#00D4FF",
  },
  {
    id: "discipulado",
    titulo: "Discipulado",
    texto: "Cada líder reporta su grupo con un toque: presente, justificado o ausente.",
    img: "/capturas/discipulado.webp",
    color: "#FF8C00",
  },
  {
    id: "red",
    titulo: "Tejiendo la Red",
    texto: "La red de la congregación, de pastor a discípulo, a la vista.",
    img: "/capturas/red.webp",
    color: "#00D4FF",
  },
  {
    id: "cuidado",
    titulo: "Cuidado Pastoral",
    texto: "Pedir oración, agendar una cita o contactar un ministerio, con respuesta de la casa.",
    img: "/capturas/cuidado.webp",
    color: "#FF8C00",
  },
  {
    id: "mapa",
    titulo: "Mapa de Territorios",
    texto: "Cada red demarca la zona que trabaja; los pastores la revisan y aprueban.",
    img: "/capturas/mapa.webp",
    color: "#00D4FF",
  },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function LandingPage() {
  const [enterOpen, setEnterOpen] = useState(false);
  const abrir = () => setEnterOpen(true);
  const instalar = () => scrollToId("instalar");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
        <div className="page-wrap safe-header flex items-center justify-between gap-3">
          <a href="#inicio" className="shrink-0 rounded-md" aria-label="Nodus, inicio">
            <NodusLogo />
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" className="hidden sm:inline-flex" onClick={instalar}>
              Instalar
            </Button>
            <Button size="md" onClick={abrir}>
              Entrar
            </Button>
          </div>
        </div>
      </header>

      <main id="contenido">
        <Hero onEnter={abrir} onInstall={instalar} />
        <Modulos />
        <section
          id="instalar"
          className="scroll-mt-20 border-b border-border py-16 sm:py-24"
          aria-labelledby="instalar-titulo"
        >
          <div className="page-wrap">
            <p className="eyebrow">Sin tiendas de apps</p>
            <h2 id="instalar-titulo" className="mt-3 font-display text-section font-medium tracking-tight">
              Instálala en tu teléfono
            </h2>
            <p className="mt-4 max-w-xl text-lead text-muted">
              Nodus se instala desde el navegador, en menos de un minuto. Primero entra a tu
              congregación; luego sigue los pasos.
            </p>
            <InstallTutorial />
          </div>
        </section>
        <CierreCta onEnter={abrir} />
      </main>

      <SiteFooter />
      <EnterDialog open={enterOpen} onOpenChange={setEnterOpen} />
    </div>
  );
}

function Hero({ onEnter, onInstall }: { onEnter: () => void; onInstall: () => void }) {
  return (
    <section id="inicio" className="hero-wash overflow-hidden border-b border-border" aria-labelledby="frase">
      <div className="page-wrap grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:py-24">
        <div className="flex min-w-0 flex-col items-start gap-7">
          <p className="stagger-in eyebrow">La app de la congregación</p>
          <h1 id="frase" className="stagger-in font-display text-hero font-medium tracking-tight">
            Tu congregación, <span className="text-accent">conectada</span>.
          </h1>
          <p className="stagger-in max-w-lg text-lead text-muted">
            Ruta al Éxito, Encuentros, ESFORDI, Discipulado y la Red de la iglesia, en una sola app
            para pastores y líderes.
          </p>
          <div className="stagger-in flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Button size="xl" className="w-full sm:w-auto" onClick={onEnter}>
              Entrar a mi congregación
            </Button>
            <Button size="xl" variant="secondary" className="w-full sm:w-auto" onClick={onInstall}>
              Cómo instalar
            </Button>
          </div>
        </div>
        <HeroTelefonos />
      </div>
    </section>
  );
}

function Telefono({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn("phone-frame", className)}>
      <img
        src={src}
        alt={alt}
        width={540}
        height={1169}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className="block h-auto w-full"
      />
    </figure>
  );
}

function HeroTelefonos() {
  return (
    <div className="stagger-in relative mx-auto flex w-full max-w-[26rem] justify-center lg:max-w-none">
      <div aria-hidden="true" className="hero-glow" />
      <Telefono
        src="/capturas/red.webp"
        alt=""
        className="phone-side -mr-16 w-[42%] -rotate-6 sm:-mr-20"
      />
      <Telefono
        src="/capturas/ruta.webp"
        alt="Pantalla de la Ruta al Éxito en Nodus, con datos de ejemplo"
        className="relative z-10 w-[56%]"
        priority
      />
      <Telefono
        src="/capturas/discipulado.webp"
        alt=""
        className="phone-side -ml-16 w-[42%] rotate-6 sm:-ml-20"
      />
    </div>
  );
}

function Modulos() {
  return (
    <section id="modulos" className="border-b border-border py-16 sm:py-24" aria-labelledby="modulos-titulo">
      <div className="page-wrap">
        <p className="eyebrow">Lo que hay adentro</p>
        <h2 id="modulos-titulo" className="mt-3 font-display text-section font-medium tracking-tight">
          Siete módulos, una sola red
        </h2>
        <p className="mt-4 max-w-xl text-lead text-muted">
          Capturas reales de la app.
        </p>
      </div>
      <ul className="modulos-rail page-wrap-rail mt-10" aria-label="Módulos de Nodus">
        {MODULOS.map((m) => (
          <li key={m.id} className="modulo-card">
            <div className="modulo-shot">
              <Telefono src={m.img} alt={`Pantalla de ${m.titulo} en Nodus, con datos de ejemplo`} />
            </div>
            <div className="p-5">
              <h3 className="flex items-center gap-2 font-sans text-lg font-semibold tracking-tight">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ background: m.color }} />
                {m.titulo}
              </h3>
              <p className="mt-1.5 text-[0.95rem] leading-normal text-muted">{m.texto}</p>
            </div>
          </li>
        ))}
        <li className="modulo-card">
          <div className="modulo-shot is-collage">
            <img
              src="/capturas/mas-funciones.webp"
              alt="Asistencia, Altar Familiar, Ministerios y Nuevos convertidos en Nodus"
              width={540}
              height={720}
              loading="lazy"
              decoding="async"
              className="block h-full w-full object-cover object-top"
            />
          </div>
          <div className="p-5">
            <h3 className="flex items-center gap-2 font-sans text-lg font-semibold tracking-tight">
              <span aria-hidden="true" className="size-2 rounded-full bg-fg" />Y muchas funciones más
            </h3>
            <p className="mt-1.5 text-[0.95rem] leading-normal text-muted">
              Asistencia, Altar Familiar, Ministerios, Nuevos convertidos, avisos y reportes.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
}

function CierreCta({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="cta-wash py-20 sm:py-28" aria-labelledby="cta-final">
      <div className="page-wrap flex flex-col items-center gap-7 text-center">
        <NodusMark className="size-16" />
        <h2 id="cta-final" className="max-w-2xl font-display text-hero font-medium tracking-tight">
          Cada persona, un nodo de la red.
        </h2>
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="xl" className="w-full sm:w-auto" onClick={onEnter}>
            Entrar a mi congregación
          </Button>
          <Button size="xl" variant="secondary" className="w-full sm:w-auto" onClick={() => scrollToId("instalar")}>
            Cómo instalar
          </Button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="page-wrap flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2.5">
          <NodusMark className="size-6" />
          <span className="font-display text-xs tracking-[0.18em] text-fg uppercase">Nodus</span>
          <span className="text-subtle" aria-hidden="true">·</span>
          <a href={`https://${SITE}`} className="inline-flex min-h-11 items-center hover:text-fg">
            {SITE}
          </a>
        </span>
        <p className="flex flex-col gap-0.5 sm:items-end">
          <span>{lineaCopyright()}</span>
          <span className="text-subtle">Desarrollado por Abraham J. Magrini</span>
        </p>
      </div>
    </footer>
  );
}

type Estado = "cargando" | "lista" | "respaldo";

function useCongregaciones(activo: boolean) {
  const [estado, setEstado] = useState<Estado>("cargando");
  const [lista, setLista] = useState<Congregacion[]>([]);
  const pedido = useRef(false);

  useEffect(() => {
    if (!activo || pedido.current) return;
    pedido.current = true;
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 6000);
    fetch(CONGREGACIONES_URL, { signal: ctrl.signal, headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { congregaciones?: unknown }) => {
        const filas = Array.isArray(data.congregaciones) ? data.congregaciones : [];
        const limpias = filas.filter(
          (c): c is Congregacion =>
            !!c &&
            typeof (c as Congregacion).nombre === "string" &&
            typeof (c as Congregacion).url === "string" &&
            /^https:\/\/[a-z0-9]+\.nodusapp\.app\/login$/.test((c as Congregacion).url),
        );
        if (!limpias.length) throw new Error("vacia");
        setLista(limpias);
        setEstado("lista");
      })
      .catch(() => {
        setLista(CONGREGACIONES_RESPALDO);
        setEstado("respaldo");
        pedido.current = false; // se reintenta la próxima vez que se abra
      })
      .finally(() => window.clearTimeout(t));
    return () => {
      window.clearTimeout(t);
    };
  }, [activo]);

  return { estado, lista };
}

function iniciales(nombre: string) {
  const sin = nombre.replace(/^\s*c\.?\s*c\.?\s*n\.?\s+/i, "");
  const palabras = sin.split(/\s+/).filter((w) => w.length > 2 || /^\p{Lu}/u.test(w));
  const ini =
    palabras.length > 1
      ? palabras.slice(0, 2).map((w) => w[0]).join("")
      : (palabras[0] || sin).slice(0, 2);
  return ini.toUpperCase() || "N";
}

function EnterDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { estado, lista } = useCongregaciones(open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Elige tu congregación</DialogTitle>
          <DialogDescription>Te llevamos a su página para iniciar sesión.</DialogDescription>
        </DialogHeader>
        <div className="mt-5" aria-live="polite" aria-busy={estado === "cargando"}>
          {estado === "cargando" ? (
            <ul className="flex flex-col gap-2" aria-label="Cargando congregaciones">
              {[0, 1].map((i) => (
                <li key={i} className="skeleton h-16 rounded-lg" />
              ))}
            </ul>
          ) : (
            <ul className="flex max-h-[min(60dvh,26rem)] flex-col gap-2 overflow-y-auto">
              {lista.map((c) => (
                <li key={c.slug}>
                  <a
                    href={c.url}
                    className="group flex min-h-16 items-center gap-3 rounded-lg bg-elevated px-3 py-2.5 shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150 hover:bg-surface hover:shadow-[var(--shadow-accent)]"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-md bg-bg font-display text-sm font-semibold text-accent shadow-[var(--shadow-border)]"
                    >
                      {iniciales(c.nombre)}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-sans text-base font-semibold text-fg">{c.nombre}</span>
                      <span className="truncate text-sm text-muted">{new URL(c.url).host}</span>
                    </span>
                    <ChevronRight
                      className="size-5 text-subtle transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
          {estado === "respaldo" ? (
            <p className="mt-3 text-sm text-subtle">No pudimos cargar la lista completa. Intenta de nuevo más tarde.</p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

