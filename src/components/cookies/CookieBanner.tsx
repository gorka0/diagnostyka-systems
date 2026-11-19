import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  CONSENT_CATEGORIES,
  acceptAll,
  closeSettings,
  openCookieSettings,
  rejectAll,
  save,
  useConsent,
  type ConsentChoices,
} from "./consent";

type Props = {
  /** adres polityki prywatności i cookies */
  policyHref?: string;
};

const btn =
  "inline-flex h-11 sm:h-12 items-center justify-center rounded-[10px] px-5 text-[15px] sm:text-[16px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 select-none cursor-pointer";
const btnPrimary = `${btn} bg-accent text-foreground hover:bg-[#F5A524] active:bg-[#D98908] shadow-xs`;
const btnSecondary = `${btn} border border-[#D9DDE1] bg-white text-foreground hover:bg-[#F7F7F5]`;
const btnGhost = `${btn} text-foreground underline underline-offset-4 hover:bg-[#F1F3F5]`;
const link =
  "text-accent-text underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground";

/**
 * Wstaw <CookieBanner /> jako PIERWSZY element aplikacji (przed headerem).
 * Baner jest fixed na dole ekranu, ale pierwszy w DOM, więc użytkownik klawiatury
 * dociera do niego od razu. Nie jest modalny i nie przejmuje fokusu.
 */
export function CookieBanner({ policyHref = "/polityka-prywatnosci" }: Props) {
  const { ready, decided, settingsOpen, categories } = useConsent();

  if (!ready) return null; // brak w prerenderowanym HTML i podczas hydracji: zero CLS

  return (
    <>
      {!decided && <Bar policyHref={policyHref} />}
      <SettingsDialog open={settingsOpen} initial={categories} policyHref={policyHref} />
    </>
  );
}

export default CookieBanner;

function Bar({ policyHref }: { policyHref: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Wysokość banera jako zmienna CSS, żeby treść strony nie była zasłonięta:
  // body { padding-bottom: var(--cookie-banner-h, 0px); }
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--cookie-banner-h", `${el.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--cookie-banner-h");
    };
  }, []);

  return (
    <section
      ref={ref}
      role="region"
      aria-label="Zgoda na pliki cookie"
      className={`fixed inset-x-0 z-[60] px-3 motion-safe:transition motion-safe:duration-200 sm:px-4 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      // --mobile-bar-h: wysokość dolnego paska mobilnego (Zadzwoń / Zgłoszenie), jeśli istnieje
      style={{
        bottom: "var(--mobile-bar-h, 0px)",
        paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-5 rounded-2xl border border-[#D9DDE1] bg-white p-5 shadow-[0_12px_40px_rgba(20,23,26,0.16)] md:flex-row md:items-center md:justify-between md:gap-8 md:p-6">
        <div className="max-w-[640px]">
          <h2 className="text-[18px] font-semibold leading-snug text-foreground tracking-tight">
            Pliki cookie i treści zewnętrzne
          </h2>
          <p className="mt-2 text-[15px] sm:text-[16px] leading-relaxed text-foreground-secondary">
            Do działania strony wystarczą dane niezbędne. Za Twoją zgodą załadujemy też mapę
            Google, która może zapisywać własne pliki cookie. Szczegóły:{" "}
            <a href={policyHref} className={link}>
              Polityka prywatności i cookies
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
          <button type="button" onClick={rejectAll} className={btnSecondary}>
            Tylko niezbędne
          </button>
          <button type="button" onClick={openCookieSettings} className={btnGhost}>
            Ustawienia
          </button>
          <button type="button" onClick={acceptAll} className={btnPrimary}>
            Zaakceptuj wszystkie
          </button>
        </div>
      </div>
    </section>
  );
}

function SettingsDialog({
  open,
  initial,
  policyHref,
}: {
  open: boolean;
  initial: ConsentChoices;
  policyHref: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<ConsentChoices>(initial);

  // natywny <dialog>: focus trap, Esc i inertne tło za darmo
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setDraft(initial);
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  }, [open, initial]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="cookie-settings-title"
      onClose={closeSettings}
      onClick={(e) => {
        if (e.target === ref.current) closeSettings(); // klik w tło
      }}
      className="m-auto w-[calc(100%-1.5rem)] max-w-[560px] rounded-2xl border-0 bg-white p-0 text-foreground shadow-[0_24px_80px_rgba(20,23,26,0.3)] backdrop:bg-[#14171A]/60"
    >
      <div className="max-h-[85dvh] overflow-y-auto p-6 md:p-8">
        <h2 id="cookie-settings-title" className="text-[22px] font-semibold leading-snug tracking-tight text-foreground">
          Ustawienia plików cookie
        </h2>
        <p className="mt-2 text-[15px] sm:text-[16px] leading-relaxed text-foreground-secondary">
          Wybierz, na co się zgadzasz. Zmienisz to w każdej chwili w stopce strony.{" "}
          <a href={policyHref} className={link}>
            Polityka prywatności i cookies
          </a>
          .
        </p>

        <ul className="mt-6 divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
          <Row
            title="Niezbędne (zawsze włączone)"
            description="Zapamiętanie Twojego wyboru dotyczącego cookies na tym urządzeniu. Bez tego strona nie mogłaby respektować Twojej decyzji."
            checked
            disabled
          />
          {CONSENT_CATEGORIES.map((c) => (
            <Row
              key={c.id}
              title={c.label}
              description={c.description}
              checked={draft[c.id]}
              onChange={(value) => setDraft((d) => ({ ...d, [c.id]: value }))}
            />
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => save(draft)} className={btnSecondary}>
            Zapisz wybór
          </button>
          <button type="button" onClick={acceptAll} className={btnPrimary}>
            Zaakceptuj wszystkie
          </button>
        </div>
      </div>
    </dialog>
  );
}

function Row({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  const id = useId();
  return (
    <li className="flex items-start justify-between gap-6 py-5">
      <div>
        <label htmlFor={id} className="text-[16px] sm:text-[17px] font-semibold text-foreground">
          {title}
        </label>
        <p id={`${id}-desc`} className="mt-1 text-[14px] sm:text-[15px] leading-relaxed text-foreground-secondary">
          {description}
        </p>
      </div>
      <span className="relative mt-1 inline-flex shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-describedby={`${id}-desc`}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="h-7 w-12 rounded-full bg-[#80868F] transition-colors peer-checked:bg-foreground peer-disabled:opacity-60 peer-focus-visible:ring-2 peer-focus-visible:ring-foreground peer-focus-visible:ring-offset-2"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5"
        />
      </span>
    </li>
  );
}
