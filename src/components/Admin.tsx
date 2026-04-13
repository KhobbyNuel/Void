import React from 'react';
import { Settings2, ShieldAlert, BarChart3, Trash2 } from 'lucide-react';

export default function Admin() {
  return (
    <div className="p-4 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-mono font-bold tracking-tighter mb-1">ADMIN PANEL</h2>
        <p className="text-white/40 text-xs font-mono uppercase tracking-wider">Vibe Control & Moderation</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Members" value="24" />
        <StatCard label="Posts Today" value="156" />
        <StatCard label="Flagged Posts" value="2" />
        <StatCard label="Active Games" value="1" />
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Space Settings</h3>
        
        <AdminAction 
          icon={<Settings2 className="w-4 h-4" />}
          title="Vibe Mode"
          value="Open Invite"
        />
        <AdminAction 
          icon={<ShieldAlert className="w-4 h-4" />}
          title="Cooldown Timer"
          value="None"
        />
        <AdminAction 
          icon={<BarChart3 className="w-4 h-4" />}
          title="Analytics"
          value="View Detailed"
        />
        <AdminAction 
          icon={<Trash2 className="w-4 h-4 text-red-400" />}
          title="Archive Space"
          value="Destructive"
          danger
        />
      </div>

      <div className="mt-8 p-4 bg-void-purple/10 border border-void-purple/20 rounded-sm">
        <p className="text-[10px] font-mono text-void-purple uppercase mb-2 tracking-wider">Pro Tip</p>
        <p className="text-xs text-void-purple/80 leading-relaxed">
          You can never see who posted what. Anonymity is protected end-to-end, even from you.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="brutalist-card flex flex-col items-center justify-center py-6">
      <span className="text-2xl font-mono font-bold mb-1">{value}</span>
      <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function AdminAction({ icon, title, value, danger }: { icon: React.ReactNode; title: string; value: string; danger?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 brutalist-border bg-white/5 hover:bg-white/10 cursor-pointer transition-all group">
      <div className="flex items-center gap-3">
        <div className="text-white/40 group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="text-xs font-mono uppercase tracking-tight">{title}</span>
      </div>
      <span className={danger ? "text-[10px] font-mono text-red-400" : "text-[10px] font-mono text-white/40"}>
        {value}
      </span>
    </div>
  );
}
