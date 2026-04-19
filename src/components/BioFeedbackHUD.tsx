import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Heart, Zap, Timer, Wind, ShieldAlert } from 'lucide-react';

export const BioFeedbackHUD = () => {
  const [bpm, setBpm] = useState(72);
  const [strain, setStrain] = useState(12);
  const [efficiency, setEfficiency] = useState(94);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setStrain(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.6 ? 0.5 : -0.2))));
      setEfficiency(prev => Math.min(100, Math.max(80, prev + (Math.random() > 0.7 ? -0.1 : 0.1))));
      setTimer(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HUD Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity size={18} className="text-amber-500 animate-pulse" />
          <h4 className="text-[10px] font-black italic uppercase tracking-[0.3em] text-white">Live Bio-Telemetry</h4>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
           <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Neural Link Sync</span>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Heart Rate', value: bpm, unit: 'BPM', icon: Heart, color: 'text-rose-500' },
          { label: 'Tactical Strain', value: strain.toFixed(1), unit: '%', icon: Zap, color: 'text-amber-500' },
          { label: 'Neural Accuracy', value: efficiency.toFixed(1), unit: '%', icon: Activity, color: 'text-emerald-500' },
          { label: 'Mission Clock', value: formatTime(timer), unit: '', icon: Timer, color: 'text-white' },
        ].map((stat) => (
          <div key={stat.label} className="bento-card p-5 border-white/5 bg-black/40 backdrop-blur-md hover:bg-white/[0.05] transition-all">
            <div className="flex items-center gap-3 mb-3">
               <stat.icon size={14} className={stat.color} />
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div className="flex items-end gap-1">
               <span className="text-2xl font-black text-white italic tracking-tighter leading-none">{stat.value}</span>
               {stat.unit && <span className="text-[9px] font-bold text-slate-600 uppercase mb-0.5">{stat.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Waveform Visualization (Mock) */}
      <div className="h-24 bento-card p-4 border-white/5 relative overflow-hidden bg-black/60">
        <div className="absolute inset-0 flex items-center justify-around opacity-20 px-4">
          {[...Array(24)].map((_, i) => (
            <motion.div 
               key={i}
               animate={{ height: [10, 40, 20, 50, 10] }}
               transition={{ duration: 1 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
               className="w-1 bg-amber-500 rounded-full"
            />
          ))}
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full">
           <div className="flex justify-between items-center">
             <span className="text-[7px] font-black text-amber-500/40 uppercase tracking-widest">Metabolic Waveform Analysis</span>
             <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest italic">REF: PRIME_OS</span>
           </div>
           <div className="flex justify-between items-end">
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <Wind size={10} className="text-slate-500" />
                    <span className="text-[8px] font-black text-slate-400">O2 Sat: 98%</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <ShieldAlert size={10} className="text-amber-500/40" />
                    <span className="text-[8px] font-black text-slate-400">Cortisol: Normal</span>
                 </div>
              </div>
              <span className="text-[8px] font-black text-amber-500 animate-pulse">SAMPLING...</span>
           </div>
        </div>
      </div>
    </div>
  );
};
