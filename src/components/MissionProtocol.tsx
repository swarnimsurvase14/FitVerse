import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Target, CheckCircle2, ChevronRight, Lock } from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  type: 'Combat' | 'Neural' | 'Metabolic';
  points: number;
  completed: boolean;
  locked?: boolean;
}

export const MissionProtocol = () => {
  const [missions, setMissions] = useState<Mission[]>([
    { id: 1, title: 'Tactical Loadout Check', type: 'Metabolic', points: 250, completed: true },
    { id: 2, title: 'Initialize Heavy-Lift Module', type: 'Combat', points: 1200, completed: false },
    { id: 3, title: 'Neural Academy: S-Tier Pass', type: 'Neural', points: 800, completed: false },
    { id: 4, title: 'Vanguard Endurance Loop', type: 'Combat', points: 500, completed: false, locked: true },
  ]);

  const toggleMission = (id: number) => {
    setMissions(prev => prev.map(m => m.id === id && !m.locked ? { ...m, completed: !m.completed } : m));
  };

  return (
    <div className="bento-card p-10 bg-slate-900/40 relative overflow-hidden flex flex-col gap-8 shadow-2xl">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-amber-500" />
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Daily Missions</h3>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">Active Protocol</span>
           <span className="text-[18px] font-black text-white italic tracking-tighter">SEC: {missions.filter(m => m.completed).length}/{missions.length}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {missions.map((mission) => (
          <motion.div 
            key={mission.id}
            whileHover={!mission.locked ? { x: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}}
            onClick={() => toggleMission(mission.id)}
            className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${mission.locked ? 'bg-black/40 border-white/5 opacity-50' : mission.completed ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/5'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${mission.locked ? 'bg-slate-800' : mission.completed ? 'bg-amber-500 text-slate-900' : 'bg-white/10 text-white'}`}>
                {mission.locked ? <Lock size={16} /> : mission.completed ? <CheckCircle2 size={16} /> : <Zap size={16} />}
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-black uppercase tracking-widest ${mission.completed ? 'text-amber-500' : 'text-slate-400'}`}>
                  {mission.type} Protocol
                </span>
                <span className={`text-[15px] font-black italic uppercase tracking-tighter ${mission.completed ? 'text-white' : 'text-slate-200'}`}>
                  {mission.title}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[11px] font-black text-amber-500 uppercase">+{mission.points} PT</span>
               <ChevronRight size={14} className="text-slate-700" />
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 transition-all">
        Operational Archives
      </button>

      {/* Military Grade Texture Background */}
      <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] text-white">
        <Shield size={200} />
      </div>
    </div>
  );
};
