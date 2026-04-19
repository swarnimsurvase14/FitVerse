import { motion } from 'motion/react';
import { Trophy, Medal, Crown } from 'lucide-react';

const rankings = [
  { rank: 1, name: "Alex Rivera", level: "Senior", points: 12502, icon: Crown, color: "text-amber-400" },
  { rank: 2, name: "Jordan Smith", level: "Junior", points: 11240, icon: Medal, color: "text-slate-300" },
  { rank: 3, name: "Sarah Chen", level: "Sophomore", points: 10890, icon: Medal, color: "text-amber-700" },
  { rank: 4, name: "Mike Johnson", level: "Senior", points: 9420 },
  { rank: 5, name: "Emma Wilson", level: "Freshman", points: 8850 }
];

export const Leaderboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
            <Trophy size={18} />
          </div>
          <h3 className="font-black text-white italic uppercase tracking-[0.2em] text-[10px]">Global Ranking Nodes</h3>
        </div>
      </div>
      <div className="space-y-4">
        {rankings.map((user) => (
          <div 
            key={user.rank}
            className={`flex items-center justify-between p-5 rounded-2xl transition-all border group relative overflow-hidden ${user.rank <= 3 ? 'bg-amber-500/10 border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
          >
            <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_2s_infinite] pointer-events-none" />
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-[10px] font-black text-slate-500 border border-white/5">
                #{user.rank}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white uppercase italic tracking-tight">{user.name}</span>
                  {user.icon && <user.icon size={12} className={user.color} />}
                </div>
                <span className="text-[10px] font-black text-amber-500/40 uppercase tracking-widest italic">{user.level} Sector</span>
              </div>
            </div>
            <div className="text-right relative z-10">
              <span className="text-sm font-black text-white italic">{user.points.toLocaleString()}</span>
              <span className="text-[9px] font-black text-slate-500 uppercase ml-1 tracking-widest">Synergy</span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-4 rounded-xl border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-amber-500 hover:border-amber-500/20 transition-all bg-white/5">
        View Global Analytics
      </button>
    </div>
  );
};
