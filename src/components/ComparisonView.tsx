import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  Palette, 
  MessageSquare, 
  Zap, 
  ArrowRight,
  Split,
  Eye,
  Layers,
  Building2,
  AlertTriangle
} from 'lucide-react';

interface ComparisonViewProps {
  onSelectVersion: (version: 'original' | 'improved') => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ onSelectVersion }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bugs' | 'ui' | 'disqus'>('all');

  const comparisonItems = [
    {
      id: 'disqus-error',
      category: 'bugs',
      title: 'Disqus Cross-Origin Security Errors',
      original: {
        status: 'fail',
        badge: 'Uncaught Error',
        description: 'Uncaught SecurityError: Permission denied to access property "document" on cross-origin object inside iframe sandboxes.',
        detail: 'Crashes or outputs console errors when embedded inside cross-origin preview frames.'
      },
      improved: {
        status: 'pass',
        badge: 'Safeguarded & Handled',
        description: 'Global window security error interceptors + DisqusErrorBoundary component catching iframe script errors gracefully.',
        detail: 'Falls back gracefully to direct Disqus links without breaking app rendering.'
      }
    },
    {
      id: 'color-palette',
      category: 'ui',
      title: 'CSS Color Format Compatibility',
      original: {
        status: 'fail',
        badge: 'oklch Parsing Warnings',
        description: 'Used modern raw oklch() color definitions in Tailwind index.css which caused style parsing failures in strict browsers.',
        detail: 'Unrendered color variables or broken hex transparency fallbacks.'
      },
      improved: {
        status: 'pass',
        badge: 'Hex & Standard CSS',
        description: 'Converted color system to explicit hex (#0f172a, #10b981) and standard RGBA tailwind utilities.',
        detail: '100% browser compatibility and reliable dark-mode contrast.'
      }
    },
    {
      id: 'disqus-embed',
      category: 'disqus',
      title: 'Disqus Discussion Forum Integration',
      original: {
        status: 'warning',
        badge: 'Basic Script Tag',
        description: 'Script tag embedded directly with raw window.location url without fallback or boundary wrappers.',
        detail: 'Potential script loading block or frame permission violations.'
      },
      improved: {
        status: 'pass',
        badge: 'Disqus React + Boundary',
        description: 'Uses disqus-react DiscussionEmbed and CommentCount wrapped in error boundaries and live comment count badges.',
        detail: 'Real-time comment counters on listing cards and detail modals.'
      }
    },
    {
      id: 'heatmap-district',
      category: 'ui',
      title: 'Singapore Map & District Heatmap',
      original: {
        status: 'warning',
        badge: 'Static Overview',
        description: 'Basic SVG map with standard district markers and limited district property data linkage.',
        detail: 'Harder to analyze rental yields across CCR, RCR, and OCR regions.'
      },
      improved: {
        status: 'pass',
        badge: 'Interactive & Filterable',
        description: 'Interactive SVG district map highlighting price psf, rental yield heat levels, and popups with property filters.',
        detail: 'Direct drill-down into district summaries and listing cards.'
      }
    },
    {
      id: 'ai-copilot',
      category: 'ui',
      title: 'AI Real Estate Investment Advisor',
      original: {
        status: 'warning',
        badge: 'Generic Suggestions',
        description: 'Basic advice popup with static prompt templates.',
        detail: 'Limited financial analysis capabilities.'
      },
      improved: {
        status: 'pass',
        badge: 'Context-Aware Gemini Copilot',
        description: 'Property-specific yield calculator, mortgage stress testing, BSD/ABSD tax calculator, and URA price benchmarks.',
        detail: 'Custom valuation assessment (Undervalued / Fair / Premium).'
      }
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? comparisonItems 
    : comparisonItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
            <Split className="w-3.5 h-3.5" /> Side-by-Side Version Comparison Matrix
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Original App vs. Improved App (v2)
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Review the structural fixes, cross-origin security safeguards, CSS color standardization, and functional upgrades made between the initial release and the improved version.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectVersion('improved')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Launch Improved Version
            </button>
            <button
              onClick={() => onSelectVersion('original')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4 text-amber-400" /> View Original Version State
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        {[
          { id: 'all', label: 'All Comparisons' },
          { id: 'bugs', label: 'Bug & Security Fixes' },
          { id: 'disqus', label: 'Disqus Forum Embeds' },
          { id: 'ui', label: 'UI & Map Features' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === tab.id
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Side-by-Side Cards List */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                {item.title}
              </h3>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
                {item.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {/* Left Column: Original Version */}
              <div className="p-6 bg-slate-950/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">
                      Original Version
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    item.original.status === 'fail'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.original.status === 'fail' ? <XCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {item.original.badge}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                  {item.original.description}
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  Impact: {item.original.detail}
                </p>
              </div>

              {/* Right Column: Improved Version */}
              <div className="p-6 bg-emerald-950/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">
                      Improved Version (v2)
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {item.improved.badge}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-200 leading-relaxed">
                  {item.improved.description}
                </p>
                <p className="text-[11px] text-emerald-400/80 font-medium">
                  Result: {item.improved.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Interactive Split View Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Split className="w-5 h-5 text-emerald-400" /> Live Interactive Preview Switcher
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Test and experience the real application in either Original fallback or Improved enhanced mode.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => onSelectVersion('original')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-amber-400 hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Switch to Original
            </button>
            <button
              onClick={() => onSelectVersion('improved')}
              className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Switch to Improved
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Original Repository
            </h4>
            <p className="text-slate-400">
              `IT3605/13082026-property` - Contains the base application release.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Improved Repository
            </h4>
            <p className="text-slate-400">
              `IT3605/improved` - Contains the cross-origin error handling, hex color fixes, and Disqus boundary components.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
