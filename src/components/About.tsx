import React from 'react';
import { Shield, Ghost, Zap, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="p-4 space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-mono font-bold tracking-tighter mb-1">THE VOID</h2>
        <p className="text-white/40 text-xs font-mono uppercase tracking-wider">Say anything. Own nothing.</p>
      </div>

      <div className="space-y-6">
        <Feature 
          icon={<Shield className="w-5 h-5 text-void-purple" />}
          title="ANONYMITY IS THE PRODUCT"
          description="Every decision protects your identity. The system knows who posted internally but never exposes that to anyone, including the admin."
        />
        <Feature 
          icon={<Ghost className="w-5 h-5 text-void-green" />}
          title="GHOST SESSIONS"
          description="Joining a space generates a unique session. Your identity in one space is never linked to another."
        />
        <Feature 
          icon={<Zap className="w-5 h-5 text-void-accent" />}
          title="REAL-TIME ENERGY"
          description="Room Temperature reads the collective energy of the space. Chill, Spicy, Chaotic, or Wholesome."
        />
        <Feature 
          icon={<Users className="w-5 h-5 text-blue-400" />}
          title="CLOSED GROUPS"
          description="Void is for groups who already know each other. Friends, classmates, coworkers. The real conversation happens here."
        />
      </div>

      <div className="pt-8 border-t border-white/10">
        <p className="text-[10px] font-mono text-white/20 text-center uppercase tracking-widest">
          Version 1.0 · 2026 · Confidential
        </p>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-mono font-bold text-xs uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-xs text-white/40 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
