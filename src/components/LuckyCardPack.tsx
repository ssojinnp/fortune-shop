import { motion } from "framer-motion";
import { CardPack, type CardPackVariant } from "./CardPack";
import type { Rarity } from "./rarityEffects";

type LuckyCardPackProps = {
  isShaking: boolean;
  isOpen: boolean;
  rarity: Rarity;
  packImage?: string;
};

const rarityVariant: Record<Rarity, CardPackVariant> = {
  common: "purple",
  rare: "night",
  epic: "night",
  secret: "night",
};

export function LuckyCardPack({ isShaking, isOpen, rarity, packImage }: LuckyCardPackProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-[18px] z-20 h-[500px] w-[314px] origin-center"
      animate={
        isShaking
          ? { x: [-157, -171, -141, -165, -157], rotate: [0, -5, 5, -2, 0] }
          : { x: -157, rotate: 0 }
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="origin-top"
        animate={isOpen ? { y: -18, scaleY: 0.92, opacity: 0.82 } : { y: 0, scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
      >
        <CardPack
          variant={rarityVariant[rarity]}
          title="오늘의 행운팩"
          packImage={packImage}
        />
      </motion.div>
    </motion.div>
  );
}
