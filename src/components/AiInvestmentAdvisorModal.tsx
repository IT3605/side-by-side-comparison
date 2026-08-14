import React, { useState, useEffect } from 'react';
import { PropertyListing } from '../types';
import { Sparkles, X, Send, Bot, User, RefreshCw, Award, CheckCircle2, AlertTriangle, ChevronRight, FileText } from 'lucide-react';

interface AiInvestmentAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: PropertyListing | null;
}

export const AiInvestmentAdvisorModal: React.FC<AiInvestmentAdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedProperty,
}) => {
  const [userQuery, setUserQuery] = useState('');
  const [budget, setBudget] = useState<string>('1800000');
  const [district, setDistrict] = useState<string>('15');
  const [propertyType, setPropertyType] = useState<'Condo' | 'HDB' | 'Landed'>('Condo');
  const [reportOutput, setReportOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProperty) {
      setBudget(selectedProperty.price.toString());
      setDistrict(selectedProperty.districtCode.toString());
      setPropertyType(selectedProperty.propertyType);
      setUserQuery(`Perform a comprehensive investment audit on ${selectedProperty.propertyName} (${selectedProperty.address}). Analyze its ${selectedProperty.annualisedRentalYield}% yield, ${selectedProperty.valuationDiffPercent}% valuation diff, and primary school proximity.`);
    }
  }, [selectedProperty]);

  if (!isOpen) return null;

  const handleGenerateReport = async () => {
    setLoading(true);
    setErrorMsg(null);
    setReportOutput('');

    try {
      const response = await fetch('/api/ai/property-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: userQuery || 'Provide a detailed Singapore property investment report focusing on district yield, URA Master Plan catalysts, and MAS mortgage cashflow spread.',
          budget: Number(budget),
          district: Number(district),
          propertyType,
          propertyData: selectedProperty ? {
            title: selectedProperty.title,
            price: selectedProperty.price,
            psf: selectedProperty.pricePerSqft,
            yield: selectedProperty.annualisedRentalYield,
            valuationDiff: selectedProperty.valuationDiffPercent,
            tenure: selectedProperty.tenure,
            schools: selectedProperty.nearbyPrimarySchools,
            sellerGainHistory: selectedProperty.sellerGainLossHistory,
          } : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      setReportOutput(data.report);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while contacting the Gemini AI engine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-slate-100 shadow-2xl space-y-6 p-6 sm:p-8 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-teal-300 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950">
              <Sparkles className="w-5 h-5" fill="#020617" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Gemini Property Investment Copilot
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                  gemini-3.6-flash
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                AI property analyst evaluating Singapore real estate deals, cashflow yield spreads, and district catalysts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Controls */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Target Budget (SGD)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="1,800,000"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Singapore District</label>
              <input
                type="number"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="15"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Property Class</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Condo">Condo / Apartment</option>
                <option value="HDB">HDB Flat</option>
                <option value="Landed">Landed House</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1 text-xs">
              Custom Prompt / Query (Optional)
            </label>
            <textarea
              rows={2}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="e.g. Compare 2-bedder in District 15 vs District 19 for 5-year capital appreciation and rental yield."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 hover:brightness-110 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                Analyzing URA & MAS Datasets with Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" fill="#020617" />
                Generate Deep AI Investment Report
              </>
            )}
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Report Output Panel */}
        {reportOutput && (
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-6 space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> AI Property Audit & Valuation Report
              </span>
              <span className="text-[10px] text-slate-400">Generated in real-time</span>
            </div>

            <div className="prose prose-invert prose-xs max-w-none text-slate-200 leading-relaxed space-y-3 whitespace-pre-wrap font-sans">
              {reportOutput}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
