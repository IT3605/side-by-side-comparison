import React from 'react';
import { PropertyListing } from '../types';
import { CommentCount } from 'disqus-react';
import { DisqusErrorBoundary } from './DisqusErrorBoundary';
import { Tooltip } from './Tooltip';
import { 
  Building2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  TrendingUp, 
  ArrowDownRight, 
  ArrowUpRight, 
  Sparkles, 
  GraduationCap, 
  Award, 
  DollarSign,
  Clock,
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';

interface PropertyCardProps {
  property: PropertyListing;
  onSelectProperty: (property: PropertyListing) => void;
  onOpenAiForProperty: (property: PropertyListing) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  onOpenAiForProperty
}) => {
  const isSale = property.intent === 'sale';

  const disqusConfig = {
    url: typeof window !== 'undefined' ? `${window.location.origin}/property/${property.id}` : `https://example.com/property/${property.id}`,
    identifier: property.id,
    title: property.title,
  };

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-2xl overflow-hidden text-slate-100 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col group">
      
      {/* Image & Top Badges Header */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          
          {/* Property SubType & Region */}
          <span className="px-2.5 py-1 text-[11px] font-bold bg-slate-900/90 backdrop-blur text-emerald-400 border border-emerald-500/30 rounded-lg shadow">
            {property.subType} • {property.region}
          </span>

          {/* Undervalued Tag */}
          {property.valuationStatus === 'undervalued' && (
            <Tooltip
              title="Undervaluation Margin"
              badge="URA AVM Comps"
              content={`Listed at ${Math.abs(property.valuationDiffPercent)}% below estimated district market fair value (S$${property.fairValueEstimate.toLocaleString()}).`}
              benchmark="Provides capital downside protection and higher rental yield spread."
            >
              <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-500 text-slate-950 rounded-lg shadow flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {Math.abs(property.valuationDiffPercent)}% Undervalued
              </span>
            </Tooltip>
          )}

          {/* Price Change Notification Badge */}
          {property.priceChangeDirection === 'down' && property.priceChangeAmount && (
            <Tooltip
              title="Recent Price Cut"
              badge="Motivated Seller"
              content={`Asking price reduced by S$${property.priceChangeAmount.toLocaleString()} (${Math.abs(property.priceChangePercent || 0)}%) from previous listing price.`}
            >
              <span className="px-2.5 py-1 text-[11px] font-bold bg-rose-500 text-white rounded-lg shadow flex items-center gap-1 animate-pulse">
                <ArrowDownRight className="w-3.5 h-3.5" />
                Price Drop S${property.priceChangeAmount.toLocaleString()}
              </span>
            </Tooltip>
          )}
        </div>

        {/* Tenure & MRT Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs z-10">
          <div className="flex items-center gap-1.5 text-slate-200 font-medium bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-lg border border-slate-700/60">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[180px]">{property.mrtStation} ({property.mrtWalkMinutes}m walk)</span>
          </div>

          <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-slate-800/90 text-slate-300 border border-slate-700 rounded">
            {property.tenure}
          </span>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Price & PSF */}
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-2xl font-black text-white tracking-tight">
                {isSale ? `S$${property.price.toLocaleString()}` : `S$${property.price.toLocaleString()}/mo`}
              </span>
              <span className="text-xs text-slate-400 block font-normal">
                {isSale ? `S$${property.pricePerSqft}/sqft` : `S$${property.pricePerSqft}/sqft/mo rent`}
              </span>
            </div>

            {/* Rental Yield Badge */}
            <Tooltip
              title="Annualised Net Rental Yield"
              badge="Income Metric"
              content={`Net annual rental return after deducting estimated MCST and property tax outgoings. Generates ~S$${property.monthlyEstimatedRent.toLocaleString()}/month in rental income.`}
              formula="[(Monthly Rent × 12) - Operating Costs] ÷ Price × 100%"
              benchmark="Singapore condo average: 3.2% - 4.2%"
              position="left"
            >
              <div className="text-right bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
                <span className="text-emerald-400 font-bold text-xs block">
                  {property.annualisedRentalYield}% Net Yield
                </span>
                <span className="text-[10px] text-slate-400 block">
                  ~S${property.monthlyEstimatedRent.toLocaleString()}/mo
                </span>
              </div>
            </Tooltip>
          </div>

          {/* Title & Address */}
          <div>
            <h3 
              onClick={() => onSelectProperty(property)}
              className="font-bold text-base text-slate-100 hover:text-emerald-400 cursor-pointer transition-colors line-clamp-1"
            >
              {property.title}
            </h3>
            <p className="text-xs text-slate-400 truncate">
              {property.address}
            </p>
          </div>

          {/* Specs Bar (Beds, Baths, Sqft, Age) */}
          <div className="grid grid-cols-4 gap-2 pt-2 text-xs border-t border-slate-800 text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.floorAreaSqft} sqft</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.builtYear}</span>
            </div>
          </div>
        </div>

        {/* Primary School & Financial Spread Callout */}
        <div className="space-y-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs">
          
          {/* Mortgage vs Rent Cashflow Coverage */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Mortgage Cashflow Coverage:
            </span>
            <span className={`font-bold ${property.mortgageVsRentRatio >= 1.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              Rent covers {(property.mortgageVsRentRatio * 100).toFixed(0)}%
            </span>
          </div>

          {/* School Proximity If Any */}
          {property.nearbyPrimarySchools.length > 0 && (
            <div className="flex items-center gap-1.5 text-slate-300 text-[11px] pt-1 border-t border-slate-800">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate font-medium">
                {property.nearbyPrimarySchools[0].distanceKm}km to {property.nearbyPrimarySchools[0].name}
              </span>
            </div>
          )}

          {/* Disqus Comment Count */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
            <span className="flex items-center gap-1 text-slate-400">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              Disqus Community:
            </span>
            <span className="text-slate-300 font-semibold">
              <DisqusErrorBoundary shortname="class-work" fallbackText="Comments">
                <CommentCount shortname="class-work" config={disqusConfig}>
                  0 Comments
                </CommentCount>
              </DisqusErrorBoundary>
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all border border-slate-700/80"
          >
            Inspect Valuations
          </button>

          <button
            onClick={() => onOpenAiForProperty(property)}
            className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:brightness-110 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            title="AI Investment Evaluation"
          >
            <Sparkles className="w-3.5 h-3.5" fill="#020617" />
            AI Audit
          </button>
        </div>

      </div>

    </div>
  );
};
