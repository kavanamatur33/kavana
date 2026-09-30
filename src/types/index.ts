export type ItemType = 'lost' | 'found';

export type ItemCategory =
  | 'Electronics'
  | 'Keys'
  | 'Clothing & Accessories'
  | 'Bags & Backpacks'
  | 'Documents & IDs'
  | 'Books & Stationery'
  | 'Jewelry & Watches'
  | 'Sports Equipment'
  | 'Other';

export type ItemStatus = 'active' | 'matched' | 'claimed' | 'returned' | 'rejected';

export type UserRole = 'student' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
}

export interface Item {
  id: string;
  type: ItemType;
  name: string;
  category: ItemCategory;
  description: string;
  color: string;
  brand: string;
  location: string;
  date: string; // ISO date string (YYYY-MM-DD)
  imageUrl?: string;
  additionalDetails?: string;
  status: ItemStatus;
  reporterId: string;
  reporterName: string;
  reporterEmail: string;
  createdAt: string;
  // Prepared fields for future AI/Database integrations
  geminiEmbeddingId?: string;
  supabaseId?: string;
  n8nSyncStatus?: 'pending' | 'synced' | 'failed';
}

export interface MatchingFactor {
  factor: string;
  score: number; // Percentage 0-100
  description: string;
}

export type MatchStatus = 'potential' | 'verified' | 'rejected' | 'claimed' | 'completed';

export interface Match {
  id: string;
  lostItemId: string;
  foundItemId: string;
  lostItem: Item;
  foundItem: Item;
  similarityScore: number; // Demo similarity percentage (e.g., 94)
  matchingFactors: MatchingFactor[];
  status: MatchStatus;
  aiSummary: string; // Simulated Gemini AI matching report summary
  createdAt: string;
}

export type ClaimStatus = 'pending' | 'verified' | 'rejected';

export interface Claim {
  id: string;
  itemId: string;
  item: Item;
  matchId?: string;
  claimantId: string;
  claimantName: string;
  claimantEmail: string;
  proofOfOwnership: string;
  status: ClaimStatus;
  adminNotes?: string;
  createdAt: string;
}

export type NotificationType = 'match_found' | 'claim_status' | 'item_returned' | 'system';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  relatedItemId?: string;
  relatedMatchId?: string;
  actionUrl?: string;
}

export interface DashboardStats {
  totalLost: number;
  totalFound: number;
  possibleMatches: number;
  pendingClaims: number;
  returnedItems: number;
}
