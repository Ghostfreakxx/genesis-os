export type ConflictStatus = "active-war" | "insurgency" | "ceasefire" | "tension";

export interface ConflictZone {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  status: ConflictStatus;
  since: string;
  summary: string;
  searchQuery: string;
}

export const CONFLICT_ZONES: ConflictZone[] = [
  {
    id: "ukraine",
    name: "Russia–Ukraine War",
    region: "Eastern Europe",
    lat: 48.0159,
    lng: 37.8028,
    status: "active-war",
    since: "2022",
    summary:
      "Full-scale Russian invasion launched in February 2022, following the 2014 annexation of Crimea. Fighting is concentrated along the eastern and southern front lines.",
    searchQuery: "Russia Ukraine war",
  },
  {
    id: "gaza",
    name: "Israel–Gaza Conflict",
    region: "Middle East",
    lat: 31.5,
    lng: 34.45,
    status: "active-war",
    since: "2023",
    summary:
      "Escalated sharply after the October 2023 Hamas attack and Israel's subsequent military campaign in Gaza, part of the much longer Israeli-Palestinian conflict.",
    searchQuery: "Israel Gaza conflict",
  },
  {
    id: "sudan",
    name: "Sudanese Civil War",
    region: "East Africa",
    lat: 15.5007,
    lng: 32.5599,
    status: "active-war",
    since: "2023",
    summary:
      "Power struggle between the Sudanese Armed Forces and the paramilitary Rapid Support Forces that erupted into open war in April 2023, driving one of the world's largest displacement crises.",
    searchQuery: "Sudan civil war",
  },
  {
    id: "myanmar",
    name: "Myanmar Civil War",
    region: "Southeast Asia",
    lat: 19.7633,
    lng: 96.0785,
    status: "active-war",
    since: "2021",
    summary:
      "Nationwide armed resistance against the military junta that seized power in the February 2021 coup, fought across multiple fronts by ethnic armed organizations and pro-democracy militias.",
    searchQuery: "Myanmar civil war",
  },
  {
    id: "sahel",
    name: "Sahel Insurgency",
    region: "West Africa",
    lat: 17.5707,
    lng: -3.9962,
    status: "insurgency",
    since: "2012",
    summary:
      "Jihadist insurgency across Mali, Burkina Faso, and Niger, compounded by a wave of military coups and the withdrawal of Western forces from the region.",
    searchQuery: "Sahel jihadist insurgency Mali Burkina Faso",
  },
  {
    id: "yemen",
    name: "Yemeni Civil War",
    region: "Middle East",
    lat: 15.3694,
    lng: 44.191,
    status: "ceasefire",
    since: "2014",
    summary:
      "Houthi movement versus the internationally recognized government and its coalition backers, alongside Houthi attacks on Red Sea shipping. Fighting has eased under a fragile truce.",
    searchQuery: "Yemen war Houthi",
  },
  {
    id: "south-china-sea",
    name: "South China Sea Disputes",
    region: "Southeast Asia",
    lat: 10.5,
    lng: 114.5,
    status: "tension",
    since: "long-running",
    summary:
      "Overlapping territorial claims between China, the Philippines, Vietnam, and other states, marked by recurring stand-offs between coast guard and militia vessels.",
    searchQuery: "South China Sea dispute",
  },
  {
    id: "taiwan-strait",
    name: "Taiwan Strait",
    region: "East Asia",
    lat: 23.7,
    lng: 120.9,
    status: "tension",
    since: "long-running",
    summary:
      "Persistent cross-strait tension as China conducts military exercises and incursions near Taiwan, which it claims as its own territory.",
    searchQuery: "Taiwan Strait China tension",
  },
  {
    id: "kashmir",
    name: "Kashmir / Line of Control",
    region: "South Asia",
    lat: 34.0837,
    lng: 74.7973,
    status: "tension",
    since: "1947",
    summary:
      "Disputed territory between India and Pakistan since partition, with periodic ceasefire violations and militant activity along the Line of Control.",
    searchQuery: "Kashmir India Pakistan tension",
  },
  {
    id: "korea",
    name: "Korean Peninsula",
    region: "East Asia",
    lat: 38.3,
    lng: 127.5,
    status: "ceasefire",
    since: "1953",
    summary:
      "North and South Korea remain technically at war under a 1953 armistice, with periodic missile tests and rhetoric escalating tension along the DMZ.",
    searchQuery: "North Korea South Korea tension",
  },
];
