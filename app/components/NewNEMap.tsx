export default function NewNEMap() {
  return (
    <section className="border border-cyan-500 rounded-2xl p-4 bg-black shadow-[0_0_30px_#0891b255]">
      <h2 className="text-cyan-300 font-bold text-2xl mb-4">
        NORTHEAST INDIA MAP
      </h2>

      <div className="relative overflow-hidden rounded-xl border border-cyan-500 bg-black">
        <img
  src="/ne-map.jpeg"
  alt="Northeast India Map"
  className="w-full h-auto"
/>

        <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
      </div>
   <div className="mt-6 grid md:grid-cols-2 gap-4">
  <div className="border border-green-500 rounded-xl p-4 bg-black/60">
    <h3 className="text-xl font-bold text-green-400">
      United Northeast Potential
    </h3>
    <p className="text-zinc-300 mt-2">
      A united and well-connected Northeast could become India’s eastern
      economic gateway, linking mainland India with Myanmar, Bangladesh
      and wider ASEAN trade routes.
    </p>
  </div>

  <div className="border border-cyan-500 rounded-xl p-4 bg-black/60">
    <h3 className="text-xl font-bold text-cyan-300">
      Strategic Advantage
    </h3>
    <p className="text-zinc-300 mt-2">
      The region has border access, hydropower potential, forest resources,
      tourism routes, military importance and future logistics corridors.
    </p>
  </div>

  <div className="border border-yellow-500 rounded-xl p-4 bg-black/60">
    <h3 className="text-xl font-bold text-yellow-400">
      Main Weakness
    </h3>
    <p className="text-zinc-300 mt-2">
      Without roads, railways, border trade planning and stable governance,
      this potential remains underused.
    </p>
  </div>

  <div className="border border-red-500 rounded-xl p-4 bg-black/60">
    <h3 className="text-xl font-bold text-red-400">
      Genesis Warning
    </h3>
    <p className="text-zinc-300 mt-2">
      Geography alone does not create power. Infrastructure, unity and
      political discipline decide whether Northeast India becomes a frontier
      or a forgotten borderland.
    </p>
  </div>
</div> </section>
  );
}