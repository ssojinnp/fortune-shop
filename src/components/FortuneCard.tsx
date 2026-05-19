import type { CollectionItem, FortuneCard as FortuneCardType } from "../types/card";
import { PixelImageFrame } from "./PixelImageFrame";
import { RarityBadge } from "./RarityBadge";

type FortuneCardProps = {
  card: FortuneCardType;
  collectionItem?: CollectionItem;
  obtained?: boolean;
};

function CardDecor() {
  const cornerBase =
    "pointer-events-none absolute z-20 h-5 w-5 rounded-[5px] border-2 border-[#d8b46a] bg-[#fff7df] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.72),2px_2px_0_rgba(47,31,63,0.12)]";

  return (
    <>
      <span className="pointer-events-none absolute inset-2 rounded-[16px] border-2 border-[#d8b46a]/82" />
      <span className={`${cornerBase} left-1.5 top-1.5`}>
        <span className="absolute left-1 top-1 h-2 w-2 border-l-[3px] border-t-[3px] border-[#8f5a3e]" />
        <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rotate-45 bg-[#6747ad]" />
      </span>
      <span className={`${cornerBase} right-1.5 top-1.5`}>
        <span className="absolute right-1 top-1 h-2 w-2 border-r-[3px] border-t-[3px] border-[#8f5a3e]" />
        <span className="absolute bottom-1 left-1 h-1.5 w-1.5 rotate-45 bg-[#6747ad]" />
      </span>
      <span className={`${cornerBase} bottom-1.5 left-1.5`}>
        <span className="absolute bottom-1 left-1 h-2 w-2 border-b-[3px] border-l-[3px] border-[#8f5a3e]" />
        <span className="absolute right-1 top-1 h-1.5 w-1.5 rotate-45 bg-[#f5c45c]" />
      </span>
      <span className={`${cornerBase} bottom-1.5 right-1.5`}>
        <span className="absolute bottom-1 right-1 h-2 w-2 border-b-[3px] border-r-[3px] border-[#8f5a3e]" />
        <span className="absolute left-1 top-1 h-1.5 w-1.5 rotate-45 bg-[#f5c45c]" />
      </span>
    </>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative grid h-[56px] grid-rows-[14px_1fr] overflow-hidden rounded-[7px] border border-[#d8b46a] bg-[#fff9e8] px-2 py-1.5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.68),3px_3px_0_rgba(47,31,63,0.1)]">
      <span className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 bg-[#6747ad]" />
      <span className="pointer-events-none absolute right-0 top-0 h-1.5 w-1.5 bg-[#f5c45c]" />
      <p className="text-[9px] font-black leading-[14px] text-[#6d4aff]">{label}</p>
      <p className="line-clamp-2 self-center text-[10px] font-black leading-[1.25] text-[#2a2038]">
        {value}
      </p>
    </div>
  );
}

function IntimacyFooter({ level = 1, count = 1 }: { level?: number; count?: number }) {
  const filled = Math.min(5, Math.max(1, level));

  return (
    <footer className="grid h-[38px] grid-cols-[auto_1fr] items-center gap-2 overflow-hidden rounded-[8px] border border-[#d8b46a] bg-[#fff9e8] px-2.5 py-1 text-[#2a2038] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.68)]">
      <div className="whitespace-nowrap text-[10px] font-black">
        친밀도 <span className="text-[#6747ad]">Lv.{level}</span>{" "}
        <span className="text-[#9b6b52]">x{count}</span>
      </div>
      <div className="min-w-0 truncate text-right text-[10px] font-extrabold text-[#6a4a3c]">
        <span className="mr-1 text-[#c4364f]">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < filled ? "" : "opacity-25"}>
              ♥
            </span>
          ))}
        </span>
        또 만나면 더 친해질 수 있어요!
      </div>
    </footer>
  );
}

export function FortuneCard({ card, collectionItem, obtained = true }: FortuneCardProps) {
  const level = collectionItem?.intimacyLevel ?? Math.max(1, Math.ceil(card.no / 10));
  const count = collectionItem?.collectedCount ?? 1;
  const message = obtained ? card.messages[0] : "아직 행운 메시지는 열리지 않았어요.";
  const luckyItems = obtained ? card.luckyItems : ["?", "?", "?"];
  const luckyColors = obtained ? card.luckyColors : ["?", "?", "?"];
  const luckyTimes = obtained ? card.luckyTimes : ["?", "?", "?"];

  return (
    <div className="relative mx-auto h-[552px] w-[340px] max-w-full max-[420px]:h-[519px] max-[420px]:w-[320px] max-[380px]:h-[486px] max-[380px]:w-[300px] max-[360px]:h-[454px] max-[360px]:w-[280px]">
      <article
        className="absolute left-1/2 top-0 h-[552px] w-[340px] -translate-x-1/2 origin-top overflow-hidden rounded-[22px] border-4 border-[#3b247a] bg-[#fff7df] p-5 text-[#2a2038] shadow-[0_14px_0_rgba(15,12,31,0.26),inset_0_0_0_4px_#f6dfaa] max-[420px]:scale-[0.941] max-[380px]:scale-[0.882] max-[360px]:scale-[0.8235]"
        aria-label={`${card.name} fortune card`}
      >
        <CardDecor />

        <div className="relative z-10 grid h-full grid-rows-[30px_88px_188px_62px_56px_38px] gap-2">
          <header className="flex items-start justify-between gap-3">
            <div className="rounded-[6px] border-2 border-[#efdfbd] bg-white/75 px-2 py-1 text-xs font-black leading-none tracking-wide shadow-[2px_2px_0_rgba(47,31,63,0.1)]">
              No.{String(card.no).padStart(3, "0")}
            </div>
            <RarityBadge rarity={card.rarity} />
          </header>

          <section className="rounded-[12px] border-2 border-[#d8b46a] bg-[#fff9e8] px-3 py-2 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.86),0_3px_0_rgba(143,90,62,0.14)]">
            <p className="mx-auto inline-block rounded-[999px] border border-[#d8b46a] bg-[#fff7df] px-3 py-0.5 text-[10px] font-black leading-none text-[#6d4aff]">
              ✦ 오늘의 행운카드 ✦
            </p>
            <h2 className="mt-1.5 text-[21px] font-black leading-none tracking-normal">{card.name}</h2>
            <p className="mt-1 truncate text-[11px] font-extrabold leading-none text-[#5f536f]">{card.role}</p>
          </section>

          <PixelImageFrame
            backgroundImage={card.backgroundImage}
            characterImage={card.image}
            placeholderEmoji={card.placeholderEmoji}
            alt={card.name}
            obtained={obtained}
          />

          <section className="grid place-items-center rounded-[12px] border border-[#d8b46a] bg-[#fff9e8] px-4 py-2 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.78),0_3px_0_rgba(217,155,114,0.14)]">
            <p className="line-clamp-2 text-[13px] font-black leading-[1.45] text-[#2a2038]">
              <span className="mr-1 text-[#7557bf]">“</span>
              {message}
              <span className="ml-1 text-[#7557bf]">”</span>
            </p>
          </section>

          <section className="grid grid-cols-3 gap-2">
            <InfoTile label="행운 아이템" value={luckyItems[0]} />
            <InfoTile label="행운 컬러" value={luckyColors[0]} />
            <InfoTile label="행운 시간" value={luckyTimes[0]} />
          </section>

          {obtained ? (
            <IntimacyFooter level={level} count={count} />
          ) : (
            <footer className="grid h-[38px] place-items-center overflow-hidden rounded-[8px] border border-[#d8b46a] bg-[#fff9e8] px-2.5 py-1 text-center text-[10px] font-black text-[#6a4a3c] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.68)]">
              행운팩에서 만나면 자세한 기록이 열려요.
            </footer>
          )}
        </div>
      </article>
    </div>
  );
}
