'use client';

import React from 'react';
import Link from 'next/link';
import { Notification } from '@/types';
import { Sparkles, ClipboardList, CheckCircle2, Info, Trash2, ArrowRight } from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkRead,
  onDelete,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'match_found':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'claim_status':
        return <ClipboardList className="w-5 h-5 text-amber-600" />;
      case 'item_returned':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgStyle = () => {
    if (!notification.read) {
      return 'bg-indigo-50/40 border-indigo-200';
    }
    return 'bg-white border-slate-200';
  };

  return (
    <div
      className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${getBgStyle()}`}
    >
      <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0">
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-slate-900 text-sm">{notification.title}</h4>
          <span className="text-[11px] text-slate-400">
            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-600 leading-relaxed">{notification.message}</p>

        <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
          <div>
            {notification.actionUrl && (
              <Link
                href={notification.actionUrl}
                onClick={() => onMarkRead(notification.id)}
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!notification.read && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
              >
                Mark as Read
              </button>
            )}
            <button
              onClick={() => onDelete(notification.id)}
              className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
              title="Delete notification"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
