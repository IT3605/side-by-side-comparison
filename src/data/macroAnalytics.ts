import { AssetReturnData, GlobalAffordability, LeaseholdDecayDataPoint, CondoVsHdbSpreadPoint, FeatureVoteItem } from '../types';

export const ASSET_RETURNS_HISTORICAL: AssetReturnData[] = [
  { year: "2015", sgProperty: 100, stiIndex: 100, sp500: 100, sgTBills: 100, sg10YBond: 100, sReits: 100 },
  { year: "2016", sgProperty: 102.4, stiIndex: 101.2, sp500: 111.9, sgTBills: 101.4, sg10YBond: 102.1, sReits: 105.2 },
  { year: "2017", sgProperty: 108.1, stiIndex: 119.5, sp500: 136.4, sgTBills: 102.8, sg10YBond: 104.5, sReits: 118.4 },
  { year: "2018", sgProperty: 116.6, stiIndex: 108.2, sp500: 130.4, sgTBills: 104.5, sg10YBond: 107.0, sReits: 114.1 },
  { year: "2019", sgProperty: 120.2, stiIndex: 113.8, sp500: 171.5, sgTBills: 106.3, sg10YBond: 110.2, sReits: 132.8 },
  { year: "2020", sgProperty: 122.8, stiIndex: 104.6, sp500: 203.0, sgTBills: 107.8, sg10YBond: 114.5, sReits: 128.5 },
  { year: "2021", sgProperty: 135.8, stiIndex: 114.9, sp500: 261.2, sgTBills: 108.9, sg10YBond: 112.0, sReits: 136.2 },
  { year: "2022", sgProperty: 147.5, stiIndex: 119.8, sp500: 213.9, sgTBills: 112.5, sg10YBond: 106.8, sReits: 122.4 },
  { year: "2023", sgProperty: 157.6, stiIndex: 122.4, sp500: 265.8, sgTBills: 116.8, sg10YBond: 109.5, sReits: 126.8 },
  { year: "2024", sgProperty: 168.2, stiIndex: 131.5, sp500: 328.0, sgTBills: 121.2, sg10YBond: 112.8, sReits: 134.1 },
  { year: "2025", sgProperty: 178.9, stiIndex: 138.2, sp500: 362.5, sgTBills: 125.4, sg10YBond: 115.6, sReits: 141.0 },
];

export const GLOBAL_AFFORDABILITY_DATA: GlobalAffordability[] = [
  { city: "Hong Kong", priceToIncomeMultiple: 18.8, mortgageShareOfIncome: 74 },
  { city: "Sydney", priceToIncomeMultiple: 13.8, mortgageShareOfIncome: 58 },
  { city: "Vancouver", priceToIncomeMultiple: 12.3, mortgageShareOfIncome: 52 },
  { city: "London", priceToIncomeMultiple: 11.2, mortgageShareOfIncome: 48 },
  { city: "Singapore (Private)", priceToIncomeMultiple: 12.8, mortgageShareOfIncome: 41 },
  { city: "Singapore (HDB)", priceToIncomeMultiple: 4.8, mortgageShareOfIncome: 21 },
  { city: "Tokyo", priceToIncomeMultiple: 10.1, mortgageShareOfIncome: 38 },
  { city: "New York", priceToIncomeMultiple: 9.8, mortgageShareOfIncome: 39 },
  { city: "San Francisco", priceToIncomeMultiple: 9.2, mortgageShareOfIncome: 42 },
];

export const LEASEHOLD_DECAY_BALA: LeaseholdDecayDataPoint[] = [
  { ageYears: 0, leaseholdValuePercent: 100, freeholdValuePercent: 100 },
  { ageYears: 10, leaseholdValuePercent: 96.0, freeholdValuePercent: 100 },
  { ageYears: 20, leaseholdValuePercent: 91.0, freeholdValuePercent: 100 },
  { ageYears: 30, leaseholdValuePercent: 84.0, freeholdValuePercent: 100 },
  { ageYears: 40, leaseholdValuePercent: 74.0, freeholdValuePercent: 100 },
  { ageYears: 50, leaseholdValuePercent: 62.0, freeholdValuePercent: 100 },
  { ageYears: 60, leaseholdValuePercent: 48.0, freeholdValuePercent: 100 },
  { ageYears: 70, leaseholdValuePercent: 31.0, freeholdValuePercent: 100 },
  { ageYears: 80, leaseholdValuePercent: 15.0, freeholdValuePercent: 100 },
  { ageYears: 90, leaseholdValuePercent: 5.0, freeholdValuePercent: 100 },
  { ageYears: 99, leaseholdValuePercent: 0, freeholdValuePercent: 100 },
];

export const CONDO_VS_HDB_SPREAD: CondoVsHdbSpreadPoint[] = [
  { year: "2015", condoPsf: 1280, hdbPsf: 410, gapPercent: 212 },
  { year: "2017", condoPsf: 1390, hdbPsf: 425, gapPercent: 227 },
  { year: "2019", condoPsf: 1520, hdbPsf: 440, gapPercent: 245 },
  { year: "2021", condoPsf: 1740, hdbPsf: 510, gapPercent: 241 },
  { year: "2023", condoPsf: 1980, hdbPsf: 580, gapPercent: 241 },
  { year: "2025", condoPsf: 2150, hdbPsf: 640, gapPercent: 236 },
];

export const INITIAL_FEATURE_VOTES: FeatureVoteItem[] = [
  {
    id: "feat-1",
    title: "Heat map of most popular areas in Singapore",
    description: "Visual overlay showing real-time search volume, transaction velocity, and high-yield districts.",
    category: "Map & Analytics",
    votes: 142
  },
  {
    id: "feat-2",
    title: "Filter by undervalued / overvalued properties",
    description: "Automated valuation model comparing bank fair values against asking prices to find bargains.",
    category: "Filters & Valuation",
    votes: 128
  },
  {
    id: "feat-3",
    title: "Mortgage vs Rent Yield Spread Calculator",
    description: "Calculate monthly net cashflow after MAS interest rate stress-test and rental yield projection.",
    category: "Financial Metrics",
    votes: 115
  },
  {
    id: "feat-4",
    title: "Price drop notifications (up or down)",
    description: "Instant alert badges and email triggers when listings drop below target fair value thresholds.",
    category: "Notifications",
    votes: 98
  },
  {
    id: "feat-5",
    title: "Primary School 1km / 2km Radius Distance Checker",
    description: "Geospatial radius verification for primary school registration phases (GEP / Phase 2B/2C).",
    category: "Family & Education",
    votes: 89
  },
  {
    id: "feat-6",
    title: "URA Master Plan & Future Development Plan Overlay",
    description: "Track new MRT line completions, industrial hubs (JLD, PDD, GSW) and land sales forecasts.",
    category: "Urban Planning",
    votes: 104
  }
];
