export type VibeMode = 'open' | 'gated' | 'event';
export type RoomTemp = 'chill' | 'spicy' | 'chaotic' | 'wholesome';
export type PostTag = 'confession' | 'hot_take' | 'question' | 'rant' | 'appreciation' | 'poll';
export type GameType = 'ghost_game' | 'hot_seat' | 'roast_roulette' | 'daily_prompt';
export type GameStatus = 'open' | 'guessing' | 'closed';

export interface Space {
  id: string;
  name: string;
  inviteCode: string;
  vibeMode: VibeMode;
  roomTemp: RoomTemp;
  adminMemberId: string;
  maxMembers: number;
  cooldownMinutes: number;
  proTier: boolean;
  createdAt: number;
  expiresAt?: number;
}

export interface Member {
  id: string;
  spaceId: string;
  uid: string;
  displayAlias: string;
  joinedAt: number;
  isAdmin: boolean;
  flagCount: number;
  lastPostedAt?: number;
}

export interface Post {
  id: string;
  spaceId: string;
  content: string;
  tag?: PostTag;
  echoCount: number;
  isHidden: boolean;
  isPinned: boolean;
  createdAt: number;
  expiresAt?: number;
  // member_id is hidden from client
}

export interface Reaction {
  id: string;
  postId: string;
  emojiKey: string;
  count: number;
}

export interface GameRound {
  id: string;
  spaceId: string;
  gameType: GameType;
  status: GameStatus;
  targetPostId?: string;
  startedAt: number;
  closesAt: number;
}
