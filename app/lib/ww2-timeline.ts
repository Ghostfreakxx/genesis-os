export type EventCategory = "political" | "military" | "diplomatic" | "atrocity";

export interface TimelineEvent {
  title: string;
  category: EventCategory;
}

export interface TimelineYear {
  year: number;
  headline: string;
  summary: string;
  events: TimelineEvent[];
  retrospective: string;
}

export const WW2_TIMELINE: TimelineYear[] = [
  {
    year: 1933,
    headline: "The Republic Dismantles Itself",
    summary:
      "Hitler is appointed Chancellor of a coalition government. Within six months, emergency decrees, a burned Reichstag, and a single vote convert a parliamentary democracy into a one-party dictatorship.",
    events: [
      { title: "Hitler appointed Chancellor of Germany (Jan 30)", category: "political" },
      { title: "Reichstag Fire and the Reichstag Fire Decree suspend civil liberties (Feb 27–28)", category: "political" },
      { title: "Enabling Act grants Hitler's cabinet power to legislate without the Reichstag (Mar 23)", category: "political" },
      { title: "Dachau, the first Nazi concentration camp, opens near Munich (Mar)", category: "atrocity" },
      { title: "National boycott of Jewish-owned businesses (Apr 1)", category: "atrocity" },
      { title: "Nationwide book burnings target ‘un-German’ authors (May 10)", category: "political" },
      { title: "Nazi Party declared the only legal political party in Germany (Jul 14)", category: "political" },
    ],
    retrospective:
      "A democracy voted itself into a dictatorship in six months, one ‘emergency measure’ at a time. That's the lesson, not the trivia.",
  },
  {
    year: 1934,
    headline: "The Führer State",
    summary:
      "Hitler purges his own paramilitary rivals, then merges the offices of Chancellor and President into a single, absolute role after President Hindenburg's death.",
    events: [
      { title: "Night of the Long Knives: SA leadership and other political rivals murdered (Jun 30 – Jul 2)", category: "political" },
      { title: "President Hindenburg dies; Hitler merges the presidency and chancellorship into ‘Führer’ (Aug 2)", category: "political" },
      { title: "German armed forces swear a personal oath of loyalty to Hitler, not the constitution", category: "military" },
    ],
    retrospective:
      "The army swore loyalty to a man, not a law. Every later atrocity had that oath as its excuse.",
  },
  {
    year: 1935,
    headline: "Rearmament and Racial Law",
    summary:
      "Germany tears up the disarmament clauses of the Treaty of Versailles and, months later, writes racial persecution directly into law.",
    events: [
      { title: "Conscription reintroduced; Luftwaffe's existence announced, violating Versailles (Mar)", category: "military" },
      { title: "Nuremberg Laws strip Jews of German citizenship and ban marriage or relations with non-Jews (Sep 15)", category: "atrocity" },
    ],
    retrospective:
      "Rearmament got the headlines. The Nuremberg Laws got the future — persecution now had legal cover.",
  },
  {
    year: 1936,
    headline: "Testing the World's Resolve",
    summary:
      "German troops reoccupy the demilitarized Rhineland unopposed, a showcase Olympics in Berlin launders the regime's image abroad, and German forces get their first combat testing ground in Spain.",
    events: [
      { title: "Remilitarization of the Rhineland, defying Versailles and Locarno (Mar 7)", category: "military" },
      { title: "Berlin Summer Olympics used as a propaganda showcase (Aug)", category: "political" },
      { title: "Rome–Berlin Axis formed with Fascist Italy (Oct)", category: "diplomatic" },
      { title: "Condor Legion deploys to support Franco in the Spanish Civil War", category: "military" },
    ],
    retrospective:
      "Nobody stopped the Rhineland march. Every gamble after this one bet on that same silence — and won.",
  },
  {
    year: 1937,
    headline: "Planning for War",
    summary:
      "Behind closed doors, Hitler lays out a timetable for territorial expansion by force; rearmament accelerates beyond any pretense of defense.",
    events: [
      { title: "Hossbach Memorandum records Hitler's war plans to senior military and foreign policy leaders (Nov 5)", category: "military" },
      { title: "Four Year Plan drives the economy toward war production and self-sufficiency", category: "political" },
      { title: "Condor Legion bombs the Basque town of Guernica, a preview of terror bombing (Apr 26)", category: "atrocity" },
    ],
    retrospective:
      "By 1937 the question in Berlin wasn't ‘if.’ It was ‘which country first.’ The world was still asking ‘if.’",
  },
  {
    year: 1938,
    headline: "Annexation by Ultimatum",
    summary:
      "Austria is absorbed without a shot fired. Europe's major powers hand over the Sudetenland to avoid war, and the regime answers appeasement with a night of organized pogroms.",
    events: [
      { title: "Anschluss: Germany annexes Austria (Mar 12)", category: "military" },
      { title: "Munich Agreement cedes the Sudetenland to Germany; Czechoslovakia not consulted (Sep 30)", category: "diplomatic" },
      { title: "Kristallnacht: coordinated pogrom destroys synagogues and Jewish businesses; roughly 30,000 Jewish men sent to camps (Nov 9–10)", category: "atrocity" },
    ],
    retrospective:
      "Munich bought ‘peace for our time.’ It bought Hitler eleven months and one lesson he never unlearned: threats work.",
  },
  {
    year: 1939,
    headline: "War Begins",
    summary:
      "Germany dismembers the rest of Czechoslovakia, strikes a cynical pact with Stalin's USSR, then invades Poland — starting the war it had been planning for years.",
    events: [
      { title: "Germany occupies the remainder of Czechoslovakia (Mar 15)", category: "military" },
      { title: "Pact of Steel: military alliance with Italy (May 22)", category: "diplomatic" },
      { title: "Molotov–Ribbentrop Pact: non-aggression treaty with the USSR, with a secret protocol dividing Poland (Aug 23)", category: "diplomatic" },
      { title: "Invasion of Poland begins the Second World War in Europe (Sep 1)", category: "military" },
      { title: "Britain and France declare war on Germany (Sep 3)", category: "diplomatic" },
      { title: "Einsatzgruppen death squads begin mass killings of Polish civilians, intelligentsia, and Jews", category: "atrocity" },
      { title: "‘T4’ program begins murdering disabled and institutionalized people", category: "atrocity" },
    ],
    retrospective:
      "The invasion made headlines. The killing squads that followed the army into Poland made the war's real character clear from day one.",
  },
  {
    year: 1940,
    headline: "Blitzkrieg Sweeps the West",
    summary:
      "German forces overrun Scandinavia, the Low Countries, and France in months, while ghettoization of Jewish populations in occupied Poland begins.",
    events: [
      { title: "Invasion of Denmark and Norway (Apr 9)", category: "military" },
      { title: "Invasion of France, Belgium, and the Netherlands; Dunkirk evacuation (May–Jun)", category: "military" },
      { title: "France signs an armistice; Germany occupies the north, installs Vichy in the south (Jun 22)", category: "military" },
      { title: "Battle of Britain: the Luftwaffe fails to win air superiority for an invasion (Jul–Oct)", category: "military" },
      { title: "Tripartite Pact formalizes the Axis with Italy and Japan (Sep 27)", category: "diplomatic" },
      { title: "Warsaw Ghetto sealed, confining over 400,000 Jews (Nov 16)", category: "atrocity" },
    ],
    retrospective:
      "1940 looked like an unbeatable machine from the outside. From inside the Warsaw Ghetto's walls, it already looked like a death sentence.",
  },
  {
    year: 1941,
    headline: "The War Becomes Genocidal",
    summary:
      "Germany invades the Soviet Union on a catastrophic scale, and mass shootings of Jews by mobile killing squads escalate into a continent-wide program of extermination — just as the United States enters the war.",
    events: [
      { title: "Invasion of Yugoslavia and Greece (Apr)", category: "military" },
      { title: "Operation Barbarossa: invasion of the Soviet Union, the largest military offensive in history (Jun 22)", category: "military" },
      { title: "Einsatzgruppen mass shootings intensify across the occupied USSR; the Babi Yar massacre kills over 33,000 people in two days (Sep 29–30)", category: "atrocity" },
      { title: "Japan attacks Pearl Harbor; Germany declares war on the United States (Dec 7–11)", category: "diplomatic" },
      { title: "First gassing operations begin at Chełmno extermination camp (Dec 8)", category: "atrocity" },
    ],
    retrospective:
      "By the end of 1941 the war had gained an opponent it could not outproduce, and a second front it had chosen to open against civilians. Both proved fatal.",
  },
  {
    year: 1942,
    headline: "Industrializing Murder",
    summary:
      "Senior officials formalize the machinery of the ‘Final Solution’ at a single meeting outside Berlin, while a German army bleeds out at Stalingrad.",
    events: [
      { title: "Wannsee Conference coordinates the bureaucratic ‘Final Solution’ — the systematic murder of European Jews (Jan 20)", category: "atrocity" },
      { title: "Extermination camps at Auschwitz-Birkenau, Treblinka, Sobibor, and Bełżec reach full operation", category: "atrocity" },
      { title: "Battle of Stalingrad begins (Aug 23)", category: "military" },
      { title: "Allied victory at El Alamein turns the North Africa campaign (Oct–Nov)", category: "military" },
    ],
    retrospective:
      "One meeting near a lake turned mass murder into an administrative schedule. That bureaucratic ordinariness is the part people find hardest to look at — and the part most worth remembering.",
  },
  {
    year: 1943,
    headline: "The Tide Turns",
    summary:
      "A catastrophic loss at Stalingrad, a doomed ghetto uprising, and a shattering tank battle at Kursk mark the year Germany stopped winning.",
    events: [
      { title: "German Sixth Army surrenders at Stalingrad — roughly 91,000 taken prisoner (Feb 2)", category: "military" },
      { title: "Warsaw Ghetto Uprising: Jewish resistance fighters hold out for nearly a month against SS forces (Apr 19 – May 16)", category: "atrocity" },
      { title: "Allied invasion of Sicily and mainland Italy; Mussolini deposed, Italy surrenders (Jul–Sep)", category: "military" },
      { title: "Battle of Kursk: history's largest tank battle ends in a Soviet strategic victory (Jul)", category: "military" },
      { title: "Strategic bombing of German cities intensifies, including the Hamburg firestorm (Jul)", category: "military" },
    ],
    retrospective:
      "Stalingrad didn't end the war. It ended the illusion, inside Germany and out, that the war could still be won.",
  },
  {
    year: 1944,
    headline: "Collapse on Every Front",
    summary:
      "Allied landings in Normandy open a second major front, a Soviet summer offensive annihilates an entire German army group, and Hitler survives an assassination attempt by his own officers.",
    events: [
      { title: "D-Day: Allied forces land in Normandy, opening the Western Front (Jun 6)", category: "military" },
      { title: "Operation Bagration: a Soviet offensive destroys Army Group Center, Germany's worst single defeat of the war (Jun–Aug)", category: "military" },
      { title: "July 20 plot: senior German officers fail to assassinate Hitler with a briefcase bomb (Jul 20)", category: "political" },
      { title: "Warsaw Uprising by the Polish resistance is crushed; the city is largely destroyed in reprisal (Aug–Oct)", category: "atrocity" },
      { title: "Battle of the Bulge: Germany's last major offensive in the west fails within weeks (Dec 16)", category: "military" },
    ],
    retrospective:
      "By the end of 1944, Germany's own generals had tried to kill Hitler and failed, and the war machine kept running on momentum and terror alone.",
  },
  {
    year: 1945,
    headline: "Unconditional Surrender",
    summary:
      "Soviet forces liberate Auschwitz, Allied armies close in from both directions, and the regime ends with a suicide in a bunker and a surrender that leaves Europe divided for the next half-century.",
    events: [
      { title: "Soviet troops liberate Auschwitz-Birkenau (Jan 27)", category: "atrocity" },
      { title: "Yalta Conference: Allied leaders plan the shape of postwar Europe (Feb 4–11)", category: "diplomatic" },
      { title: "Allied forces cross the Rhine into Germany (Mar)", category: "military" },
      { title: "Soviet forces reach and encircle Berlin (Apr)", category: "military" },
      { title: "Hitler dies by suicide in the Führerbunker (Apr 30)", category: "political" },
      { title: "Germany signs unconditional surrender; V-E Day (May 8)", category: "military" },
      { title: "Nuremberg Trials begin, prosecuting surviving Nazi leadership for war crimes and crimes against humanity (Nov 20)", category: "political" },
    ],
    retrospective:
      "The war killed an estimated 70–85 million people worldwide, roughly 6 million of them Jews murdered in the Holocaust specifically. Nuremberg's answer to ‘just following orders’ was that orders are not a defense. That's the whole point of writing any of this down.",
  },
];
