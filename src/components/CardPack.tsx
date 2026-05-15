export type CardPackVariant = "purple" | "green" | "night";

type CardPackProps = {
  variant?: CardPackVariant;
  title?: string;
  subtitle?: string;
  characterEmoji?: string;
  disabled?: boolean;
  packImage?: string;
};

const variantStyles: Record<CardPackVariant, { caption: string; fallback: string }> = {
  purple: {
    caption: "보랏빛 행운이 담긴 기본 팩",
    fallback: "from-[#a983ef] via-[#8059c7] to-[#4e347e]",
  },
  green: {
    caption: "초록빛 행운이 담긴 클로버 팩",
    fallback: "from-[#8ed16e] via-[#55a960] to-[#2e7048]",
  },
  night: {
    caption: "별빛 행운이 반짝이는 네이비 팩",
    fallback: "from-[#405b9a] via-[#293d72] to-[#17234a]",
  },
};

export function CardPack({
  variant = "purple",
  title = "오늘의 행운팩",
  characterEmoji = "✦",
  disabled = false,
  packImage,
}: CardPackProps) {
  const style = variantStyles[variant];
  const packImageSrc = packImage ? `${packImage}?v=transparent-20260514` : "";

  if (packImage) {
    return (
      <article
        className={`relative mx-auto grid h-[500px] w-[314px] select-none place-items-center overflow-visible bg-transparent ${
          disabled ? "grayscale opacity-60" : ""
        }`}
        aria-label={`${title} ${variant} card pack`}
      >
        <img
          src={packImageSrc}
          alt={`${title} 카드팩`}
          className="h-full w-full scale-[1.18] object-contain drop-shadow-[0_16px_0_rgba(0,0,0,0.28)] [image-rendering:auto]"
        />
      </article>
    );
  }

  return (
    <article
      className={`relative mx-auto grid h-[500px] w-[314px] select-none place-items-center overflow-hidden border-4 border-[#1c1630] bg-gradient-to-b ${style.fallback} shadow-[0_16px_0_rgba(20,13,36,0.42)] ${
        disabled ? "grayscale opacity-60" : ""
      }`}
      aria-label={`${title} ${variant} card pack`}
    >
      <div className="absolute inset-3 border-2 border-white/22" />
      <div className="relative z-10 grid h-28 w-28 place-items-center border-4 border-[#1c1630] bg-[#fff6d6] text-5xl shadow-[6px_6px_0_rgba(28,22,48,0.3)]">
        {characterEmoji}
      </div>
      <p className="absolute bottom-9 font-modern-en text-sm font-black text-[#fff1c7]">
        FORTUNE CARD PACK
      </p>
    </article>
  );
}

export const cardPackVariantMeta = variantStyles;
