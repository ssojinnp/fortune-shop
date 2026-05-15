import { CardPack, cardPackVariantMeta, type CardPackVariant } from "./CardPack";

const previewPacks: Array<{
  variant: CardPackVariant;
  title: string;
  packImage: string;
  label: string;
}> = [
  {
    variant: "purple",
    title: "오늘의 행운팩",
    packImage: "/assets/packs/pack-purple.png",
    label: "기본 팩",
  },
  {
    variant: "green",
    title: "클로버 행운팩",
    packImage: "/assets/packs/pack-green.png",
    label: "클로버 팩",
  },
  {
    variant: "night",
    title: "별빛 행운팩",
    packImage: "/assets/packs/pack-night.png",
    label: "별빛 팩",
  },
];

export function CardPackPreview() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {previewPacks.map((pack) => (
        <div key={pack.variant} className="text-center">
          <div className="mx-auto h-[260px] w-[164px] overflow-hidden">
            <div className="origin-top-left scale-[0.73]">
              <CardPack
                variant={pack.variant}
                title={pack.title}
                packImage={pack.packImage}
              />
            </div>
          </div>
          <div className="mx-auto mt-3 max-w-[220px] border-2 border-[#5a3f87] bg-[#17142b]/70 px-3 py-2 shadow-[3px_3px_0_rgba(15,12,31,0.22)]">
            <p className="text-sm font-black text-[#fff9e8]">{pack.label}</p>
            <p className="mt-1 text-xs font-bold leading-5 text-[#efe9ff]/78">
              {cardPackVariantMeta[pack.variant].caption}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
