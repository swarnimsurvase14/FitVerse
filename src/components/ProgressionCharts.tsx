import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const weightData = [
  { day: 'Mon', weight: 76.5, fat: 18.2 },
  { day: 'Tue', weight: 76.2, fat: 18.1 },
  { day: 'Wed', weight: 76.4, fat: 18.1 },
  { day: 'Thu', weight: 75.8, fat: 17.9 },
  { day: 'Fri', weight: 75.5, fat: 17.8 },
  { day: 'Sat', weight: 75.2, fat: 17.6 },
  { day: 'Sun', weight: 75.0, fat: 17.5 },
];

const volumeData = [
  { day: 'M', volume: 12000, intensity: 85 },
  { day: 'T', volume: 15400, intensity: 90 },
  { day: 'W', volume: 8000, intensity: 70 },
  { day: 'T', volume: 18000, intensity: 95 },
  { day: 'F', volume: 14000, intensity: 80 },
  { day: 'S', volume: 22000, intensity: 98 },
  { day: 'S', volume: 0, intensity: 0 },
];

const macroData = [
  { day: 'M', protein: 180, carbs: 250, fats: 70 },
  { day: 'T', protein: 175, carbs: 320, fats: 85 },
  { day: 'W', protein: 190, carbs: 200, fats: 65 },
  { day: 'T', protein: 185, carbs: 300, fats: 80 },
  { day: 'F', protein: 170, carbs: 400, fats: 90 },
  { day: 'S', protein: 160, carbs: 450, fats: 100 },
  { day: 'S', protein: 200, carbs: 150, fats: 60 },
];

const courseData = [
  { name: 'Completed', value: 74, fill: '#f59e0b' },
  { name: 'Remaining', value: 26, fill: 'rgba(255, 255, 255, 0.05)' },
];

export const ProgressionCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Weight Progression Card */}
      <div className="bento-card p-8 group relative overflow-hidden">
        <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_3s_infinite] pointer-events-none" />
        
        <div className="flex flex-col mb-6">
          <span className="text-[9px] font-black tracking-[0.3em] text-amber-500/60 uppercase mb-1">Metabolic Telemetry</span>
          <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Body Mass Index</h4>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 900}}
                dy={10}
              />
              <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip 
                contentStyle={{backgroundColor: '#020617', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'}}
                labelStyle={{fontWeight: 900, fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase'}}
                itemStyle={{fontWeight: 900, fontSize: '12px', color: '#f59e0b'}}
              />
              <Area 
                type="monotone" 
                dataKey="weight" 
                stroke="#f59e0b" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorWeight)" 
                animationDuration={1500}
                strokeLinecap="round"
              />
              <Area 
                type="monotone" 
                dataKey="fat" 
                stroke="#6366f1" 
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#colorFat)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex justify-between items-end border-t border-white/5 pt-6">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Fat % Delta</p>
            <p className="text-2xl font-black text-indigo-400 italic tracking-tighter">-0.7%</p>
          </div>
          <div className="text-right">
             <span className="text-[9px] px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md font-black uppercase tracking-[0.2em] italic">Lean Path</span>
          </div>
        </div>
      </div>

      {/* Workout Volume Card */}
      <div className="bento-card p-8 group relative overflow-hidden">
        <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_4s_infinite] pointer-events-none" />

        <div className="flex flex-col mb-6">
          <span className="text-[9px] font-black tracking-[0.3em] text-amber-500/60 uppercase mb-1">Kinetic Output</span>
          <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Workload Volume</h4>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 900}}
                dy={10}
              />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.03)'}}
                contentStyle={{backgroundColor: '#020617', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'}}
                labelStyle={{fontWeight: 900, fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase'}}
                itemStyle={{fontWeight: 900, fontSize: '12px', color: '#f59e0b'}}
              />
              <Bar 
                dataKey="volume" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              >
                {volumeData.map((entry, index) => (
                   <Cell 
                    key={`cell-${index}`} 
                    fill={entry.intensity > 90 ? '#f59e0b' : entry.intensity > 70 ? 'rgba(245, 158, 11, 0.6)' : 'rgba(245, 158, 11, 0.2)'} 
                   />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex justify-between items-end border-t border-white/5 pt-6">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Max Intensity</p>
            <p className="text-2xl font-black text-white italic tracking-tighter">98 <span className="text-xs text-slate-500 uppercase">%</span></p>
          </div>
          <div className="text-right">
             <span className="text-[9px] px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-md font-black uppercase tracking-[0.2em] italic">High Load</span>
          </div>
        </div>
      </div>

      {/* Macro Tracking Card */}
      <div className="bento-card p-8 group relative overflow-hidden">
        <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_3.5s_infinite] pointer-events-none" />

        <div className="flex flex-col mb-6">
          <span className="text-[9px] font-black tracking-[0.3em] text-amber-500/60 uppercase mb-1">Nutritive Sync</span>
          <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Macro Flux</h4>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={macroData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 900}}
                dy={10}
              />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.03)'}}
                contentStyle={{backgroundColor: '#020617', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'}}
                labelStyle={{fontWeight: 900, fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase'}}
              />
              <Bar dataKey="protein" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
              <Bar dataKey="carbs" stackId="a" fill="rgba(245, 158, 11, 0.4)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="fats" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex justify-between items-end border-t border-white/5 pt-6">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Mean Protein</p>
            <p className="text-2xl font-black text-white italic tracking-tighter">183 <span className="text-xs text-slate-500 uppercase">G</span></p>
          </div>
          <div className="text-right">
             <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full bg-amber-500/40" />
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
             </div>
          </div>
        </div>
      </div>

      {/* Academy Completion Card */}
      <div className="bento-card p-8 group relative overflow-hidden">
        <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_2.5s_infinite] pointer-events-none" />

        <div className="flex flex-col mb-6">
          <span className="text-[9px] font-black tracking-[0.3em] text-amber-500/60 uppercase mb-1">Neural Integration</span>
          <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Academy Sync</h4>
        </div>
        <div className="h-48 w-full flex items-center justify-center relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mb-4">
             <span className="text-4xl font-black text-amber-500 italic tracking-tighter">74%</span>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mastery</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={courseData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                startAngle={90}
                endAngle={450}
                stroke="none"
              >
                {courseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 flex justify-between items-end border-t border-white/5 pt-6">
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Active Sector</p>
            <p className="text-2xl font-black text-white italic tracking-tighter uppercase">Phase 04</p>
          </div>
          <div className="text-right">
             <span className="text-[9px] px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-md font-black uppercase tracking-[0.2em] italic">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
