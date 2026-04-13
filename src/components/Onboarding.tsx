import React, { useState } from 'react';
import { Ghost, ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onJoin: (code: string, nickname: string) => void;
  onCreate: (name: string) => void;
}

export default function Onboarding({ onJoin, onCreate }: OnboardingProps) {
  const [mode, setMode] = useState<'start' | 'join' | 'create'>('start');
  const [code, setCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [spaceName, setSpaceName] = useState('');

  if (mode === 'start') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-void-black text-white">
        <div className="w-20 h-20 bg-void-purple rounded-sm flex items-center justify-center ghost-glow mb-8 animate-bounce">
          <Ghost className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-6xl font-mono font-bold tracking-tighter mb-2">VOID</h1>
        <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] mb-12">Say anything. Own nothing.</p>

        <div className="w-full max-w-xs space-y-4">
          <button 
            onClick={() => setMode('join')}
            className="w-full brutalist-button py-4 text-sm font-mono flex items-center justify-center gap-2 group"
          >
            <span>ENTER A SPACE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setMode('create')}
            className="w-full py-4 text-sm font-mono text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>CREATE NEW SPACE</span>
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="min-h-screen flex flex-col p-8 bg-void-black text-white">
        <button onClick={() => setMode('start')} className="text-white/40 font-mono text-xs uppercase mb-12 hover:text-white transition-colors">
          ← Back
        </button>

        <h2 className="text-3xl font-mono font-bold tracking-tighter mb-8">JOIN SPACE</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono text-white/40 tracking-widest">Invite Code</label>
            <input 
              type="text" 
              placeholder="XJ92K1"
              maxLength={6}
              className="w-full bg-white/5 border border-white/10 p-4 font-mono text-2xl tracking-[0.5em] focus:border-void-purple outline-none uppercase"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-mono text-white/40 tracking-widest">Space Nickname</label>
            <input 
              type="text" 
              placeholder="Ghost 7"
              className="w-full bg-white/5 border border-white/10 p-4 font-mono text-lg focus:border-void-purple outline-none"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <p className="text-[10px] text-white/20 font-mono italic">This is only visible in this space. No one will know it's you.</p>
          </div>

          <button 
            disabled={code.length < 6 || !nickname}
            onClick={() => onJoin(code, nickname)}
            className="w-full brutalist-button py-4 text-sm font-mono mt-8 disabled:opacity-30"
          >
            GHOST IN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-8 bg-void-black text-white">
      <button onClick={() => setMode('start')} className="text-white/40 font-mono text-xs uppercase mb-12 hover:text-white transition-colors">
        ← Back
      </button>

      <h2 className="text-3xl font-mono font-bold tracking-tighter mb-8">CREATE SPACE</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-mono text-white/40 tracking-widest">Space Name</label>
          <input 
            type="text" 
            placeholder="The Office"
            className="w-full bg-white/5 border border-white/10 p-4 font-mono text-lg focus:border-void-purple outline-none"
            value={spaceName}
            onChange={(e) => setSpaceName(e.target.value)}
          />
        </div>

        <button 
          disabled={!spaceName}
          onClick={() => onCreate(spaceName)}
          className="w-full brutalist-button py-4 text-sm font-mono mt-8 disabled:opacity-30"
        >
          GENERATE VOID
        </button>
      </div>
    </div>
  );
}
