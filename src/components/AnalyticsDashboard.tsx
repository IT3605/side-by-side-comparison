import React, { useState } from 'react';
import { 
  ASSET_RETURNS_HISTORICAL, 
  GLOBAL_AFFORDABILITY_DATA, 
  LEASEHOLD_DECAY_BALA, 
  CONDO_VS_HDB_SPREAD 
} from '../data/macroAnalytics';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { TrendingUp, Globe, Clock, Layers, ShieldCheck, DollarSign, Award, Info } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'returns' | 'affordability' | 'decay' | 'spread'>('returns');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Macro Analytics & Comparative Asset Class Benchmarks
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deep property analytics drawing data from URA, MAS, and global financial market indices to evaluate long-term wealth preservation.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700/80 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('returns')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'returns'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Relative Asset Returns
          </button>
          <button
            onClick={() => setActiveTab('affordability')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'affordability'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Global Affordability
          </button>
          <button
            onClick={() => setActiveTab('decay')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'decay'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Leasehold Decay (Bala's Curve)
          </button>
          <button
            onClick={() => setActiveTab('spread')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'spread'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Condo vs HDB Price Spread
          </button>
        </div>
      </div>

      {/* 1. Relative Asset Returns Chart */}
      {activeTab === 'returns' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> 10-Year Cumulative Asset Performance (Indexed at 100 in 2015)
            </span>
            <span className="text-slate-400">Source: URA, Monetary Authority of Singapore, Bloomberg</span>
          </div>

          <div className="h-[380px] w-full bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ASSET_RETURNS_HISTORICAL}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[90, 'dataMax + 20']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="sgProperty" name="SG Residential Property" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="sp500" name="S&P 500 Index" stroke="#38bdf8" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sReits" name="Singapore REITs" stroke="#f59e0b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="stiIndex" name="STI Index (Equity)" stroke="#a855f7" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sgTBills" name="SG 6M T-Bills" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-semibold text-[11px]">SG Property 10Y CAGR</span>
              <span className="text-emerald-400 font-bold text-lg">+5.9% p.a.</span>
              <p className="text-[10px] text-slate-400 mt-1">
                Low volatility asset backed by physical land scarcity and mandatory CPF housing usage.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-semibold text-[11px]">S-REITs Dividend Yield</span>
              <span className="text-amber-400 font-bold text-lg">5.8% - 6.4% p.a.</span>
              <p className="text-[10px] text-slate-400 mt-1">
                High cashflow dividend yield but subject to global Fed interest rate cycle fluctuations.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-semibold text-[11px]">SG T-Bills Risk Free Rate</span>
              <span className="text-cyan-400 font-bold text-lg">~3.1% p.a.</span>
              <p className="text-[10px] text-slate-400 mt-1">
                MAS benchmark risk-free anchor rate for mortgage stress testing.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Global Affordability Chart */}
      {activeTab === 'affordability' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> Price-to-Income Multiples across World Financial Capital Cities
            </span>
            <span className="text-slate-400">Ratio = Median Property Price / Median Annual Household Income</span>
          </div>

          <div className="h-[380px] w-full bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GLOBAL_AFFORDABILITY_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="city" type="category" stroke="#94a3b8" width={130} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Bar dataKey="priceToIncomeMultiple" name="Price to Income Multiple (x)" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-slate-200">
            <h4 className="font-bold text-emerald-400 text-sm mb-1">Key Insight: Singapore Public vs Private Dual Tier Housing</h4>
            <p className="leading-relaxed">
              Singapore's public HDB housing remains exceptionally affordable at <strong>4.8x annual income</strong> due to HDB government subsidies, making Singapore one of the highest home-ownership nations in the world (89.3%). Private residential property sits at <strong>12.8x</strong>, aligned with international financial hubs like London (11.2x) and Sydney (13.8x).
            </p>
          </div>
        </div>
      )}

      {/* 3. Leasehold Decay Curve (Bala's Table) */}
      {activeTab === 'decay' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Bala's Table: 99-Year Leasehold vs Freehold Value Retention Curve
            </span>
            <span className="text-slate-400">Official SLA Table of Leasehold Value Percentage</span>
          </div>

          <div className="h-[380px] w-full bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LEASEHOLD_DECAY_BALA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="ageYears" stroke="#94a3b8" label={{ value: 'Property Age (Years)', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Legend />
                <Area type="monotone" dataKey="freeholdValuePercent" name="Freehold Value Retention" stroke="#38bdf8" fill="#0284c7" fillOpacity={0.1} />
                <Area type="monotone" dataKey="leaseholdValuePercent" name="99-Yr Leasehold Value (Bala's Curve)" stroke="#10b981" fill="#059669" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Info className="w-4 h-4" /> The "Cliff Effect" at 30-Year Age Mark
            </span>
            <p className="text-slate-300 leading-relaxed">
              In Singapore, 99-year leasehold properties retain over 84% of freehold value up to year 30. Between year 40 and 60, financing restrictions kick in (CPF usage capped if remaining lease does not cover buyer to age 95), resulting in accelerated depreciation. Freehold properties command a 15-20% valuation premium to safeguard generational wealth.
            </p>
          </div>
        </div>
      )}

      {/* 4. Condo vs HDB Price Spread */}
      {activeTab === 'spread' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Price Per Sqft Gap: Private Condo vs Public HDB Resale
            </span>
            <span className="text-slate-400">URA & HDB Resale Index Data</span>
          </div>

          <div className="h-[380px] w-full bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CONDO_VS_HDB_SPREAD}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Legend />
                <Line type="monotone" dataKey="condoPsf" name="Private Condo PSF ($)" stroke="#10b981" strokeWidth={3} />
                <Line type="monotone" dataKey="hdbPsf" name="HDB Resale PSF ($)" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

    </div>
  );
};
