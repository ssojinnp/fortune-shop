const readyCharacterImageIds = new Set(["card-016", "card-017", "card-030"]);

export function hasReadyCharacterImage(cardId: string, image?: string) {
  return Boolean(image) && readyCharacterImageIds.has(cardId);
}
