import { motion } from "framer-motion";
import { CardPack, type CardPackVariant } from "./CardPack";
import type { Rarity } from "./rarityEffects";

type LuckyCardPackProps = {
  isShaking: boolean;
  isOpen: boolean;
  rarity: Rarity;
  packImage?: string;
  disabled?: boolean;
  onOpen: () => void;
  label: string;
};

const rarityVariant: Record<Rarity, CardPackVariant> = {
  common: "purple",
  rare: "night",
  epic: "night",
  secret: "night",
};

export function LuckyCardPack({
  isShaking,
  isOpen,
  rarity,
  packImage,
  disabled = false,
  onOpen,
  label,
}: LuckyCardPackProps) {
  return (
    <motion.button
      type="button"
      className="absolute left-1/2 top-8 z-20 h-[552px] w-[340px] max-w-full -translate-x-1/2 origin-center cursor-pointer appearance-none border-0 bg-transparent p-0 text-left outline-none transition [webkit-tap-highlight-color:transparent] focus-visible:ring-4 focus-visible:ring-[#f6c85f]/70 disabled:cursor-default max-[420px]:h-[519px] max-[420px]:w-[320px] max-[380px]:h-[486px] max-[380px]:w-[300px] max-[360px]:h-[454px] max-[360px]:w-[280px]"
      animate={
        isShaking
          ? { x: [0, -14, 16, -8, 0], rotate: [0, -5, 5, -2, 0] }
          : { x: 0, rotate: 0 }
      }
      whileHover={disabled ? undefined : { y: -6, scale: 1.02 }}
      whileTap={disabled ? undefined : { y: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onClick={onOpen}
      disabled={disabled}
      aria-label={label}
    >
      <motion.div
        className="absolute left-1/2 top-0 h-[552px] w-[340px] -translate-x-1/2 origin-top max-[420px]:scale-[0.941] max-[380px]:scale-[0.882] max-[360px]:scale-[0.8235]"
        animate={isOpen ? { y: -18, scaleY: 0.92, opacity: 0.82 } : { y: 0, scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
      >
        <CardPack
          variant={rarityVariant[rarity]}
          title="오늘의 행운팩"
          packImage={packImage}
        />
      </motion.div>
    </motion.button>
  );
}
