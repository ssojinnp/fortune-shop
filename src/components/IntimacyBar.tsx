export function IntimacyBar({ level = 1, count = 1 }: { level?: number; count?: number }) {
  const filled = Math.min(5, Math.max(1, level));

  return (
    <footer className="grid grid-cols-[1fr_auto] items-center gap-2 border-2 border-[#d99b72] bg-[#fff8dc] px-3 py-2 text-[#2e211a]">
      <div>
        <span className="text-sm font-black text-[#c4364f]">친밀도</span>
        <span className="ml-2 text-[#6747ad]">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < filled ? "" : "opacity-25"}>
              ♥
            </span>
          ))}
        </span>
      </div>
      <span className="text-xs font-black">Lv.{level} · x{count}</span>
    </footer>
  );
}
