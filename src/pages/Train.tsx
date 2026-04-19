import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateWorkoutPlan, WorkoutPlan } from '../services/aiService';
import { 
  Zap, 
  Target, 
  Dumbbell, 
  CheckCircle2, 
  Clock, 
  BrainCircuit,
  Save,
  Trash2,
  Plus,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function Train({ onInitialize }: { onInitialize?: () => void }) {
  const [goal, setGoal] = useState('Build Muscle');
  const [level, setLevel] = useState('Beginner');
  const [duration, setDuration] = useState(45);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [earnedBC, setEarnedBC] = useState<number | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const generated = await generateWorkoutPlan(goal, level, duration);
      setPlan(generated);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveWorkout = async () => {
    const cachedUser = localStorage.getItem('vanguard_user');
    if (!plan || !cachedUser) return;
    
    const user = JSON.parse(cachedUser);
    setSaving(true);
    
    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          name: plan.name,
          date: new Date().toISOString(),
          exercises: plan.exercises,
          duration: duration,
          status: 'completed'
        })
      });

      if (res.ok) {
        const { reward, updatedUser } = await res.json();
        setEarnedBC(reward);
        localStorage.setItem('vanguard_user', JSON.stringify(updatedUser)); // Keep session fresh
        setTimeout(() => setEarnedBC(null), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <h1 className="text-4xl font-black tracking-tighter text-white italic uppercase">Command Center</h1>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Initialize biological blueprint for daily tactical operations.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Operational Streak</span>
            <span className="text-xl font-black text-amber-500 italic uppercase">12 Cycle Sync</span>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-amber-500 shadow-xl">
             <Target size={24} />
          </div>
        </div>
      </header>

      {!plan ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card p-12 group relative overflow-hidden"
        >
          {/* HUD Scanline */}
          <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_3s_infinite] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-12 border-b border-white/5 pb-12">
            <div className="max-w-md">
              <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md uppercase tracking-[0.2em] mb-4 inline-block italic">Neural Interface 04</span>
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">Session Blueprint Generator</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">System-assigned algorithms will synthesize a high-intensity session based on your current biological telemetry.</p>
            </div>
            <div className="hidden lg:block">
               <BrainCircuit size={100} className="text-white/5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] flex justify-between">
                <span>Objective</span>
                <span className="text-amber-500/40 font-bold italic">Sector Select</span>
              </label>
              <select 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)}
                className="bg-slate-950 border border-white/5 p-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-amber-500/30 active:scale-95 transition-all shadow-inner"
              >
                <option className="bg-slate-950">Build Muscle</option>
                <option className="bg-slate-950">Fat Loss</option>
                <option className="bg-slate-950">Endurance</option>
                <option className="bg-slate-950">Functional Strength</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] flex justify-between">
                <span>Tier level</span>
                <span className="text-amber-500/40 font-bold italic">Expertise Sync</span>
              </label>
              <select 
                value={level} 
                onChange={(e) => setLevel(e.target.value)}
                className="bg-slate-950 border border-white/5 p-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-amber-500/30 active:scale-95 transition-all shadow-inner"
              >
                <option className="bg-slate-950">Beginner</option>
                <option className="bg-slate-950">Intermediate</option>
                <option className="bg-slate-950">Athlete</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] flex justify-between">
                <span>Duration</span>
                <span className="text-amber-500/40 font-bold italic">Temporal Lock</span>
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  value={duration} 
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-amber-500/30 active:scale-95 transition-all shadow-inner"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-amber-500/40 uppercase tracking-widest pointer-events-none">MIN</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-6 bg-amber-500 text-slate-950 rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 shadow-2xl shadow-amber-500/20 hover:bg-white hover:text-slate-900 transition-all active:scale-[0.98] group"
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <Zap size={22} />
              </motion.div>
            ) : (
              <>
                <BrainCircuit size={22} className="group-hover:rotate-12 transition-transform" />
                Synthesize Operation Plan
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 bg-white/5 p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden backdrop-blur-xl group">
             {/* Dynamic Light Background Line */}
             <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 opacity-50" />
             
             <div className="relative z-10 flex flex-col gap-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">Mission Briefing Verified</span>
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse [animation-delay:200ms]" />
                  </div>
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">{plan.name}</h2>
                <div className="flex gap-6 mt-4">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Protocol Sector</span>
                      <span className="text-xs font-black text-amber-500 uppercase tracking-widest">{goal}</span>
                   </div>
                   <div className="w-px h-8 bg-white/10" />
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Tactical Tier</span>
                      <span className="text-xs font-black text-amber-500 uppercase tracking-widest">{level}</span>
                   </div>
                </div>
             </div>
             
             <div className="flex gap-4 relative z-10 flex-wrap">
                <button 
                   onClick={onInitialize}
                   className="flex items-center gap-4 px-8 py-4 bg-amber-500 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl shadow-amber-500/20 active:scale-95 group"
                >
                  <Zap size={16} className="group-hover:animate-bounce" /> INITIALIZE ACTIVE DEPLOYMENT
                </button>
                <button 
                   onClick={() => setPlan(null)}
                   className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-500 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all active:scale-95"
                >
                  <Trash2 size={16} /> Abort Sync
                </button>
             </div>
          </div>

          <div className="grid gap-6">
            {plan.exercises.map((ex, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bento-card p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 group relative overflow-hidden"
              >
                {/* Holographic scanning effect on hover */}
                <div className="absolute inset-x-0 h-full w-[200%] bg-gradient-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                
                <div className="flex gap-10 items-center relative z-10">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-slate-950 border border-white/5 flex flex-col items-center justify-center font-black group-hover:border-amber-500/30 transition-all shadow-inner">
                    <span className="text-[10px] text-slate-700 leading-none mb-1 font-sans">#</span>
                    <span className="text-2xl text-white group-hover:text-amber-500 transition-colors italic">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter group-hover:text-amber-500 transition-colors mb-2 leading-none">{ex.name}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                       <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Load</span>
                          <span className="text-xs font-black text-slate-300 italic uppercase">4 Sets × {ex.reps} Recs</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Rest</span>
                          <span className="text-xs font-black text-emerald-500 italic uppercase">{ex.rest} Pulse</span>
                       </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 relative z-10">
                    <div className="hidden lg:flex flex-col text-right">
                       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 italic">Technical Note</span>
                       <p className="text-[10px] text-slate-400 font-bold max-w-[280px] leading-relaxed uppercase tracking-wider group-hover:text-slate-200 transition-colors">{ex.description}</p>
                    </div>
                    <div className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-slate-800 hover:text-amber-500 hover:border-amber-500/20 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all cursor-pointer bg-white/5">
                       <CheckCircle2 size={18} />
                    </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 bento-card p-12 relative overflow-hidden bg-white/5 border border-white/5 group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <BrainCircuit size={120} />
                </div>
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                      <Sparkles size={18} />
                   </div>
                   <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 italic">Pre-Sync Intelligence</h4>
                </div>
                <div className="grid gap-6 auto-rows-min">
                   {plan.tips.map((tip, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className="flex gap-5 items-start p-6 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-amber-500/20 hover:bg-slate-950/60 transition-all"
                     >
                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] shrink-0" />
                       <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">{tip}</p>
                     </motion.div>
                   ))}
                </div>
             </div>

             <div className="flex flex-col gap-8">
                <div className="bento-card p-10 bg-gradient-to-br from-amber-500 to-amber-600 border-none shadow-2xl shadow-amber-500/20 text-slate-950 flex flex-col justify-between overflow-hidden relative group h-full min-h-[300px]">
                   {/* Animated Background Pulse */}
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)] animate-pulse" />
                   
                   <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-[10px] font-black bg-slate-950 text-amber-500 px-3 py-1 rounded-md uppercase tracking-[0.2em] italic">Final Sync Check</span>
                        <Zap size={18} className="animate-pulse" />
                      </div>
                      <h3 className="text-3xl font-black tracking-tighter uppercase italic leading-[0.85] mb-6">Authorize <br/> Operational <br/> Completion</h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-80 leading-relaxed max-w-[200px]">By synchronizing this session, your biological record will be updated in the Neural Grid.</p>
                   </div>

                   <button 
                      onClick={saveWorkout}
                      disabled={saving || earnedBC !== null}
                      className="relative z-10 w-full py-6 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50"
                   >
                     {saving ? (
                        <>
                           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                              <Loader2 size={18} />
                           </motion.div>
                           Synchronizing...
                        </>
                     ) : earnedBC !== null ? (
                        <span className="text-emerald-500">+{earnedBC} BIO-CREDITS EARNED</span>
                     ) : (
                        <>
                           <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                           Finalize & Upload
                        </>
                     )}
                   </button>
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
