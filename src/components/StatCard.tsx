'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: LucideIcon;
  colorScheme: 'amber' | 'blue' | 'indigo' | 'emerald' | 'violet' | 'rose';
  trend?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  colorScheme,
  trend,
  onClick,
}) => {
  const colorStyles = {
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-200/80 hover:border-amber-300',
      iconBg: 'bg-amber-100 text-amber-700',
      badge: 'bg-amber-100 text-amber-800',
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-200/80 hover:border-blue-300',
      iconBg: 'bg-blue-100 text-blue-700',
      badge: 'bg-blue-100 text-blue-800',
    },
    indigo: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-200/80 hover:border-indigo-300',
      iconBg: 'bg-indigo-100 text-indigo-700',
      badge: 'bg-indigo-100 text-indigo-800',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-200/80 hover:border-emerald-300',
      iconBg: 'bg-emerald-100 text-emerald-700',
      badge: 'bg-emerald-100 text-emerald-800',
    },
    violet: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-200/80 hover:border-violet-300',
      iconBg: 'bg-violet-100 text-violet-700',
      badge: 'bg-violet-100 text-violet-800',
    },
    rose: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-200/80 hover:border-rose-300',
      iconBg: 'bg-rose-100 text-rose-700',
      badge: 'bg-rose-100 text-rose-800',
    },
  };

  const scheme = colorStyles[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`relative p-5 bg-white rounded-2xl border ${scheme.border} shadow-xs transition-all duration-200 hover:shadow-md ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{title}</span>
        <div className={`p-2.5 rounded-xl ${scheme.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
        {trend && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${scheme.badge}`}>
            {trend}
          </span>
        )}
      </div>

      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </div>
  );
};
