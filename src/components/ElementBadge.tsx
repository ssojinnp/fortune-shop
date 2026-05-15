import type { CardElement } from "../types/card";

const elementMeta: Record<CardElement, { label: string; icon: string; className: string }> = {
  green: { label: "GREEN", icon: "♣", className: "border-[#4f9d7e] bg-[#dff7e9] text-[#2a2038]" },
  moon: { label: "MOON", icon: "☾", className: "border-[#7251bd] bg-[#efe9ff] text-[#3b247a]" },
  cloud: { label: "CLOUD", icon: "☁", className: "border-[#8d7fa8] bg-[#fff7df] text-[#2a2038]" },
  spark: { label: "SPARK", icon: "✦", className: "border-[#b8842d] bg-[#f6c85f] text-[#2a2038]" },
  water: { label: "WATER", icon: "◆", className: "border-[#77d7b2] bg-[#e7fff6] text-[#2a2038]" },
  star: { label: "STAR", icon: "★", className: "border-[#d8b46a] bg-[#fff7df] text-[#2a2038]" },
};

export function ElementBadge({ element }: { element: CardElement }) {
  const meta = elementMeta[element];

  return (
    <span className={`inline-grid min-w-14 place-items-center border-2 px-2 py-1 text-center ${meta.className}`}>
      <span className="text-lg leading-none">{meta.icon}</span>
      <span className="font-modern-en mt-0.5 text-[10px] font-black">{meta.label}</span>
    </span>
  );
}

