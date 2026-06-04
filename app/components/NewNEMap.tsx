export default function NewNEMap() {
  return (
    <section className="border border-cyan-500 rounded-2xl p-4 bg-black shadow-[0_0_30px_#0891b255]">
      <h2 className="text-cyan-300 font-bold text-2xl mb-4">
        NORTHEAST INDIA MAP
      </h2>

      <div className="relative overflow-hidden rounded-xl border border-cyan-500 bg-black">
        <img
          src="/ne-map.jpg"
          alt="Northeast India Map"
          className="w-full h-auto opacity-95"
        />

        <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
      </div>
    </section>
  );
}