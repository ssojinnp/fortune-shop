import { motion } from "framer-motion";

type CardBackProps = {
  visible: boolean;
};

const cardBackImage = "/assets/cards/card-back.png?v=20260514";

const cardFrameClass =
  "relative mx-auto h-[552px] w-[340px] max-w-full max-[420px]:h-[519px] max-[420px]:w-[320px] max-[380px]:h-[486px] max-[380px]:w-[300px] max-[360px]:h-[454px] max-[360px]:w-[280px]";

const cardScaleClass =
  "absolute left-1/2 top-0 h-[552px] w-[340px] -translate-x-1/2 origin-top overflow-hidden rounded-[22px] border-4 border-[#2f1f3f] bg-[#160f2f] shadow-[0_14px_0_rgba(0,0,0,0.24),inset_0_0_0_4px_rgba(255,255,255,0.12)] max-[420px]:scale-[0.941] max-[380px]:scale-[0.882] max-[360px]:scale-[0.8235]";

export function CardBack({ visible }: CardBackProps) {
  return (
    <motion.div
      aria-hidden={!visible}
      className="absolute inset-0 rounded-[22px] [backface-visibility:hidden]"
      animate={{ rotateY: visible ? 0 : 180 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={cardFrameClass}>
        <div className={cardScaleClass}>
          <img
            src={cardBackImage}
            alt="카드 뒷면"
            className="h-full w-full object-cover [image-rendering:auto]"
            draggable={false}
          />
        </div>
      </div>
    </motion.div>
  );
}
