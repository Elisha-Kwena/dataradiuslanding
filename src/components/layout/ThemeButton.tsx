"use client";

import { Sun } from "lucide-react";

export default function ThemeButton() {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-blue-800 hover:text-blue-400"
    >
      <Sun className="size-5" />
    </button>
  );
}
