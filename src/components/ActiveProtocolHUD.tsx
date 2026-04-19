import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Zap, TrendingUp, ShieldAlert, Wifi, Timer, Heart } from 'lucide-react';

interface ActiveProtocolHUDProps {
  onClose: () => void;
}

export const ActiveProtocolHUD = ({ onClose }: ActiveProtocolHUDProps) => {
  const [bpm, setBpm] = useState(142);
  const [progress, setProgress] = useState(0);
  const [strain, setStrain] = useState(45);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setStrain(prev => Math.min(98, prev + Math.random() * 0.5));
      setTime(prev => prev + 1);
    }, 1000);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressTimer);
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Pulsing Intensity */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)]"
      />
      
      {/* Tactical Vignette */}
      <div className="absolute inset-0 border-[40px] border-black/80 pointer-events-none" />
      <div className="absolute inset-x-0 h-[2px] bg-amber-500/10 top-0 animate-[scan_4s_linear_infinite]" />

      {/* Main HUD Central Element */}
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-4 px-6 py-2 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-[0.4em] italic rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)]"
          >
            <ShieldAlert size={14} className="animate-pulse" />
            Heavy-Weight Protocol Active
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">Operational <br/> Deployment</h2>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
           {/* BPM Section */}
           <div className="flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl relative group">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Sync Rate</span>
              <div className="flex items-end gap-2">
                 <motion.span 
                   key={bpm}
                   initial={{ y: 10, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   className="text-7xl font-black text-white italic leading-none"
                 >
                   {bpm}
                 </motion.span>
                 <span className="text-amber-500 font-bold mb-2">BPM</span>
              </div>
              <div className="flex items-center gap-2">
                 {[...Array(8)].map((_, i) => (
                   <motion.div 
                     key={i}
                     animate={{ height: [4, Math.random() * 20 + 10, 4] }}
                     transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                     className="w-1 bg-amber-500/40 rounded-full"
                   />
                 ))}
                 <Heart size={16} className="text-rose-500 animate-[ping_1s_infinite] ml-2" />
              </div>
           </div>

           {/* Time Section */}
           <div className="flex flex-col items-center justify-center p-8 bg-amber-500 rounded-[3rem] shadow-[0_0_50px_rgba(245,158,11,0.2)] text-slate-950 relative overflow-hidden h-full">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Tactical Duration</span>
              <Timer size={32} className="mb-4 animate-spin-slow" />
              <span className="text-6xl font-black italic tracking-tighter">{formatTime(time)}</span>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
           </div>

           {/* Strain Section */}
           <div className="flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-xl">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Load Intensity</span>
              <div className="flex items-end gap-2">
                 <span className="text-7xl font-black text-white italic leading-none">{Math.round(strain)}</span>
                 <span className="text-rose-500 font-bold mb-2">%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-2">
                 <motion.div 
                    animate={{ width: `${strain}%` }}
                    className={`h-full shadow-[0_0_10px_rgba(245,158,11,0.5)] ${strain > 80 ? 'bg-rose-500' : 'bg-amber-500'}`}
                 />
              </div>
              <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest animate-pulse">Critical Load Detected</span>
           </div>
        </div>

        {/* Progress System */}
        <div className="w-full flex flex-col gap-4">
           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
              <span className="flex items-center gap-2"><Wifi size={12} className="text-emerald-500" /> Neural Uplink: Active</span>
              <span>Protocol Completion: {Math.floor(progress)}%</span>
           </div>
           <div className="h-4 bg-white/5 rounded-2xl p-1 border border-white/5 overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-xl relative"
              >
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] bg-[length:50%_100%] animate-[shimmer_1.5s_infinite]" />
              </motion.div>
           </div>
        </div>

        {/* Abort Button */}
        <button 
          onClick={onClose}
          className="mt-8 px-12 py-5 bg-white/5 border border-white/10 hover:border-rose-500 hover:text-rose-500 transition-all rounded-2xl font-black text-[10px] uppercase tracking-[0.5em] italic flex items-center gap-4 group"
        >
          <Zap size={16} className="text-amber-500" />
          Abort Operational Deployment
        </button>
      </div>

      {/* Decorative HUD Details */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 opacity-40">
         <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">SYS_READY // DEPLOY_ACTIVE</span>
         <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest italic">USER: {new Date().toLocaleTimeString()}</span>
      </div>
      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 opacity-40">
         <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">GRID COORDINATES: 40.7128° N, 74.0060° W</span>
         <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest italic animate-pulse">ENCRYPTION: QUANTUM_SYNC</span>
      </div>
    </div>
  );
};
