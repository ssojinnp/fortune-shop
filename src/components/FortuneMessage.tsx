export function FortuneMessage({ message, flavorText }: { message: string; flavorText: string }) {
  return (
    <section className="border-x-4 border-b-4 border-[#d99b72] bg-[#fff8dc] px-4 py-4 text-center shadow-[inset_0_0_0_3px_rgba(255,255,255,0.72)]">
      <p className="text-lg font-black leading-relaxed text-[#2e211a]">
        <span className="mr-2 text-[#7557bf]">“</span>
        {message}
        <span className="ml-2 text-[#7557bf]">”</span>
      </p>
      <div className="mx-auto my-3 h-1 max-w-[230px] bg-[repeating-linear-gradient(90deg,#d99b72_0_5px,transparent_5px_10px)]" />
      <p className="text-xs font-bold leading-5 text-[#5c473c]">{flavorText}</p>
    </section>
  );
}
