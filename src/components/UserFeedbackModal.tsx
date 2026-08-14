import React, { useState } from 'react';
import { INITIAL_FEATURE_VOTES } from '../data/macroAnalytics';
import { FeatureVoteItem } from '../types';
import { Lightbulb, ThumbsUp, Plus, X, Award, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

interface UserFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserFeedbackModal: React.FC<UserFeedbackModalProps> = ({ isOpen, onClose }) => {
  const [featureList, setFeatureList] = useState<FeatureVoteItem[]>(INITIAL_FEATURE_VOTES);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('General Feature');

  if (!isOpen) return null;

  const handleVote = (id: string) => {
    setFeatureList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const hasVoted = item.hasVoted;
          return {
            ...item,
            votes: hasVoted ? item.votes - 1 : item.votes + 1,
            hasVoted: !hasVoted,
          };
        }
        return item;
      })
    );
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: FeatureVoteItem = {
      id: `feat-${Date.now()}`,
      title: newTitle,
      description: newDesc || 'User requested feature backlog item.',
      category: newCategory,
      votes: 1,
      hasVoted: true,
    };

    setFeatureList([newItem, ...featureList]);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-slate-100 shadow-2xl space-y-6 p-6 sm:p-8 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Community Feature Voting & Backlog
              </h2>
              <p className="text-xs text-slate-400">
                "What do we want on the site?" — Submit and vote on upcoming feature priorities to guide engineering development.
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

        {/* Submit New Idea Form */}
        <form onSubmit={handleAddFeature} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Propose a New Platform Feature
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., URA Caveat Price Alert Triggers"
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Brief description of how it helps property investors..."
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow"
          >
            Submit Feature Idea
          </button>
        </form>

        {/* Sticky Note Grid matching spec */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureList.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                item.hasVoted
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-700 rounded">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                <span className="text-xs text-slate-300 font-bold">
                  {item.votes} Votes
                </span>

                <button
                  onClick={() => handleVote(item.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                    item.hasVoted
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {item.hasVoted ? 'Voted' : 'Upvote'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
