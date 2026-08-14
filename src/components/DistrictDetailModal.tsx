import React from 'react';
import { DistrictSummary, PropertyListing } from '../types';
import { X, MapPin, Building2, TrendingUp, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

interface DistrictDetailModalProps {
  district: DistrictSummary | null;
  listings: PropertyListing[];
  onClose: () => void;
  onSelectProperty: (property: PropertyListing) => void;
}

export const DistrictDetailModal: React.FC<DistrictDetailModalProps> = ({
  district,
  listings,
  onClose,
  onSelectProperty,
}) => {
  if (!district) return null;

  const districtListings = listings.filter((p) => p.districtCode === district.districtCode);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-slate-100 shadow-2xl space-y-6 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero District Header */}
        <div className="border-b border-slate-800 pb-5 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              District {district.districtCode < 10 ? `0${district.districtCode}` : district.districtCode} • {district.region} Region
            </span>
            <span className="px-2.5 py-1 text-xs font-bold bg-amber-500/20 text-amber-300 rounded-lg">
              Score: {district.attractivenessScore}/10
            </span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {district.districtName}
          </h2>
          <p className="text-xs text-slate-400">
            Planning Areas: {district.planningAreas.join(', ')}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Avg Condo PSF</span>
            <span className="text-white font-bold text-base">S${district.avgPriceSqftCondo.toLocaleString()}</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Avg Net Rental Yield</span>
            <span className="text-emerald-400 font-bold text-base">{district.avgRentalYield}%</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Seller Gain Ratio</span>
            <span className="text-amber-400 font-bold text-base">{district.sellerProfitablePercent}% Profitable</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">5-Yr Price Appreciation</span>
            <span className="text-cyan-400 font-bold text-base">+{district.fiveYearAppreciationPercent}%</span>
          </div>
        </div>

        {/* URA Development Plans */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
          <span className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> URA Master Plan & Transformation Growth Catalyst
          </span>
          <p className="text-slate-300 text-xs leading-relaxed">
            {district.futureDevelopmentPlans}
          </p>
        </div>

        {/* Properties in this District */}
        <div className="space-y-3">
          <h3 className="font-bold text-white text-sm">
            Featured Properties in District {district.districtCode} ({districtListings.length})
          </h3>

          {districtListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {districtListings.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onClose();
                    onSelectProperty(p);
                  }}
                  className="p-3 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between transition-all"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-white block">{p.propertyName}</span>
                    <span className="text-[10px] text-slate-400 block">{p.subType} • {p.bedrooms} Beds</span>
                    <span className="text-xs text-emerald-400 font-bold">
                      S${p.price.toLocaleString()} ({p.annualisedRentalYield}% Yield)
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No specific featured listings currently active in this district. Use the filter bar to browse all Singapore districts.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
