'use client';

import React from 'react';
import { Match } from '@/types';
import { Sparkles, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onViewDetails: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onViewDetails }) => {
  const { lostItem, foundItem, similarityScore, matchingFactors, aiSummary } = match;

  // Determine similarity style
  const getScoreBadge = (score: number) => {
    if (score >= 90) {
      return 'bg-emerald-500 text-white shadow-emerald-200';
    } else if (score >= 80) {
      return 'bg-indigo-600 text-white shadow-indigo-200';
    }
    return 'bg-amber-500 text-white shadow-amber-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-5 py-3.5 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase text-indigo-200">
            AI Gemini Match
          </span>
        </div>
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-md ${getScoreBadge(
            similarityScore
          )}`}
        >
          <span>{similarityScore}% Confidence</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
          {/* Lost Side */}
          <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                Lost Item
              </span>
            </div>
            <div className="flex gap-3">
              <img
                src={lostItem.imageUrl}
                alt={lostItem.name}
                className="w-16 h-16 rounded-lg object-cover border border-amber-200 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{lostItem.name}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{lostItem.category}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-600 mt-1">
                  <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="truncate">{lostItem.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Found Side */}
          <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Found Item
              </span>
            </div>
            <div className="flex gap-3">
              <img
                src={foundItem.imageUrl}
                alt={foundItem.name}
                className="w-16 h-16 rounded-lg object-cover border border-emerald-200 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{foundItem.name}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{foundItem.category}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-600 mt-1">
                  <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{foundItem.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Key Factors Preview */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Matching Factors
          </p>
          <div className="space-y-1.5">
            {matchingFactors.slice(0, 2).map((factor, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{factor.factor}</span>
                </div>
                <span className="font-bold text-indigo-600">{factor.score}%</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 line-clamp-2 italic">
            &ldquo;{aiSummary}&rdquo;
          </p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-5 pb-5 pt-0">
        <button
          onClick={() => onViewDetails(match)}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
        >
          View Full AI Analysis & Claim
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
