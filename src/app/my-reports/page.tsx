'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { ItemCard } from '@/components/ItemCard';
import { FilterBar } from '@/components/FilterBar';
import { Badge } from '@/components/Badge';
import { Item } from '@/types';
import {
  FolderOpen,
  PlusCircle,
  SearchCheck,
  X,
  MapPin,
  Calendar,
  Tag,
  User,
  Info,
  Building,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function MyReportsPage() {
  const { items, submitClaim } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [claimProof, setClaimProof] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  // Filter items based on user inputs
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Status filter
      if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(term);
        const matchDesc = item.description.toLowerCase().includes(term);
        const matchLoc = item.location.toLowerCase().includes(term);
        const matchBrand = item.brand.toLowerCase().includes(term);
        const matchColor = item.color.toLowerCase().includes(term);
        return matchName || matchDesc || matchLoc || matchBrand || matchColor;
      }

      return true;
    });
  }, [items, searchTerm, selectedCategory, selectedType, selectedStatus]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedStatus('all');
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !claimProof.trim()) return;

    submitClaim(selectedItem.id, claimProof);
    setClaimSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <FolderOpen className="w-4 h-4 text-indigo-400" />
            <span>Campus Loss & Recovery Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My Reports & Campus Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
            Browse all logged lost and found reports. Search by keyword, filter by category or status, and view report details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/report-lost"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Report Lost
          </Link>
          <Link
            href="/report-found"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            <SearchCheck className="w-4 h-4" />
            Report Found
          </Link>
        </div>
      </div>

      {/* Filter Component */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onReset={handleResetFilters}
      />

      {/* Reports Summary Count */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>
          Showing <strong className="text-slate-800 font-bold">{filteredItems.length}</strong> reports
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Lost: {items.filter((i) => i.type === 'lost').length}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Found: {items.filter((i) => i.type === 'found').length}
          </span>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={(i) => {
                setSelectedItem(i);
                setClaimSubmitted(false);
                setClaimProof('');
              }}
              onClaim={(i) => {
                setSelectedItem(i);
                setClaimSubmitted(false);
                setClaimProof('');
              }}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FolderOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Matching Reports Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing category filters to view more items.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Detail & Claim Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-6 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <Badge type="itemType" value={selectedItem.type} size="md" />
              <Badge type="status" value={selectedItem.status} size="md" />
              <span className="text-xs text-slate-500 ml-auto font-medium">{selectedItem.category}</span>
            </div>

            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              className="w-full h-56 object-cover rounded-2xl border border-slate-200"
            />

            <div>
              <h3 className="text-xl font-bold text-slate-900">{selectedItem.name}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedItem.description}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span><strong>Location:</strong> {selectedItem.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span><strong>Date:</strong> {selectedItem.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-600" />
                <span><strong>Brand/Color:</strong> {selectedItem.brand || 'N/A'} ({selectedItem.color || 'N/A'})</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span><strong>Reported By:</strong> {selectedItem.reporterName} ({selectedItem.reporterEmail})</span>
              </div>
              {selectedItem.additionalDetails && (
                <div className="pt-2 border-t border-slate-200">
                  <strong>Additional Details:</strong> {selectedItem.additionalDetails}
                </div>
              )}
            </div>

            {/* Claim Section if item is Found */}
            {selectedItem.type === 'found' && selectedItem.status === 'active' && (
              <div className="border-t border-slate-200 pt-4">
                {claimSubmitted ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200">
                    Claim submitted! Admin will verify your ownership proof.
                  </div>
                ) : (
                  <form onSubmit={handleClaimSubmit} className="space-y-3">
                    <label className="text-xs font-bold text-slate-800 block">
                      Submit Proof of Ownership to Claim Item
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={claimProof}
                      onChange={(e) => setClaimProof(e.target.value)}
                      placeholder="Describe unique serial number, stickers, wallpapers, or markings..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 text-slate-900"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl"
                      >
                        Submit Ownership Claim
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
