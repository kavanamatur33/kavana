'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/StatCard';
import { MatchCard } from '@/components/MatchCard';
import { ItemCard } from '@/components/ItemCard';
import { MatchDetailsModal } from '@/components/MatchDetailsModal';
import { Match, Item } from '@/types';
import {
  Sparkles,
  PlusCircle,
  SearchCheck,
  FolderOpen,
  Sparkle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Database,
  Workflow,
  CheckCircle2,
} from 'lucide-react';

export default function HomeDashboard() {
  const { stats, matches, items } = useApp();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  // Top 2 high potential matches
  const recentMatches = matches.filter((m) => m.status === 'potential').slice(0, 2);
  // Top 4 recent items
  const recentItems = items.slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI-Powered Campus Recovery Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            AI Lost & Found Matcher
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Report lost or found items on campus in seconds. Our intelligent vision algorithms automatically analyze image features, location, and time parameters to pair missing belongings with high accuracy.
          </p>

          {/* Action Navigation Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/report-lost"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
            >
              <PlusCircle className="w-5 h-5" />
              Report Lost Item
            </Link>

            <Link
              href="/report-found"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <SearchCheck className="w-5 h-5" />
              Report Found Item
            </Link>

            <Link
              href="/my-reports"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <FolderOpen className="w-4 h-4 text-indigo-400" />
              My Reports
            </Link>

            <Link
              href="/possible-matches"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-800/80 hover:bg-slate-700/80 text-indigo-300 border border-indigo-500/30 transition-all"
            >
              <Sparkle className="w-4 h-4 text-amber-300" />
              Possible Matches
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Statistics Cards Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Campus Activity Overview</h2>
              <p className="text-xs text-slate-500">Real-time stats across all campus buildings</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              Live Feed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Total Lost Items"
              value={stats.totalLost}
              description="Reported missing by students"
              icon={PlusCircle}
              colorScheme="amber"
              trend="Active"
            />
            <StatCard
              title="Total Found Items"
              value={stats.totalFound}
              description="Turned in at help desks"
              icon={SearchCheck}
              colorScheme="blue"
              trend="Logged"
            />
            <StatCard
              title="Possible Matches"
              value={stats.possibleMatches}
              description="AI visual pairings found"
              icon={Sparkle}
              colorScheme="indigo"
              trend="AI Detected"
            />
            <StatCard
              title="Returned Items"
              value={stats.returnedItems}
              description="Reunited with owners"
              icon={CheckCircle2}
              colorScheme="emerald"
              trend="Success"
            />
          </div>
        </section>

        {/* AI Matches Highlight Section */}
        {recentMatches.length > 0 && (
          <section className="bg-gradient-to-br from-indigo-900/5 via-purple-900/5 to-slate-900/5 rounded-3xl p-6 border border-indigo-100/80">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Recent AI-Detected Matches</h3>
                  <p className="text-xs text-slate-500">Gemini visual similarity predictions ready for claim</p>
                </div>
              </div>
              <Link
                href="/possible-matches"
                className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                View All Matches ({matches.length})
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentMatches.map((m) => (
                <MatchCard key={m.id} match={m} onViewDetails={setSelectedMatch} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Feed Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Recently Reported Campus Items</h3>
              <p className="text-xs text-slate-500">Browse recent lost and found reports</p>
            </div>
            <Link
              href="/my-reports"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Browse All Reports
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Architecture & Future Integrations Ready Banner */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Prepared for Scalable Backend Integrations</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white">
              Next-Gen Campus Lost & Found Infrastructure
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This application is designed with modular data structures and component boundaries ready for immediate integration with Google Gemini Multimodal API, Supabase Realtime DB, and n8n Workflow Automation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  Gemini API Ready
                </div>
                <p className="text-[11px] text-slate-400">
                  Multimodal vision embeddings for visual item recognition and natural language feature comparison.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Database className="w-4 h-4 text-emerald-400" />
                  Supabase DB Ready
                </div>
                <p className="text-[11px] text-slate-400">
                  PostgreSQL vector similarity search (pgvector) and real-time student report syncing.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Workflow className="w-4 h-4 text-amber-400" />
                  n8n Workflows Ready
                </div>
                <p className="text-[11px] text-slate-400">
                  Automated email, SMS, and Discord campus notifications triggered when a high match is confirmed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Match Details Modal */}
      <MatchDetailsModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
}
