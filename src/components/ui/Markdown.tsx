import Link from "next/link";
import { type ReactNode } from "react";

/** Minimal markdown renderer for ported content: headings, lists, tables,
 *  code blocks, blockquotes, bold/italic/code/links. */
export default function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  const inline = (s: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let k = 0;
    const re = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let last = 0;
    for (const m of s.matchAll(re)) {
      if (m.index > last) parts.push(s.slice(last, m.index));
      const t = m[0];
      if (t.startsWith("**")) parts.push(<strong key={k++} className="font-semibold text-slate-200">{t.slice(2, -2)}</strong>);
      else if (t.startsWith("`")) parts.push(<code key={k++} className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[0.85em] text-blue-300">{t.slice(1, -1)}</code>);
      else if (t.startsWith("[")) {
        const mm = t.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
        const href = mm[2];
        const external = href.startsWith("http");
        parts.push(
          <Link
            key={k++}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-blue-400 underline decoration-blue-400/40 underline-offset-2 transition-colors hover:text-blue-300"
          >
            {mm[1]}
          </Link>,
        );
      } else parts.push(<em key={k++}>{t.slice(1, -1)}</em>);
      last = m.index + t.length;
    }
    if (last < s.length) parts.push(s.slice(last));
    return parts;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line)) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={key++} className="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-black p-4 font-mono text-xs leading-relaxed text-slate-300">
          {buf.join("\n")}
        </pre>,
      );
      continue;
    }

    const h = line.match(/^(#{2,4})\s+(.*)/);
    if (h) {
      const lvl = h[1].length;
      const cls =
        lvl === 2
          ? "mt-10 text-xl font-semibold text-gray-200 md:text-2xl"
          : lvl === 3
            ? "mt-8 text-lg font-semibold text-gray-300"
            : "mt-6 font-semibold text-gray-300";
      blocks.push(
        <h2 key={key++} className={cls}>
          {inline(h[2])}
        </h2>,
      );
      i++;
      continue;
    }

    if (/^\|.*\|/.test(line)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|.*\|/.test(lines[i])) {
        const cells = lines[i].split("|").slice(1, -1).map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={key++} className="my-4 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            {head && (
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-left">
                  {head.map((c, j) => (
                    <th key={j} className="px-4 py-2.5 font-medium text-slate-300">{inline(c)}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-b border-slate-800/50 last:border-0">
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-2.5 text-slate-400">{inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push(
        <blockquote key={key++} className="my-4 border-l-2 border-blue-800 pl-4 font-serif text-slate-400">
          {buf.map((b, j) => (
            <p key={j} className={j > 0 ? "mt-2" : ""}>{inline(b)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, ""));
      blocks.push(
        <ul key={key++} className="my-4 flex flex-col gap-2">
          {items.map((it, j) => (
            <li key={j} className="flex gap-3 text-slate-400">
              <span className="mt-2.5 size-1 flex-none rounded-full bg-slate-600" />
              <span>{inline(it)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+\.\s+/, ""));
      blocks.push(
        <ol key={key++} className="my-4 flex flex-col gap-2">
          {items.map((it, j) => (
            <li key={j} className="flex gap-3 text-slate-400">
              <span className="w-5 flex-none pt-0.5 text-right font-mono text-xs text-blue-400">{j + 1}.</span>
              <span>{inline(it)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    blocks.push(
      <p key={key++} className="my-4 font-serif leading-relaxed text-slate-400">
        {inline(line)}
      </p>,
    );
    i++;
  }

  return <div className="text-[15px]">{blocks}</div>;
}
