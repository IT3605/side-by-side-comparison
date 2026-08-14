import React from 'react';
import { FilterState, PropertyType, ValuationStatus, RegionType } from '../types';
import { SINGAPORE_DISTRICTS } from '../data/singaporeDistricts';
import { Filter, SlidersHorizontal, ArrowDownRight, Award, GraduationCap, DollarSign, RefreshCw, HelpCircle, Sparkles, Building2, TrendingUp, Info } from 'lucide-react';
import { Tooltip, InfoTooltip } from './Tooltip';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResultsCount: number;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  totalResultsCount,
  onResetFilters,
}) => {
  const togglePropertyType = (type: PropertyType) => {
    setFilters((prev) => {
      const exists = prev.propertyTypes.includes(type);
      const updated = exists
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type];
      return { ...prev, propertyTypes: updated };
    });
  };

  const toggleValuationStatus = (status: ValuationStatus) => {
    setFilters((prev) => {
      const exists = prev.valuationStatuses.includes(status);
      const updated = exists
        ? prev.valuationStatuses.filter((s) => s !== status)
        : [...prev.valuationStatuses, status];
      return { ...prev, valuationStatuses: updated };
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 shadow-lg space-y-4">
      
      {/* Top Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        
        {/* Left Title & Count */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                Property Investment Filters
                <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                  {totalResultsCount} Properties Found
                </span>
              </h3>
              <InfoTooltip
                title="Property Investment Screener"
                badge="Multi-Factor Engine"
                content={
                  <p>
                    Filter Singapore listings through institutional-grade valuation models, net annualised rental yields, MOE primary school priority radii, and MAS cashflow coverage.
                  </p>
                }
                benchmark="Live URA caveat medians and real-time market data."
              />
            </div>
            <p className="text-xs text-slate-400">
              Filter by undervaluation margin, net rental yields, school proximity, and MAS mortgage cashflow spread.
            </p>
          </div>
        </div>

        {/* Quick Presets / Reset */}
        <div className="flex items-center gap-2">
          <Tooltip
            title="Recent Asking Price Drops"
            badge="Price Cut"
            content="Filters for listings where sellers reduced their asking price within the last 30–60 days, signalling motivated sellers or negotiable terms."
            benchmark="Average discount: 2.5%–7.0% off initial launch asking price."
          >
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, priceDropOnly: !prev.priceDropOnly }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                filters.priceDropOnly
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white'
              }`}
            >
              <ArrowDownRight className="w-4 h-4 text-rose-400" />
              Recent Price Drops
            </button>
          </Tooltip>

          <Tooltip
            title="Top Sales & High Buyer Demand"
            badge="High Liquidity"
            content="Highlights properties situated in top-quartile transaction volume corridors with elevated buyer enquiry velocity and robust resale liquidity."
          >
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, popularOnly: !prev.popularOnly }))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
                filters.popularOnly
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              Top Sales / Popular
            </button>
          </Tooltip>

          <button
            onClick={onResetFilters}
            className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

      </div>

      {/* Main Filter Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        {/* 1. Property Type */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
              Property Type
            </label>
            <InfoTooltip
              title="Singapore Property Types"
              badge="Asset Classification"
              content={
                <div className="space-y-1">
                  <p><strong>HDB:</strong> Public flats regulated by HDB (5-yr MOP, ethnic quotas, citizenship criteria).</p>
                  <p><strong>Condo:</strong> Private residential with strata facilities; open to foreigners (subject to ABSD).</p>
                  <p><strong>Landed:</strong> Terraces, Semi-Detached & GCBs; restricted to Singapore Citizens under the RPA.</p>
                </div>
              }
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/70">
            {(['HDB', 'Condo', 'Landed'] as PropertyType[]).map((type) => {
              const isSelected = filters.propertyTypes.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => togglePropertyType(type)}
                  className={`flex-1 py-1.5 font-bold text-xs rounded-lg transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Valuation Status */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
              Valuation Status
            </label>
            <InfoTooltip
              title="Valuation Status"
              badge="URA AVM Model"
              content={
                <div className="space-y-1.5">
                  <p>
                    Compares asking price against comparable transacted caveats over the past 12 months for identical tenure and age brackets:
                  </p>
                  <ul className="list-disc pl-3.5 space-y-1 text-slate-300">
                    <li><strong className="text-emerald-300">Undervalued:</strong> Asking price is ≥5% lower than the district median transaction PSF.</li>
                    <li><strong className="text-cyan-300">Fair Value:</strong> Asking price is within ±5% of recent fair market comps.</li>
                  </ul>
                </div>
              }
              formula="[(Asking Price PSF - 12M District Median PSF) ÷ 12M District Median PSF] × 100%"
              benchmark="Undervalued units provide an immediate safety buffer against market corrections."
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/70">
            <button
              onClick={() => toggleValuationStatus('undervalued')}
              className={`flex-1 py-1.5 font-bold text-xs rounded-lg transition-all ${
                filters.valuationStatuses.includes('undervalued')
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Undervalued
            </button>
            <button
              onClick={() => toggleValuationStatus('fair')}
              className={`flex-1 py-1.5 font-bold text-xs rounded-lg transition-all ${
                filters.valuationStatuses.includes('fair')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fair Value
            </button>
          </div>
        </div>

        {/* 3. District & Region */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
              Singapore District / Zone
            </label>
            <InfoTooltip
              title="Singapore Market Segments"
              badge="CCR / RCR / OCR"
              content={
                <div className="space-y-1">
                  <p><strong className="text-amber-400">CCR (Core Central Region):</strong> Prime districts D09, D10, D11, Downtown Core & Sentosa Cove.</p>
                  <p><strong className="text-cyan-400">RCR (Rest of Central Region):</strong> City-fringe districts (D03 Queenstown, D12, D14, D15 East Coast).</p>
                  <p><strong className="text-emerald-400">OCR (Outside Central Region):</strong> Suburban heartlands (D19 Hougang/Punggol, D22 Jurong, D27).</p>
                </div>
              }
            />
          </div>
          <select
            value={filters.districtCode}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                districtCode: e.target.value === 'ALL' ? 'ALL' : Number(e.target.value),
              }))
            }
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="ALL">All 28 Districts (CCR / RCR / OCR)</option>
            {SINGAPORE_DISTRICTS.map((d) => (
              <option key={d.districtCode} value={d.districtCode}>
                District {d.districtCode < 10 ? `0${d.districtCode}` : d.districtCode} - {d.districtName.split('-')[1]} ({d.region})
              </option>
            ))}
          </select>
        </div>

        {/* 4. Min Rental Yield Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <div className="flex items-center gap-1">
              <label className="text-slate-400 font-semibold uppercase tracking-wider">
                Min Net Rental Yield
              </label>
              <InfoTooltip
                title="Annualised Net Rental Yield"
                badge="Core Income Metric"
                content={
                  <p>
                    The annual return generated by rental income after deducting all operational outgoings (MCST maintenance fees, property taxes, insurance, and vacancy reserve), expressed as a percentage of the total property acquisition cost.
                  </p>
                }
                formula="[(Gross Monthly Rent × 12) - Annual Operating Costs] ÷ Purchase Price × 100%"
                benchmark="HDB: 4.5%–5.5% | OCR Condos: 3.8%–4.5% | RCR: 3.3%–3.8% | CCR: 2.5%–3.2%"
              />
            </div>
            <span className="text-emerald-400 font-bold">{filters.minYield}%+ Yield</span>
          </div>
          <input
            type="range"
            min="0"
            max="6"
            step="0.5"
            value={filters.minYield}
            onChange={(e) => setFilters((prev) => ({ ...prev, minYield: Number(e.target.value) }))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

      </div>

      {/* Secondary Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2 border-t border-slate-800/60">
        
        {/* School Proximity */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> Primary School Proximity
            </label>
            <InfoTooltip
              title="MOE 1km/2km Home-School Distance"
              badge="Phase 2C Priority"
              content={
                <p>
                  Under Ministry of Education (MOE) Primary One registration rules, Singapore Citizen and PR applicants living within 1km receive first priority during oversubscribed ballot stages, creating a durable 5%–15% resale valuation premium.
                </p>
              }
              benchmark="Properties within 1km of top schools enjoy higher tenant retention and defensible capital values."
            />
          </div>
          <select
            value={filters.schoolProximity}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                schoolProximity: e.target.value as any,
              }))
            }
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="ALL">Any Distance</option>
            <option value="1km">Within 1km of Top Primary School</option>
            <option value="2km">Within 2km of Top Primary School</option>
          </select>
        </div>

        {/* Tenure */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
              Land Tenure
            </label>
            <InfoTooltip
              title="Land Tenure & Bala's Curve"
              badge="Leasehold Depreciation"
              content={
                <div className="space-y-1">
                  <p><strong>Freehold / 999-Year:</strong> Perpetual land title without lease expiration decay.</p>
                  <p><strong>99-Year Leasehold:</strong> Subject to SLA lease decay table (Bala's curve), where valuation drops faster once age exceeds 35–40 years.</p>
                </div>
              }
              benchmark="Freehold commands a 15%–25% price premium over 99-year leasehold peers in comparable districts."
            />
          </div>
          <select
            value={filters.tenure}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                tenure: e.target.value as any,
              }))
            }
            className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <option value="ALL">All Tenures (Freehold & Leasehold)</option>
            <option value="Freehold">Freehold Only</option>
            <option value="99-Year Leasehold">99-Year Leasehold</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-semibold block text-[11px] uppercase tracking-wider">
              Bedrooms
            </label>
            <InfoTooltip
              title="Unit Layout & Tenant Demand"
              badge="Yield vs Capital"
              content={
                <p>
                  1–2 Bedders generally yield higher percentage rental returns from singles and expats, while 3–5 Bedders offer lower vacancy volatility and higher capital stability from family owner-occupiers.
                </p>
              }
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/70">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, bedrooms: 'ALL' }))}
              className={`flex-1 py-1 text-xs rounded ${filters.bedrooms === 'ALL' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'}`}
            >
              Any
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setFilters((prev) => ({ ...prev, bedrooms: num }))}
                className={`flex-1 py-1 text-xs rounded ${filters.bedrooms === num ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'}`}
              >
                {num}{num === 5 ? '+' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Max Price Filter */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <div className="flex items-center gap-1">
              <label className="text-slate-400 font-semibold uppercase tracking-wider">
                Max Price / Rent
              </label>
              <InfoTooltip
                title="Budget & MAS Financing"
                badge="TDSR & LTV Caps"
                content={
                  <p>
                    Set maximum purchase or monthly rental budget. Ensure purchase scenarios comply with Monetary Authority of Singapore (MAS) rules: Total Debt Servicing Ratio (TDSR ≤ 55%) and maximum Loan-to-Value (LTV ≤ 75%).
                  </p>
                }
              />
            </div>
            <span className="text-emerald-400 font-bold">
              {filters.intent === 'sale'
                ? `S$${(filters.maxPrice / 1000000).toFixed(1)}M`
                : `S$${filters.maxPrice.toLocaleString()}/mo`}
            </span>
          </div>
          <input
            type="range"
            min={filters.intent === 'sale' ? 500000 : 2000}
            max={filters.intent === 'sale' ? 10000000 : 20000}
            step={filters.intent === 'sale' ? 250000 : 500}
            value={filters.maxPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

      </div>

    </div>
  );
};

