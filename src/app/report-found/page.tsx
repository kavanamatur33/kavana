'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ItemCategory } from '@/types';
import {
  SearchCheck,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
  Building,
} from 'lucide-react';

const CATEGORIES: ItemCategory[] = [
  'Electronics',
  'Keys',
  'Clothing & Accessories',
  'Bags & Backpacks',
  'Documents & IDs',
  'Books & Stationery',
  'Jewelry & Watches',
  'Sports Equipment',
  'Other',
];

export default function ReportFoundItemPage() {
  const router = useRouter();
  const { addReport } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submittedItemName, setSubmittedItemName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Image Upload with Base64 Preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const defaultFoundImage =
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=600';

    setTimeout(() => {
      const created = addReport({
        type: 'found',
        name,
        category,
        description,
        color: color || 'Unspecified',
        brand: brand || 'Generic / Unknown',
        location,
        date,
        imageUrl: imagePreview || defaultFoundImage,
        additionalDetails,
      });

      setSubmittedItemName(created.name);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-800/50 border border-indigo-400/30 text-indigo-100 text-xs font-semibold">
            <SearchCheck className="w-4 h-4 text-emerald-300" />
            <span>Campus Found Item Log</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Report Found Item</h1>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
            Found an unattended item on campus? Log it here so our Gemini AI vision engine can instantly match it with reported lost belongings.
          </p>
        </div>
      </div>

      {/* Success Modal / Confirmation */}
      {submittedItemName ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Found Item Successfully Logged!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you! Your found report for <strong className="text-slate-900">"{submittedItemName}"</strong> is now active. Please drop the physical item off at Campus Security or Library Desk.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => router.push('/possible-matches')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              View AI Matches
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSubmittedItemName(null);
                setName('');
                setDescription('');
                setColor('');
                setBrand('');
                setLocation('');
                setAdditionalDetails('');
                setImagePreview(null);
              }}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
            >
              Report Another Found Item
            </button>
          </div>
        </div>
      ) : (
        /* Main Found Item Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                Found Item Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Silver Laptop in Gray Sleeve, Black Insulated Water Bottle, Car Key Fob"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-800"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Found */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                Date Found <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>

            {/* Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Silver, Black, Blue, Red"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
            </div>

            {/* Brand */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Brand / Logos Visible</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Apple, Honda, Sony, Hydro Flask"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
            </div>

            {/* Location Found */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                Exact Campus Location Found <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Science Building Auditorium B, Desk 14 Library 2nd floor, Gym Locker Room"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                Description & Visual Characteristics <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe physical shape, condition, color tone, stickers, case, or accessories found with it."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
            </div>

            {/* Additional Details & Drop-off Location */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-indigo-600" />
                Additional Details / Current Storage Office
              </label>
              <textarea
                rows={2}
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="e.g. Turned in at Library Front Desk, held by Security Office Room 102..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
            </div>

            {/* Image Upload Area */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                  Found Item Photo Upload
                </span>
                <span className="text-[11px] text-slate-400">Essential for Gemini visual feature matching</span>
              </label>

              {imagePreview ? (
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-300 bg-slate-50 group">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-3 right-3 p-1.5 bg-slate-900/80 text-white rounded-full hover:bg-rose-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <Upload className="w-8 h-8 text-indigo-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-700">Click to upload photo or drag & drop</p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all shadow-indigo-200 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {isSubmitting ? 'Logging Item...' : 'Submit Found Report'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
