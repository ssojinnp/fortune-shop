import { useEffect, useState } from "react";

type PixelImageFrameProps = {
  backgroundImage?: string;
  characterImage?: string;
  placeholderEmoji?: string;
  alt: string;
  obtained?: boolean;
};

export function PixelImageFrame({
  backgroundImage,
  characterImage,
  placeholderEmoji = "✨",
  alt,
  obtained = true,
}: PixelImageFrameProps) {
  const [backgroundFailed, setBackgroundFailed] = useState(false);
  const [characterFailed, setCharacterFailed] = useState(false);
  const showBackground = Boolean(backgroundImage) && !backgroundFailed;
  const showCharacter = obtained && Boolean(characterImage) && !characterFailed;

  useEffect(() => {
    setBackgroundFailed(false);
    setCharacterFailed(false);
  }, [backgroundImage, characterImage]);

  return (
    <div className="relative h-[188px] overflow-hidden rounded-[18px] border-2 border-[#d8b46a] bg-[#fff7df] p-1.5 shadow-[inset_0_0_0_1px_rgba(255,249,232,0.72),0_4px_0_rgba(47,31,63,0.16)]">
      <div className="relative h-full overflow-hidden rounded-[14px] border-2 border-[#3b247a] bg-[linear-gradient(180deg,#17142b_0%,#241d3f_100%)]">
        {showBackground ? (
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover [image-rendering:auto]"
            onError={() => setBackgroundFailed(true)}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(246,200,95,0.2),transparent_26%),linear-gradient(180deg,#17142b,#241d3f)]" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-[linear-gradient(180deg,rgba(108,75,125,0.4),rgba(59,36,122,0.9))]" />
          </>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,20,43,0.04),rgba(23,20,43,0.22))]" />

        <div className="relative z-10 grid h-full w-full place-items-center px-3">
          {showCharacter ? (
            <img
              src={characterImage}
              alt={`${alt} character image`}
              className="max-h-[176px] max-w-[252px] object-contain drop-shadow-[0_0_16px_rgba(255,246,214,0.55)] [image-rendering:auto]"
              onError={() => setCharacterFailed(true)}
            />
          ) : (
            <div className="grid h-28 w-28 place-items-center rounded-[14px] border-2 border-[#2f1f3f] bg-[#fff6d6] text-6xl shadow-[6px_6px_0_rgba(47,31,63,0.18)]">
              {obtained ? placeholderEmoji : "?"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
