import React, { useState } from 'react';
import { Send, Image as ImageIcon, BarChart2, HelpCircle } from 'lucide-react';
import { PostTag } from '@/src/types';
import { TAG_COLORS } from '@/src/constants';
import { cn } from '@/src/lib/utils';

interface CreatePostProps {
  onPost: (content: string, tag?: PostTag) => void;
}

export default function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState<PostTag | undefined>();
  const [isExpanded, setIsExpanded] = useState(false);

  const tags: PostTag[] = ['confession', 'hot_take', 'question', 'rant', 'appreciation', 'poll'];

  const handleSubmit = () => {
    if (!content.trim()) return;
    onPost(content, selectedTag);
    setContent('');
    setSelectedTag(undefined);
    setIsExpanded(false);
  };

  return (
    <div className={cn(
      "brutalist-card mb-6 transition-all duration-300",
      isExpanded ? "ring-1 ring-void-purple/30" : ""
    )}>
      <textarea
        placeholder="Say anything. Own nothing."
        className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none min-h-[60px] placeholder:text-white/20"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setIsExpanded(true)}
      />

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? undefined : tag)}
                className={cn(
                  "text-[10px] px-2 py-1 border uppercase font-mono tracking-wider transition-all",
                  selectedTag === tag 
                    ? TAG_COLORS[tag] 
                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                )}
              >
                {tag.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-3">
              <button className="text-white/20 hover:text-white/60 transition-colors">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="text-white/20 hover:text-white/60 transition-colors">
                <BarChart2 className="w-4 h-4" />
              </button>
              <button className="text-white/20 hover:text-white/60 transition-colors">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="brutalist-button flex items-center gap-2 text-xs font-mono disabled:opacity-30"
            >
              <span>GHOST IT</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
