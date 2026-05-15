import { motion } from "framer-motion";

type CardBackProps = {
  visible: boolean;
};

const cardBackImage = "/assets/cards/card-back.png?v=20260514";

export function CardBack({ visible }: CardBackProps) {
  return (
    <motion.div
      aria-hidden={!visible}
      className="absolute inset-0 overflow-hidden rounded-[22px] border-4 border-[#2f1f3f] bg-[#160f2f] shadow-[0_14px_0_rgba(0,0,0,0.24),inset_0_0_0_4px_rgba(255,255,255,0.12)] [backface-visibility:hidden]"
      animate={{ rotateY: visible ? 0 : 180 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={cardBackImage}
        alt="카드 뒷면"
        className="h-full w-full object-cover [image-rendering:auto]"
        draggable={false}
      />
    </motion.div>
  );
}
