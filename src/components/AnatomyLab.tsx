import { motion } from 'motion/react';

const bodyParts = [
  { id: 'chest', label: 'Pectorals', path: 'M 100 80 Q 125 75 150 80 Q 150 110 125 115 Q 100 110 100 80', color: 'fill-amber-400' },
  { id: 'abs', label: 'Core', path: 'M 110 120 Q 125 115 140 120 Q 135 150 125 155 Q 115 150 110 120', color: 'fill-amber-400' },
  { id: 'legs', label: 'Quads', path: 'M 105 165 Q 125 160 145 165 L 140 220 L 110 220 Z', color: 'fill-amber-400' },
  { id: 'arms', label: 'Biceps', path: 'M 85 85 Q 70 90 65 110 L 80 115 Z', color: 'fill-amber-400' },
  { id: 'armsR', label: 'Biceps R', path: 'M 165 85 Q 180 90 185 110 L 170 115 Z', color: 'fill-amber-400' },
];

export const AnatomyLab = ({ onPartSelect, activePart }: { onPartSelect: (part: string) => void, activePart: string }) => {
  return (
    <div className="flex flex-col gap-6 items-center p-8 bg-slate-950/40 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.05),transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] font-black tracking-[0.3em] text-amber-500/60 uppercase">Operational Filter</span>
        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Anatomy Lab</h3>
      </div>

      <div className="relative w-48 h-64">
        {/* Subtle HUD scanline */}
        <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_2.5s_infinite] pointer-events-none" />
        
        <svg viewBox="0 0 250 250" className="w-full h-full drop-shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          {/* Base Mannequin Silhouette */}
          <path 
            d="M 125 20 Q 135 20 140 35 L 135 50 L 115 50 L 110 35 Q 115 20 125 20
               M 115 55 L 135 55 Q 170 60 175 90 L 195 180 Q 185 190 170 185 L 160 90 L 155 75 L 95 75 L 90 90 L 80 185 Q 65 190 55 180 L 75 90 Q 80 60 115 55
               M 110 160 L 140 160 L 150 240 L 130 240 L 125 180 L 120 240 L 100 240 Z" 
            className="fill-white/5 stroke-white/10 stroke-1"
          />
          
          {/* Interactive Regions */}
          {bodyParts.map((part) => (
            <motion.path
              key={part.id}
              d={part.path}
              whileHover={{ scale: 1.02, opacity: 1 }}
              onClick={() => onPartSelect(part.id === activePart ? 'All' : part.label)}
              className={`cursor-pointer transition-all duration-300 ${activePart === part.label ? 'fill-amber-500 opacity-100 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'fill-white/5 hover:fill-amber-500/20 stroke-white/10'}`}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3 w-full mt-4">
        {bodyParts.map((part) => (
          part.id !== 'armsR' && (
            <button
              key={part.id}
              onClick={() => onPartSelect(part.id === activePart ? 'All' : part.label)}
              className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border italic ${activePart === part.label ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-2xl shadow-amber-500/30' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10 hover:border-white/20'}`}
            >
              {part.label}
            </button>
          )
        ))}
      </div>
      
      <p className="text-[10px] text-amber-500/40 font-black uppercase tracking-widest mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity italic">Target Sector To Isolate</p>
    </div>
  );
};
