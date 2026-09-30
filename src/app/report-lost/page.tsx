'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ItemCategory } from '@/types';
import {
  FilePlus2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
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

export default function ReportLostItemPage() {
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

  // Handle Image Selection and Conversion to Base64
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

    const defaultLostImage =
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=600';

    setTimeout(() => {
      const created = addReport({
        type: 'lost',
        name,
        category,
        description,
        color: color || 'Unspecified',
        brand: brand || 'Generic / Unknown',
        location,
        date,
        imageUrl: imagePreview || defaultLostImage,
        additionalDetails,
      });

      setSubmittedItemName(created.name);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-700/40 border border-amber-300/30 text-amber-100 text-xs font-semibold">
            <FilePlus2 className="w-4 h-4" />
            <span>Campus Lost Item Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Report Lost Item</h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
            Provide details about what you lost and where. Our AI system will cross-reference new report data with found campus items instantly.
          </p>
        </div>
      </div>

      {/* Success Modal / Banner */}
      {submittedItemName ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Lost Item Report Submitted!</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your lost report for <strong className="text-slate-900">&ldquo;{submittedItemName}&rdquo;</strong> has been logged. Our Gemini AI matcher is analyzing existing and incoming found items.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => router.push('/my-reports')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Go to My Reports
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
              Report Another Lost Item
            </button>
          </div>
        </div>
      ) : (
        /* Main Report Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                Item Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Silver MacBook Pro 14, Blue Hydro Flask, Sony Headphones"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-slate-900"
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
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-800"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Lost */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Date Lost <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-800"
              />
            </div>

            {/* Color */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Silver, Space Gray, Black, Navy Blue"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            {/* Brand */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Brand / Manufacturer</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Apple, Sony, Nike, Hydro Flask, North Face"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                Last Known Location on Campus <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Library 2nd Floor, Recreation Center Gym, Student Union Cafeteria"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                Detailed Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe physical condition, unique features, scratches, stickers, sleeve, contents, etc."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            {/* Additional Details */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-800">Additional Identifying Details</label>
              <textarea
                rows={2}
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                placeholder="Serial numbers, custom wallpapers, initial engravings, accessory items included..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
            </div>

            {/* Image Upload Area */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                  Item Image / Reference Photo
                </span>
                <span className="text-[11px] text-slate-400">Used by Gemini AI for visual matching</span>
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
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-amber-50/30 hover:border-amber-300 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <Upload className="w-8 h-8 text-amber-600 mb-2" />
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
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 rounded-xl shadow-md transition-all shadow-amber-200 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {isSubmitting ? 'Registering Report...' : 'Submit Lost Report'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
