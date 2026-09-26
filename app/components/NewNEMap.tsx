const INSIGHTS = [
  {
    title: "United Northeast Potential",
    accent: "border-l-emerald-400/60 text-emerald-300",
    body: "A united and well-connected Northeast could become India’s eastern economic gateway, linking mainland India with Myanmar, Bangladesh and wider ASEAN trade routes.",
  },
  {
    title: "Strategic Advantage",
    accent: "border-l-accent/60 text-accent",
    body: "The region has border access, hydropower potential, forest resources, tourism routes, military importance and future logistics corridors.",
  },
  {
    title: "Main Weakness",
    accent: "border-l-amber-300/60 text-amber-200",
    body: "Without roads, railways, border trade planning and stable governance, this potential remains underused.",
  },
  {
    title: "Genesis Warning",
    accent: "border-l-rose-400/60 text-rose-300",
    body: "Geography alone does not create power. Infrastructure, unity and political discipline decide whether Northeast India becomes a frontier or a forgotten borderland.",
  },
];

export default function NewNEMap() {
  return (
    <section className="panel p-5 md:p-6">
      <p className="eyebrow">{"// Regional Focus"}</p>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mt-1 mb-5">
        Northeast India Map
      </h2>

      <div className="relative overflow-hidden rounded-xl border border-line bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ne-map.jpeg"
          alt="Northeast India Map"
          className="w-full h-auto"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060912]/70 via-transparent to-transparent"></div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {INSIGHTS.map((item) => (
          <div
            key={item.title}
            className={`panel-inset p-4 border-l-2 ${item.accent}`}
          >
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="text-slate-300 text-sm leading-6 mt-2">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
