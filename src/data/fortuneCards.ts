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
  "card-016": "/assets/cards/characters/card-016.png?v=transparent-20260514",
  "card-017": "/assets/cards/characters/card-017.png?v=transparent-20260514",
  "card-030": "/assets/cards/characters/card-030.png?v=transparent-20260514",
};

const backgroundImageById: Record<string, string> = {
  "card-016": "/assets/cards/backgrounds/bg-card-016.png",
  "card-017": "/assets/cards/backgrounds/bg-card-017.png",
  "card-030": "/assets/cards/backgrounds/bg-card-030.png",
};

const updatedCardById: Record<string, Partial<FortuneCard>> = {
  "card-001": {
    id: "card-001",
    no: 1,
    name: "찻잔토끼",
    rarity: "common",
    element: "cloud",
    role: "따뜻한 차를 건네는 행운상점 점원",
    description:
      "행운상점 한쪽의 작은 찻집을 맡고 있는 토끼예요. 지친 사람에게 따뜻한 차와 다정한 한마디를 건네줘요.",
    messages: [
      "조금 쉬어가도 하루는 충분히 잘 흘러가요.",
      "따뜻한 말 한마디가 오늘의 분위기를 바꿔줄 수 있어요.",
      "서두르지 않아도 괜찮아요. 천천히 마시면 더 깊은 맛이 나요.",
    ],
    luckyItems: ["따뜻한 찻잔", "작은 티스푼", "크림색 손수건"],
    luckyColors: ["크림 베이지", "소프트 그린", "밀크티 브라운"],
    luckyTimes: ["오후 2시 ~ 4시", "오후 3시", "저녁 식사 전"],
    image: "/assets/cards/characters/card-001.png?v=transparent-20260515",
    backgroundImage: "/assets/cards/backgrounds/bg-card-001.png",
    placeholderEmoji: "🐰",
    pixelArtPrompt:
      "Cute original pixel art bunny tea shop clerk holding a teacup, soft pastel palette, transparent background, no text, no logo, no card frame, suitable for a fortune card collection web app.",
  },
  "card-019": {
    id: "card-019",
    no: 19,
    name: "영수증유령",
    rarity: "rare",
    element: "moon",
    role: "잊고 있던 행운을 기록해주는 기록 담당자",
    description:
      "행운상점의 오래된 서랍과 영수증을 정리하는 작은 유령이에요. 지나간 하루 속에서 놓쳤던 좋은 일을 다시 찾아줘요.",
    messages: [
      "이미 지나간 일 속에도 작지만 좋은 의미가 숨어 있어요.",
      "오늘은 기록해두면 나중에 도움이 될 힌트를 발견할 수 있어요.",
      "잊고 있던 약속이나 메모를 다시 확인해보면 좋아요.",
    ],
    luckyItems: ["작은 영수증", "보라색 클립", "오래된 메모지"],
    luckyColors: ["페일 라벤더", "소프트 그레이", "문라이트 퍼플"],
    luckyTimes: ["오후 6시 ~ 8시", "퇴근 전", "잠들기 전"],
    image: "/assets/cards/characters/card-019.png?v=transparent-20260515",
    backgroundImage: "/assets/cards/backgrounds/bg-card-019.png",
    placeholderEmoji: "👻",
    pixelArtPrompt:
      "Cute original pixel art ghost accountant holding long receipt scrolls, lavender ribbon, soft magical archive mood, transparent background, no text, no logo, no card frame.",
  },
  "card-025": {
    id: "card-025",
    no: 25,
    name: "달빛부엉이",
    rarity: "epic",
    element: "moon",
    role: "밤하늘의 흐름을 읽는 달빛 관찰자",
    description:
      "행운상점 지붕 위 천문대에 앉아 달빛과 별의 방향을 읽는 부엉이예요. 조용한 밤에 가장 정확한 조언을 전해줘요.",
    messages: [
      "오늘은 조용히 지켜볼수록 더 선명하게 보이는 날이에요.",
      "급하게 판단하기보다 한 발 떨어져 바라보면 답이 보여요.",
      "밤이 깊어질수록 마음속 생각이 정리될 수 있어요.",
    ],
    luckyItems: ["작은 망원경", "달 모양 책갈피", "남색 노트"],
    luckyColors: ["미드나잇 블루", "문라이트 골드", "딥 라벤더"],
    luckyTimes: ["오후 9시 ~ 11시", "밤 10시", "달이 보이는 시간"],
    image: "/assets/cards/characters/card-025.png?v=transparent-20260515",
    backgroundImage: "/assets/cards/backgrounds/bg-card-025.png",
    placeholderEmoji: "🦉",
    pixelArtPrompt:
      "Cute original pixel art owl mage wearing a moon cloak, front-facing collectible mascot pose, transparent background, no text, no logo, no card frame, magical night palette.",
  },
  "card-026": {
    id: "card-026",
    no: 26,
    name: "꿈배달양",
    rarity: "epic",
    element: "cloud",
    role: "꿈속으로 행운 편지를 배달하는 하늘 우체부",
    description:
      "구름 위 우편함 사이를 오가며 꿈 편지를 배달하는 양이에요. 포근한 마음과 다정한 소식을 함께 전해줘요.",
    messages: [
      "오늘은 다정한 소식이 천천히 도착할 수 있어요.",
      "마음속에 담아둔 말을 부드럽게 전해보기 좋은 날이에요.",
      "포근한 상상이 현실의 작은 힌트가 될 수 있어요.",
    ],
    luckyItems: ["작은 편지봉투", "하늘색 우표", "구름 모양 키링"],
    luckyColors: ["파우더 블루", "솜사탕 핑크", "크림 화이트"],
    luckyTimes: ["오전 10시 ~ 12시", "오후 4시", "잠들기 전"],
    image: "/assets/cards/characters/card-026.png?v=transparent-20260515",
    backgroundImage: "/assets/cards/backgrounds/bg-card-026.png",
    placeholderEmoji: "🐑",
    pixelArtPrompt:
      "Cute original pixel art sheep mail carrier carrying tiny letters and a satchel, cloud and dream motif, transparent background, no text, no logo, no card frame.",
  },
  "card-028": {
    id: "card-028",
    no: 28,
    name: "수정구슬고양이",
    rarity: "epic",
    element: "star",
    role: "반짝이는 가능성을 비춰주는 수정구슬 점술사",
    description:
      "행운상점 안쪽의 보라색 커튼 뒤에서 수정구슬을 지키는 고양이예요. 아직 보이지 않는 가능성을 은은하게 비춰줘요.",
    messages: [
      "오늘은 작은 예감이 좋은 방향을 알려줄 수 있어요.",
      "확실하지 않아도 마음이 끌리는 쪽을 천천히 살펴보세요.",
      "반짝이는 가능성은 아주 작은 호기심에서 시작돼요.",
    ],
    luckyItems: ["작은 수정구슬", "보라색 리본", "별 장식 펜던트"],
    luckyColors: ["크리스탈 퍼플", "소프트 골드", "밤하늘 네이비"],
    luckyTimes: ["오후 7시 ~ 9시", "해가 진 뒤", "조용한 저녁"],
    image: "/assets/cards/characters/card-028.png?v=transparent-20260515",
    backgroundImage: "/assets/cards/backgrounds/bg-card-028.png",
    placeholderEmoji: "🐱",
    pixelArtPrompt:
      "Cute original pixel art cat fortune teller with crystal ball, lavender hood, starry magical mood, transparent background, no text, no logo, no card frame.",
  },
};

export const fortuneCards: FortuneCard[] = (rawCards as RawCard[]).map((card) => {
  const element = elementMap[card.element] ?? "star";

  const normalizedCard: FortuneCard = {
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

  return {
    ...normalizedCard,
    ...updatedCardById[card.id],
  };
});

export type { FortuneCard };
