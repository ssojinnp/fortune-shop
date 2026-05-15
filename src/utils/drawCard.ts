import { fortuneCards } from "../data/fortuneCards";
import type { FortuneCard, Rarity } from "../types/card";

const rarityWeights: Record<Rarity, number> = {
  common: 60,
  rare: 28,
  epic: 10,
  secret: 2,
};

export function drawFortuneCard(): FortuneCard {
  const roll = Math.random() * 100;
  let cursor = 0;
  const rarity = (Object.entries(rarityWeights).find(([, weight]) => {
    cursor += weight;
    return roll <= cursor;
  })?.[0] ?? "common") as Rarity;

  const pool = fortuneCards.filter((card) => card.rarity === rarity);
  const cards = pool.length > 0 ? pool : fortuneCards;
  return cards[Math.floor(Math.random() * cards.length)];
}
