import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Crosshair, Box, Activity, Trophy, Zap, Map, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ProfileProps {
  user: any | null; // Changed from Firebase User to flexible MERN JSON
}

interface WorkoutLog {
  _id: string;
  name: string;
  date: string;
  duration: number;
  status: string;
  exercises: any[];
}

export default function Profile({ user }: ProfileProps) {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [arsenal, setArsenal] = useState<any[]>([]);
  const [bcBalance, setBcBalance] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const cachedUser = localStorage.getItem('vanguard_user');
      if (!cachedUser) {
        setLoadingLogs(false);
        return;
      }
      const _user = JSON.parse(cachedUser);
      
      try {
        // Fetch Workouts
        const logsRes = await fetch(`/api/workouts?userId=${_user._id}`);
        if(logsRes.ok) {
           const logsData = await logsRes.json();
           setLogs(logsData);
        }

        // Fetch user data (BC balance + Arsenal)
        const userRes = await fetch(`/api/users/${_user._id}`);
        if(userRes.ok) {
           const userData = await userRes.json();
           setBcBalance(userData.bcBalance || 0);
           setArsenal(userData.arsenal || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoadingLogs(false);
      }
    };
    
    fetchUserData();
  }, [user]);

// ... existing code ...
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-500">Authentication Required</h2>
        <p className="text-slate-600 mt-2 uppercase tracking-widest text-xs">Awaiting neural sync.</p>
      </div>
    );
  }

  // Prepare chart data (chronological order)
  const chartData = useMemo(() => {
    return [...logs].reverse().slice(-14).map(log => ({
      date: new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      duration: log.duration,
      bcEarned: log.duration * 10
    }));
  }, [logs]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-2">{label}</p>
          <div className="flex flex-col gap-1">
             <p className="text-sm font-black text-white italic"><span className="text-slate-500 text-[10px] uppercase mr-2 not-italic">Output</span>{payload[0].value}m</p>
             <p className="text-sm font-black text-amber-500 italic"><span className="text-slate-500 text-[10px] uppercase mr-2 not-italic">Yield</span>+{payload[1].value} BC</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)] overflow-hidden p-1">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user._id}`} alt="avatar" className="w-full h-full rounded-2xl grayscale contrast-125 hover:grayscale-0 transition-all duration-500" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-1 flex items-center gap-2">
               <ShieldCheck size={14} className="animate-pulse" /> Operator Profile
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-1 italic uppercase">{user.name}</h1>
            <p className="text-slate-500 font-medium text-xs uppercase tracking-[0.2em]">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-4">
           <div className="glass-card px-6 py-4 border-white/5 flex flex-col items-center justify-center min-w-[200px]">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                 <Zap size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest leading-none">Net Bio-Credits</span>
              </div>
              <span className="text-4xl font-black text-white italic truncate">{bcBalance} <span className="text-sm text-slate-500">BC</span></span>
           </div>
           <div className="glass-card px-6 py-4 border-amber-500/20 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white italic">{logs.length}</span>
              <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Deployments</span>
           </div>
           <div className="glass-card px-6 py-4 border-white/5 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white italic">{arsenal.length}</span>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Assets</span>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* TELEMETRY VISUALIZATION (Full Width) */}
        {logs.length > 0 && (
           <section className="lg:col-span-3 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-inner">
                      <BarChart3 size={16} />
                   </div>
                   <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Operator Telemetry</h2>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Live Uplink
                </span>
              </div>
              <div className="glass-card p-6 h-[300px] border-white/5 relative overflow-hidden group">
                 {/* Decorative radar background */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-indigo-500/30 blur-sm pointer-events-none" />
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                     <XAxis 
                        dataKey="date" 
                        stroke="#475569" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        style={{ fontFamily: 'monospace', fontWeight: 900, textTransform: 'uppercase' }}
                     />
                     <YAxis 
                        yAxisId="left"
                        stroke="#475569" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false} 
                        style={{ fontFamily: 'monospace', fontWeight: 900 }}
                     />
                     <YAxis yAxisId="right" orientation="right" hide />
                     <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }} />
                     <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="duration" 
                        stroke="#6366f1" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorOutput)" 
                     />
                     <Area 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="bcEarned" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorYield)" 
                     />
                   </AreaChart>
                 </ResponsiveContainer>
              </div>
           </section>
        )}
        
        {/* ARSENAL SECTION */}
        <section className="lg:col-span-1 flex flex-col gap-6">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
                 <Box size={16} />
              </div>
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Tactical Arsenal</h2>
           </div>
           
           <div className="flex flex-col gap-4">
              {arsenal.map((gear, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="p-6 bg-white/5 border border-white/5 hover:border-amber-500/20 rounded-2xl group transition-all"
                 >
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{gear.type}</span>
                         <h3 className="text-sm font-black text-white uppercase italic">{gear.name}</h3>
                      </div>
                      <Box size={18} className="text-slate-600 group-hover:text-amber-500 transition-colors" />
                   </div>
                   <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                     <span className={`text-[9px] font-black uppercase tracking-widest ${gear.status === 'Active Sync' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {gear.status}
                     </span>
                     <span className="text-[9px] font-black text-white italic uppercase bg-slate-900 px-3 py-1 rounded-md">{gear.stat}</span>
                   </div>
                 </motion.div>
              ))}
              <div className="p-6 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-pointer">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                    <Crosshair size={18} />
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Requisition New Gear</span>
              </div>
           </div>
        </section>

        {/* LOGS SECTION */}
        <section className="lg:col-span-2 flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                    <Activity size={16} />
                 </div>
                 <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Deployment Logs</h2>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Temporal Records</span>
           </div>

           <div className="glass-card p-2 md:p-6 overflow-hidden">
             {loadingLogs ? (
               <div className="flex flex-col items-center justify-center py-20 gap-4">
                 <Zap size={24} className="text-amber-500 animate-bounce" />
                 <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Decrypting Logs...</span>
               </div>
             ) : logs.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 gap-4">
                 <Map size={32} className="text-slate-600" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">No deployments found. Initialize via Command Center.</span>
               </div>
             ) : (
               <div className="flex flex-col gap-4">
                 {logs.map((log, index) => (
                   <motion.div 
                     key={log._id} 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.05 }}
                     className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-950/40 rounded-xl border border-white/5 hover:border-emerald-500/30 hover:bg-slate-900/60 transition-all cursor-crosshair gap-6"
                   >
                     <div className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white font-black italic bg-white/5 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-colors shadow-inner">
                         {index + 1}
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1">
                           {new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                         </span>
                         <h3 className="text-lg font-black text-white italic uppercase tracking-tight">{log.name}</h3>
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                           {log.exercises?.length || 0} Modules Executed
                         </span>
                       </div>
                     </div>

                     <div className="flex items-center gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                       <div className="flex flex-col text-right">
                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Duration</span>
                         <span className="text-xl font-black text-white italic">{log.duration}<span className="text-sm text-slate-400">m</span></span>
                       </div>
                       <div className="flex flex-col text-right">
                         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Status</span>
                         <span className="text-xs font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-md border border-emerald-500/20">{log.status}</span>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
             )}
           </div>
        </section>
      </div>
    </div>
  );
}
