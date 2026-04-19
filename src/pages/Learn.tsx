import { useState, useEffect } from 'react';
import { motion, animate, AnimatePresence } from 'motion/react';
import { Play, Lock, BookOpen, Clock, Star, Award, Search, Network, LayoutGrid, Activity, Zap } from 'lucide-react';
import { AnatomyLab } from '../components/AnatomyLab';

const AnimatedCounter = ({ value }: { value: number | string }) => {
// ... existing AnimatedCounter ...
  const [displayValue, setDisplayValue] = useState<string | number>(0);

  useEffect(() => {
    // If it's a number (lessons)
    if (typeof value === 'number') {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(latest) {
          setDisplayValue(Math.round(latest));
        },
      });
      return () => controls.stop();
    } 
    
    // If it's a duration string (e.g., "4h 20m")
    if (typeof value === 'string') {
      const hoursMatch = value.match(/(\d+)h/);
      const minsMatch = value.match(/(\d+)m/);
      const targetHours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
      const targetMins = minsMatch ? parseInt(minsMatch[1]) : 0;

      let currentH = 0;
      let currentM = 0;

      const controlsH = animate(0, targetHours, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(latest) {
          currentH = Math.round(latest);
          updateDuration();
        }
      });

      const controlsM = animate(0, targetMins, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(latest) {
          currentM = Math.round(latest);
          updateDuration();
        }
      });

      const updateDuration = () => {
        let result = "";
        if (targetHours > 0) result += `${currentH}h `;
        if (targetMins > 0) result += `${currentM}m`;
        setDisplayValue(result.trim());
      };

      return () => {
        controlsH.stop();
        controlsM.stop();
      };
    }
  }, [value]);

  return <span>{displayValue}</span>;
};

const courses = [
  {
    id: 1,
    title: "Hypertrophy Science 101",
    instructor: "Dr. Muscle",
    duration: "4h 20m",
    lessons: 12,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format",
    premium: false,
    category: "Science",
    muscle: "Pectorals",
    syllabus: ["Mechanobiology", "Sarcoplasmic vs Myofibrillar", "Mammalian Target of Rapamycin (mTOR)"]
  },
  {
    id: 5,
    title: "Bio-Energy Systems & ATP",
    instructor: "Dr. Flux",
    duration: "5h 15m",
    lessons: 15,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=1000&auto=format",
    premium: true,
    category: "Science",
    muscle: "All",
    syllabus: ["Adenosine Triphosphate Cycle", "Glycolytic Flux", "Oxidative Phosphorylation"]
  },
  {
    id: 2,
    title: "Dorm Room Nutrition",
    instructor: "Elite Kitchen",
    duration: "2h 45m",
    lessons: 8,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format",
    premium: true,
    category: "Nutrition",
    muscle: "All",
    syllabus: ["Bioavailable Proteins", "Macro-nutrient Timing", "Micronutrient Density"]
  },
  {
    id: 6,
    title: "Micronutrient Sync",
    instructor: "Bio-Chemist",
    duration: "3h 50m",
    lessons: 11,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1000&auto=format",
    premium: false,
    category: "Nutrition",
    muscle: "All",
    syllabus: ["Mineral Chelation", "Vitamin Co-factors", "Electrolyte Ion Gradient"]
  },
  {
    id: 7,
    title: "Periodized Fueling",
    instructor: "Strategic Chef",
    duration: "4h 10m",
    lessons: 14,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1000&auto=format",
    premium: true,
    category: "Nutrition",
    muscle: "All",
    syllabus: ["Intra-workout Glucose", "Refeed Protocols", "Metabolic Flexibility"]
  },
  {
    id: 8,
    title: "Neuro-Endocrine Sync",
    instructor: "Dr. Neuron",
    duration: "7h 30m",
    lessons: 22,
    rating: 5.0,
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=1000&auto=format",
    premium: true,
    category: "Science",
    muscle: "All",
    syllabus: ["Cortisol-Insulin Axis", "Leptin Signaling", "Ghrelin Suppression Logic"]
  },
  {
    id: 3,
    title: "Advanced Biomechanics",
    instructor: "Prof. Lift",
    duration: "6h 15m",
    lessons: 20,
    rating: 5.0,
    thumbnail: "https://images.unsplash.com/photo-1532619675605-1eed6707220e?q=80&w=1000&auto=format",
    premium: true,
    category: "Expert",
    muscle: "Core",
    syllabus: ["Kinematic Chains", "Torque & Lever Arms", "Force Vector Analysis"]
  },
  {
    id: 4,
    title: "Functional Stability",
    instructor: "Coach Core",
    duration: "3h 10m",
    lessons: 10,
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format",
    premium: false,
    category: "Training",
    muscle: "Quads",
    syllabus: ["Proprioceptive Feedback", "Dynamic Balance", "Unilateral Strength"]
  }
];

export const MetabolicLab = () => {
  const [flux, setFlux] = useState(65);
  
  return (
    <div className="glass-card p-8 border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 text-amber-500">
        <Activity size={80} />
      </div>
      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6 block">Metabolic Lab Simulator</span>
      
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white italic tracking-tighter">{flux}%</span>
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Ion Gradient Flux</span>
          </div>
          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${flux > 80 ? 'border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'border-white/10 text-slate-700'}`}>
             <Zap size={20} className={flux > 80 ? 'animate-pulse' : ''} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
            <span className="text-slate-500">Simulation Pressure</span>
            <span className="text-amber-500">{(flux * 1.2).toFixed(1)} PSI</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={flux} 
            onChange={(e) => setFlux(parseInt(e.target.value))}
            className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
           <p className="text-[9px] font-black text-slate-400 leading-relaxed uppercase tracking-widest italic">
             {flux > 80 ? 'CRITICAL: High metabolic turnover detected. Glycolytic enzymes saturated.' : 'STATUS: Homeostatic balance maintained. Nutrient ion channels operational.'}
           </p>
        </div>
      </div>
    </div>
  );
};

export default function Learn() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeMuscle, setActiveMuscle] = useState('All');
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'path'>('grid');

  const filteredCourses = courses.filter(c => {
    const tabMatch = activeTab === 'All' || c.category === activeTab;
    const muscleMatch = activeMuscle === 'All' || c.muscle === activeMuscle;
    return tabMatch && muscleMatch;
  });

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2 italic uppercase">Neural Academy</h1>
          <p className="text-slate-500 font-medium text-lg">Master the biological blueprints of high performance.</p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Filter session..." 
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-black uppercase outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-600 text-white" 
            />
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-amber-500 text-slate-900' : 'text-slate-500 hover:text-white'}`}>
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setViewMode('path')} className={`p-2 rounded-lg transition-all ${viewMode === 'path' ? 'bg-amber-500 text-slate-900' : 'text-slate-500 hover:text-white'}`}>
              <Network size={16} />
            </button>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            {['All', 'Science', 'Nutrition', 'Training'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === tab ? 'bg-amber-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="bento-card p-8 border-none bg-amber-500/5">
            <h4 className="text-[10px] font-black italic text-amber-500 uppercase tracking-[0.3em] mb-6 block">Anatomical Focus</h4>
            <AnatomyLab activePart={activeMuscle} onPartSelect={setActiveMuscle} />
          </div>
          <div className="glass-card p-8 border border-white/5">
             <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 block">Certification Progress</span>
             <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 italic">Biomechanics Specialist</span>
                  <span className="text-[10px] font-black text-amber-500">LEVEL 4</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                </div>
             </div>
          </div>
          <MetabolicLab />
        </div>
        
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredCourses.map((course) => (
                  <motion.div 
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative flex flex-col bento-card overflow-hidden hover:border-amber-500/30 transition-all hover:bg-white/[0.07]"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                        {course.premium ? (
                          <div className="w-14 h-14 rounded-full bg-amber-500/80 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-xl">
                            <Lock size={20} />
                          </div>
                        ) : (
                          <button 
                             onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                             className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:scale-110 active:scale-95 transition-all"
                          >
                            <Play size={20} fill="currentColor" />
                          </button>
                        )}
                      </div>
                      {course.premium && (
                        <div className="absolute top-6 left-6 px-3 py-1 bg-amber-500 text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-md italic">
                          SECURED ACCESS
                        </div>
                      )}
                      <div className="absolute bottom-6 right-6 px-3 py-1 bg-slate-900/60 backdrop-blur-md text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/5">
                        FOCUS: {course.muscle}
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <span className="stat-pill bg-amber-500/10 text-amber-500 border-amber-500/20">{course.category}</span>
                        <div className="flex items-center gap-1 text-[10px] font-black text-amber-400">
                          <Star size={12} className="fill-current" />
                          {course.rating}
                        </div>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-1 leading-tight tracking-tight italic uppercase">{course.title}</h3>
                      <p className="text-slate-500 mb-6 font-bold text-xs uppercase tracking-widest opacity-60">Sect: {course.instructor}</p>
                      
                      {expandedCourse === course.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mb-6 pt-6 border-t border-white/5"
                        >
                          <h4 className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-4 italic">Session Syllabus</h4>
                          <div className="flex flex-col gap-3">
                             {course.syllabus.map((item, idx) => (
                               <div key={idx} className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                  <div className="w-1.5 h-1.5 bg-amber-500/40 rounded-full" />
                                  {item}
                               </div>
                             ))}
                          </div>
                        </motion.div>
                      )}

                      <div className="mt-auto flex items-center gap-8 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                          <Clock size={12} className="text-amber-500/60" />
                          <AnimatedCounter value={course.duration} />
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                          <BookOpen size={12} className="text-amber-500/60" />
                          <AnimatedCounter value={course.lessons} /> Modules
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="path"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-12 py-10 relative"
              >
                {/* Connecting Lines (Simplified representation) */}
                <div className="absolute left-[39px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-amber-500/40 via-white/5 to-amber-500/40" />

                <div className="flex flex-col gap-16 relative">
                  {filteredCourses.map((course, idx) => (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-10 group"
                    >
                      <div className="w-20 h-20 bg-slate-950 border-2 border-amber-500/20 rounded-full flex items-center justify-center text-amber-500 shadow-2xl relative z-10 group-hover:border-amber-500 group-hover:shadow-amber-500/20 transition-all">
                        <Network size={32} className="opacity-40 group-hover:opacity-100" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-white">
                          {idx + 1}
                        </div>
                      </div>
                      
                      <div className="flex-grow bento-card p-8 bg-white/[0.03] hover:bg-white/[0.07] border-white/5 hover:border-amber-500/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest italic mb-1">{course.category} Protocol</span>
                              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter group-hover:text-amber-500 transition-colors">{course.title}</h3>
                           </div>
                           <div className="flex items-center gap-4">
                              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Efficiency: {course.rating}</span>
                              {course.premium && <Lock size={14} className="text-amber-500" />}
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-6 pt-6 border-t border-white/5">
                           {course.syllabus.slice(0, 3).map((item, i) => (
                             <span key={i} className="text-[9px] font-black text-slate-500 uppercase tracking-widest border border-white/5 px-3 py-1 rounded-md">{item}</span>
                           ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10">
              <Search className="text-white/10 mb-4" size={40} />
              <p className="text-slate-600 font-black uppercase tracking-widest text-xs italic">Telemetry Null: No sessions found</p>
            </div>
          )}
        </div>
      </div>

      <section className="bg-amber-500 p-12 rounded-[2.5rem] text-slate-900 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-amber-500/20 relative overflow-hidden group">
         <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/10 transition-colors pointer-events-none" />
         <div className="max-w-xl text-center md:text-left relative z-10">
           <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
             <Award size={24} className="text-slate-900" />
             <h4 className="font-black uppercase tracking-[0.3em] text-[10px] italic">Auth Key: Verified</h4>
           </div>
           <h2 className="text-4xl font-black mb-4 leading-tight tracking-tighter italic uppercase">Neural Verified Authority</h2>
           <p className="text-slate-800 mb-8 font-bold leading-relaxed text-sm">Synchronize with master trainers to unlock cryptographic certificates. Scale your biological dominance through academic rigor.</p>
           <button className="bg-slate-900 text-white px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-slate-800 active:scale-95 shadow-xl">Synthesize Certificate</button>
         </div>
         <div className="w-56 h-56 bg-slate-900/10 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center border border-slate-900/10 relative z-10">
            <Award size={100} className="text-slate-900 opacity-20" />
         </div>
      </section>
    </div>
  );
}
