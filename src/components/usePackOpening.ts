import { useCallback, useEffect, useRef, useState } from "react";
import type { Rarity } from "./rarityEffects";

type OpeningStage = "idle" | "shake" | "tear" | "rise" | "flip" | "revealed";

const timeline: Array<{ stage: OpeningStage; delay: number }> = [
  { stage: "shake", delay: 0 },
  { stage: "tear", delay: 460 },
  { stage: "rise", delay: 760 },
  { stage: "flip", delay: 1_560 },
  { stage: "revealed", delay: 2_350 },
];

export function usePackOpening() {
  const [stage, setStage] = useState<OpeningStage>("idle");
  const [rarity, setRarity] = useState<Rarity>("common");
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const openPack = useCallback((nextRarity: Rarity) => {
    clearTimers();
    setRarity(nextRarity);

    timeline.forEach(({ stage: nextStage, delay }) => {
      const timer = window.setTimeout(() => setStage(nextStage), delay);
      timers.current.push(timer);
    });
  }, [clearTimers]);

  const skip = useCallback(() => {
    clearTimers();
    setStage("revealed");
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setStage("idle");
  }, [clearTimers]);

  const reveal = useCallback((nextRarity: Rarity) => {
    clearTimers();
    setRarity(nextRarity);
    setStage("revealed");
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    stage,
    rarity,
    isOpening: stage !== "idle" && stage !== "revealed",
    isRevealed: stage === "revealed",
    openPack,
    skip,
    reset,
    reveal,
  };
}
