import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  BookOpen, 
  ShoppingBag, 
  LayoutDashboard, 
  User as UserIcon, 
  LogOut, 
  Flame,
  Search,
  Menu,
  X,
  Plus,
  ArrowRight,
  Target,
  Award,
  BarChart as BarChartIcon
} from 'lucide-react';
import Train from './pages/Train';
import Learn from './pages/Learn';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import { Leaderboard } from './components/Leaderboard';
import { AIAdvisor } from './components/AIAdvisor';
import { ProgressionCharts } from './components/ProgressionCharts';
import { Terminal } from './components/Terminal';
import { StatusBar } from './components/StatusBar';
import { MissionProtocol } from './components/MissionProtocol';
import { BioFeedbackHUD } from './components/BioFeedbackHUD';
import { ActiveProtocolHUD } from './components/ActiveProtocolHUD';

import Auth from './pages/Auth';

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    { id: 1, label: 'H2O', color: 'bg-amber-500', done: true },
    { id: 2, label: 'PRO', color: 'bg-amber-500', done: false },
    { id: 3, label: 'SLP', color: 'bg-amber-500', done: false },
  ]);

  return (
    <div className="flex gap-2">
      {habits.map((habit) => (
        <button 
          key={habit.id} 
          onClick={() => setHabits(habits.map(h => h.id === habit.id ? {...h, done: !h.done} : h))}
          className={`flex-1 p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${habit.done ? 'bg-amber-500/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'bg-white/5 border-white/5 hover:border-amber-500/20'}`}
        >
          <div className={`w-2 h-2 rounded-full ${habit.done ? habit.color : 'bg-white/10'} transition-all ${habit.done ? 'scale-125 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : ''}`} />
          <span className={`text-[10px] font-black tracking-widest ${habit.done ? 'text-amber-500 uppercase italic' : 'text-slate-500 uppercase'}`}>{habit.label}</span>
        </button>
      ))}
    </div>
  );
};

const MacroCalculator = () => {
  const [weight, setWeight] = useState(70);
  
  const macros = {
    protein: weight * 2,
    fats: weight * 0.8,
    carbs: weight * 4
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mt-6 backdrop-blur-md">
      <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.3em] mb-4">Macro Blueprint</p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="flex flex-col">
          <span className="text-xl font-black text-white italic tracking-tighter">{macros.protein}G</span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Protein</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white italic tracking-tighter">{macros.carbs.toFixed(0)}G</span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Carbs</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white italic tracking-tighter">{macros.fats.toFixed(0)}G</span>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Fats</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Adjust Weight</label>
          <span className="text-xs font-black text-amber-500">{weight} KG</span>
        </div>
        <input 
          type="range" 
          min="40" 
          max="150" 
          value={weight} 
          onChange={(e) => setWeight(parseInt(e.target.value))}
          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      </div>
    </div>
  );
};

interface HomeProps {
  user: any;
}

// Pages
const Home = ({ user }: HomeProps) => {
  const [stats, setStats] = useState({ workouts: 0, courses: 0, streak: 12, bmi: 22.4 });

  return (
    <div className="flex flex-col gap-10">
      {!user ? (
        <>
          <section className="relative h-[65vh] flex items-center justify-start overflow-hidden rounded-[2.5rem] bg-slate-950 text-white p-12 lg:p-20 border border-white/5">
            <div className="absolute inset-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920" 
                alt="Athlete" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <span className="accent-pill mb-6 inline-block italic">The Collegiate Standard</span>
              <motion.h1 
                className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.95] uppercase italic"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                Learn. Train. <br /> Shop. <span className="text-amber-500 underline decoration-amber-500/30">Repeat.</span>
              </motion.h1>
              <p className="text-xl text-slate-400 mb-10 font-medium max-w-md leading-relaxed uppercase tracking-widest text-xs opacity-80">
                The all-in-one fitness ecosystem optimized for student athletes. Master the science, execute the plan, and fuel your progress.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/auth"
                  className="bg-amber-500 text-slate-900 flex items-center gap-2 py-5 px-12 text-sm font-black uppercase tracking-widest rounded-xl shadow-2xl shadow-amber-500/20 hover:bg-white transition-all active:scale-95"
                >
                  Sync Neural Path <ArrowRight size={16} />
                </Link>
                <Link to="/learn" className="px-10 py-5 rounded-xl border border-white/10 backdrop-blur-md font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                  Access Academy
                </Link>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Neural Academy', desc: 'Expert led courses on biomechanics and nutrition science.', icon: BookOpen, link: '/learn' },
              { title: 'Command Center', desc: 'AI-generated training blueprints tailored to your goals.', icon: Dumbbell, link: '/train' },
              { title: 'Tactical Supply', desc: 'Curated performance gear with student-exclusive pricing.', icon: ShoppingBag, link: '/shop' }
            ].map((sector) => (
              <Link key={sector.title} to={sector.link}>
                <motion.div 
                  whileHover={{ y: -6, borderColor: 'rgba(245, 158, 11, 0.3)' }}
                  className="bento-card p-10 h-full flex flex-col gap-8 group relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_2s_infinite] pointer-events-none" />
                  <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all border border-white/5">
                    <sector.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase italic">{sector.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium text-sm">{sector.desc}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-[10px] font-black text-amber-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                    Initialize Module <ArrowRight size={14} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </section>
        </>
      ) : (
        <div className="grid grid-cols-12 gap-6 lg:gap-8 min-h-[70vh]">
          {/* Main Dashboard Column */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {/* Welcome Banner */}
            <div className="bento-card bg-amber-500 p-12 relative overflow-hidden text-slate-950 flex flex-col justify-between h-72 lg:h-80 shadow-2xl shadow-amber-500/20">
              <div className="absolute top-0 right-0 w-80 h-full opacity-10 pointer-events-none mix-blend-overlay">
                <LayoutDashboard size={400} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="accent-pill bg-slate-900 text-amber-500 border-none py-1 px-4 text-[9px] font-black uppercase tracking-[0.2em]">OPERATIONAL LEVEL: PRIME</span>
                  <div className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
                </div>
                <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4 italic uppercase leading-none">Command, <br/> {user.name?.split(' ')[0]}</h1>
                <p className="text-slate-900 font-bold opacity-70 uppercase tracking-widest text-[10px]">Neural Sync active. 12 session streak maintained. High efficiency detected.</p>
              </div>
              <div className="relative z-10 flex gap-6">
                <Link to="/train" className="bg-slate-900 text-amber-500 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all active:scale-95">Initiate Session</Link>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-px bg-slate-950/20" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase opacity-60 tracking-widest">Global Ranking</span>
                    <span className="text-lg font-black tracking-tighter italic uppercase">Tier 1: Elite</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Bio-Telemetry HUD */}
            <div className="flex flex-col gap-6">
              <BioFeedbackHUD />
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bento-card p-10 flex items-center gap-6 group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/10 relative z-10 border border-white/5">
                   <Target size={28} />
                 </div>
                 <div className="relative z-10">
                   <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">Metabolic Index</p>
                   <p className="text-4xl font-black text-white tracking-tighter">{stats.bmi} <span className="text-[10px] font-bold text-amber-500 uppercase ml-2 bg-amber-500/10 px-2 py-0.5 rounded-full tracking-normal border border-amber-500/20">Optimal</span></p>
                 </div>
               </div>
               <div className="bento-card p-10 flex items-center gap-6 group relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                 <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/10 relative z-10 border border-white/5">
                   <Flame size={28} />
                 </div>
                 <div className="relative z-10">
                   <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black mb-1">Consistency Cycle</p>
                   <p className="text-4xl font-black text-white tracking-tighter">{stats.streak} <span className="text-[10px] font-bold text-emerald-500 uppercase ml-2 italic tracking-normal bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Day Loop</span></p>
                 </div>
               </div>
               <div className="bento-card p-8 md:col-span-2 lg:col-span-1 border-white/5 shadow-2xl">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Daily Resolution</h4>
                 <HabitTracker />
               </div>
            </div>

            {/* Neural Bio-Feedback Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-900 shadow-lg shadow-amber-500/20">
                     <BarChartIcon size={16} />
                   </div>
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Progression Analytics</h3>
                </div>
                <span className="text-[9px] font-bold text-amber-500/60 uppercase tracking-widest hidden md:block">Real-time Telemetry Enabled</span>
              </div>
              <ProgressionCharts />
            </div>

            {/* Main Dashboard Interaction Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 flex flex-col gap-10">
                <AIAdvisor userWeight={75} />
                
                <div className="bento-card p-10 relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 font-sans">Active Training Log</h3>
                    <Link to="/train" className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">Full Log <Plus size={14} /></Link>
                  </div>
                  <div className="space-y-4 relative z-10">
                    {[
                      { name: 'Power Hypertrophy: Chest', date: 'Today, 06:15 AM', status: 'Completed', color: 'text-amber-500', bg: 'bg-amber-500/5' },
                      { name: 'Science of Squat: Session 1', date: 'Yesterday', status: 'Verified', color: 'text-emerald-500', bg: 'bg-emerald-500/5' }
                    ].map((log) => (
                      <div key={log.name} className={`flex items-center justify-between p-6 rounded-[1.5rem] border border-white/5 hover:bg-white/5 transition-all cursor-pointer group ${log.bg}`}>
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-amber-500 transition-colors shadow-sm">
                            <Dumbbell size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-white group-hover:text-amber-500 transition-colors">{log.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">{log.date}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${log.color}`}>{log.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Action Zone */}
              <div className="flex flex-col gap-10">
                <MissionProtocol />
                
                <div className="bento-card p-10 bg-gradient-to-br from-amber-500 to-amber-600 text-slate-900 relative overflow-hidden group border-none shadow-2xl shadow-amber-500/30">
                  <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                    <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800" alt="Gym" className="w-full h-full object-cover grayscale brightness-50" referrerPolicy="no-referrer" />
                  </div>
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="accent-pill bg-slate-900 text-amber-500 border-none w-fit text-[9px] px-2">Theory Progress</div>
                    <h4 className="text-2xl font-black tracking-tight leading-tight uppercase italic">Hypertrophy Science <br/>Module 8</h4>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-900/60">
                        <span>Module Progress</span>
                        <span>74%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '74%' }} className="h-full bg-slate-900 rounded-full" />
                      </div>
                    </div>
                    <div className="bg-slate-900/5 p-6 rounded-2xl border border-slate-900/10 backdrop-blur-sm">
                      <p className="text-[10px] font-black text-slate-900/60 uppercase tracking-[0.2em] mb-4">Bio-Partitioning Quiz</p>
                      <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] hover:bg-white hover:text-slate-900 transition-all shadow-lg active:scale-95 uppercase tracking-widest">Resume Theory</button>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                      <MacroCalculator />
                    </div>
                  </div>
                </div>
                
                <div className="bento-card p-10 border-none shadow-none bg-transparent">
                   <Leaderboard />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ user, handleLogout }: { user: any | null, handleLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Learn', path: '/learn' },
    { name: 'Train', path: '/train' },
    { name: 'Shop', path: '/shop' },
    { name: 'Arsenal', path: '/profile' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-b border-white/5 px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center group shadow-lg shadow-amber-500/20">
              <Flame size={20} className="text-slate-900 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white italic uppercase">FitVerse</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative pb-1 ${location.pathname === link.path ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}
              >
                {link.name}
                {location.pathname === link.path && <motion.div layoutId="navTab" className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-xs font-black text-white italic tracking-tight">{user.name}</span>
                <span className="text-[9px] text-amber-500/60 uppercase tracking-[0.2em] font-black">Prime Authorized</span>
              </div>
              <Link to="/profile" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 shadow-lg overflow-hidden p-0.5 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`} alt="avatar" className="w-full h-full rounded-lg" />
              </Link>
              <button 
                onClick={handleLogout}
                className="text-slate-500 hover:text-amber-500 transition-colors p-2"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <a 
              href="#login-terminal"
              className="btn-primary flex items-center justify-center py-2 px-8"
            >
              Sign In
            </a>
          )}
          <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-900 md:hidden"
          >
            <div className="flex flex-col gap-2 py-6 border-t border-white/5 mt-5">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] p-4 rounded-xl ${location.pathname === link.path ? 'bg-white/5 text-amber-500' : 'text-slate-400'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default function App() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isProtocolActive, setIsProtocolActive] = useState(false);
  
  useEffect(() => {
    const cachedUser = localStorage.getItem('vanguard_user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('vanguard_user');
    setUser(null);
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#020617] font-sans">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], borderRadius: ["20%", "40%", "20%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-12 h-12 bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
      />
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-900 relative overflow-hidden bg-[#010309]">
        {/* Global Tactical Background Image */}
        <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format" 
            alt="Operational Background" 
            className="w-full h-full object-cover grayscale scale-110"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Global HUD Textures */}
        <div className="fixed inset-0 pointer-events-none z-[100] border-[20px] border-black/10 mix-blend-overlay opacity-20" />
        <div className="fixed inset-0 pointer-events-none z-[100] bg-[radial-gradient(circle_at_50%_50%,transparent_80%,rgba(0,0,0,0.4))] " />
        <div className="fixed inset-0 pointer-events-none z-[101] overflow-hidden">
           <div className="w-full h-[1px] bg-amber-500/5 absolute top-0 animate-[scan_5s_infinite] shadow-[0_0_10px_rgba(245,158,11,0.2)]" />
        </div>

        <StatusBar />
        <Navbar user={user} handleLogout={handleLogout} />
        <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
        
        <AnimatePresence>
          {isProtocolActive && (
            <ActiveProtocolHUD onClose={() => setIsProtocolActive(false)} />
          )}
        </AnimatePresence>
        
        <main className="max-w-7xl mx-auto pt-40 pb-20 px-8 relative z-10">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/auth" element={<Auth setUser={setUser} />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/train" element={<Train onInitialize={() => setIsProtocolActive(true)} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </main>

        <footer className="border-t border-white/5 py-24 px-8 bg-slate-950/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Flame size={20} className="text-slate-900" />
              </div>
              <span className="font-black text-2xl tracking-tighter italic uppercase text-white">FitVerse</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">© 2026 FitVerse Protocol. <br className="md:hidden"/> Engineered for the Elite Collegiate Athlete.</p>
            <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
              <a href="#" className="hover:text-amber-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Neural Privacy</a>
              <a href="#" className="hover:text-amber-500 transition-colors">Telemetry</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
