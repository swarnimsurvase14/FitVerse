import { motion } from 'motion/react';
import { Zap, Activity, Shield, Radio } from 'lucide-react';

export const StatusBar = () => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border-b border-white/5 py-2 px-6 flex items-center justify-between z-[50] sticky top-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Neural Sync: <span className="text-emerald-500">Active</span></span>
        </div>
        <div className="hidden sm:flex items-center gap-3 border-l border-white/5 pl-6">
          <Activity size={12} className="text-amber-500/60" />
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Biological Load</span>
            <div className="w-20 h-[3px] bg-white/5 rounded-full mt-0.5 overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '42%' }}
                className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
               />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3">
          <Radio size={12} className="text-emerald-500 animate-pulse" />
          <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Uplink: <span className="text-white">SAT-04</span></span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-md border border-white/5">
          <Zap size={10} className="text-amber-500" />
          <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">PRIME SYSTEM</span>
        </div>
      </div>
    </div>
  );
};
