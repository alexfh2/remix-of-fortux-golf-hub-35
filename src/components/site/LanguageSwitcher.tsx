import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGS = [
  { code: "es", label: "Español" },
  { code: "ca", label: "Català" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
] as const;

type Code = (typeof LANGS)[number]["code"];

export function LanguageSwitcher() {
  const [lang, setLang] = useState<Code>("es");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("fortux:lang")) as Code | null;
    if (stored && LANGS.some((l) => l.code === stored)) setLang(stored);
  }, []);

  const select = (code: Code) => {
    setLang(code);
    if (typeof window !== "undefined") localStorage.setItem("fortux:lang", code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
        <Globe className="h-4 w-4" />
        {lang.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGS.map((l) => (
          <DropdownMenuItem key={l.code} onClick={() => select(l.code)}>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
