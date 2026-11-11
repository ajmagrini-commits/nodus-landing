import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Plataforma = "android" | "ios";

const PASOS: Record<Plataforma, { titulo: string; texto: ReactNode }[]> = {
  android: [
    { titulo: "Abre tu congregación en Chrome", texto: <>Toca «Entrar» y elige tu congregación.</> },
    { titulo: "Toca el menú ⋮", texto: <>Los tres puntos, arriba a la derecha.</> },
    {
      titulo: "Elige «Instalar app»",
      texto: <>En algunos teléfonos dice «Agregar a pantalla de inicio».</>,
    },
    { titulo: "Confirma con «Instalar»", texto: <>Chrome la instala como una app más.</> },
    { titulo: "¡Listo!", texto: <>Nodus queda en tu pantalla de inicio.</> },
  ],
  ios: [
    { titulo: "Abre tu congregación en Safari", texto: <>Toca «Entrar» y elige tu congregación.</> },
    { titulo: "Toca Compartir", texto: <>El cuadrado con la flecha hacia arriba, en la barra de Safari.</> },
    {
      titulo: "«Agregar a pantalla de inicio»",
      texto: <>Desliza la lista hacia abajo si no la ves.</>,
    },
    { titulo: "Toca «Agregar»", texto: <>Arriba a la derecha.</> },
    { titulo: "¡Listo!", texto: <>Nodus queda en tu pantalla de inicio.</> },
  ],
};

const INTERVALO = 2800;

function detectarPlataforma(): Plataforma {
  if (typeof navigator === "undefined") return "android";
  const ua = navigator.userAgent;
  const ipadOs = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /iPhone|iPad|iPod/i.test(ua) || ipadOs ? "ios" : "android";
}

export function InstallTutorial() {
  const [plataforma, setPlataforma] = useState<Plataforma>("android");
  const [paso, setPaso] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [reducido, setReducido] = useState(false);
  const [visible, setVisible] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlataforma(detectarPlataforma());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducido(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(Boolean(e?.isIntersecting)), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const corriendo = visible && !pausado && !reducido;
  const total = PASOS[plataforma].length;

  useEffect(() => {
    if (!corriendo) return;
    const id = window.setInterval(() => setPaso((p) => (p + 1) % total), INTERVALO);
    return () => window.clearInterval(id);
  }, [corriendo, total]);

  function elegirPlataforma(p: Plataforma) {
    setPlataforma(p);
    setPaso(0);
  }

  return (
    <div ref={raiz} className="mt-10">
      <div role="tablist" aria-label="Sistema del teléfono" className="tabs">
        {(["android", "ios"] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            id={`tab-${p}`}
            aria-selected={plataforma === p}
            aria-controls="tutorial-panel"
            className={cn("tab", plataforma === p && "is-active")}
            onClick={() => elegirPlataforma(p)}
          >
            {p === "android" ? "Android" : "iPhone y iPad"}
          </button>
        ))}
      </div>

      <div
        id="tutorial-panel"
        role="tabpanel"
        aria-labelledby={`tab-${plataforma}`}
        className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16"
      >
        <div className="flex justify-center">
          <TelefonoTutorial plataforma={plataforma} paso={paso} />
        </div>

        <div>
          <ol className="flex flex-col gap-2">
            {PASOS[plataforma].map((s, i) => (
              <li key={s.titulo}>
                <button
                  type="button"
                  onClick={() => {
                    setPaso(i);
                    setPausado(true);
                  }}
                  aria-current={paso === i ? "step" : undefined}
                  className={cn("paso", paso === i && "is-active", i < paso && "is-done")}
                >
                  <span className="paso-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="flex min-w-0 flex-col text-left">
                    <span className="font-sans text-base font-semibold text-fg">{s.titulo}</span>
                    <span className="text-[0.95rem] leading-snug text-muted">{s.texto}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          {!reducido ? (
            <button
              type="button"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted hover:bg-elevated hover:text-fg"
              onClick={() => setPausado((v) => !v)}
            >
              {pausado ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
              {pausado ? "Reproducir animación" : "Pausar animación"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TelefonoTutorial({ plataforma, paso }: { plataforma: Plataforma; paso: number }) {
  const ios = plataforma === "ios";
  const enInicio = paso === 4;
  return (
    <div
      className={cn("tut-phone", ios ? "is-ios" : "is-android")}
      data-paso={paso}
      role="img"
      aria-label={`Animación: ${PASOS[plataforma][paso]?.titulo ?? ""}`}
    >
      <div className="tut-screen">
        {/* Página: la app abierta en el navegador */}
        <div className={cn("tut-page", enInicio && "is-hidden")}>
          {!ios ? (
            <div className="tut-bar-top">
              <span className={cn("tut-url", paso === 0 && "is-hot")}>
                <LockIcon /> coro.nodusapp.app
              </span>
              <span className={cn("tut-kebab", paso === 1 && "is-hot")} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
          ) : null}
          <img src="/capturas/ruta.webp" alt="" className="tut-shot" width={540} height={1169} loading="lazy" />
          {ios ? (
            <div className="tut-bar-bottom">
              <span className={cn("tut-url", paso === 0 && "is-hot")}>
                <LockIcon /> coro.nodusapp.app
              </span>
              <div className="tut-toolbar" aria-hidden="true">
                <ToolIcon d="M15 6l-6 6 6 6" />
                <ToolIcon d="M9 6l6 6-6 6" />
                <span className={cn("tut-share", paso === 1 && "is-hot")}>
                  <ToolIcon d="M12 4v10M8 8l4-4 4 4M7 12.5v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5" />
                </span>
                <ToolIcon d="M5 5h10a4 4 0 0 1 4 4v10H9a4 4 0 0 1-4-4z" />
                <ToolIcon d="M7 7h10v10H7zM4 4h10" />
              </div>
            </div>
          ) : null}
        </div>

        {/* Android: menú de Chrome */}
        {!ios ? (
          <div className={cn("tut-menu", paso === 2 && "is-open")} aria-hidden="true">
            <span>Nueva pestaña</span>
            <span>Historial</span>
            <span>Descargas</span>
            <span className="is-target">
              <InstallIcon /> Instalar app
            </span>
            <span>Compartir…</span>
            <span>Configuración</span>
          </div>
        ) : null}

        {/* iOS: hoja de Compartir */}
        {ios ? (
          <div className={cn("tut-sheet", paso === 2 && "is-open")} aria-hidden="true">
            <span className="tut-grab" />
            <span>Copiar</span>
            <span>Agregar a Favoritos</span>
            <span className="is-target">
              <PlusSquare /> Agregar a pantalla de inicio
            </span>
            <span>Buscar en la página</span>
          </div>
        ) : null}

        {/* Paso 4: confirmar */}
        <div className={cn("tut-dialog", paso === 3 && "is-open", ios && "is-ios")} aria-hidden="true">
          {ios ? (
            <>
              <div className="tut-dialog-head">
                <span className="text-accent/80">Cancelar</span>
                <b>Agregar a inicio</b>
                <span className="tut-add is-target">Agregar</span>
              </div>
              <div className="tut-dialog-app">
                <img src="/icon-192.png" alt="" width={48} height={48} />
                <span>
                  <b>Nodus</b>
                  <small>coro.nodusapp.app</small>
                </span>
              </div>
            </>
          ) : (
            <>
              <img src="/icon-192.png" alt="" width={48} height={48} className="mx-auto rounded-xl" />
              <b>¿Instalar app?</b>
              <small>Nodus · coro.nodusapp.app</small>
              <div className="tut-dialog-btns">
                <span>Cancelar</span>
                <span className="is-target">Instalar</span>
              </div>
            </>
          )}
        </div>

        {/* Paso 5: pantalla de inicio */}
        <div className={cn("tut-home", enInicio && "is-open")} aria-hidden="true">
          <div className="tut-grid">
            {Array.from({ length: 11 }, (_, i) => (
              <span key={i} className="tut-app" />
            ))}
            <span className="tut-app is-nodus">
              <img src="/icon-192.png" alt="" width={56} height={56} />
              <small>Nodus</small>
            </span>
          </div>
        </div>

        <span className={cn("tut-tap", `at-${plataforma}-${paso}`)} aria-hidden="true" />
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ToolIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function InstallIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M12 7.5v7M9 11.5l3 3 3-3" />
    </svg>
  );
}

function PlusSquare() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </svg>
  );
}
