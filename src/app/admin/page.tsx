'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/StatCard';
import { Badge } from '@/components/Badge';
import {
  ShieldAlert,
  PlusCircle,
  SearchCheck,
  Sparkle,
  ClipboardList,
  CheckCircle2,
  XCircle,
  FileText,
  RotateCcw,
  Check,
  X,
  User,
  Calendar,
  MapPin,
  Tag,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    stats,
    items,
    claims,
    verifyClaim,
    rejectClaim,
    updateItemStatus,
    resetDemoData,
  } = useApp();

  const [adminNotesInput, setAdminNotesInput] = useState<{ [claimId: string]: string }>({});
  const [activeTab, setActiveTab] = useState<'claims' | 'reports'>('claims');
  const [reportFilter, setReportFilter] = useState<'all' | 'lost' | 'found'>('all');

  const pendingClaims = claims.filter((c) => c.status === 'pending');
  const filteredReports = items.filter((i) => {
    if (reportFilter === 'all') return true;
    return i.type === reportFilter;
  });

  const handleVerify = (claimId: string) => {
    const notes = adminNotesInput[claimId] || 'Ownership verified by Campus Lost & Found Admin.';
    verifyClaim(claimId, notes);
  };

  const handleReject = (claimId: string) => {
    const notes = adminNotesInput[claimId] || 'Claim rejected due to insufficient proof of ownership.';
    rejectClaim(claimId, notes);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Campus Security Lost & Found Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
            Review student claims, verify proof of ownership, manage campus report statuses, and trigger item returns.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
          title="Reset demo data to default state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>
      </div>

      {/* Metrics Summary Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Lost Items"
          value={stats.totalLost}
          icon={PlusCircle}
          colorScheme="amber"
        />
        <StatCard
          title="Total Found Items"
          value={stats.totalFound}
          icon={SearchCheck}
          colorScheme="blue"
        />
        <StatCard
          title="Possible Matches"
          value={stats.possibleMatches}
          icon={Sparkle}
          colorScheme="indigo"
        />
        <StatCard
          title="Pending Claims"
          value={stats.pendingClaims}
          icon={ClipboardList}
          colorScheme="violet"
        />
        <StatCard
          title="Returned Items"
          value={stats.returnedItems}
          icon={CheckCircle2}
          colorScheme="emerald"
        />
      </section>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('claims')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'claims'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          Pending Claims ({pendingClaims.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          All Reports Directory ({items.length})
        </button>
      </div>

      {/* Tab 1: Claims Review Section */}
      {activeTab === 'claims' && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Pending Student Claims</h2>

          {pendingClaims.length > 0 ? (
            <div className="space-y-4">
              {pendingClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={claim.item.imageUrl}
                        alt={claim.item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{claim.item.name}</h3>
                          <Badge type="status" value={claim.status} size="sm" />
                        </div>
                        <p className="text-xs text-slate-500">
                          Claimed by <strong className="text-slate-800">{claim.claimantName}</strong> ({claim.claimantEmail})
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      Submitted: {new Date(claim.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Proof of ownership box */}
                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-xs space-y-1">
                    <span className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">
                      Submitted Proof of Ownership:
                    </span>
                    <p className="text-slate-700 italic">"{claim.proofOfOwnership}"</p>
                  </div>

                  {/* Admin notes input & actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <input
                      type="text"
                      value={adminNotesInput[claim.id] || ''}
                      onChange={(e) =>
                        setAdminNotesInput({ ...adminNotesInput, [claim.id]: e.target.value })
                      }
                      placeholder="Add admin note or verification remarks..."
                      className="text-xs p-2.5 rounded-xl border border-slate-200 flex-1 text-slate-800"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReject(claim.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject Claim
                      </button>

                      <button
                        onClick={() => handleVerify(claim.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Verify & Return
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">No Pending Claims</h3>
              <p className="text-xs text-slate-500">All student claims have been reviewed and verified.</p>
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Complete Reports Directory */}
      {activeTab === 'reports' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Master Campus Reports List</h2>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setReportFilter('all')}
                className={`px-3 py-1 rounded-lg ${reportFilter === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'}`}
              >
                All ({items.length})
              </button>
              <button
                onClick={() => setReportFilter('lost')}
                className={`px-3 py-1 rounded-lg ${reportFilter === 'lost' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600'}`}
              >
                Lost ({items.filter((i) => i.type === 'lost').length})
              </button>
              <button
                onClick={() => setReportFilter('found')}
                className={`px-3 py-1 rounded-lg ${reportFilter === 'found' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'}`}
              >
                Found ({items.filter((i) => i.type === 'found').length})
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="p-4">Item Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Location & Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Quick Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{item.name}</p>
                          <p className="text-[11px] text-slate-500 max-w-xs truncate">{item.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-slate-700">{item.category}</td>

                    <td className="p-4">
                      <Badge type="itemType" value={item.type} size="sm" />
                    </td>

                    <td className="p-4 space-y-0.5 text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[150px]">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <Badge type="status" value={item.status} size="sm" />
                    </td>

                    <td className="p-4 text-right">
                      <select
                        value={item.status}
                        onChange={(e) => updateItemStatus(item.id, e.target.value as any)}
                        className="py-1 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
                      >
                        <option value="active">Active</option>
                        <option value="matched">Matched</option>
                        <option value="claimed">Claimed</option>
                        <option value="returned">Returned</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
