import rawCards from "./fortuneCards.json";
import type { CardElement, FortuneCard } from "../types/card";

type RawCard = Omit<
  FortuneCard,
  | "element"
  | "description"
  | "messages"
  | "luckyItems"
  | "luckyColors"
  | "luckyTimes"
  | "placeholderEmoji"
  | "backgroundImage"
> & {
  element: string;
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

const characterImageById: Record<string, string> = {
  "card-016": "/assets/cards/card-016.png?v=transparent-20260514",
  "card-017": "/assets/cards/card-017.png?v=transparent-20260514",
  "card-030": "/assets/cards/card-030.png?v=transparent-20260514",
};

const backgroundImageById: Record<string, string> = {
  "card-016": "/assets/cards/backgrounds/bg-star-shop.png",
  "card-017": "/assets/cards/backgrounds/bg-moon-courtyard.png",
  "card-030": "/assets/cards/backgrounds/bg-secret-garden.png",
};

export const fortuneCards: FortuneCard[] = (rawCards as RawCard[]).map((card) => {
  const element = elementMap[card.element] ?? "star";

  return {
    ...card,
    element,
    image: characterImageById[card.id] ?? "",
    backgroundImage: backgroundImageById[card.id],
    description: card.characterConcept,
    messages: [card.fortuneMessage],
    luckyItems: [card.luckyItem],
    luckyColors: [card.luckyColor],
    luckyTimes: [card.luckyTime],
    placeholderEmoji: emojiByElement[element],
  };
});

export type { FortuneCard };
