'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { NotificationItem } from '@/components/NotificationItem';
import { Bell, CheckCheck, Trash2, Sparkles, Filter } from 'lucide-react';

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread' | 'match' | 'claim'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'match') return n.type === 'match_found';
    if (filter === 'claim') return n.type === 'claim_status';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Bell className="w-4 h-4 text-indigo-400" />
            <span>Campus Activity Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
            Stay updated on AI visual matches, student claim verifications, and campus item return receipts.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <CheckCheck className="w-4 h-4" />
            Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'unread' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('match')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'match' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            AI Matches
          </button>
          <button
            onClick={() => setFilter('claim')}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              filter === 'claim' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Claim Updates
          </button>
        </div>

        <span className="text-xs text-slate-500 hidden sm:inline font-medium">
          Showing {filteredNotifications.length} notifications
        </span>
      </div>

      {/* List of Notifications */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={markNotificationAsRead}
              onDelete={deleteNotification}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No Notifications Found</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            You're all caught up! New alerts will appear when Gemini AI pairs your items or when admin reviews your claims.
          </p>
        </div>
      )}
    </div>
  );
}
