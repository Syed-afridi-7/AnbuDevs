import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { Language } from "@/data/codelabProblems";
import { LANGUAGES } from "@/data/codelabProblems";

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
}

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700
                   text-zinc-200 text-sm font-medium transition-colors
                   border border-zinc-700 hover:border-zinc-600
                   focus:outline-none focus:ring-2 focus:ring-orange-500/30"
      >
        {value}
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 w-40 rounded-xl bg-zinc-800 border border-zinc-700
                     shadow-xl shadow-black/40 z-50 py-1 overflow-hidden"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onChange(lang);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors
                ${
                  lang === value
                    ? "bg-orange-500/15 text-orange-400 font-medium"
                    : "text-zinc-300 hover:bg-zinc-700/60 hover:text-zinc-100"
                }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
