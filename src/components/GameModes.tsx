import React from 'react';
import { Sparkles, Target, Flame, Lock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function GameModes() {
  const games = [
    {
      id: 'daily_prompt',
      name: 'Daily Prompt',
      description: 'One question. Everyone answers anonymously. Vote for the best.',
      icon: <Sparkles className="w-5 h-5" />,
      active: true,
      color: 'text-void-purple'
    },
    {
      id: 'ghost_game',
      name: 'Ghost Game',
      description: 'Guess who wrote that post. Points for correct guesses.',
      icon: <Target className="w-5 h-5" />,
      active: false,
      color: 'text-void-green'
    },
    {
      id: 'roast_roulette',
      name: 'Roast Roulette',
      description: 'Anonymous roasts about the group. Most-reacted wins.',
      icon: <Flame className="w-5 h-5" />,
      active: false,
      color: 'text-void-accent'
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-mono font-bold tracking-tighter mb-1">PLAYGROUND</h2>
        <p className="text-white/40 text-xs font-mono uppercase tracking-wider">Games &gt; Passive Scrolling</p>
      </div>

      {games.map((game) => (
        <div 
          key={game.id}
          className={cn(
            "brutalist-card relative overflow-hidden group cursor-pointer",
            !game.active && "opacity-60 grayscale"
          )}
        >
          {!game.active && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-void-purple/20 text-void-purple text-[8px] px-1.5 py-0.5 font-mono uppercase border border-void-purple/30">
              <Lock className="w-2 h-2" />
              <span>PRO</span>
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className={cn("p-3 bg-white/5 brutalist-border", game.color)}>
              {game.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-mono font-bold text-sm uppercase tracking-tight mb-1 group-hover:text-void-purple transition-colors">
                {game.name}
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">
                {game.description}
              </p>
            </div>
          </div>
          
          {game.active && (
            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[10px] font-mono text-void-green animate-pulse">● LIVE NOW</span>
              <button className="text-[10px] font-mono text-white/60 hover:text-white underline underline-offset-4">
                JOIN ROUND
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
