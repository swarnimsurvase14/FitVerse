import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

interface BioLoadProps {
  productName: string;
}

export const BioLoadSimulator = ({ productName }: BioLoadProps) => {
  const [load, setLoad] = useState(0);
  const [muscleRecruitment, setMuscleRecruitment] = useState(0);
  const [neuralFatigue, setNeuralFatigue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(82);
      setMuscleRecruitment(91);
      setNeuralFatigue(14);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bento-card p-8 bg-slate-900/60 border-amber-500/10 relative overflow-hidden group">
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
           <Activity size={20} />
        </div>
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] italic">Bio-Metric Load Analysis</h4>
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Predictive Synchronization for {productName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 relative z-10">
        {[
          { label: 'Muscle Recruitment', value: muscleRecruitment, icon: Zap, color: 'bg-amber-500' },
          { label: 'Structural Tension', value: load, icon: TrendingUp, color: 'bg-emerald-500' },
          { label: 'Neural Buffer Recovery', value: 100 - neuralFatigue, icon: ShieldCheck, color: 'bg-sky-500' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
              <div className="flex items-center gap-2">
                 <stat.icon size={12} className="text-slate-400" />
                 <span className="text-slate-400">{stat.label}</span>
              </div>
              <span className="text-white">{stat.value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${stat.value}%` }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className={`h-full ${stat.color} shadow-[0_0_8px_rgba(255,255,255,0.2)]`}
               />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
         <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.3em]">
            <span className="text-slate-600">Sim Quality</span>
            <span className="text-emerald-500">Tier 1 // Accurate</span>
         </div>
      </div>

      {/* Decorative Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[length:100%_2px] bg-[linear-gradient(to_bottom,transparent,white)]" />
    </div>
  );
};
