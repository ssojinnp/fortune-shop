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
  const cardFrameClass =
    "relative mx-auto h-[552px] w-[340px] max-w-full max-[420px]:h-[519px] max-[420px]:w-[320px] max-[380px]:h-[486px] max-[380px]:w-[300px] max-[360px]:h-[454px] max-[360px]:w-[280px]";
  const cardScaleClass =
    "absolute left-1/2 top-0 h-[552px] w-[340px] -translate-x-1/2 origin-top rounded-[22px] max-[420px]:scale-[0.941] max-[380px]:scale-[0.882] max-[360px]:scale-[0.8235]";

  return (
    <motion.div
      className="absolute inset-0 rounded-[22px] [backface-visibility:hidden]"
      animate={{ rotateY: visible ? 0 : -180 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {card ? (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className={cardFrameClass}>
              <div className={cardScaleClass} style={{ boxShadow: visible ? effect.glow : undefined }} />
            </div>
          </div>
          <FortuneCard card={card} obtained />
        </>
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
