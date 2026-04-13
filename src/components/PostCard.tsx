import React from 'react';
import { MessageCircle, Repeat2, Flag, MoreHorizontal } from 'lucide-react';
import { Post } from '@/src/types';
import { TAG_COLORS } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onEcho?: (id: string) => void;
  onReact?: (id: string, emoji: string) => void;
  onFlag?: (id: string) => void;
}

export default function PostCard({ post, onEcho, onReact, onFlag }: PostCardProps) {
  return (
    <div className="brutalist-card mb-4 group">
      <div className="flex justify-between items-start mb-3">
        {post.tag && (
          <span className={cn(
            "text-[10px] px-2 py-0.5 border uppercase font-mono tracking-wider",
            TAG_COLORS[post.tag] || "bg-white/10 text-white/60 border-white/20"
          )}>
            {post.tag.replace('_', ' ')}
          </span>
        )}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/30">
            {formatDistanceToNow(post.createdAt)} ago
          </span>
          <button className="text-white/20 hover:text-white/60 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-white/90 mb-4 whitespace-pre-wrap">
        {post.content}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onEcho?.(post.id)}
            className="flex items-center gap-1.5 text-white/40 hover:text-void-purple transition-colors group/btn"
          >
            <Repeat2 className="w-4 h-4 group-active/btn:scale-125 transition-transform" />
            <span className="text-xs font-mono">{post.echoCount}</span>
          </button>
          
          <div className="flex items-center gap-1">
            {/* Reactions would go here */}
            <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-xs transition-colors">
              +
            </button>
          </div>
        </div>

        <button 
          onClick={() => onFlag?.(post.id)}
          className="text-white/20 hover:text-red-400 transition-colors"
          title="Flag post"
        >
          <Flag className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
