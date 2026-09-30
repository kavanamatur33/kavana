'use client';

import React, { useState } from 'react';
import { Match } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  X,
  Sparkles,
  MapPin,
  Tag,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Building,
  User,
  Send,
  Cpu,
} from 'lucide-react';

interface MatchDetailsModalProps {
  match: Match | null;
  onClose: () => void;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ match, onClose }) => {
  const { submitClaim } = useApp();
  const [proof, setProof] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!match) return null;

  const { lostItem, foundItem, similarityScore, matchingFactors, aiSummary } = match;

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proof.trim()) return;

    submitClaim(foundItem.id, proof, match.id);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">AI Match Details & Verification</h3>
                <span className="text-xs bg-indigo-500/30 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                  {similarityScore}% Match
                </span>
              </div>
              <p className="text-xs text-slate-400">Gemini Visual & Metadata Analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Comparison Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lost Item Details */}
            <div className="bg-amber-50/40 rounded-2xl p-4 border border-amber-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg">
                  Reported Lost
                </span>
                <span className="text-xs text-slate-500">{lostItem.date}</span>
              </div>

              <img
                src={lostItem.imageUrl}
                alt={lostItem.name}
                className="w-full h-44 object-cover rounded-xl border border-amber-200"
              />

              <div>
                <h4 className="font-bold text-slate-900 text-base">{lostItem.name}</h4>
                <p className="text-xs text-slate-600 mt-1">{lostItem.description}</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-amber-200/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lostItem.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Brand: {lostItem.brand} | Color: {lostItem.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>Reported by: {lostItem.reporterName}</span>
                </div>
              </div>
            </div>

            {/* Found Item Details */}
            <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-lg">
                  Reported Found
                </span>
                <span className="text-xs text-slate-500">{foundItem.date}</span>
              </div>

              <img
                src={foundItem.imageUrl}
                alt={foundItem.name}
                className="w-full h-44 object-cover rounded-xl border border-emerald-200"
              />

              <div>
                <h4 className="font-bold text-slate-900 text-base">{foundItem.name}</h4>
                <p className="text-xs text-slate-600 mt-1">{foundItem.description}</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-emerald-200/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{foundItem.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Brand: {foundItem.brand} | Color: {foundItem.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Held at: Campus Lost & Found Desk</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Matching Analysis & Factors */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>Simulated Gemini Multimodal Match Score: {similarityScore}%</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              {aiSummary}
            </p>

            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Matching Factors Breakdown
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingFactors.map((f, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-200 mb-1">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {f.factor}
                      </span>
                      <span className="text-indigo-400 font-bold">{f.score}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Claim Section */}
          <div className="border-t border-slate-200 pt-4">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-800">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-sm">Claim Request Submitted Successfully!</h5>
                  <p className="text-xs text-emerald-700">
                    Campus Security Admin will review your ownership proof and update your claim status in &ldquo;My Reports&rdquo;.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleClaim} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    Submit Proof of Ownership to Claim Found Item
                  </label>
                  <span className="text-[11px] text-slate-500">Official Student Verification</span>
                </div>
                <textarea
                  required
                  rows={3}
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  placeholder="Describe unique markings, serial numbers, wallpapers, contents, or receipts that confirm this item is yours..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800"
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Claim
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
