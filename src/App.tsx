import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SingaporeMapHeatmap } from './components/SingaporeMapHeatmap';
import { FilterBar } from './components/FilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AiInvestmentAdvisorModal } from './components/AiInvestmentAdvisorModal';
import { UserFeedbackModal } from './components/UserFeedbackModal';
import { DistrictDetailModal } from './components/DistrictDetailModal';
import { DisqusForum } from './components/DisqusForum';
import { ComparisonView } from './components/ComparisonView';

import { PROPERTY_LISTINGS } from './data/propertyListings';
import { SINGAPORE_DISTRICTS } from './data/singaporeDistricts';
import { FilterState, ListingIntent, PropertyListing, DistrictSummary } from './types';
import { Building2, Sparkles, SlidersHorizontal, Info, Award, ArrowDownRight, Layers, Lightbulb } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'listings' | 'map' | 'analytics' | 'feedback' | 'comparison'>('comparison');
  const [intent, setIntent] = useState<ListingIntent>('sale');
  const [searchQuery, setSearchQuery] = useState('');

  // Default Filter State
  const initialFilterState: FilterState = {
    searchQuery: '',
    intent: 'sale',
    propertyTypes: ['HDB', 'Condo', 'Landed'],
    valuationStatuses: ['undervalued', 'fair'],
    region: 'ALL',
    districtCode: 'ALL',
    minYield: 0,
    maxPrice: 10000000,
    bedrooms: 'ALL',
    bathrooms: 'ALL',
    tenure: 'ALL',
    schoolProximity: 'ALL',
    popularOnly: false,
    priceDropOnly: false,
  };

  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Modals
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictSummary | null>(null);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);
  const [aiPropertyTarget, setAiPropertyTarget] = useState<PropertyListing | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Reset Filters
  const handleResetFilters = () => {
    setFilters(initialFilterState);
    setSearchQuery('');
  };

  // Filter Logic
  const filteredListings = useMemo(() => {
    return PROPERTY_LISTINGS.filter((property) => {
      // Intent match (sale vs rent)
      if (property.intent !== intent) return false;

      // Property type filter
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.propertyType)) {
        return false;
      }

      // Valuation status filter
      if (filters.valuationStatuses.length > 0 && !filters.valuationStatuses.includes(property.valuationStatus)) {
        return false;
      }

      // District filter
      if (filters.districtCode !== 'ALL' && property.districtCode !== filters.districtCode) {
        return false;
      }

      // Min Yield
      if (property.annualisedRentalYield < filters.minYield) {
        return false;
      }

      // Max Price
      if (property.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'ALL' && property.bedrooms !== filters.bedrooms) {
        return false;
      }

      // Tenure
      if (filters.tenure !== 'ALL' && property.tenure !== filters.tenure) {
        return false;
      }

      // School Proximity
      if (filters.schoolProximity === '1km') {
        const hasUnder1km = property.nearbyPrimarySchools.some((s) => s.distanceKm <= 1.0);
        if (!hasUnder1km) return false;
      } else if (filters.schoolProximity === '2km') {
        const hasUnder2km = property.nearbyPrimarySchools.some((s) => s.distanceKm <= 2.0);
        if (!hasUnder2km) return false;
      }

      // Popular Locations
      if (filters.popularOnly && !property.isPopularLocation && !property.isTopSales) {
        return false;
      }

      // Price Drop Only
      if (filters.priceDropOnly && property.priceChangeDirection !== 'down') {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesAddress = property.address.toLowerCase().includes(query);
        const matchesName = property.propertyName.toLowerCase().includes(query);
        const matchesMrt = property.mrtStation.toLowerCase().includes(query);
        const matchesDistrict = property.districtName.toLowerCase().includes(query);
        const matchesSubtype = property.subType.toLowerCase().includes(query);

        if (!matchesTitle && !matchesAddress && !matchesName && !matchesMrt && !matchesDistrict && !matchesSubtype) {
          return false;
        }
      }

      return true;
    });
  }, [intent, filters, searchQuery]);

  const handleOpenAiForProperty = (property: PropertyListing) => {
    setAiPropertyTarget(property);
    setIsAiCopilotOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      
      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        intent={intent}
        setIntent={setIntent}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAiCopilot={() => {
          setAiPropertyTarget(null);
          setIsAiCopilotOpen(true);
        }}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        savedCount={0}
      />

      {/* Main Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Tab 0: Version Comparison Matrix */}
        {activeTab === 'comparison' && (
          <ComparisonView 
            onSelectVersion={(_) => setActiveTab('listings')} 
          />
        )}
        
        {/* Tab 1: Property Listings & Bargains */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            
            {/* Heatmap Banner Widget on Listings page */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  URA Caveat & Bank Valuation Engine
                </span>
                <h2 className="text-lg font-bold text-white">
                  Singapore Undervalued Property & Rental Yield Matrix
                </h2>
                <p className="text-xs text-slate-400 max-w-2xl">
                  Spot properties priced below bank fair values, inspect MAS mortgage interest rate cashflow coverage, and verify 1km radius to top-tier primary schools.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('map')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-xl border border-emerald-500/30 flex items-center gap-1.5 transition-all"
                >
                  <Layers className="w-4 h-4" />
                  View Singapore Heatmap
                </button>

                <button
                  onClick={() => {
                    setAiPropertyTarget(null);
                    setIsAiCopilotOpen(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg hover:brightness-110 transition-all"
                >
                  <Sparkles className="w-4 h-4" fill="#020617" />
                  AI Deal Audit
                </button>
              </div>
            </div>

            {/* Filter Controls Bar */}
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              totalResultsCount={filteredListings.length}
              onResetFilters={handleResetFilters}
            />

            {/* Property Cards Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onSelectProperty={(p) => setSelectedProperty(p)}
                    onOpenAiForProperty={handleOpenAiForProperty}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">No Matching Singapore Properties</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Try broadening your price limit, lowering minimum yield thresholds, or selecting additional property types.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Singapore Heatmap */}
        {activeTab === 'map' && (
          <SingaporeMapHeatmap
            onSelectDistrict={(district) => setSelectedDistrict(district)}
          />
        )}

        {/* Tab 3: Macro Analytics & Benchmarks */}
        {activeTab === 'analytics' && <AnalyticsDashboard />}

        {/* Tab 4: Community Feedback */}
        {activeTab === 'feedback' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Community Feature Voting & Ideas</h2>
                <p className="text-xs text-slate-400 mt-1">
                  View, vote, and submit feature priorities matching your property investment workflow.
                </p>
              </div>
              <button
                onClick={() => setIsFeedbackOpen(true)}
                className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow hover:bg-amber-400 transition-all"
              >
                <Lightbulb className="w-4 h-4" /> Propose Idea
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Click "Propose Idea" above to submit feedback or view upcoming feature priorities.
            </p>
          </div>
        )}

        {/* Bottom Page Disqus Forum Section */}
        <DisqusForum shortname="class-work" />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              SG
            </div>
            <span className="font-semibold text-slate-300">
              Singapore Property Investment Analytics Platform
            </span>
          </div>

          <p className="text-slate-500 text-[11px] text-center md:text-right">
            Data sourced from URA Caveats, MAS Interest Rate Benchmarks & Housing Development Board (HDB). For analytical & educational evaluation.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenAiAnalysis={(p) => {
          setSelectedProperty(null);
          handleOpenAiForProperty(p);
        }}
      />

      <DistrictDetailModal
        district={selectedDistrict}
        listings={PROPERTY_LISTINGS}
        onClose={() => setSelectedDistrict(null)}
        onSelectProperty={(p) => setSelectedProperty(p)}
      />

      <AiInvestmentAdvisorModal
        isOpen={isAiCopilotOpen}
        onClose={() => {
          setIsAiCopilotOpen(false);
          setAiPropertyTarget(null);
        }}
        selectedProperty={aiPropertyTarget}
      />

      <UserFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

    </div>
  );
}
