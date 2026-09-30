'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Cpu, Database, Workflow, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">AI Lost & Found</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering campus community recovery with instant visual identification, multimodal matching, and official item verification.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-indigo-300 border border-slate-700">
                <Cpu className="w-3 h-3" /> Gemini Ready
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-emerald-300 border border-slate-700">
                <Database className="w-3 h-3" /> Supabase Schema
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-amber-300 border border-slate-700">
                <Workflow className="w-3 h-3" /> n8n Workflows
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">Home Dashboard</Link>
              </li>
              <li>
                <Link href="/report-lost" className="hover:text-indigo-400 transition-colors">Report Lost Item</Link>
              </li>
              <li>
                <Link href="/report-found" className="hover:text-indigo-400 transition-colors">Report Found Item</Link>
              </li>
              <li>
                <Link href="/my-reports" className="hover:text-indigo-400 transition-colors">My Reports</Link>
              </li>
            </ul>
          </div>

          {/* Services & Admin */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Campus Tools</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/possible-matches" className="hover:text-indigo-400 transition-colors">AI Match Engine</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-indigo-400 transition-colors">Admin Dashboard</Link>
              </li>
              <li>
                <Link href="/notifications" className="hover:text-indigo-400 transition-colors">Notification Center</Link>
              </li>
              <li>
                <span className="text-slate-500">Security Lost & Found Counter</span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Campus Office</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-2">
              Central Student Center, Room 102<br />
              Monday – Friday: 8:00 AM – 6:00 PM<br />
              Hotline: (555) 019-2834
            </p>
            <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Campus Security System</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} College Campus AI Lost & Found Matcher. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
