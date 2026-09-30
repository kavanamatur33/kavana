'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  FilePlus2,
  SearchCheck,
  FolderOpen,
  Sparkle,
  ShieldAlert,
  Bell,
  Menu,
  X,
  PlusCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { notifications, user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { name: 'Dashboard', href: '/', icon: Sparkles },
    { name: 'Report Lost', href: '/report-lost', icon: FilePlus2 },
    { name: 'Report Found', href: '/report-found', icon: SearchCheck },
    { name: 'My Reports', href: '/my-reports', icon: FolderOpen },
    { name: 'Possible Matches', href: '/possible-matches', icon: Sparkle },
    { name: 'Admin', href: '/admin', icon: ShieldAlert },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-lg tracking-tight">AI Lost & Found</span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                  Campus AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Smart Matcher System</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons & User */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-bounce">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>

            {/* Quick Report Button */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/report-lost"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all shadow-indigo-100"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Report Lost
              </Link>
            </div>

            {/* User Profile Badge */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-indigo-200 object-cover"
              />
              <div className="text-left leading-tight">
                <p className="text-xs font-bold text-slate-800">{user.name}</p>
                <p className="text-[10px] text-slate-500 font-medium capitalize">{user.role}</p>
              </div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top duration-200">
          <div className="p-2 mb-2 bg-slate-50 rounded-lg flex items-center gap-3">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full border border-indigo-200 object-cover"
            />
            <div>
              <p className="text-sm font-bold text-slate-800">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <Link
              href="/report-lost"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg"
            >
              Report Lost
            </Link>
            <Link
              href="/report-found"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-center items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
            >
              Report Found
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
