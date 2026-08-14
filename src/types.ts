export type PropertyType = 'HDB' | 'Condo' | 'Landed';
export type SubType = 'HDB 3-Room' | 'HDB 4-Room' | 'HDB 5-Room' | 'HDB Executive' | 'Condo Luxury' | 'Condo Mid-Tier' | 'Condo Mass Market' | 'Terrace' | 'Semi-Detached' | 'Bungalow / GCB';
export type ListingIntent = 'sale' | 'rent';
export type ValuationStatus = 'undervalued' | 'fair' | 'overvalued';
export type RegionType = 'CCR' | 'RCR' | 'OCR'; // Core Central, Rest of Central, Outside Central

export interface PrimarySchool {
  name: 'Nanyang Primary' | 'Raffles Girls\' Primary' | 'Tao Nan School' | 'Catholic High' | 'Anglo-Chinese School (Primary)' | 'Henry Park Primary' | 'St. Hilda\'s Primary' | 'Pei Hwa Presbyterian' | 'Nan Hua Primary';
  distanceKm: number;
}

export interface SellerTransactionRecord {
  holdingPeriodYears: number;
  boughtPrice: number;
  soldPrice: number;
  gainLossAmount: number;
  gainLossPercent: number;
  isProfitable: boolean;
}

export interface PropertyListing {
  id: string;
  title: string;
  propertyName: string;
  address: string;
  districtCode: number; // 1 to 28
  districtName: string;
  region: RegionType;
  propertyType: PropertyType;
  subType: SubType;
  intent: ListingIntent;
  price: number; // Sale price in SGD or monthly rent in SGD
  pricePerSqft: number;
  floorAreaSqft: number;
  bedrooms: number;
  bathrooms: number;
  tenure: 'Freehold' | '999-Year' | '99-Year Leasehold';
  builtYear: number;
  remainingLeaseYears?: number;
  
  // Valuation & Financial Metrics
  fairValueEstimate: number;
  valuationStatus: ValuationStatus;
  valuationDiffPercent: number; // e.g. -7.5 for 7.5% undervalued
  annualisedRentalYield: number; // e.g. 4.2%
  monthlyEstimatedRent: number;
  monthlyMortgageEstimate: number; // based on 75% LTV, 3.2% interest, 25yr
  mortgageVsRentRatio: number; // rent / mortgage ratio
  
  // Highlighting & Notifications
  isPopularLocation: boolean;
  isTopSales: boolean;
  priceChangeDirection?: 'up' | 'down';
  priceChangePercent?: number; // e.g. -3.5 or +2.1
  priceChangeAmount?: number;
  
  // Proximity & Amenities
  mrtStation: string;
  mrtWalkMinutes: number;
  nearbyPrimarySchools: PrimarySchool[];
  
  // Seller Historical Records
  sellerGainLossHistory: SellerTransactionRecord[];
  
  // Media & Info
  imageUrl: string;
  description: string;
  keyFeatures: string[];
}

export interface DistrictSummary {
  districtCode: number; // 1 to 28
  districtName: string; // e.g., "D09 - Orchard, Cairnhill, River Valley"
  planningAreas: string[];
  region: RegionType;
  avgPriceSqftCondo: number;
  avgPriceSqftHDB: number;
  avgRentalYield: number;
  sellerProfitablePercent: number; // e.g. 91%
  avgGainPercent: number;
  rentAboveMortgageRate: number; // e.g. +0.85%
  fiveYearAppreciationPercent: number;
  futureDevelopmentPlans: string;
  attractivenessScore: number; // 1 to 10
  mapSvgPathCoordinates?: { cx: number; cy: number; r: number };
}

export interface AssetReturnData {
  year: string;
  sgProperty: number;
  stiIndex: number;
  sp500: number;
  sgTBills: number;
  sg10YBond: number;
  sReits: number;
}

export interface GlobalAffordability {
  city: string;
  priceToIncomeMultiple: number; // Property price / median annual household income
  mortgageShareOfIncome: number; // % of income needed for mortgage
}

export interface LeaseholdDecayDataPoint {
  ageYears: number;
  leaseholdValuePercent: number; // Bala's Curve % of freehold value
  freeholdValuePercent: number; // 100% baseline
}

export interface CondoVsHdbSpreadPoint {
  year: string;
  condoPsf: number;
  hdbPsf: number;
  gapPercent: number;
}

export interface FeatureVoteItem {
  id: string;
  title: string;
  description: string;
  category: string;
  votes: number;
  hasVoted?: boolean;
}

export interface AiAnalysisRequest {
  propertyId?: string;
  budgetSGD?: number;
  targetDistrict?: number;
  propertyType?: PropertyType;
  holdingHorizonYears?: number;
  userQuery?: string;
}

export interface FilterState {
  searchQuery: string;
  intent: ListingIntent;
  propertyTypes: PropertyType[];
  valuationStatuses: ValuationStatus[];
  region: 'ALL' | RegionType;
  districtCode: number | 'ALL';
  minYield: number;
  maxPrice: number;
  bedrooms: number | 'ALL';
  bathrooms: number | 'ALL';
  tenure: 'ALL' | 'Freehold' | '99-Year Leasehold';
  schoolProximity: 'ALL' | '1km' | '2km';
  popularOnly: boolean;
  priceDropOnly: boolean;
}
