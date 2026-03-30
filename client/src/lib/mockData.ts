/*
 * Mock data for the MyHome Property Report
 * All data is realistic for a South African suburban property
 * Target: Fourways, Johannesburg — avg R1.5m property
 */

export const ownerProperty = {
  ownerName: "Rudi Botha",
  address: "14 Jacaranda Crescent",
  suburb: "Fourways",
  city: "Johannesburg",
  province: "Gauteng",
  erfNumber: "ERF 4821",
  propertyType: "Freehold",
  bedrooms: 3,
  bathrooms: 2,
  garages: 2,
  erfSize: 680, // sqm
  buildingSize: 185, // sqm
  yearBuilt: 2008,
  currentValue: 1_580_000,
  previousValue: 1_420_000, // 12 months ago
  purchasePrice: 1_150_000,
  purchaseDate: "2019-03-15",
  lat: -26.0054,
  lng: 28.0048,
  // Mock erf boundary polygon (approx 680m² stand — Camdeboo Rd area, Fourways)
  // Coordinates chosen to land on a real residential stand in Fourways Gardens
  erfBoundary: [
    { lat: -26.00528, lng: 28.00462 },
    { lat: -26.00518, lng: 28.00505 },
    { lat: -26.00545, lng: 28.00512 },
    { lat: -26.00555, lng: 28.00469 },
    { lat: -26.00528, lng: 28.00462 },
  ],
};

export const valueHistory = [
  { year: "2019", month: "Mar", value: 1_150_000, label: "Purchase" },
  { year: "2019", month: "Jun", value: 1_165_000 },
  { year: "2019", month: "Sep", value: 1_180_000 },
  { year: "2019", month: "Dec", value: 1_190_000 },
  { year: "2020", month: "Mar", value: 1_175_000 },
  { year: "2020", month: "Jun", value: 1_160_000, label: "COVID Impact" },
  { year: "2020", month: "Sep", value: 1_195_000 },
  { year: "2020", month: "Dec", value: 1_220_000 },
  { year: "2021", month: "Mar", value: 1_250_000 },
  { year: "2021", month: "Jun", value: 1_285_000 },
  { year: "2021", month: "Sep", value: 1_310_000 },
  { year: "2021", month: "Dec", value: 1_330_000 },
  { year: "2022", month: "Mar", value: 1_355_000 },
  { year: "2022", month: "Jun", value: 1_370_000 },
  { year: "2022", month: "Sep", value: 1_380_000 },
  { year: "2022", month: "Dec", value: 1_390_000 },
  { year: "2023", month: "Mar", value: 1_395_000 },
  { year: "2023", month: "Jun", value: 1_400_000 },
  { year: "2023", month: "Sep", value: 1_410_000 },
  { year: "2023", month: "Dec", value: 1_420_000 },
  { year: "2024", month: "Mar", value: 1_440_000 },
  { year: "2024", month: "Jun", value: 1_465_000 },
  { year: "2024", month: "Sep", value: 1_495_000, label: "Rate Cuts Begin" },
  { year: "2024", month: "Dec", value: 1_520_000 },
  { year: "2025", month: "Mar", value: 1_545_000 },
  { year: "2025", month: "Jun", value: 1_560_000 },
  { year: "2025", month: "Sep", value: 1_570_000 },
  { year: "2025", month: "Dec", value: 1_575_000 },
  { year: "2026", month: "Mar", value: 1_580_000, label: "Current" },
];

export const surroundingSales = [
  {
    id: 1,
    address: "8 Jacaranda Crescent",
    salePrice: 1_650_000,
    saleDate: "2026-01-22",
    daysOnMarket: 42,
    bedrooms: 3,
    bathrooms: 2,
    erfSize: 720,
    buildingSize: 195,
    pricePerSqm: 8_462,
    distanceFromProperty: 85,
    lat: -26.0046,
    lng: 28.0056,
    aboveAsking: true,
    askingPrice: 1_595_000,
  },
  {
    id: 2,
    address: "22 Protea Avenue",
    salePrice: 1_480_000,
    saleDate: "2025-12-05",
    daysOnMarket: 67,
    bedrooms: 3,
    bathrooms: 2,
    erfSize: 650,
    buildingSize: 170,
    pricePerSqm: 8_706,
    distanceFromProperty: 210,
    lat: -26.0035,
    lng: 28.0066,
    aboveAsking: false,
    askingPrice: 1_550_000,
  },
  {
    id: 3,
    address: "5 Bushwillow Lane",
    salePrice: 1_920_000,
    saleDate: "2025-11-18",
    daysOnMarket: 28,
    bedrooms: 4,
    bathrooms: 3,
    erfSize: 850,
    buildingSize: 240,
    pricePerSqm: 8_000,
    distanceFromProperty: 340,
    lat: -26.0024,
    lng: 28.0049,
    aboveAsking: true,
    askingPrice: 1_850_000,
  },
  {
    id: 4,
    address: "31 Silverleaf Drive",
    salePrice: 1_350_000,
    saleDate: "2025-10-30",
    daysOnMarket: 89,
    bedrooms: 3,
    bathrooms: 1,
    erfSize: 580,
    buildingSize: 155,
    pricePerSqm: 8_710,
    distanceFromProperty: 420,
    lat: -26.0062,
    lng: 28.0006,
    aboveAsking: false,
    askingPrice: 1_425_000,
  },
  {
    id: 5,
    address: "12 Acacia Close",
    salePrice: 1_750_000,
    saleDate: "2025-09-14",
    daysOnMarket: 35,
    bedrooms: 4,
    bathrooms: 2,
    erfSize: 780,
    buildingSize: 210,
    pricePerSqm: 8_333,
    distanceFromProperty: 290,
    lat: -26.0058,
    lng: 28.0076,
    aboveAsking: true,
    askingPrice: 1_700_000,
  },
  {
    id: 6,
    address: "7 Marula Street",
    salePrice: 1_280_000,
    saleDate: "2025-08-22",
    daysOnMarket: 112,
    bedrooms: 2,
    bathrooms: 1,
    erfSize: 520,
    buildingSize: 130,
    pricePerSqm: 9_846,
    distanceFromProperty: 510,
    lat: -26.0100,
    lng: 28.0052,
    aboveAsking: false,
    askingPrice: 1_380_000,
  },
];

export const activeListings = [
  {
    id: 1,
    address: "19 Jacaranda Crescent",
    askingPrice: 1_695_000,
    bedrooms: 3,
    bathrooms: 2,
    erfSize: 700,
    buildingSize: 190,
    daysListed: 14,
    agent: "Pam Golding Properties",
    lat: -26.0049,
    lng: 28.0062,
    pricePerSqm: 8_921,
    status: "New",
  },
  {
    id: 2,
    address: "3 Protea Avenue",
    askingPrice: 1_450_000,
    bedrooms: 3,
    bathrooms: 2,
    erfSize: 620,
    buildingSize: 165,
    daysListed: 45,
    agent: "Seeff Properties",
    lat: -26.0041,
    lng: 28.0035,
    pricePerSqm: 8_788,
    status: "Price Reduced",
  },
  {
    id: 3,
    address: "28 Bushwillow Lane",
    askingPrice: 2_100_000,
    bedrooms: 4,
    bathrooms: 3,
    erfSize: 920,
    buildingSize: 260,
    daysListed: 8,
    agent: "Lew Geffen Sotheby's",
    lat: -26.0030,
    lng: 28.0058,
    pricePerSqm: 8_077,
    status: "New",
  },
  {
    id: 4,
    address: "15 Silverleaf Drive",
    askingPrice: 1_550_000,
    bedrooms: 3,
    bathrooms: 2,
    erfSize: 660,
    buildingSize: 180,
    daysListed: 72,
    agent: "RE/MAX",
    lat: -26.0068,
    lng: 28.0040,
    pricePerSqm: 8_611,
    status: "Offer Pending",
  },
];

export const suburbStats = {
  medianPrice: 1_520_000,
  medianPriceChange: 6.8, // % year-on-year
  avgDaysOnMarket: 54,
  avgDaysOnMarketChange: -12, // days change YoY (negative = faster)
  totalSalesLast12Months: 47,
  totalSalesChange: 14, // % change YoY
  avgPricePerSqm: 8_540,
  pricePerSqmChange: 5.2, // %
  stockOnMarket: 23,
  absorptionRate: 2.1, // months of stock
  buyerDemandIndex: 7.8, // out of 10
  sellerConfidenceIndex: 6.5, // out of 10
};

export const areaInsights = [
  {
    icon: "trending-up",
    title: "Strong Buyer Demand",
    description: "Properties in Fourways are selling 12 days faster than last year. 3-bedroom homes are the most sought-after.",
  },
  {
    icon: "home",
    title: "Your Property Outperforms",
    description: "Your estimated value has grown 11.3% year-on-year, compared to the suburb median of 6.8%.",
  },
  {
    icon: "map-pin",
    title: "Semigration Hotspot",
    description: "27% of recent buyers in Fourways relocated from another province, up from 16% in 2019.",
  },
  {
    icon: "percent",
    title: "Rate Cut Tailwind",
    description: "The repo rate dropped from 8.25% to 6.75% since Sept 2024, boosting affordability and demand.",
  },
];

export function formatRand(value: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${meters}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}
