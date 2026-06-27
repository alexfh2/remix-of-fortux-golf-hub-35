import { LANGS, useI18n } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex items-center text-[11px] font-medium tracking-[0.18em] text-white/40 select-none">
      {LANGS.map((l, i) => (
        <span key={l.code} className="inline-flex items-center">
          {i > 0 && <span aria-hidden className="mx-2 text-white/15">/</span>}
          <button
            type="button"
            onClick={() => setLang(l.code)}
            className={
              "uppercase transition-colors " +
              (lang === l.code
                ? "text-white"
                : "text-white/40 hover:text-white/70")
            }
            aria-pressed={lang === l.code}
          >
            {l.code}
          </button>
        </span>
      ))}
    </div>
  );
}
