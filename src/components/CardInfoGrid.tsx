import type { FortuneCard } from "../types/card";

const infoIcons = ["✦", "■", "◷"];

export function CardInfoGrid({ card }: { card: FortuneCard }) {
  const items = [
    ["행운 아이템", card.luckyItems[0] ?? card.luckyItem],
    ["행운 컬러", card.luckyColors[0] ?? card.luckyColor],
    ["행운 시간", card.luckyTimes[0] ?? card.luckyTime],
  ];

  return (
    <section className="grid grid-cols-3 gap-2">
      {items.map(([label, value], index) => (
        <div
          key={label}
          className="min-h-[76px] border-2 border-[#d99b72] bg-[#fff8dc] p-2 text-center shadow-[inset_0_0_0_2px_rgba(255,255,255,0.7)]"
        >
          <p className="border-b border-[#e8b98f] pb-1 text-[10px] font-black text-[#5640a0]">
            {label}
          </p>
          <div className="mt-1 text-lg text-[#7557bf]">{infoIcons[index]}</div>
          <p className="mt-1 text-[11px] font-black leading-4 text-[#2e211a]">{value}</p>
        </div>
      ))}
    </section>
  );
}
