import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { fortuneCards, type FortuneCard as FortuneCardData } from "../data/fortuneCards";
import type { AppStorage } from "../types/card";
import { getTodayKey } from "../utils/date";
import { drawFortuneCard } from "../utils/drawCard";
import { applyDrawToStorage, readStorage, resetStorage } from "../utils/storage";
import { CardBack } from "./CardBack";
import { CardFront } from "./CardFront";
import { elementMeta } from "./ElementBadge";
import { FortuneCard } from "./FortuneCard";
import { LuckyCardPack } from "./LuckyCardPack";
import { PixelCardArt } from "./PixelCardArt";
import { rarityEffects, type Rarity } from "./rarityEffects";
import { usePackOpening } from "./usePackOpening";

type View = "today" | "collection" | "history" | "settings";

const rarityLabels: Record<Rarity, string> = {
  common: "COMMON",
  rare: "RARE",
  epic: "EPIC",
  secret: "SECRET",
};

const tabs: Array<{ id: View; label: string }> = [
  { id: "today", label: "오늘" },
  { id: "collection", label: "도감" },
  { id: "history", label: "기록" },
  { id: "settings", label: "설정" },
];

const starParticles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  angle: (index / 22) * Math.PI * 2,
  distance: 86 + (index % 5) * 18,
  size: 4 + (index % 4),
}));

function getPackImage(card: FortuneCardData) {
  if (card.rarity === "rare" || card.rarity === "epic" || card.rarity === "secret") {
    return "/assets/packs/pack-night.png";
  }

  if (card.element === "green") {
    return "/assets/packs/pack-green.png";
  }

  return "/assets/packs/pack-purple.png";
}

const contentPanelClass =
  "min-h-[620px] w-full border-2 border-[#5a3f87] bg-[#241d3f]/72 p-5 shadow-[7px_7px_0_rgba(15,12,31,0.34)]";

const surfaceClass = "border-2 border-[#5a3f87] bg-[#17142b]/72 p-4 shadow-[4px_4px_0_rgba(15,12,31,0.22)]";

function ContentPanel({ children }: { children: ReactNode }) {
  return <section className={contentPanelClass}>{children}</section>;
}

function SectionTitle({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-5 flex min-h-12 flex-wrap items-end justify-between gap-3">
      <div>
        <p className="font-modern-en text-xs font-semibold uppercase tracking-[0.12em] text-[#f6c85f]/85">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-black leading-tight text-[#fff9e8]">{title}</h2>
      </div>
      {aside ? <div className="text-right text-xs font-semibold text-[#efe9ff]/82">{aside}</div> : null}
    </div>
  );
}

function findCard(cardId?: string) {
  return fortuneCards.find((card) => card.id === cardId);
}

function findLatestHistoryForCard(storage: AppStorage, cardId: string) {
  return storage.histories.find((entry) => entry.cardId === cardId) ?? storage.histories[0];
}

function CollectionGrid({
  selectedId,
  storage,
  onSelect,
}: {
  selectedId: string;
  storage: AppStorage;
  onSelect: (card: FortuneCardData) => void;
}) {
  return (
    <section className="grid max-h-[680px] grid-cols-1 gap-2.5 overflow-auto pr-1 md:grid-cols-2">
      {fortuneCards.map((card) => {
        const selected = card.id === selectedId;
        const collectionItem = storage.collection[card.id];
        const obtained = Boolean(collectionItem);
        const effect = rarityEffects[card.rarity];
        const element = elementMeta[card.element];

        return (
          <button
            key={card.id}
            className={`grid min-h-[112px] grid-cols-[76px_minmax(0,1fr)] items-stretch gap-3 border-2 p-2.5 text-left transition hover:-translate-y-0.5 ${
              selected
                ? "border-[#f6c85f] bg-[#fff7df]/12"
                : "border-[#5a3f87] bg-[#17142b]/68 hover:border-[#b99cff]"
            }`}
            onClick={() => onSelect(card)}
            aria-label={obtained ? `${card.name} 도감 카드` : `${card.name} 미획득 카드`}
          >
            <div className="grid min-h-[90px] place-items-center">
              <PixelCardArt card={card} fitContainer muted={!obtained} revealed={obtained} />
            </div>
            <div className="grid min-w-0 content-center gap-1.5">
              <div className="flex min-w-0 items-center justify-between gap-2">
                <p className="text-[10px] font-black uppercase leading-none tracking-[0.14em] text-[#f6c85f]/85">
                  No.{String(card.no).padStart(3, "0")}
                </p>
                {obtained && (
                  <span className="shrink-0 border border-[#5a3f87] bg-[#241d3f]/76 px-1.5 py-0.5 text-[9px] font-black leading-none text-[#fff9e8]">
                    x{collectionItem.collectedCount}
                  </span>
                )}
              </div>

              <div className="min-w-0 space-y-1">
                <p className="truncate text-[16px] font-black leading-5 text-[#fff9e8]">
                  {card.name}
                </p>
                <p className="line-clamp-2 text-[12px] font-semibold leading-[16px] text-[#ddd3ee]">
                  {card.role}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span
                  className="border border-[#3b247a] px-1.5 py-1 text-[9px] font-black leading-none tracking-[0.12em] text-[#2a2038]"
                  style={{ background: effect.accent }}
                >
                  {rarityLabels[card.rarity]}
                </span>
                <span
                  className={`border px-1.5 py-1 text-[9px] font-black leading-none tracking-[0.08em] ${element.className}`}
                >
                  {element.icon} {element.label}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </section>
  );
}

function HistoryRail({
  storage,
  onSelect,
}: {
  storage: AppStorage;
  onSelect: (card: FortuneCardData) => void;
}) {
  const entries = storage.histories
    .map((entry) => ({
      ...entry,
      card: findCard(entry.cardId),
    }))
    .filter((entry): entry is typeof entry & { card: FortuneCardData } => Boolean(entry.card));

  if (entries.length === 0) {
    return (
      <div className="border-2 border-[#5a3f87] bg-[#17142b]/70 p-6 text-center text-sm font-bold text-[#ddd3ee]">
        아직 뽑은 카드가 없습니다. 오늘의 행운팩을 열어 첫 친구를 만나보세요.
      </div>
    );
  }

  return (
    <section className="grid max-h-[680px] gap-2 overflow-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
      {entries.map((entry) => (
        <button
          key={entry.id}
          className="flex items-start gap-3 rounded-[14px] border-2 border-[#5a3f87] bg-[#1d1734]/78 p-3 text-left transition hover:-translate-y-0.5 hover:border-[#b99cff]"
          onClick={() => onSelect(entry.card)}
        >
          <PixelCardArt card={entry.card} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-black text-[#fff9e8]">{entry.card.name}</span>
            <span className="mt-1 block text-xs font-bold text-[#ddd3ee]">
              {entry.date} · {rarityLabels[entry.card.rarity]}
            </span>
            <span className="mt-1 block line-clamp-2 text-[11px] font-bold leading-5 text-[#c3b5dd]">
              {entry.message}
            </span>
          </span>
        </button>
      ))}
    </section>
  );
}

function TodayScreen({
  activeCard,
  alreadyDrewToday,
  cardFlipped,
  effect,
  isOpening,
  isRevealed,
  isSecret,
  notice,
  packOpened,
  rarity,
  packImage,
  stage,
  onOpen,
}: {
  activeCard: FortuneCardData;
  alreadyDrewToday: boolean;
  cardFlipped: boolean;
  effect: (typeof rarityEffects)[Rarity];
  isOpening: boolean;
  isRevealed: boolean;
  isSecret: boolean;
  notice: string;
  packOpened: boolean;
  rarity: Rarity;
  packImage: string;
  stage: string;
  onOpen: () => void;
}) {
  const [userBackVisible, setUserBackVisible] = useState(false);
  const flipY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const smoothFlipY = useSpring(flipY, { stiffness: 180, damping: 24 });
  const smoothTiltX = useSpring(tiltX, { stiffness: 220, damping: 22 });
  const pointerStart = useRef<{ x: number; y: number; base: number } | null>(null);

  useEffect(() => {
    if (!cardFlipped) {
      setUserBackVisible(false);
      flipY.set(0);
      tiltX.set(0);
    }
  }, [cardFlipped, flipY, tiltX]);

  useEffect(() => {
    flipY.set(userBackVisible ? 180 : 0);
  }, [flipY, userBackVisible]);

  const handleCardPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!cardFlipped) return;
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
      base: userBackVisible ? 180 : 0,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCardPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!cardFlipped || !pointerStart.current) return;
    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    const nextFlip = Math.min(180, Math.max(0, pointerStart.current.base + deltaX * 1.05));
    const nextTilt = Math.min(9, Math.max(-9, -deltaY * 0.08));
    flipY.set(nextFlip);
    tiltX.set(nextTilt);
  };

  const handleCardPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!cardFlipped || !pointerStart.current) return;
    const deltaX = event.clientX - pointerStart.current.x;
    const projectedFlip = Math.min(180, Math.max(0, pointerStart.current.base + deltaX * 1.05));
    setUserBackVisible(projectedFlip > 90);
    tiltX.set(0);
    pointerStart.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const shouldRenderCard = stage !== "idle" && stage !== "shake";
  const cardOpacity = stage === "tear" ? 0 : 1;
  const cardY = cardFlipped ? -32 : stage === "rise" ? -10 : 82;
  const cardScale = stage === "tear" ? 0.9 : 1;
  const isPackStage = stage === "idle" || stage === "shake" || stage === "tear";
  const openLabel = alreadyDrewToday ? "오늘 카드 보기" : isRevealed ? "결과 다시 보기" : "오늘의 팩 열기";
  const helperSpacingClass = isPackStage ? "mt-3" : "mt-5";
  const noticeSpacingClass = isPackStage ? "mt-1" : "mt-2";

  return (
    <ContentPanel>
      <div className="mx-auto w-full max-w-[560px]">
        <div className="relative mx-auto h-[620px] max-w-[560px] overflow-visible">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-24 h-[430px] w-[560px] -translate-x-1/2"
            animate={
              packOpened
                ? { opacity: [0, 1, 0.84], scale: [0.7, 1.15, 1] }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.55 }}
          >
            <div
              className={`absolute inset-0 rounded-full ${effect.burst} blur-2xl`}
              style={{ boxShadow: effect.glow }}
            />
              <div className="absolute left-1/2 top-4 h-[390px] w-24 -translate-x-1/2 bg-[#fff7df]/70 blur-xl" />
          </motion.div>

          {isSecret && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-[conic-gradient(from_0deg,#ff9fba,#f6c85f,#77d7b2,#b99cff,#ff9fba)] opacity-45 blur-xl" />
              {starParticles.map((star) => (
                <motion.span
                  key={star.id}
                  className="absolute left-1/2 top-1/2 block rotate-45 bg-[#fff7df] shadow-[0_0_12px_rgba(255,249,232,0.95)]"
                  style={{ height: star.size, width: star.size }}
                  animate={{
                    x: Math.cos(star.angle) * star.distance,
                    y: Math.sin(star.angle) * star.distance,
                    opacity: [0, 1, 0],
                    scale: [0.4, 1.2, 0.2],
                  }}
                  transition={{
                    duration: 1.35,
                    repeat: Infinity,
                    delay: star.id * 0.035,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          )}

          {shouldRenderCard && (
            <div
              className={`absolute left-1/2 top-16 h-[552px] w-[340px] -translate-x-1/2 [perspective:1200px] ${
                cardFlipped ? "z-40" : "z-10"
              }`}
            >
              <motion.div
                className="h-full w-full cursor-grab select-none touch-none active:cursor-grabbing"
                initial={false}
                animate={{
                  y: cardY,
                  scale: cardScale,
                  opacity: cardOpacity,
                }}
                onPointerDown={handleCardPointerDown}
                onPointerMove={handleCardPointerMove}
                onPointerUp={handleCardPointerUp}
                onPointerCancel={handleCardPointerUp}
                transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
                style={{ rotateX: smoothTiltX, rotateY: smoothFlipY, transformStyle: "preserve-3d" }}
              >
                <CardBack visible={!cardFlipped} />
                <CardFront card={activeCard} rarity={activeCard.rarity} visible={cardFlipped} />
              </motion.div>
            </div>
          )}

          {isPackStage && (
            <LuckyCardPack
              isShaking={stage === "shake"}
              isOpen={packOpened}
              rarity={rarity}
              packImage={packImage}
              disabled={isOpening}
              onOpen={onOpen}
              label={openLabel}
            />
          )}
        </div>

        <p className={`${helperSpacingClass} text-center text-xs font-black leading-5 text-[#f6c85f]/90`}>
          {isOpening ? "행운팩을 여는 중이에요." : "카드팩을 눌러 열어보세요."}
        </p>
        <p className={`${noticeSpacingClass} text-center text-xs font-bold leading-5 text-[#efe9ff]/78`}>
          {notice}
        </p>
      </div>
    </ContentPanel>
  );
}

export function PackOpening() {
  const initialCard = fortuneCards[0];
  if (!initialCard) {
    throw new Error("No fortune cards are available.");
  }
  const [view, setView] = useState<View>("today");
  const [storage, setStorage] = useState<AppStorage>({ histories: [], collection: {} });
  const [selectedCard, setSelectedCard] = useState<FortuneCardData>(initialCard);
  const [drawnCard, setDrawnCard] = useState<FortuneCardData | null>(null);
  const [notice, setNotice] = useState("하루에 한 번, 오늘의 행운 친구를 만나보세요.");
  const { stage, rarity, isOpening, isRevealed, openPack, reset } =
    usePackOpening();

  const storedTodayCard = findCard(storage.todayDraw?.cardId);
  const alreadyDrewToday = storage.todayDraw?.date === getTodayKey();
  const todayCard = drawnCard ?? (alreadyDrewToday ? storedTodayCard ?? initialCard : initialCard);
  const todayPackImage = getPackImage(todayCard);
  const selectedCollectionItem = storage.collection[selectedCard.id];
  const selectedHistory = findLatestHistoryForCard(storage, selectedCard.id);
  const selectedHistoryCard = findCard(selectedHistory?.cardId) ?? selectedCard;
  const selectedHistoryCollectionItem = storage.collection[selectedHistoryCard.id];
  const effect = rarityEffects[todayCard.rarity];
  const cardVisible = stage === "rise" || stage === "flip" || stage === "revealed";
  const cardFlipped = stage === "flip" || stage === "revealed";
  const packOpened = stage === "tear" || cardVisible;
  const isSecret = rarity === "secret" && cardVisible;

  const counts = useMemo(
    () =>
      fortuneCards.reduce<Record<Rarity, number>>(
        (acc, card) => {
          acc[card.rarity] += 1;
          return acc;
        },
        { common: 0, rare: 0, epic: 0, secret: 0 },
      ),
    [],
  );

  useEffect(() => {
    const nextStorage = readStorage();
    setStorage(nextStorage);

    const storedTodayCard = findCard(nextStorage.todayDraw?.cardId);
    if (nextStorage.todayDraw?.date === getTodayKey() && storedTodayCard) {
      setDrawnCard(storedTodayCard);
      setSelectedCard(storedTodayCard);
      setNotice("오늘은 이미 행운 친구를 만났어요. 내일 새로운 카드가 찾아올 거예요.");
      return;
    }

    setDrawnCard(null);
    setSelectedCard(initialCard);
  }, [initialCard]);

  const handleOpen = () => {
    const storedTodayCard = findCard(storage.todayDraw?.cardId) ?? initialCard;
    if (storage.todayDraw?.date === getTodayKey() && storedTodayCard) {
      setDrawnCard(storedTodayCard);
      setSelectedCard(storedTodayCard);
      setView("today");
      setNotice("오늘은 이미 행운 친구를 만났어요. 오늘의 카드를 다시 보여드릴게요.");
      reset();
      openPack(storedTodayCard.rarity);
      return;
    }

    reset();
    const card = drawFortuneCard();
    const nextStorage = applyDrawToStorage(card, storage);
    setStorage(nextStorage);
    setDrawnCard(card);
    setSelectedCard(card);
    setView("today");
    setNotice(
      nextStorage.collection[card.id].collectedCount > 1
        ? `${card.name}을 또 만났어요. 조금 더 친해졌어요.`
        : "새로운 친구를 만났어요! 행운도감에 기록했어요.",
    );
    openPack(card.rarity);
  };

  const handleReset = () => {
    resetStorage();
    setStorage({ histories: [], collection: {} });
    setDrawnCard(null);
    setSelectedCard(initialCard);
    setNotice("저장된 도감과 기록을 초기화했어요.");
    reset();
    setView("today");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,#3b247a_0%,#17142b_45%,#0f0c1f_100%)] px-4 py-5 text-[#fff9e8]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <header className="border-2 border-[#5a3f87] bg-[#241d3f]/80 px-4 py-3 shadow-[7px_7px_0_rgba(15,12,31,0.35)] sm:px-5">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="flex min-w-0 items-center justify-start">
              <h1 className="sr-only">Fortune Shop / 행운상점</h1>
              <div className="grid h-[82px] w-[166px] shrink-0 place-items-center bg-transparent">
                <img
                  src="/assets/fortune-shop-logo-header.png"
                  alt="Fortune Shop logo"
                  className="h-full w-full object-contain object-left"
                  draggable={false}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {Object.entries(counts).map(([key, value]) => (
                <div
                  key={key}
                  className="min-w-[86px] overflow-hidden border-2 border-[#5a3f87] bg-[#17142b]/72 px-3 py-2 text-center shadow-[3px_3px_0_rgba(15,12,31,0.24)]"
                >
                  <p className="font-modern-en text-[10px] font-semibold uppercase text-[#f6c85f]/84">
                    {key}
                  </p>
                  <p className="mt-1 text-base font-black leading-none text-[#fff9e8]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <nav className="mt-3 grid w-full grid-cols-4 gap-1.5 rounded-[10px] bg-[#17142b]/58 p-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`ui-tab ${view === tab.id ? "ui-tab-active" : ""}`}
                onClick={() => setView(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {view === "today" && (
          <TodayScreen
            activeCard={todayCard}
            alreadyDrewToday={alreadyDrewToday}
            cardFlipped={cardFlipped}
            effect={effect}
            isOpening={isOpening}
            isRevealed={isRevealed}
            isSecret={isSecret}
            notice={notice}
            packOpened={packOpened}
            rarity={todayCard.rarity}
            packImage={todayPackImage}
            stage={stage}
            onOpen={handleOpen}
          />
        )}

        {view === "collection" && (
          <ContentPanel>
            <SectionTitle
              eyebrow="Collection"
              title="행운도감"
              aside={
                <span>
                  획득 {Object.keys(storage.collection).length} / {fortuneCards.length}
                </span>
              }
            />

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
              <CollectionGrid
                selectedId={selectedCard.id}
                storage={storage}
                onSelect={setSelectedCard}
              />

              <aside className="xl:sticky xl:top-5">
                <FortuneCard
                  card={selectedCard}
                  collectionItem={selectedCollectionItem}
                  obtained={Boolean(selectedCollectionItem)}
                />
                <div className={`${surfaceClass} hidden`}>
                  <p className="font-modern-en text-xs font-semibold uppercase tracking-[0.12em] text-[#f6c85f]/85">
                    {rarityLabels[selectedCard.rarity]} · {selectedCard.element}
                  </p>
                  <h3 className="mt-2 text-2xl font-black leading-tight text-[#fff9e8]">
                    {selectedCard.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#efe9ff]/80">
                    {selectedCard.role}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#8d7fa8]">
                    {selectedCard.messages[0]}
                  </p>
                  {selectedCollectionItem && (
                    <p className="mt-3 text-xs font-semibold text-[#77d7b2]/90">
                      만난 횟수 x{selectedCollectionItem.collectedCount} · 친밀도 Lv.
                      {selectedCollectionItem.intimacyLevel}
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </ContentPanel>
        )}

        {view === "history" && (
          <ContentPanel>
            <SectionTitle eyebrow="History" title="뽑기 기록" />
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
              <HistoryRail
                storage={storage}
                onSelect={setSelectedCard}
              />
              <aside className={surfaceClass}>
                {selectedHistory ? (
                  <div className="space-y-4">
                    <FortuneCard
                      card={selectedHistoryCard}
                      collectionItem={selectedHistoryCollectionItem}
                      obtained
                    />
                    <div className="rounded-[14px] border-2 border-[#5a3f87] bg-[#1d1734]/82 p-4 text-[#fff9e8]">
                      <p className="font-modern-en text-xs font-semibold uppercase tracking-[0.12em] text-[#f6c85f]">
                        {selectedHistory.date}
                      </p>
                      <p className="mt-2 text-sm font-black text-[#ddd3ee]">
                        {rarityLabels[selectedHistoryCard.rarity]} · {selectedHistoryCard.element}
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-6 text-[#f4ecff]">
                        {selectedHistory.message}
                      </p>
                      <div className="mt-4 grid gap-2 text-xs font-bold text-[#d8cdea]">
                        <div className="rounded-[10px] bg-[#241d3f] px-3 py-2">행운 아이템 · {selectedHistory.luckyItem}</div>
                        <div className="rounded-[10px] bg-[#241d3f] px-3 py-2">행운 컬러 · {selectedHistory.luckyColor}</div>
                        <div className="rounded-[10px] bg-[#241d3f] px-3 py-2">행운 시간 · {selectedHistory.luckyTime}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-medium leading-7 text-[#ddd3ee]">
                    아직 기록된 카드가 없습니다. 오늘 카드를 열면 여기에 뽑기 기록이 쌓입니다.
                  </p>
                )}
              <p className="hidden text-sm font-medium leading-7 text-[#ddd3ee]">
                기록에서 카드를 선택하면 도감 상세 화면으로 이동합니다. 오늘 화면은 카드팩 오픈 연출만 보여주도록 분리했습니다.
              </p>
            </aside>
            </div>
          </ContentPanel>
        )}

        {view === "settings" && (
          <ContentPanel>
            <div className="w-full">
              <SectionTitle eyebrow="Settings" title="설정" />
              <p className="text-sm font-medium leading-7 text-[#efe9ff]/80">
                저장 키는 <span className="font-black text-[#f6c85f]">fortune-shop-storage</span>를 사용합니다.
                테스트가 필요하면 도감, 기록, 오늘의 뽑기를 초기화할 수 있어요.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ["획득 카드", `${Object.keys(storage.collection).length} / ${fortuneCards.length}`],
                  ["기록", `${storage.histories.length}개`],
                  ["오늘 카드", alreadyDrewToday ? "완료" : "대기"],
                ].map(([label, value]) => (
                  <div key={label} className="overflow-hidden border-2 border-[#5a3f87] bg-[#17142b]/70 p-3 shadow-[3px_3px_0_rgba(15,12,31,0.22)]">
                    <p className="font-modern-en text-[10px] font-semibold uppercase tracking-[0.12em] text-[#f6c85f]/84">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-black text-[#fff9e8]">{value}</p>
                  </div>
                ))}
              </div>
              <button className="ui-btn ui-btn-danger mt-5" onClick={handleReset}>
                데이터 초기화
              </button>
            </div>
          </ContentPanel>
        )}
      </section>
    </main>
  );
}
