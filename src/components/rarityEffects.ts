export type Rarity = "common" | "rare" | "epic" | "secret";

export type RarityEffect = {
  label: string;
  cardName: string;
  accent: string;
  glow: string;
  foil: string;
  burst: string;
  text: string;
};

export const rarityEffects: Record<Rarity, RarityEffect> = {
  common: {
    label: "COMMON",
    cardName: "Lucky Clover",
    accent: "#77d7b2",
    glow: "0 0 24px rgba(119, 215, 178, 0.48)",
    foil: "from-[#fff7df] via-[#dff7e9] to-[#77d7b2]",
    burst: "bg-[#77d7b2]/55",
    text: "text-[#2a2038]",
  },
  rare: {
    label: "RARE",
    cardName: "Moon Token",
    accent: "#b99cff",
    glow: "0 0 34px rgba(185, 156, 255, 0.68)",
    foil: "from-[#fff7df] via-[#efe9ff] to-[#b99cff]",
    burst: "bg-[#b99cff]/65",
    text: "text-[#2a2038]",
  },
  epic: {
    label: "EPIC",
    cardName: "Starlit Crown",
    accent: "#f6c85f",
    glow: "0 0 42px rgba(246, 200, 95, 0.72)",
    foil: "from-[#fff7df] via-[#f6c85f] to-[#b99cff]",
    burst: "bg-[#f6c85f]/70",
    text: "text-[#2a2038]",
  },
  secret: {
    label: "SECRET",
    cardName: "Prismatic Wish",
    accent: "#ff9fba",
    glow:
      "0 0 24px rgba(255, 249, 232, 0.9), 0 0 48px rgba(255, 159, 186, 0.72), 0 0 82px rgba(185, 156, 255, 0.85)",
    foil: "from-[#ff9fba] via-[#fff7df] to-[#b99cff]",
    burst: "bg-[#fff7df]/80",
    text: "text-[#2a2038]",
  },
};

export const rarityOrder: Rarity[] = ["common", "rare", "epic", "secret"];
