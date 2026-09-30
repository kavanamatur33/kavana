'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Item, Match, Claim, Notification, User, DashboardStats, ItemType, ItemStatus } from '@/types';
import { currentUser, mockItems, mockMatches, mockClaims, mockNotifications } from '@/data/mockData';

interface AppContextType {
  user: User;
  items: Item[];
  matches: Match[];
  claims: Claim[];
  notifications: Notification[];
  stats: DashboardStats;
  addReport: (newItem: Omit<Item, 'id' | 'createdAt' | 'status' | 'reporterId' | 'reporterName' | 'reporterEmail'>) => Item;
  submitClaim: (itemId: string, proofOfOwnership: string, matchId?: string) => Claim;
  verifyClaim: (claimId: string, adminNotes?: string) => void;
  rejectClaim: (claimId: string, adminNotes?: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  updateItemStatus: (itemId: string, newStatus: ItemStatus) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'ai_lost_found_matcher_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<User>(currentUser);

  // Lazy state initializers to avoid setState inside useEffect
  const [items, setItems] = useState<Item[]>(() => {
    if (typeof window === 'undefined') return mockItems;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.items) return parsed.items;
      }
    } catch {
      // fallback
    }
    return mockItems;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    if (typeof window === 'undefined') return mockMatches;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.matches) return parsed.matches;
      }
    } catch {
      // fallback
    }
    return mockMatches;
  });

  const [claims, setClaims] = useState<Claim[]>(() => {
    if (typeof window === 'undefined') return mockClaims;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.claims) return parsed.claims;
      }
    } catch {
      // fallback
    }
    return mockClaims;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window === 'undefined') return mockNotifications;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.notifications) return parsed.notifications;
      }
    } catch {
      // fallback
    }
    return mockNotifications;
  });

  // Save state to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ items, matches, claims, notifications })
      );
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [items, matches, claims, notifications]);

  // Compute Dashboard Statistics
  const stats: DashboardStats = {
    totalLost: items.filter((i) => i.type === 'lost').length,
    totalFound: items.filter((i) => i.type === 'found').length,
    possibleMatches: matches.filter((m) => m.status === 'potential').length,
    pendingClaims: claims.filter((c) => c.status === 'pending').length,
    returnedItems: items.filter((i) => i.status === 'returned').length,
  };

  // Add new Lost or Found Report
  const addReport = (
    itemData: Omit<Item, 'id' | 'createdAt' | 'status' | 'reporterId' | 'reporterName' | 'reporterEmail'>
  ): Item => {
    const newItem: Item = {
      ...itemData,
      id: `item_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'active',
      reporterId: user.id,
      reporterName: user.name,
      reporterEmail: user.email,
      n8nSyncStatus: 'pending',
    };

    setItems((prev) => [newItem, ...prev]);

    // Check against existing items of opposite type to generate a demo AI match if relevant
    const oppositeType: ItemType = newItem.type === 'lost' ? 'found' : 'lost';
    const potentialOpposites = items.filter(
      (i) => i.type === oppositeType && (i.category === newItem.category || i.color.toLowerCase().includes(newItem.color.toLowerCase()))
    );

    if (potentialOpposites.length > 0) {
      const bestMatchTarget = potentialOpposites[0];
      const lostItem = newItem.type === 'lost' ? newItem : bestMatchTarget;
      const foundItem = newItem.type === 'found' ? newItem : bestMatchTarget;

      const newMatch: Match = {
        id: `match_${Date.now()}`,
        lostItemId: lostItem.id,
        foundItemId: foundItem.id,
        lostItem,
        foundItem,
        similarityScore: Math.floor(Math.random() * 15) + 82, // 82 - 96%
        matchingFactors: [
          {
            factor: 'Category & Keyword Match',
            score: 95,
            description: `Both items matched on category "${newItem.category}" and attribute keywords.`,
          },
          {
            factor: 'Location Proximity',
            score: 88,
            description: `Location "${newItem.location}" matches campus vicinity.`,
          },
          {
            factor: 'Timestamp Proximity',
            score: 90,
            description: 'Reported within active campus loss window.',
          },
        ],
        status: 'potential',
        aiSummary: `AI match generator detected high visual and descriptive similarity (${newItem.name} vs ${bestMatchTarget.name}). Prepared for Gemini API verification.`,
        createdAt: new Date().toISOString(),
      };

      setMatches((prev) => [newMatch, ...prev]);

      // Add Notification
      const newNotif: Notification = {
        id: `notif_${Date.now()}`,
        userId: user.id,
        title: 'New AI Match Detected! 🤖',
        message: `Gemini AI found a match between your reported ${newItem.type} item "${newItem.name}" and item "${bestMatchTarget.name}".`,
        type: 'match_found',
        read: false,
        createdAt: new Date().toISOString(),
        relatedItemId: newItem.id,
        relatedMatchId: newMatch.id,
        actionUrl: '/possible-matches',
      };

      setNotifications((prev) => [newNotif, ...prev]);
    } else {
      // General report notification
      const newNotif: Notification = {
        id: `notif_${Date.now()}`,
        userId: user.id,
        title: `${newItem.type === 'lost' ? 'Lost' : 'Found'} Item Registered`,
        message: `Your report for "${newItem.name}" has been logged and sent to AI matching queue.`,
        type: 'system',
        read: false,
        createdAt: new Date().toISOString(),
        relatedItemId: newItem.id,
        actionUrl: '/my-reports',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    return newItem;
  };

  // Submit Claim for an Item
  const submitClaim = (itemId: string, proofOfOwnership: string, matchId?: string): Claim => {
    const targetItem = items.find((i) => i.id === itemId) || mockItems[0];

    const newClaim: Claim = {
      id: `claim_${Date.now()}`,
      itemId,
      item: targetItem,
      matchId,
      claimantId: user.id,
      claimantName: user.name,
      claimantEmail: user.email,
      proofOfOwnership,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setClaims((prev) => [newClaim, ...prev]);

    // Update item status if relevant
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, status: 'claimed' } : i))
    );

    // Notify user
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      userId: user.id,
      title: 'Claim Submitted 📋',
      message: `Your ownership claim for "${targetItem.name}" was submitted and is pending admin verification.`,
      type: 'claim_status',
      read: false,
      createdAt: new Date().toISOString(),
      relatedItemId: itemId,
      actionUrl: '/my-reports',
    };

    setNotifications((prev) => [newNotif, ...prev]);

    return newClaim;
  };

  // Admin Verify Claim
  const verifyClaim = (claimId: string, adminNotes?: string) => {
    const updatedItemIds: string[] = [];
    let claimantId = '';
    let itemName = '';

    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          updatedItemIds.push(c.itemId);
          if (c.matchId) {
            const m = matches.find((m) => m.id === c.matchId);
            if (m) {
              updatedItemIds.push(m.lostItemId);
              updatedItemIds.push(m.foundItemId);
            }
          }
          claimantId = c.claimantId;
          itemName = c.item.name;
          return { ...c, status: 'verified', adminNotes };
        }
        return c;
      })
    );

    // Update Item status to returned
    setItems((prev) =>
      prev.map((i) =>
        updatedItemIds.includes(i.id) ? { ...i, status: 'returned' } : i
      )
    );

    // Update Matches status to completed
    setMatches((prev) =>
      prev.map((m) =>
        updatedItemIds.includes(m.lostItemId) || updatedItemIds.includes(m.foundItemId)
          ? { ...m, status: 'completed' }
          : m
      )
    );

    // Add notification
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      userId: claimantId || user.id,
      title: 'Claim Verified! 🎉',
      message: `Your ownership claim for "${itemName}" has been verified! You can collect it from Campus Security Lost & Found Desk.`,
      type: 'claim_status',
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: '/notifications',
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Admin Reject Claim
  const rejectClaim = (claimId: string, adminNotes?: string) => {
    let claimantId = '';
    let itemName = '';
    let itemId = '';

    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          claimantId = c.claimantId;
          itemName = c.item.name;
          itemId = c.itemId;
          return { ...c, status: 'rejected', adminNotes };
        }
        return c;
      })
    );

    // Revert Item status to active
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, status: 'active' } : i))
    );

    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      userId: claimantId || user.id,
      title: 'Claim Status Update',
      message: `Your claim for "${itemName}" could not be verified. Admin note: ${adminNotes || 'Insufficient proof provided.'}`,
      type: 'claim_status',
      read: false,
      createdAt: new Date().toISOString(),
      actionUrl: '/notifications',
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const updateItemStatus = (itemId: string, newStatus: ItemStatus) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, status: newStatus } : i))
    );
  };

  const resetDemoData = () => {
    setItems(mockItems);
    setMatches(mockMatches);
    setClaims(mockClaims);
    setNotifications(mockNotifications);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        items,
        matches,
        claims,
        notifications,
        stats,
        addReport,
        submitClaim,
        verifyClaim,
        rejectClaim,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        updateItemStatus,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
