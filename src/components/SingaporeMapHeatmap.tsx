import React, { useState } from 'react';
import { SINGAPORE_DISTRICTS } from '../data/singaporeDistricts';
import { DistrictSummary } from '../types';
import { MapPin, TrendingUp, DollarSign, Layers, Info, Sparkles, ChevronRight, Award } from 'lucide-react';

interface SingaporeMapHeatmapProps {
  districts?: DistrictSummary[];
  listings?: any[];
  selectedDistrictId?: string | number | null;
  onSelectDistrict: (district: DistrictSummary) => void;
}

type HeatmapMetric = 'rentalYield' | 'appreciation' | 'attractiveness' | 'sellerProfit';

export const SingaporeMapHeatmap: React.FC<SingaporeMapHeatmapProps> = ({
  districts = SINGAPORE_DISTRICTS,
  selectedDistrictId,
  onSelectDistrict
}) => {
  const [activeMetric, setActiveMetric] = useState<HeatmapMetric>('rentalYield');
  const [hoveredDistrict, setHoveredDistrict] = useState<DistrictSummary | null>(null);

  const getHeatmapColor = (d: DistrictSummary) => {
    switch (activeMetric) {
      case 'rentalYield':
        if (d.avgRentalYield >= 4.5) return { fill: '#10b981', stroke: '#6ee7b7' };
        if (d.avgRentalYield >= 4.0) return { fill: '#0d9488', stroke: '#5eead4' };
        if (d.avgRentalYield >= 3.6) return { fill: '#0e7490', stroke: '#67e8f9' };
        return { fill: '#312e81', stroke: '#818cf8' };

      case 'appreciation':
        if (d.fiveYearAppreciationPercent >= 24) return { fill: '#10b981', stroke: '#6ee7b7' };
        if (d.fiveYearAppreciationPercent >= 20) return { fill: '#0d9488', stroke: '#5eead4' };
        if (d.fiveYearAppreciationPercent >= 15) return { fill: '#0e7490', stroke: '#67e8f9' };
        return { fill: '#312e81', stroke: '#818cf8' };

      case 'attractiveness':
        if (d.attractivenessScore >= 9.2) return { fill: '#10b981', stroke: '#6ee7b7' };
        if (d.attractivenessScore >= 8.8) return { fill: '#0d9488', stroke: '#5eead4' };
        if (d.attractivenessScore >= 8.3) return { fill: '#0e7490', stroke: '#67e8f9' };
        return { fill: '#334155', stroke: '#94a3b8' };

      case 'sellerProfit':
        if (d.sellerProfitablePercent >= 95) return { fill: '#10b981', stroke: '#6ee7b7' };
        if (d.sellerProfitablePercent >= 90) return { fill: '#0d9488', stroke: '#5eead4' };
        if (d.sellerProfitablePercent >= 85) return { fill: '#0e7490', stroke: '#67e8f9' };
        return { fill: '#881337', stroke: '#fb7185' };

      default:
        return { fill: '#059669', stroke: '#6ee7b7' };
    }
  };

  const topDistricts = [...districts].sort((a, b) => b.attractivenessScore - a.attractivenessScore).slice(0, 3);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-6">
      
      {/* Header & Metric Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Singapore District Heatmap & Investment Intelligence
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interactive district spatial overlay across CCR, RCR, and OCR regions. Click any district to inspect pricing trends.
          </p>
        </div>

        {/* Heatmap Layer Selector */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700/80 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveMetric('rentalYield')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activeMetric === 'rentalYield'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Rental Yield %
          </button>
          <button
            onClick={() => setActiveMetric('appreciation')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activeMetric === 'appreciation'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            5-Yr Appreciation %
          </button>
          <button
            onClick={() => setActiveMetric('attractiveness')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activeMetric === 'attractiveness'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Attractiveness Rating
          </button>
          <button
            onClick={() => setActiveMetric('sellerProfit')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activeMetric === 'sellerProfit'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Seller Profitability
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 relative min-h-[420px] flex flex-col justify-between overflow-hidden shadow-inner">
          
          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Layer:</span>
            <span className="text-emerald-400 font-bold capitalize">
              {activeMetric.replace(/([A-Z])/g, ' $1')}
            </span>
          </div>

          <div className="w-full h-full flex items-center justify-center pt-8">
            <svg viewBox="0 0 900 500" className="w-full h-[380px] max-w-full drop-shadow-2xl">
              <path
                d="M 120,280 Q 150,180 280,120 Q 420,90 620,130 Q 780,180 840,240 Q 820,320 720,360 Q 600,420 480,430 Q 380,440 260,400 Q 160,370 120,280 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="3"
              />

              {districts.map((district) => {
                const coords = district.mapSvgPathCoordinates || { cx: 450, cy: 250, r: 24 };
                const isHovered = hoveredDistrict?.districtCode === district.districtCode;
                const isSelected = selectedDistrictId === district.districtCode;
                const heatColor = getHeatmapColor(district);

                return (
                  <g
                    key={district.districtCode}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    onClick={() => onSelectDistrict(district)}
                  >
                    {district.attractivenessScore >= 9.0 && (
                      <circle
                        cx={coords.cx}
                        cy={coords.cy}
                        r={coords.r + 8}
                        fill="#10b981"
                        fillOpacity={0.15}
                        className="animate-ping"
                      />
                    )}

                    <circle
                      cx={coords.cx}
                      cy={coords.cy}
                      r={isHovered || isSelected ? coords.r + 6 : coords.r}
                      fill={heatColor.fill}
                      stroke={isSelected ? '#ffffff' : heatColor.stroke}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-300 opacity-90"
                    />

                    <text
                      x={coords.cx}
                      y={coords.cy + 4}
                      textAnchor="middle"
                      fill="#020617"
                      className="font-extrabold text-[12px] pointer-events-none select-none drop-shadow"
                    >
                      D{district.districtCode < 10 ? `0${district.districtCode}` : district.districtCode}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl mt-2">
            <span className="font-semibold text-slate-300">Heatmap Intensity:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-indigo-900 border border-indigo-400" /> Lower
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-cyan-700 border border-cyan-300" /> Moderate
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-teal-600 border border-teal-300" /> High
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-300" /> Top Tier
              </span>
            </div>
          </div>

        </div>

        {/* Hover/Selected District Intelligence Panel */}
        <div className="lg:col-span-4 space-y-4">
          {hoveredDistrict ? (
            <div className="bg-slate-800/90 border border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-xl transition-all">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                    District {hoveredDistrict.districtCode} • {hoveredDistrict.region}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {hoveredDistrict.districtName}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-400">
                    {hoveredDistrict.attractivenessScore}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/10 Rating</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/70">
                  <span className="text-slate-400 block text-[10px]">Avg Condo PSF</span>
                  <span className="text-white font-bold text-sm">S${hoveredDistrict.avgPriceSqftCondo.toLocaleString()}</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/70">
                  <span className="text-slate-400 block text-[10px]">Avg Rental Yield</span>
                  <span className="text-emerald-400 font-bold text-sm">{hoveredDistrict.avgRentalYield}%</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/70">
                  <span className="text-slate-400 block text-[10px]">5-Yr Capital Gain</span>
                  <span className="text-amber-400 font-bold text-sm">+{hoveredDistrict.fiveYearAppreciationPercent}%</span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/70">
                  <span className="text-slate-400 block text-[10px]">Seller Profit Rate</span>
                  <span className="text-cyan-400 font-bold text-sm">{hoveredDistrict.sellerProfitablePercent}%</span>
                </div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700/80 text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Future Development Catalyst
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {hoveredDistrict.futureDevelopmentPlans}
                </p>
              </div>

              <button
                onClick={() => onSelectDistrict(hoveredDistrict)}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                View District Properties & Listings <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 text-xs text-slate-400 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-slate-700 pb-2">
                <Info className="w-4 h-4" /> Hover Over District Nodes
              </div>
              <p>
                Hover over any district node on the Singapore map canvas to reveal average price per sqft, net rental yields, 5-year capital appreciation, and seller profit rates.
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" /> Top Attractiveness Ratings
                </span>
                {topDistricts.map((d) => (
                  <div
                    key={d.districtCode}
                    onClick={() => onSelectDistrict(d)}
                    className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-700/60 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <span className="font-bold text-slate-200 block">D{d.districtCode < 10 ? `0${d.districtCode}` : d.districtCode} - {d.districtName.split('-')[1] || d.districtName}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">{d.avgRentalYield}% Yield • S${d.avgPriceSqftCondo}/psf</span>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 font-bold text-xs rounded-lg">
                      {d.attractivenessScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
