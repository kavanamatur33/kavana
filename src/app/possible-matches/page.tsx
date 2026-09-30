'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MatchCard } from '@/components/MatchCard';
import { MatchDetailsModal } from '@/components/MatchDetailsModal';
import { Match } from '@/types';
import { Sparkle, Sparkles, SlidersHorizontal, Info, ShieldAlert } from 'lucide-react';

export default function PossibleMatchesPage() {
  const { matches } = useApp();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'potential'>('all');

  const filteredMatches = matches.filter((m) => {
    if (activeTab === 'high') return m.similarityScore >= 90;
    if (activeTab === 'potential') return m.status === 'potential';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Multimodal Vision Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Possible AI Matches
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Simulated Gemini vision embeddings analyze color signatures, brand tags, campus location coordinates, and report timestamps to detect high-probability matches.
          </p>
        </div>

        <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-2xl text-xs space-y-1 text-slate-300 shrink-0 min-w-[240px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Total Pairings Detected:</span>
            <span className="font-bold text-white">{matches.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">High Confidence (&gt;90%):</span>
            <span className="font-bold text-emerald-400">
              {matches.filter((m) => m.similarityScore >= 90).length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Pending Verification:</span>
            <span className="font-bold text-amber-300">
              {matches.filter((m) => m.status === 'potential').length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Matches ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('high')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'high'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            High Confidence (90%+)
          </button>
          <button
            onClick={() => setActiveTab('potential')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'potential'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pending Claims
          </button>
        </div>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Showing {filteredMatches.length} AI matches
        </span>
      </div>

      {/* Matches Grid */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredMatches.map((m) => (
            <MatchCard key={m.id} match={m} onViewDetails={setSelectedMatch} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Sparkle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Matches Found in Selected Filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching tabs to view all detected visual pairings across campus.
          </p>
          <button
            onClick={() => setActiveTab('all')}
            className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700"
          >
            View All Matches
          </button>
        </div>
      )}

      {/* Match Details Modal */}
      <MatchDetailsModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
}
