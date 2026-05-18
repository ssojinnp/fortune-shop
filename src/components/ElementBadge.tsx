import type { CardElement } from "../types/card";

export const elementMeta: Record<CardElement, { label: string; icon: string; className: string }> = {
  green: { label: "GREEN", icon: "♣", className: "border-[#1f9d63] bg-[#9ff0c3] text-[#083d26]" },
  moon: { label: "MOON", icon: "☾", className: "border-[#7c3aed] bg-[#c4b5fd] text-[#2e1065]" },
  cloud: { label: "CLOUD", icon: "☁", className: "border-[#0284c7] bg-[#bae6fd] text-[#0c4a6e]" },
  spark: { label: "SPARK", icon: "✦", className: "border-[#ea580c] bg-[#fdba74] text-[#7c2d12]" },
  water: { label: "WATER", icon: "◆", className: "border-[#0891b2] bg-[#67e8f9] text-[#164e63]" },
  star: { label: "STAR", icon: "★", className: "border-[#ca8a04] bg-[#fde047] text-[#713f12]" },
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

