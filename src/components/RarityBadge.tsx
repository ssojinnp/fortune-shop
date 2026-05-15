import type { Rarity } from "../types/card";

const rarityStyles: Record<Rarity, string> = {
  common:
    "border-[#4f9d7e] bg-[linear-gradient(180deg,#fff7df_0%,#dff7e9_48%,#77d7b2_100%)] text-[#2a2038] shadow-[inset_0_0_0_1px_rgba(255,249,232,0.72),3px_3px_0_rgba(59,36,122,0.16)]",
  rare:
    "border-[#7251bd] bg-[linear-gradient(180deg,#fff7df_0%,#efe9ff_46%,#b99cff_100%)] text-[#3b247a] shadow-[inset_0_0_0_1px_rgba(255,249,232,0.72),3px_3px_0_rgba(59,36,122,0.18)]",
  epic:
    "border-[#b8842d] bg-[linear-gradient(180deg,#fff9e8_0%,#f6c85f_58%,#d8a846_100%)] text-[#2a2038] shadow-[inset_0_0_0_1px_rgba(255,249,232,0.75),3px_3px_0_rgba(59,36,122,0.18)]",
  secret:
    "border-[#d86b8a] bg-[linear-gradient(90deg,#ff9fba,#fff7df,#b99cff,#f6c85f)] text-[#2a2038] shadow-[inset_0_0_0_1px_rgba(255,249,232,0.8),0_0_16px_rgba(255,159,186,0.44),3px_3px_0_rgba(59,36,122,0.18)]",
};

const rarityLabels: Record<Rarity, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  secret: "Secret",
};

export function RarityBadge({ rarity }: { rarity: Rarity }) {
  return (
    <span
      className={`font-modern-en relative inline-flex h-7 min-w-16 items-center justify-center rounded-[8px] border-2 px-2 text-[11px] font-black uppercase ${rarityStyles[rarity]}`}
    >
      {rarity === "rare" && (
        <span className="mr-1 h-1.5 w-1.5 rotate-45 bg-[#8b63d6] shadow-[0_0_6px_rgba(139,99,214,0.75)]" />
      )}
      {rarityLabels[rarity]}
      {rarity === "rare" && (
        <span className="ml-1 h-1.5 w-1.5 rotate-45 bg-[#f3c766] shadow-[0_0_6px_rgba(243,199,102,0.75)]" />
      )}
    </span>
  );
}
