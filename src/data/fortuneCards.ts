import rawCards from "./fortuneCards.json";
import type { CardElement, FortuneCard, Rarity } from "../types/card";

type RawFortuneCard = {
  id: string;
  no: number;
  name: string;
  rarity: Rarity;
  element: string;
  role: string;
  collectionGroup: string;
  characterConcept: string;
  personality: string;
  fortuneMessage: string;
  luckyItem: string;
  luckyColor: string;
  luckyTime: string;
  likes: string[];
  flavorText: string;
  pixelArtPrompt: string;
};

const elementMap: Record<string, CardElement> = {
  Green: "green",
  Moon: "moon",
  Cloud: "cloud",
  Spark: "spark",
  Water: "water",
  Star: "star",
};

const emojiByElement: Record<CardElement, string> = {
  green: "🍀",
  moon: "🌙",
  cloud: "☁️",
  spark: "✨",
  water: "💧",
  star: "⭐",
};

const CHARACTER_IMAGE_VERSION = "transparent-20260518-card004";

function getCharacterImagePath(cardId: string) {
  return `/assets/cards/characters/${cardId}.png?v=${CHARACTER_IMAGE_VERSION}`;
}

function getBackgroundImagePath(cardId: string) {
  return `/assets/cards/backgrounds/bg-${cardId}.png`;
}

export const fortuneCards: FortuneCard[] = (rawCards as RawFortuneCard[]).map((card) => {
  const element = elementMap[card.element] ?? "star";

  return {
    id: card.id,
    no: card.no,
    name: card.name,
    rarity: card.rarity,
    element,
    role: card.role,
    description: card.characterConcept,
    messages: [card.fortuneMessage],
    luckyItems: [card.luckyItem],
    luckyColors: [card.luckyColor],
    luckyTimes: [card.luckyTime],
    image: getCharacterImagePath(card.id),
    backgroundImage: getBackgroundImagePath(card.id),
    placeholderEmoji: emojiByElement[element],
    pixelArtPrompt: card.pixelArtPrompt,
    collectionGroup: card.collectionGroup,
    personality: card.personality,
    likes: card.likes,
    flavorText: card.flavorText,
  };
});

export type { FortuneCard };
