import React from 'react';
import { 
  Building2, 
  Map, 
  TrendingUp, 
  Sparkles, 
  Lightbulb, 
  Search, 
  SlidersHorizontal,
  ArrowUpDown,
  Home,
  Bookmark
} from 'lucide-react';
import { ListingIntent } from '../types';

interface HeaderProps {
  activeTab: 'listings' | 'map' | 'analytics' | 'feedback' | 'comparison';
  setActiveTab: (tab: 'listings' | 'map' | 'analytics' | 'feedback' | 'comparison') => void;
  intent: ListingIntent;
  setIntent: (intent: ListingIntent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAiCopilot: () => void;
  onOpenFeedback: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  intent,
  setIntent,
  searchQuery,
  setSearchQuery,
  onOpenAiCopilot,
  onOpenFeedback,
  savedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('listings')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Building2 className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white font-sans">
                  SG <span className="text-emerald-400">PropAnalytics</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                  URA & MAS Data
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Singapore Property Investment & District Intelligence
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search D09, Orchard, Katong, MRT, or property name..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-800/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Rent or Sale Toggle */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/70 shrink-0">
            <button
              onClick={() => setIntent('sale')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                intent === 'sale'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              For Sale
            </button>
            <button
              onClick={() => setIntent('rent')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                intent === 'rent'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              For Rent
            </button>
          </div>

          {/* AI Advisor & Feedback Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAiCopilot}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 hover:brightness-110 rounded-xl shadow-lg shadow-emerald-500/10 transition-all font-medium active:scale-95"
            >
              <Sparkles className="w-4 h-4" fill="#020617" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            <button
              onClick={onOpenFeedback}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-xl transition-all"
              title="Feature Voting & Ideas"
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">Feedback</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-slate-800/80 py-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Version Comparison (Original vs Improved)
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'listings'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Property Listings & Bargains
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Map className="w-4 h-4" />
            Singapore Heatmap Dashboard
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Macro Analytics & Asset Benchmarks
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'feedback'
                ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Community Feature Voting
          </button>
        </div>

      </div>
    </header>
  );
};
