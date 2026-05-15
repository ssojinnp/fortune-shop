const readyCharacterImageIds = new Set([
  "card-001",
  "card-016",
  "card-017",
  "card-019",
  "card-025",
  "card-026",
  "card-028",
  "card-030",
]);

export function hasReadyCharacterImage(cardId: string, image?: string) {
  return Boolean(image) && readyCharacterImageIds.has(cardId);
}
