import type { AppStorage, CardHistory, CollectionItem, FortuneCard } from "../types/card";
import { getTodayKey } from "./date";

export const STORAGE_KEY = "fortune-shop-storage";

const emptyStorage = (): AppStorage => ({
  histories: [],
  collection: {},
});

export function readStorage(): AppStorage {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return emptyStorage();

    const parsed = JSON.parse(value) as AppStorage;
    return {
      histories: Array.isArray(parsed.histories) ? parsed.histories : [],
      collection: parsed.collection ?? {},
      todayDraw: parsed.todayDraw,
    };
  } catch {
    return emptyStorage();
  }
}

export function writeStorage(storage: AppStorage) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

export function createHistory(card: FortuneCard): CardHistory {
  const createdAt = new Date().toISOString();
  return {
    id: `${card.id}-${createdAt}`,
    cardId: card.id,
    date: getTodayKey(),
    message: card.messages[0],
    luckyItem: card.luckyItems[0],
    luckyColor: card.luckyColors[0],
    luckyTime: card.luckyTimes[0],
    createdAt,
  };
}

export function applyDrawToStorage(card: FortuneCard, storage = readStorage()) {
  const history = createHistory(card);
  const previous = storage.collection[card.id];
  const collectionItem: CollectionItem = previous
    ? {
        ...previous,
        lastCollectedAt: history.createdAt,
        collectedCount: previous.collectedCount + 1,
        intimacyLevel: previous.intimacyLevel + 1,
        histories: [history.id, ...previous.histories],
      }
    : {
        cardId: card.id,
        firstCollectedAt: history.createdAt,
        lastCollectedAt: history.createdAt,
        collectedCount: 1,
        intimacyLevel: 1,
        histories: [history.id],
      };

  const next: AppStorage = {
    todayDraw: history,
    histories: [history, ...storage.histories].slice(0, 120),
    collection: {
      ...storage.collection,
      [card.id]: collectionItem,
    },
  };

  writeStorage(next);
  return next;
}

export function resetStorage() {
  window.localStorage.removeItem(STORAGE_KEY);
}
