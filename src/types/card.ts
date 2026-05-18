export type Rarity = "common" | "rare" | "epic" | "secret";

export type CardElement =
  | "green"
  | "moon"
  | "cloud"
  | "spark"
  | "water"
  | "star";

export type FortuneCard = {
  id: string;
  no: number;
  name: string;
  rarity: Rarity;
  element: CardElement;
  role: string;
  description: string;
  messages: string[];
  luckyItems: string[];
  luckyColors: string[];
  luckyTimes: string[];
  image: string;
  backgroundImage?: string;
  placeholderEmoji?: string;
  pixelArtPrompt: string;
  collectionGroup: string;
  personality: string;
  likes: string[];
  flavorText: string;
};

export type CardHistory = {
  id: string;
  cardId: string;
  date: string;
  message: string;
  luckyItem: string;
  luckyColor: string;
  luckyTime: string;
  createdAt: string;
};

export type CollectionItem = {
  cardId: string;
  firstCollectedAt: string;
  lastCollectedAt: string;
  collectedCount: number;
  intimacyLevel: number;
  histories: string[];
};

export type AppStorage = {
  todayDraw?: CardHistory;
  histories: CardHistory[];
  collection: Record<string, CollectionItem>;
};
