import React, { useState } from 'react';
import { PropertyListing } from '../types';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { DisqusErrorBoundary } from './DisqusErrorBoundary';
import { 
  X, 
  Building2, 
  MapPin, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  GraduationCap, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  Layers,
  Home,
  MessageSquare
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: PropertyListing | null;
  onClose: () => void;
  onOpenAiAnalysis: (property: PropertyListing) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onOpenAiAnalysis
}) => {
  if (!property) return null;

  // Mortgage Calculator State
  const [interestRate, setInterestRate] = useState<number>(3.2);
  const [ltvPercent, setLtvPercent] = useState<number>(75);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(25);

  // Compute Loan Amount & Monthly Repayment
  const loanAmount = (property.price * ltvPercent) / 100;
  const downpayment = property.price - loanAmount;
  
  // Monthly interest rate calculation
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTenureYears * 12;
  const calculatedMortgage =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
      : loanAmount / totalPayments;

  const netMonthlyCashflow = property.monthlyEstimatedRent - calculatedMortgage;

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

        {/* Hero Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-800 pb-6">
          <div className="md:col-span-5 h-56 rounded-2xl overflow-hidden relative bg-slate-950">
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              <span className="px-2.5 py-1 text-xs font-bold bg-slate-900/90 text-emerald-400 rounded-lg border border-emerald-500/30">
                {property.subType}
              </span>
              {property.valuationStatus === 'undervalued' && (
                <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500 text-slate-950 rounded-lg">
                  {Math.abs(property.valuationDiffPercent)}% Undervalued
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-7 space-y-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                District {property.districtCode} • {property.districtName}
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {property.title}
              </h2>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {property.address}
              </p>
            </div>

            <div className="flex items-baseline gap-4 pt-2">
              <div>
                <span className="text-3xl font-black text-white">
                  S${property.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block font-normal">
                  S${property.pricePerSqft}/sqft • {property.floorAreaSqft} sqft
                </span>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-right">
                <span className="text-emerald-400 font-bold text-sm block">
                  {property.annualisedRentalYield}% Rental Yield
                </span>
                <span className="text-xs text-slate-400">
                  Fair Value: S${property.fairValueEstimate.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAiAnalysis(property)}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
              >
                <Sparkles className="w-4 h-4" fill="#020617" />
                Generate Deep Gemini AI Property Report
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Tenure</span>
            <span className="text-white font-bold">{property.tenure}</span>
            {property.remainingLeaseYears && (
              <span className="text-[10px] text-amber-400 block">{property.remainingLeaseYears} yrs remaining</span>
            )}
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Built / MOP Year</span>
            <span className="text-white font-bold">{property.builtYear}</span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">Bedrooms & Baths</span>
            <span className="text-white font-bold">{property.bedrooms} Beds / {property.bathrooms} Baths</span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">MRT Accessibility</span>
            <span className="text-emerald-400 font-bold">{property.mrtWalkMinutes}m Walk</span>
          </div>
        </div>

        {/* Interactive MAS Mortgage & Rental Cashflow Calculator */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Interactive MAS Mortgage & Rental Yield Calculator
            </div>
            <span className="text-xs text-slate-400">
              Stress test against bank interest rate movements
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            {/* Inputs Column */}
            <div className="space-y-3 md:col-span-2">
              
              {/* LTV Slider */}
              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Loan To Value (LTV):</span>
                  <span className="text-emerald-400 font-bold">{ltvPercent}% (Downpayment S${downpayment.toLocaleString()})</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="75"
                  step="5"
                  value={ltvPercent}
                  onChange={(e) => setLtvPercent(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Interest Rate:</span>
                  <span className="text-emerald-400 font-bold">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="1.8"
                  max="5.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Loan Tenure:</span>
                  <span className="text-emerald-400 font-bold">{loanTenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Results Box */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Est. Monthly Repayment
                </span>
                <span className="text-2xl font-black text-white">
                  S${Math.round(calculatedMortgage).toLocaleString()}/mo
                </span>
              </div>

              <div className="border-t border-slate-800 pt-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Est. Monthly Rental Income
                </span>
                <span className="text-lg font-bold text-emerald-400">
                  S${property.monthlyEstimatedRent.toLocaleString()}/mo
                </span>
              </div>

              <div className="border-t border-slate-800 pt-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Net Monthly Cashflow Spread
                </span>
                <span className={`text-base font-black ${netMonthlyCashflow >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {netMonthlyCashflow >= 0 ? '+' : ''}S${Math.round(netMonthlyCashflow).toLocaleString()}/mo
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Primary School & Seller Gain/Loss Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Primary School Distance Checker */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Primary School Radius Check (1km / 2km)
            </h4>
            {property.nearbyPrimarySchools.length > 0 ? (
              <div className="space-y-2">
                {property.nearbyPrimarySchools.map((sch, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="font-semibold text-slate-200">{sch.name}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 rounded">
                      {sch.distanceKm} km
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-xs">
                No top 10 primary schools located within 2km radius.
              </p>
            )}
          </div>

          {/* Seller Gain/Loss Transaction History */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Seller Historical Profit Records
            </h4>
            {property.sellerGainLossHistory.length > 0 ? (
              <div className="space-y-2">
                {property.sellerGainLossHistory.map((rec, i) => (
                  <div key={i} className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-300 font-semibold block">Held for {rec.holdingPeriodYears} Years</span>
                      <span className="text-[10px] text-slate-400">
                        Bought S${(rec.boughtPrice / 1000000).toFixed(2)}M → Sold S${(rec.soldPrice / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <span className="px-2 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-400 rounded">
                      +S${(rec.gainLossAmount / 1000).toFixed(0)}k (+{rec.gainLossPercent}%)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-xs">
                No recent resale historical transaction caveat records on file.
              </p>
            )}
          </div>

        </div>

        {/* Disqus Investor Discussion Section */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Property Investor Discussion & Comments
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg font-medium">
              <DisqusErrorBoundary shortname="class-work" fallbackText="Comments">
                <CommentCount
                  shortname="class-work"
                  config={{
                    url: typeof window !== 'undefined' ? `${window.location.origin}/property/${property.id}` : `https://example.com/property/${property.id}`,
                    identifier: property.id,
                    title: property.title,
                  }}
                >
                  Comments
                </CommentCount>
              </DisqusErrorBoundary>
            </span>
          </div>

          <div className="text-slate-100 min-h-[160px] bg-slate-900/50 p-3 rounded-xl border border-slate-800">
            <DisqusErrorBoundary shortname="class-work" fallbackText="Property discussion forum thread">
              <DiscussionEmbed
                shortname="class-work"
                config={{
                  url: typeof window !== 'undefined' ? `${window.location.origin}/property/${property.id}` : `https://example.com/property/${property.id}`,
                  identifier: property.id,
                  title: property.title,
                  language: 'en',
                }}
              />
            </DisqusErrorBoundary>
          </div>
        </div>

      </div>
    </div>
  );
};
