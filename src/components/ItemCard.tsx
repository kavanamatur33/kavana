'use client';

import React from 'react';
import { Item } from '@/types';
import { Badge } from './Badge';
import { MapPin, Calendar, Tag, User, Layers, ArrowUpRight } from 'lucide-react';

interface ItemCardProps {
  item: Item;
  onSelect?: (item: Item) => void;
  onClaim?: (item: Item) => void;
  showActions?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onSelect,
  onClaim,
  showActions = true,
}) => {
  const defaultImage =
    item.type === 'lost'
      ? 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&q=80&w=600'
      : 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=600';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Thumbnail & Badges Overlay */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={item.imageUrl || defaultImage}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultImage;
            }}
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <Badge type="itemType" value={item.type} size="sm" />
            <Badge type="status" value={item.status} size="sm" />
          </div>
          <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-slate-700">
            {item.category}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1">
              {item.name}
            </h3>
          </div>

          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>

            <div className="flex items-center justify-between text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{item.type === 'lost' ? 'Lost on' : 'Found on'} {item.date}</span>
              </div>
              {item.color && (
                <div className="flex items-center gap-1 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-white" style={{ backgroundColor: item.color.toLowerCase() }} />
                  <span>{item.color}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-dashed border-slate-100">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[120px]">{item.reporterName}</span>
              </div>
              {item.brand && (
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-slate-400" />
                  <span>{item.brand}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      {showActions && (
        <div className="px-5 pb-5 pt-0 flex items-center gap-2">
          {onSelect && (
            <button
              onClick={() => onSelect(item)}
              className="flex-1 inline-flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              Details
            </button>
          )}

          {item.type === 'found' && item.status === 'active' && onClaim && (
            <button
              onClick={() => onClaim(item)}
              className="flex-1 inline-flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              Claim Item
            </button>
          )}
        </div>
      )}
    </div>
  );
};
