'use client';

import React from 'react';
import { ItemCategory, ItemStatus, ItemType } from '@/types';

interface BadgeProps {
  type?: 'status' | 'category' | 'itemType';
  value: ItemStatus | ItemCategory | ItemType | string;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ type = 'status', value, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs font-medium',
    md: 'px-3 py-1 text-xs font-semibold',
    lg: 'px-3.5 py-1.5 text-sm font-bold',
  };

  const getStyle = () => {
    const valLower = value.toString().toLowerCase();

    if (type === 'itemType') {
      if (valLower === 'lost') {
        return 'bg-amber-100 text-amber-800 border-amber-200';
      }
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }

    if (type === 'status') {
      switch (valLower) {
        case 'active':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'matched':
          return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'claimed':
          return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'returned':
          return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case 'rejected':
          return 'bg-rose-100 text-rose-800 border-rose-200';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default:
          return 'bg-slate-100 text-slate-800 border-slate-200';
      }
    }

    // Default category or string style
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border capitalize ${sizeClasses[size]} ${getStyle()}`}
    >
      {value}
    </span>
  );
};
