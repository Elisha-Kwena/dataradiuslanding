"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string };
export type SelectVariant = "form" | "tool";

const variants: Record<SelectVariant, { base: string; ok: string; bad: string }> = {
  form: {
    base: "h-12 bg-slate-950 px-3.5 text-white focus:ring-4",
    ok: "border-slate-700 focus:border-blue-700 focus:ring-blue-800/30",
    bad: "border-red-600 focus:border-red-600 focus:ring-red-600/20",
  },
  tool: {
    base: "h-11 bg-black px-3.5 font-mono text-sm text-white focus:ring-1",
    ok: "border-slate-700 focus:border-blue-600 focus:ring-blue-600",
    bad: "border-red-600 focus:border-red-600 focus:ring-red-600/40",
  },
};

/**
 * Custom dropdown: button + listbox so the options panel matches the dark
 * UI instead of the OS-native menu. Keyboard: Enter/Space/arrows to open
 * and move, Enter to pick, Escape or Tab to close.
 */
export default function Select({
  id,
  value,
  onChange,
  options,
  placeholder = "Select",
  invalid = false,
  variant = "form",
  ariaLabel,
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  variant?: SelectVariant;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selected = options.find((o) => o.value === value);
  const v = variants[variant];

  const openList = () => {
    setHighlight(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const pick = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Node && !rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open && highlight >= 0) listRef.current?.children[highlight]?.scrollIntoView({ block: "nearest" });
  }, [open, highlight]);

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (open && options[highlight]) pick(options[highlight].value);
        else openList();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (open) setHighlight((h) => Math.min(options.length - 1, h + 1));
        else openList();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setHighlight((h) => Math.max(0, h - 1));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setHighlight(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setHighlight(options.length - 1);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        aria-describedby={id ? `${id}-note` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border text-left transition focus:outline-none ${v.base} ${invalid ? v.bad : v.ok}`}
      >
        <span className={`truncate ${selected ? "" : "text-slate-600"}`}>{selected?.label ?? placeholder}</span>
        <ChevronDown aria-hidden className={`size-4 flex-none text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={id}
          aria-activedescendant={highlight >= 0 ? `${id ?? "select"}-opt-${options[highlight].value}` : undefined}
          className="scrollbar-hide absolute inset-x-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-700 bg-slate-950 p-1.5 shadow-2xl shadow-black/70"
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id ?? "select"}-opt-${o.value}`}
              role="option"
              aria-selected={o.value === value}
              onMouseEnter={() => setHighlight(i)}
              onClick={() => pick(o.value)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                i === highlight ? "bg-blue-800/40 text-white" : "text-slate-300"
              }`}
            >
              {o.label}
              {o.value === value && <Check aria-hidden className="size-4 flex-none text-blue-400" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
