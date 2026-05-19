# AGENTS.md

## Project Name

**행운상점 / Fortune Shop**

---

## 1. Project Summary

행운도감은 매일 한 장의 픽셀풍 행운 카드를 뽑고, 만난 캐릭터를 도감에 수집하는 귀여운 토이 웹앱이다.

핵심 경험:

1. 사용자가 하루에 한 번 “오늘의 행운팩”을 연다.
2. 카드팩이 뜯기는 듯한 짧은 애니메이션이 재생된다.
3. 카드 뒷면이 등장한 뒤 3D 플립으로 오늘의 행운 카드가 공개된다.
4. 카드는 자동으로 행운도감에 기록된다.
5. 이미 만난 카드는 컬렉션에서 다시 볼 수 있다.
6. 같은 카드를 다시 만나면 중복 카운트와 친밀도가 오른다.

이 프로젝트는 수익화 목적이 아닌 토이프로젝트/포트폴리오 프로젝트다.

단, 공개 배포 가능성을 고려하여 Pokémon, Nintendo 등 실제 브랜드명과 캐릭터는 사용하지 않는다. 포켓몬 카드의 “수집 구조”와 “카드팩을 여는 설렘”만 참고하고, 캐릭터와 세계관은 완전 오리지널로 구성한다.

---

## 2. Most Important Direction

이 프로젝트에서 가장 중요한 원칙은 다음이다.

```txt
카드 프레임은 코드로 만든다.
텍스트는 HTML로 렌더링한다.
캐릭터만 이미지로 넣는다.
이미지가 없으면 placeholder로 대체한다.
```

절대 카드 전체를 하나의 이미지처럼 생성하지 않는다.

원하는 구조:

```txt
HTML/CSS 카드 프레임
+ 실제 HTML 텍스트
+ 캐릭터 이미지 placeholder 또는 PNG
= 행운카드 UI
```

카드 전체를 이미지 생성 방식으로 만들면 다음 문제가 생긴다.

```txt
- 한글이 깨짐
- 레이아웃 수정이 어려움
- 카드마다 일관성이 떨어짐
- 도감 UI와 연결하기 어려움
- 소장용 카드처럼 정돈되지 않음
```

따라서 반드시 React 컴포넌트 기반으로 구현한다.

---

## 3. Do Not Do

아래 방식은 금지한다.

```txt
- 카드 전체를 하나의 이미지처럼 만들기
- 텍스트를 이미지 안에 넣기
- 한글 텍스트가 픽셀 이미지처럼 깨져 보이게 만들기
- canvas, base64 이미지, svg 일러스트로 카드 전체를 그리기
- AI 이미지 생성 결과처럼 큰 도형과 박스를 배치하기
- 포켓몬 카드 레이아웃을 직접적으로 따라 하기
- Pokémon, Nintendo, Poké Ball, Monster Ball 등 실제 IP 요소 사용하기
- HP, 공격력, 배틀, 진화, 포획 같은 전투/포켓몬식 요소 넣기
- 카지노/가챠/과금 유도처럼 보이게 만들기
```

카드명, 운세 문구, 등급, 번호, 행운 아이템은 반드시 HTML 텍스트로 렌더링한다.

---

## 4. Service Concept

### Main Concept

> 매일 한 장, 픽셀 친구가 전해주는 오늘의 작은 행운 카드.

### Worldview

골목 끝 작은 픽셀 행운상점에는 여러 행운 친구들이 살고 있다. 사용자는 하루에 한 번 행운팩을 열 수 있고, 매일 다른 친구가 오늘의 메시지를 전해준다. 만난 친구는 행운도감에 기록된다.

### Tone

- 귀엽고 아기자기함
- 픽셀아트 감성
- 카드 수집/도감 완성 욕구
- 게임 같지만 과금/도박 느낌은 피함
- 운세보다는 “오늘의 귀여운 한마디”에 가까움
- 너무 무겁거나 점술적인 느낌은 피함
- 소장하고 싶은 카드 UI를 목표로 함

---

## 5. Tech Stack

기본 스택:

```txt
React
Vite
TypeScript
Tailwind CSS
Framer Motion
localStorage
```

선택적으로 나중에 추가할 수 있는 것:

```txt
Supabase Auth
Supabase Database
html-to-image 또는 html2canvas
React Router
```

초기 MVP는 서버 없이 localStorage만 사용한다.

---

## 6. Development Priorities

### 1차 MVP

반드시 구현해야 할 기능:

1. 오늘의 카드 뽑기
2. 하루 1회 제한
3. 오늘 이미 뽑은 카드는 다시 보여주기
4. 카드팩 오프닝 애니메이션
5. 카드 결과 화면
6. 도감 화면
7. 획득/미획득 카드 구분
8. 카드 상세 화면
9. 히스토리 화면
10. 중복 획득 시 collectedCount 증가
11. 중복 획득 시 intimacyLevel 증가
12. localStorage 저장
13. 데이터 초기화 기능

### 2차 기능

1. 등급별 필터
2. 속성별 필터
3. 월별 히스토리
4. 카드 이미지 저장
5. 공유용 카드 이미지 생성
6. 레어도별 애니메이션 차등 효과
7. 시크릿 카드 특별 연출

---

## 7. Page Structure

권장 페이지:

```txt
/
Home - 오늘의 카드 뽑기

/collection
Collection - 행운도감

/collection/:id
CardDetail - 카드 상세

/history
History - 날짜별 뽑기 히스토리

/settings
Settings - 데이터 초기화 / 앱 정보
```

모바일 우선 UI를 기준으로 한다. PC에서는 중앙에 모바일 앱 프레임처럼 보여도 좋다.

하단 탭 내비게이션:

```txt
[오늘] [도감] [기록] [설정]
```

---

## 8. Card Count

초기 카드는 총 30장으로 구성한다.

```txt
Common: 15장
Rare: 9장
Epic: 5장
Secret: 1장
```

권장 확률:

```txt
Common: 60%
Rare: 28%
Epic: 10%
Secret: 2%
```

수익화 목적이 아니므로 Secret 확률을 지나치게 낮게 만들지 않는다. 사용자가 며칠 안에 다양한 카드를 만날 수 있어야 한다.

---

## 9. Rarity

등급은 다음 4가지를 사용한다.

```ts
type Rarity = 'common' | 'rare' | 'epic' | 'secret';
```

표시명:

```txt
common: Common
rare: Rare
epic: Epic
secret: Secret
```

등급별 UX:

```txt
Common:
- 자주 만나는 기본 친구
- 부드러운 등장 효과
- 기본 카드 테두리

Rare:
- 살짝 반짝이는 효과
- 카드 공개 시 작은 별 파티클
- 테두리에 은은한 글로우

Epic:
- 공개 전 짧은 딜레이
- 화면이 살짝 어두워졌다가 카드 주변이 빛남
- 더 강한 글로우와 파티클

Secret:
- 특별한 공개 연출
- 무지개빛 또는 프리즘 글로우
- 카드 공개 전 실루엣 또는 ??? 표시
- 공개 후 축하 문구 표시
```

---

## 10. Elements

속성은 다음 6가지를 사용한다.

```ts
type CardElement =
  | 'green'
  | 'moon'
  | 'cloud'
  | 'spark'
  | 'water'
  | 'star';
```

의미:

```txt
green: 성장, 회복, 안정
moon: 휴식, 감성, 직감
cloud: 여유, 상상, 느긋함
spark: 실행력, 아이디어, 용기
water: 정리, 흐름, 차분함
star: 행운, 기회, 반짝임
```

---

## 11. Data Model

### FortuneCard

```ts
export type Rarity = 'common' | 'rare' | 'epic' | 'secret';

export type CardElement =
  | 'green'
  | 'moon'
  | 'cloud'
  | 'spark'
  | 'water'
  | 'star';

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
  placeholderEmoji?: string;
  pixelArtPrompt: string;
};
```

### CardHistory

```ts
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
```

### CollectionItem

```ts
export type CollectionItem = {
  cardId: string;
  firstCollectedAt: string;
  lastCollectedAt: string;
  collectedCount: number;
  intimacyLevel: number;
  histories: string[];
};
```

### AppStorage

```ts
export type AppStorage = {
  todayDraw?: CardHistory;
  histories: CardHistory[];
  collection: Record<string, CollectionItem>;
};
```

---

## 12. LocalStorage

권장 key:

```ts
const STORAGE_KEY = 'fortune-shop-storage';
```

오늘 날짜 비교는 사용자의 로컬 날짜 기준 `YYYY-MM-DD` 문자열로 처리한다.

```ts
function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}
```

한국 시간 기준을 더 정확히 처리하고 싶으면 timezone helper를 따로 만든다.

---

## 13. Draw Rules

### Basic Rule

- 하루에 한 번만 카드를 뽑을 수 있다.
- 오늘 이미 뽑은 카드가 있으면 새로 뽑지 않고 오늘의 카드를 다시 보여준다.
- 뽑은 카드는 histories에 저장한다.
- 뽑은 카드는 collection에 저장한다.

### Duplicate Rule

이미 획득한 카드를 다시 뽑으면:

```txt
collectedCount +1
intimacyLevel +1
lastCollectedAt 업데이트
histories에 오늘 기록 추가
```

중복 문구:

```txt
{카드명}을 또 만났어요.
조금 더 친해졌어요.
```

### New Card Rule

처음 만난 카드라면:

```txt
새로운 친구를 만났어요!
행운도감에 기록됐어요.
```

---

## 14. Image Strategy

Codex가 완성된 픽셀 이미지를 자동으로 생성하지 못할 수 있다. 따라서 1차 구현에서는 실제 이미지 파일에 의존하지 않는다.

각 카드에 다음 필드를 둔다.

```ts
image: '/assets/cards/card-001.png';
placeholderEmoji: '🐱';
pixelArtPrompt: '...';
```

이미지 파일이 없으면 `placeholderEmoji`와 CSS 픽셀 블록을 사용한다.

권장 처리:

```txt
1. image 경로는 미리 잡아둔다.
2. 실제 이미지가 없으면 placeholder를 보여준다.
3. 카드 UI와 도감 기능은 이미지 없이도 정상 작동해야 한다.
4. 나중에 생성한 PNG 파일을 /public/assets/cards/ 폴더에 넣으면 자동으로 이미지가 보이게 한다.
```

이미지 경로 규칙:

```txt
/public/assets/cards/card-001.png
/public/assets/cards/card-002.png
/public/assets/cards/card-003.png
...
/public/assets/cards/card-030.png
```

앱에서는 다음 경로를 사용한다.

```ts
image: '/assets/cards/card-001.png';
```

이미지가 없을 때는 다음 중 하나를 사용한다.

```txt
1. 이모지 placeholder
2. CSS 픽셀 캐릭터 블록
3. 실루엣 카드
4. 픽셀 패턴 배경
```

획득한 카드에는 placeholder라도 컬러로 보여준다. 미획득 카드는 실루엣과 `???`로 보여준다.

---

## 15. Image Generation Policy

실제 픽셀 이미지는 카드 전체가 아니라 “캐릭터만” 따로 만든다.

잘못된 요청:

```txt
별모자고양이 운세카드 전체 이미지를 만들어줘.
```

올바른 요청:

```txt
별모자고양이 캐릭터만 만들어줘.
배경 없음.
텍스트 없음.
카드 프레임 없음.
투명 배경 PNG로 사용할 수 있게 정면 포즈의 픽셀 캐릭터로 만들어줘.
```

앱에서는 이렇게 조합한다.

```txt
카드 프레임: React/Tailwind CSS
카드 텍스트: HTML 텍스트
캐릭터: /assets/cards/card-016.png 이미지
이미지 없을 때: placeholder
```

프롬프트에는 다음 요소가 포함되어야 한다.

```txt
- 8-bit or 16-bit pixel art style
- cute original character
- small fortune shop atmosphere
- pastel color palette
- transparent background or simple card-friendly background
- front-facing collectible character pose
- no text in the image
- no logo
- no card frame
- no Pokémon
- no Nintendo
- no existing IP
```

이미지 생성 시 텍스트는 이미지 안에 넣지 않는다. 카드명/등급/운세 문구는 앱 UI에서 HTML 텍스트로 렌더링한다.

---

## 16. Character Image Prompt Example

### English Prompt

```txt
A cute original 16-bit pixel art black cat wizard character wearing an oversized lavender star hat and a tiny purple cape, holding a small golden star wand, front-facing collectible mascot pose, soft pastel palette, clean silhouette, transparent background, no text, no logo, no card frame, no existing IP, suitable for a fortune card collection web app.
```

### Korean Prompt

```txt
오리지널 픽셀아트 캐릭터를 만들어줘.
캐릭터는 별모자고양이야.
검은 고양이가 커다란 라벤더색 별모자와 작은 보라색 망토를 입고 있고, 작은 별 지팡이를 들고 있어.
정면을 바라보는 수집형 캐릭터 포즈로 만들어줘.
배경은 투명하거나 단순해야 해.
텍스트, 로고, 카드 프레임은 넣지 마.
기존 IP나 포켓몬 느낌은 피하고, 귀여운 행운상점 마스코트 느낌으로 만들어줘.
```

---

## 17. FortuneCard UI Rules

`FortuneCard.tsx`는 세로형 수집 카드 UI로 만든다.

### Card Size

```txt
width: 320px
aspect-ratio: 2.5 / 3.5
min-height: 약 448px
padding: 16px
border-radius: 18px
```

모바일 기준으로 중앙 정렬한다. PC에서도 너무 커지지 않게 max-width를 둔다.

### Layout

카드 내부 구조는 다음 순서로 고정한다.

```txt
1. 상단 메타 영역
   - 왼쪽: No.016
   - 오른쪽: Rare 배지

2. 제목 영역
   - 작은 라벨: 오늘의 행운카드
   - 큰 제목: 별모자고양이
   - 부제: 행운상점의 초보 점술사

3. 캐릭터 이미지 영역
   - 카드에서 가장 큰 영역
   - 캐릭터 이미지 또는 placeholder 표시
   - 배경은 단순한 밤하늘/상점 창문 느낌
   - 과한 배경 일러스트 금지

4. 메시지 영역
   - 오늘의 운세 한 줄
   - 따옴표 스타일
   - HTML 텍스트로 렌더링

5. 하단 정보 영역
   - 행운 아이템
   - 행운 컬러
   - 행운 시간

6. 최하단 영역
   - 친밀도 하트
   - 짧은 안내 문구
```

### Representative Example

대표 예시는 다음 카드로 구현한다.

```txt
No.016
이름: 별모자고양이
등급: Rare
속성: Star
역할: 행운상점의 초보 점술사
메시지: 오늘은 평소보다 작은 신호를 잘 알아차리는 날이에요.
행운 아이템: 작은 별사탕
행운 컬러: 라벤더 퍼플
행운 시간: 오후 7시 ~ 9시
친밀도: Lv.2
```

### Visual Tone

컬러:

```txt
배경: 크림 / 아이보리
프레임: 딥퍼플 / 라벤더
포인트: 골드 / 민트 / 연노랑
텍스트: 다크 브라운 또는 딥퍼플
```

느낌:

```txt
- 픽셀아트 게임 카드
- 행운상점에서 받은 작은 카드
- 귀엽지만 유치하지 않음
- 수집하고 싶은 도감 카드
- 따뜻하고 신비로운 분위기
```

사용 가능한 장식:

```txt
- 작은 별
- sparkle
- 클로버
- 달
- 얇은 픽셀 라인
```

과한 장식 금지:

```txt
- 너무 많은 박스
- 큰 배경 도형
- 의미 없는 패널
- 깨진 픽셀 텍스트
```

### Character Image Area

캐릭터 영역은 카드에서 가장 중요한 부분이다.

```txt
height: 180px ~ 200px
border-radius: 14px
background: 단순 그라디언트 또는 픽셀 패턴
display: flex
align-items: center
justify-content: center
```

이미지가 있을 경우:

```tsx
<img
  src={card.image}
  alt={`${card.name} 캐릭터 이미지`}
  className="..."
/>
```

이미지가 없을 경우:

```txt
- placeholderEmoji 표시
- “이미지 준비중” 텍스트는 작게 표시
- 캐릭터 실루엣 느낌으로 처리
```

이미지가 없다고 카드 UI가 무너지면 안 된다.

---

## 18. FortuneCard Component Structure

권장 컴포넌트 구조:

```txt
components/
  FortuneCard.tsx
  CardHeader.tsx
  CardTitle.tsx
  PixelImageFrame.tsx
  FortuneMessage.tsx
  CardInfoGrid.tsx
  RarityBadge.tsx
  ElementBadge.tsx
  IntimacyBar.tsx
```

너무 한 파일에 몰아넣지 말고, 수정하기 쉽게 분리한다.

---

## 19. Card Pack UI Rules

카드팩도 전체 이미지를 생성하지 말고 CSS 컴포넌트로 만든다.

### Card Pack Structure

```txt
1. 세로형 포장지 형태
2. 위/아래는 톱니처럼 보이는 가장자리
3. 중앙에 크림색 라벨
4. 라벨 텍스트: 오늘의 행운팩
5. 하단 텍스트: FORTUNE CARD PACK
6. 배경에는 작은 별/클로버/달 장식
7. 가운데에는 캐릭터 placeholder 또는 심볼
```

### Card Pack Variants

```ts
type CardPackVariant = 'purple' | 'green' | 'night';
```

```txt
purple: 기본 행운팩
green: 클로버팩
night: 별빛팩
```

### CardPack Props

```ts
type CardPackProps = {
  variant?: 'purple' | 'green' | 'night';
  title?: string;
  subtitle?: string;
  characterEmoji?: string;
  disabled?: boolean;
};
```

### Card Pack Visual Direction

카드팩은 포켓몬 카드팩을 복제하지 않는다. “트레이딩 카드팩을 뜯는 설렘”만 참고한다.

원하는 느낌:

```txt
- 픽셀아트 게임 아이템
- 귀여운 행운상점 포장지
- 과자봉지처럼 상단/하단이 톱니 모양
- 크림색 라벨
- 보라/민트/네이비 variant
- 작은 별, 클로버, 달 장식
```

---

## 20. Card Pack Opening Motion

Framer Motion으로 구현한다.

### Flow

```txt
1. 카드팩 등장
2. 카드팩 흔들림
3. 상단이 뜯기는 연출
4. 빛이 새어나옴
5. 카드 뒷면 등장
6. 카드가 위로 올라옴
7. 카드 3D 플립
8. 카드 정면 공개
9. 등급별 이펙트 표시
```

### State

```ts
type PackOpeningState =
  | 'idle'
  | 'shake'
  | 'tear'
  | 'glow'
  | 'cardBack'
  | 'flip'
  | 'result';
```

### Timing

전체 애니메이션은 2.5초 ~ 3.5초 정도로 한다.

```txt
shake: 0.4s
tear: 0.5s
glow: 0.4s
cardBack: 0.6s
flip: 0.5s
result: final
```

### Skip

반드시 스킵 버튼을 둔다.

```txt
[바로 보기]
```

### Rarity Effects

```txt
Common:
- 기본 빛 효과

Rare:
- 작은 별 파티클
- 라벤더 글로우

Epic:
- 화면이 살짝 어두워졌다가 카드 주변이 밝아짐
- 골드 파티클

Secret:
- 카드 공개 전 ??? 또는 실루엣
- 프리즘/무지개 글로우
- 특별 축하 문구
```

---

## 21. Microcopy

### Before Draw

```txt
오늘의 행운팩이 도착했어요.
어떤 친구가 찾아왔을까요?
```

```txt
하루에 한 번, 작은 행운을 열어보세요.
```

### New Card

```txt
새로운 친구를 만났어요!
행운도감에 기록됐어요.
```

### Duplicate Card

```txt
또 만났어요!
조금 더 친해졌어요.
```

### Already Drew Today

```txt
오늘은 이미 행운 친구를 만났어요.
내일 또 새로운 카드가 찾아올 거예요.
```

### Unknown Card

```txt
아직 만나지 못한 친구예요.
언젠가 찾아올지도 몰라요.
```

### Collection Empty

```txt
아직 도감이 비어 있어요.
오늘의 행운팩을 열어 첫 친구를 만나보세요.
```

---

## 22. Accessibility

- 카드팩 열기 버튼은 실제 button 요소를 사용한다.
- 카드 결과는 스크린리더가 읽을 수 있도록 텍스트 정보를 제공한다.
- 이미지 alt는 카드명과 캐릭터 설명을 조합한다.
- 미획득 카드는 단순히 `???`만 두지 말고 `아직 획득하지 못한 카드`라는 접근성 텍스트를 제공한다.
- 애니메이션이 부담스러운 사용자를 위해 skip 버튼을 제공한다.
- 가능하면 `prefers-reduced-motion`을 고려한다.

---

## 23. Suggested Card Data

초기 카드 30장은 다음 구성을 사용한다.

### Common 15

1. 찻잔토끼
2. 메모장다람쥐
3. 우산펭귄
4. 낮잠곰
5. 구름고양이
6. 커피햄스터
7. 물방울개구리
8. 쿠키강아지
9. 연필병아리
10. 민트슬라임
11. 리본양
12. 양말두더지
13. 조개수달
14. 새싹고슴도치
15. 별사탕쥐

### Rare 9

16. 별모자고양이
17. 열쇠여우
18. 전구두더지
19. 영수증유령
20. 버섯곰
21. 꽃잎여우
22. 지도다람쥐
23. 촛불부엉이
24. 우편비둘기

### Epic 5

25. 달빛부엉이
26. 꿈배달양
27. 은하수고래
28. 수정구슬고양이
29. 혜성여우

### Secret 1

30. 민트용

---

## 24. Recommended First Representative Cards

이미지와 UI 퀄리티를 먼저 확인하기 위해 아래 5장만 우선 이미지화해도 된다.

```txt
016 별모자고양이
001 찻잔토끼
017 열쇠여우
019 영수증유령
030 민트용
```

이 5장은 서비스의 귀여움, 레어함, 세계관을 보여주기 좋다.

---

## 25. File Import Instruction

사용자가 제공한 `lucky_dot_30_cards.xlsx` 파일이 있다면 다음 방식으로 처리한다.

```txt
1. Cards_30 시트를 읽는다.
2. 각 행을 FortuneCard 타입으로 변환한다.
3. src/data/fortuneCards.ts 파일을 생성한다.
4. 이미지 경로는 /assets/cards/card-001.png 형식으로 자동 지정한다.
5. pixelArtPrompt 컬럼은 보존한다.
6. 이미지가 없을 경우 placeholderEmoji 또는 CSS placeholder를 사용한다.
```

엑셀을 직접 읽기 어렵다면 사용자가 CSV 또는 JSON으로 변환해 제공할 수 있다.

---

## 26. Recommended Project Structure

```txt
src/
  App.tsx
  main.tsx

  data/
    fortuneCards.ts

  types/
    card.ts

  utils/
    date.ts
    drawCard.ts
    storage.ts
    rarity.ts

  components/
    Layout.tsx
    BottomNav.tsx
    CardPack.tsx
    PackOpening.tsx
    FortuneCard.tsx
    CardBack.tsx
    CardFront.tsx
    CardHeader.tsx
    CardTitle.tsx
    PixelImageFrame.tsx
    FortuneMessage.tsx
    CardInfoGrid.tsx
    RarityBadge.tsx
    ElementBadge.tsx
    IntimacyBar.tsx
    EmptyState.tsx

  pages/
    Home.tsx
    Collection.tsx
    CardDetail.tsx
    History.tsx
    Settings.tsx
```

---

## 27. Codex Update Prompt

Codex에 전체 방향을 다시 잡게 할 때 아래 문구를 사용한다.

```txt
AGENTS.md를 기준으로 프로젝트를 수정해줘.

특히 FortuneCard와 CardPack 구현 방향을 반드시 수정해야 해.

중요:
- 카드 전체를 이미지처럼 만들지 마.
- 텍스트는 전부 HTML 텍스트로 렌더링해.
- 캐릭터는 이미지 placeholder 영역으로 분리해.
- canvas, base64, svg 일러스트로 카드 전체를 그리지 마.
- 깨진 픽셀 텍스트나 큰 도형 일러스트처럼 보이는 방식은 사용하지 마.
- HTML/CSS 카드 UI + 캐릭터 이미지 placeholder 구조로 바꿔줘.

FortuneCard 기준:
- width 320px
- aspect-ratio 2.5 / 3.5
- 크림색 카드 배경
- 라벤더/딥퍼플 픽셀 프레임
- 상단: No, Rarity
- 제목: 카드명, 역할
- 중앙: 캐릭터 이미지 프레임
- 중간: 오늘의 메시지
- 하단: 행운 아이템/컬러/시간
- 최하단: 친밀도

CardPack 기준:
- 세로형 포장지 형태
- 위/아래 톱니 가장자리
- 중앙 크림색 라벨
- 라벨 텍스트: 오늘의 행운팩
- 하단 텍스트: FORTUNE CARD PACK
- 보라/민트/네이비 variant
- Framer Motion으로 흔들림, 뜯김, 카드 등장, 플립 연출 가능하게 구조화

실제 포켓몬 카드와 닮지 않게 오리지널 행운도감 카드 느낌으로 만들어줘.
```

---

## 28. Vibe Coding Prompt

처음부터 만들 때는 아래 프롬프트를 사용한다.

```txt
React + Vite + TypeScript + Tailwind CSS + Framer Motion으로 “행운도감”이라는 귀여운 픽셀아트 행운 카드 수집 웹앱을 만들어줘.

이 프로젝트는 매일 한 장의 행운팩을 열고, 픽셀 친구가 담긴 오늘의 행운 카드를 도감에 수집하는 토이프로젝트야.

중요한 점:
- Pokémon, Nintendo 등 실제 IP는 사용하지 말 것.
- 포켓몬 카드처럼 직접적으로 보이면 안 됨.
- 수집형 도감 구조와 카드팩을 여는 설렘만 참고할 것.
- 캐릭터는 오리지널 “픽셀 행운상점 친구들”로 구성할 것.
- 이미지 파일이 없어도 앱이 동작해야 함.
- image 경로는 미리 잡고, 이미지가 없으면 placeholder로 보여줄 것.
- 카드 전체를 이미지처럼 만들지 말고, HTML/CSS 카드 UI로 구현할 것.
- 카드명, 메시지, 등급, 번호, 행운 아이템은 실제 HTML 텍스트로 렌더링할 것.

기능:
1. 하루 한 번 오늘의 카드 뽑기
2. 오늘 이미 뽑았으면 기존 카드를 다시 보여주기
3. 카드팩 오프닝 애니메이션
4. 카드 뒷면 등장
5. 카드 3D 플립 후 정면 공개
6. 등급별 공개 이펙트
7. 도감 화면
8. 획득/미획득 카드 구분
9. 카드 상세 화면
10. 날짜별 히스토리
11. 중복 카드 획득 시 collectedCount와 intimacyLevel 증가
12. localStorage 저장
13. 설정에서 데이터 초기화

카드 데이터:
- 총 30장
- Common 15장, Rare 9장, Epic 5장, Secret 1장
- 등급 확률은 Common 60%, Rare 28%, Epic 10%, Secret 2%
- 속성은 green, moon, cloud, spark, water, star

디자인:
- 크림색 배경
- 민트/라벤더/연노랑 포인트
- 픽셀풍 테두리
- 귀여운 행운상점 분위기
- 모바일 우선
- 하단 탭 내비게이션
- 카드팩은 “오늘의 행운팩”이라는 이름 사용
- 미획득 카드는 실루엣과 ???로 표시
- FortuneCard는 width 320px, aspect-ratio 2.5 / 3.5 기준
- CardPack은 CSS 컴포넌트로 만들고 이미지 생성 방식 금지

구조:
- src/data/fortuneCards.ts
- src/types/card.ts
- src/utils/storage.ts
- src/utils/drawCard.ts
- src/components/PackOpening.tsx
- src/components/FortuneCard.tsx
- src/components/CardPack.tsx
- src/pages/Home.tsx
- src/pages/Collection.tsx
- src/pages/CardDetail.tsx
- src/pages/History.tsx
- src/pages/Settings.tsx

나중에 실제 픽셀 이미지를 /public/assets/cards/card-001.png 형식으로 넣으면 자동으로 표시되게 해줘.
```

---

## 29. Final Priority

이 프로젝트에서 가장 중요한 것은 카드 데이터보다 “카드를 여는 순간의 설렘”과 “도감을 채우는 재미”다.

우선순위:

```txt
1. 카드팩 오프닝 경험
2. 카드 결과 화면의 소장욕
3. 도감의 미획득/획득 구분
4. 중복 카드의 친밀도 UX
5. 실제 픽셀 캐릭터 이미지 추가
```

실제 픽셀 이미지는 처음부터 30장 모두 만들 필요 없다. 처음에는 대표 5장만 이미지화하고, 나머지는 placeholder로 진행한다.

---

## 30. Shared UI Guide

탭마다 기능은 달라도, 기본 컴포넌트 언어는 통일한다. 특히 도감/기록/설정처럼 같은 레벨의 화면은 아래 기준을 공유한다.

### Shared Surfaces

```txt
- 메인 컨텐츠 패널: border-2 + 진한 보라 배경 + 픽셀 그림자
- 보조 정보 패널(surface): rounded 14px
- 리스트 아이템 카드: rounded 14px
- 내부 보조 정보 블록: rounded 12px
- 작은 정보 타일/칩: rounded 10px ~ 12px
- pill badge / status chip: fully rounded
```

### List Item Rules

```txt
- 도감 리스트와 기록 리스트는 같은 기본 카드 톤을 사용한다.
- 썸네일, 제목, 보조 텍스트, 배지의 수직 리듬을 맞춘다.
- hover 시 카드가 wrapper 밖으로 튀어나오지 않게 과한 y축 이동을 쓰지 않는다.
- hover 피드백은 border, background, shadow 변화 중심으로 준다.
- 리스트 카드 높이는 내용에 맞게 자연스럽게 잡고, 의미 없는 고정 높이나 과한 min-height를 피한다.
```

### Cross-Tab Consistency

```txt
- 도감은 "수집 상태" 중심 화면이다.
- 기록은 "오픈 이력" 중심 화면이다.
- 기능은 달라도 카드/패널/배지 스타일은 같은 시스템 안에서 보여야 한다.
- 새로운 UI를 추가할 때는 먼저 기존 탭의 radius, padding, border, shadow 체계를 재사용할 수 있는지 확인한다.
```
