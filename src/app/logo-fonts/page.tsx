const FONTS = [
  { class: "font-fantasy", label: "font-fantasy (current: OBLISK)" },
  { class: "font-supershiny", label: "font-supershiny" },
  { class: "font-autobus", label: "font-autobus" },
  { class: "font-earlybird", label: "font-earlybird" },
  { class: "font-ibmblockserif", label: "font-ibmblockserif" },
  { class: "font-akhirtahun", label: "font-akhirtahun" },
];

export default function LogoFontsPage() {
  return (
    <main className="min-h-screen bg-black px-8 py-24">
      <h1 className="mb-2 text-xs font-mono uppercase tracking-widest text-slate-500">
        Logo font preview
      </h1>
      <p className="mb-12 font-serif text-sm text-slate-400">
        Which of these looks like the fantasy font you had? Tell me the name
        and I will set it as the logo font.
      </p>
      <div className="space-y-10">
        {FONTS.map((f) => (
          <div key={f.class} className="border-b border-white/10 pb-8">
            <p className="mb-3 text-[10px] font-mono uppercase tracking-widest text-slate-600">
              {f.label}
            </p>
            <p className={`text-blue-800 ${f.class} font-extrabold text-3xl`}>
              DataRadius
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
