import { motion } from "framer-motion";
import type { FortuneCard as FortuneCardData } from "../data/fortuneCards";
import { FortuneCard } from "./FortuneCard";
import { rarityEffects, type Rarity } from "./rarityEffects";

type CardFrontProps = {
  card?: FortuneCardData;
  rarity: Rarity;
  visible: boolean;
};

export function CardFront({ card, rarity, visible }: CardFrontProps) {
  const effect = rarityEffects[rarity];

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-[22px] [backface-visibility:hidden]"
      animate={{ rotateY: visible ? 0 : -180 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ boxShadow: visible ? effect.glow : undefined }}
    >
      {card ? (
        <FortuneCard card={card} obtained />
      ) : (
        <div
          className="grid h-full w-full place-items-center rounded-[22px] border-4 border-[#2a2038] text-sm font-black text-[#2a2038]"
          style={{ background: effect.accent }}
        >
          {effect.label}
        </div>
      )}
    </motion.div>
  );
}
