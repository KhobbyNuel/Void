import React from 'react';
import { Ghost, Settings, MessageSquare, Gamepad2, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'feed' | 'games' | 'info' | 'settings';
  setActiveTab: (tab: 'feed' | 'games' | 'info' | 'settings') => void;
  spaceName?: string;
}

export default function Layout({ children, activeTab, setActiveTab, spaceName }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto border-x border-white/10 bg-void-black">
      {/* Header */}
      <header className="p-4 border-bottom border-white/10 flex items-center justify-between sticky top-0 bg-void-black/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-void-purple rounded-sm flex items-center justify-center ghost-glow">
            <Ghost className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-mono font-bold tracking-tighter text-xl">
            {spaceName || 'VOID'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Room Temp</span>
            <span className="text-xs font-mono text-void-green">CHILL</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {children}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-void-black border-t border-white/10 p-2 flex justify-around items-center z-20">
        <NavButton 
          active={activeTab === 'feed'} 
          onClick={() => setActiveTab('feed')}
          icon={<MessageSquare className="w-5 h-5" />}
          label="Feed"
        />
        <NavButton 
          active={activeTab === 'games'} 
          onClick={() => setActiveTab('games')}
          icon={<Gamepad2 className="w-5 h-5" />}
          label="Play"
        />
        <NavButton 
          active={activeTab === 'info'} 
          onClick={() => setActiveTab('info')}
          icon={<Info className="w-5 h-5" />}
          label="About"
        />
        <NavButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
          icon={<Settings className="w-5 h-5" />}
          label="Admin"
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-2 transition-all",
        active ? "text-void-purple" : "text-white/40 hover:text-white/60"
      )}
    >
      {icon}
      <span className="text-[10px] uppercase font-mono tracking-tighter">{label}</span>
      {active && <div className="w-1 h-1 bg-void-purple rounded-full mt-0.5" />}
    </button>
  );
}
