const readyCharacterImageIds = new Set(
  Array.from({ length: 30 }, (_, index) => `card-${String(index + 1).padStart(3, "0")}`),
);

export function hasReadyCharacterImage(cardId: string, image?: string) {
  return Boolean(image) && readyCharacterImageIds.has(cardId);
}
