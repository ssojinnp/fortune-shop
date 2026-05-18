import { useEffect, useMemo, useState } from "react";
import type { FortuneCard } from "../data/fortuneCards";
import { hasReadyCharacterImage } from "../utils/cardImages";
import { rarityEffects, type Rarity } from "./rarityEffects";

type PixelCardArtProps = {
  card: FortuneCard;
  large?: boolean;
  fitContainer?: boolean;
  framed?: boolean;
  muted?: boolean;
  revealed?: boolean;
};

const elementColors: Record<string, string> = {
  cloud: "#fff7df",
  spark: "#ffe66d",
  water: "#77d7b2",
  moon: "#b99cff",
  star: "#f6c85f",
  green: "#77d7b2",
};

const rarityBackdrops: Record<Rarity, string> = {
  common: "linear-gradient(180deg, #fff7df 0%, #dff7e9 100%)",
  rare: "linear-gradient(180deg, #fff7df 0%, #b99cff 100%)",
  epic: "linear-gradient(180deg, #fff7df 0%, #f6c85f 48%, #b99cff 100%)",
  secret:
    "conic-gradient(from 30deg, #ff9fba, #fff7df, #77d7b2, #b99cff, #f6c85f, #ff9fba)",
};

export function PixelCardArt({
  card,
  large = false,
  fitContainer = false,
  framed = true,
  muted = false,
  revealed = true,
}: PixelCardArtProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const effect = rarityEffects[card.rarity];
  const pixel = large ? 8 : 4;
  const accent = elementColors[card.element] ?? effect.accent;
  const hasCharacterImage = hasReadyCharacterImage(card.id, card.image) && !imageFailed;
  const showImage = hasCharacterImage;
  const showFallbackSilhouette = !revealed && !hasCharacterImage;
  const sizeClass = fitContainer ? "h-full w-full" : large ? "h-32 w-32" : "h-16 w-16";

  useEffect(() => {
    setImageFailed(false);
  }, [card.id]);

  const parts = useMemo(() => {
    const variant = card.no % 6;

    return {
      hasHat: ["moon", "star", "spark"].includes(card.element),
      hasLeaf: card.element === "green",
      hasDroplet: card.element === "water",
      hasCloud: card.element === "cloud",
      hasGlow: card.rarity === "epic" || card.rarity === "secret",
      earLeft: variant % 2 === 0 ? -1 : 1,
      earRight: variant % 3 === 0 ? 1 : -1,
      tailOffset: variant - 2,
    };
  }, [card.element, card.no, card.rarity]);

  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden border-2 border-[#3b247a] ${
        framed && !fitContainer ? "bg-white/70" : "bg-transparent"
      } ${sizeClass} ${muted ? "grayscale opacity-75" : ""}`}
      style={{ boxShadow: fitContainer ? undefined : effect.glow }}
      aria-label={revealed ? `${card.name} pixel art` : "아직 획득하지 못한 카드 실루엣"}
    >
      {showImage && (
        <img
          className={`relative z-10 max-h-full max-w-full object-contain [image-rendering:auto] ${
            revealed
              ? ""
              : "scale-95 opacity-100 brightness-0 contrast-150 drop-shadow-[0_0_1px_rgba(255,247,223,0.95)] drop-shadow-[0_0_7px_rgba(246,200,95,0.48)]"
          }`}
          src={card.image}
          alt={revealed ? `${card.name} 캐릭터` : `${card.name} 캐릭터 실루엣`}
          onError={() => setImageFailed(true)}
        />
      )}
      {!showImage && (
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ background: rarityBackdrops[card.rarity] }}
      >
        {showFallbackSilhouette && (
          <>
            <div className="absolute inset-0 bg-[#17142b]/45" />
            <div className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fff7df]/16 blur-[2px]" />
            <div className="absolute left-1/2 top-[48%] h-11 w-9 -translate-x-1/2 rounded-t-full bg-[#241d3f] shadow-[0_0_14px_rgba(255,247,223,0.22)]" />
            <div className="absolute left-[31%] top-[31%] h-4 w-4 rotate-45 bg-[#241d3f]" />
            <div className="absolute right-[31%] top-[31%] h-4 w-4 rotate-45 bg-[#241d3f]" />
            <div className="absolute bottom-[18%] left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-[#120d22]/35" />
          </>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(42,32,56,0.1)_0_8px,transparent_8px_16px)]" />
        {card.rarity === "secret" && (
          <div className="absolute inset-1 bg-[radial-gradient(circle,#ffffff_0_2px,transparent_3px)] bg-[length:18px_18px] opacity-70" />
        )}
        <div className="absolute bottom-[10%] left-[16%] right-[16%] h-[12%] bg-[#3b247a]/25" />

        {revealed && <div
          className="absolute left-1/2 top-1/2"
          style={{
            height: pixel * 20,
            transform: "translate(-50%, -42%)",
            width: pixel * 20,
          }}
        >
          {parts.hasGlow && (
            <div
              className="absolute left-1/2 top-1/2 rounded-full blur-md"
              style={{
                background: effect.accent,
                height: pixel * 18,
                opacity: 0.44,
                transform: "translate(-50%, -50%)",
                width: pixel * 18,
              }}
            />
          )}

          <div className="absolute bg-[#2a2038]" style={{ height: pixel * 4, left: pixel * (3 + parts.earLeft), top: pixel * 3, width: pixel * 5 }} />
          <div className="absolute bg-[#2a2038]" style={{ height: pixel * 4, left: pixel * (12 + parts.earRight), top: pixel * 3, width: pixel * 5 }} />
          <div className="absolute" style={{ background: revealed ? accent : "#3b2d57", height: pixel * 3, left: pixel * (4 + parts.earLeft), top: pixel * 4, width: pixel * 3 }} />
          <div className="absolute" style={{ background: revealed ? accent : "#3b2d57", height: pixel * 3, left: pixel * (13 + parts.earRight), top: pixel * 4, width: pixel * 3 }} />
          <div className="absolute border-[#2a2038]" style={{ background: revealed ? "white" : "#241d3f", borderWidth: pixel, height: pixel * 9, left: pixel * 4, top: pixel * 6, width: pixel * 12 }} />
          <div className="absolute" style={{ background: revealed ? accent : "#31254b", height: pixel * 7, left: pixel * 6, top: pixel * 12, width: pixel * 8 }} />
          {revealed && (
            <>
              <div className="absolute bg-[#2a2038]" style={{ height: pixel * 2, left: pixel * 7, top: pixel * 10, width: pixel * 2 }} />
              <div className="absolute bg-[#2a2038]" style={{ height: pixel * 2, left: pixel * 12, top: pixel * 10, width: pixel * 2 }} />
              <div className="absolute bg-rose-300" style={{ height: pixel, left: pixel * 9, top: pixel * 13, width: pixel * 2 }} />
            </>
          )}
          <div className="absolute bg-[#2a2038]" style={{ height: pixel * 2, left: pixel * (14 + parts.tailOffset), top: pixel * 14, width: pixel * 4 }} />

          {parts.hasHat && (
            <>
              <div className="absolute bg-[#2a2038]" style={{ height: pixel * 2, left: pixel * 5, top: pixel * 4, width: pixel * 10 }} />
              <div className="absolute" style={{ background: card.rarity === "common" ? "#a78bfa" : effect.accent, height: pixel * 4, left: pixel * 8, top: pixel, width: pixel * 4 }} />
            </>
          )}
          {parts.hasLeaf && <div className="absolute rotate-45 bg-emerald-400" style={{ height: pixel * 4, left: pixel * 13, top: pixel * 2, width: pixel * 4 }} />}
          {parts.hasDroplet && <div className="absolute bg-[#77d7b2]" style={{ height: pixel * 4, left: pixel * 8, top: pixel, width: pixel * 4 }} />}
          {parts.hasCloud && <div className="absolute bg-white/90" style={{ height: pixel * 3, left: pixel * 5, top: pixel * 2, width: pixel * 10 }} />}
        </div>
        }
      </div>
      )}
    </div>
  );
}
