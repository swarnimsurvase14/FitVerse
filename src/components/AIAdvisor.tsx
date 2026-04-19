import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, Loader2, Apple, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const AIAdvisor = ({ userWeight }: { userWeight: number }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getMealPlan = async () => {
    if (loading) return;
    setLoading(true);
    setResponse(null);

    try {
      const model = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a Sports Nutrition Scientist. Based on a student athlete weighing ${userWeight}kg, provide a highly specific, scientific 1-day meal plan for muscle synthesis. Include macros for each meal. Format in clean markdown with headers. Focus on affordable dorm-friendly options. ${prompt ? `User specifically asked: ${prompt}` : ""}`,
        config: {
          systemInstruction: "Be professional, scientific, and concise. Use clean markdown formatting.",
          temperature: 0.7,
        }
      });
      setResponse(model.text);
    } catch (error) {
      console.error(error);
      setResponse("AI Node failed to sync. Please ensure system is operational.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 bento-card p-10 relative overflow-hidden group">
      {/* HUD Scanline */}
      <div className="absolute inset-x-0 h-[1px] bg-amber-500/10 top-0 group-hover:animate-[scan_3s_infinite] pointer-events-none" />

      <div className="absolute -top-10 -right-10 opacity-5 text-amber-500 rotate-12">
        <Sparkles size={200} />
      </div>

      <div className="flex items-center gap-5 mb-2 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-900 shadow-2xl shadow-amber-500/20 text-slate-900">
          <Sparkles size={28} />
        </div>
        <div>
          <span className="text-[10px] font-black tracking-[0.3em] text-amber-500/60 uppercase">Intelligence Node</span>
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Neuro-Nutrition <span className="text-amber-500">Sync</span></h3>
        </div>
      </div>

      <p className="text-slate-500 font-bold text-sm leading-relaxed max-w-sm relative z-10 uppercase tracking-wider text-[10px]">
        AI-driven meal synthesis optimized for your <span className="text-amber-500 italic underline decoration-amber-500/30">{userWeight}KG</span> frame.
      </p>

      <div className="relative mt-4 z-10">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Parameters (e.g. 'Vegan', 'High Omega-3')"
          className="w-full bg-slate-950/50 border border-white/5 rounded-2xl p-6 pl-8 pr-20 text-[11px] font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all shadow-inner placeholder:text-slate-700 font-sans"
          onKeyDown={(e) => e.key === 'Enter' && getMealPlan()}
        />
        <button 
          onClick={getMealPlan}
          disabled={loading}
          className="absolute right-3 top-3 p-4 bg-amber-500 text-slate-900 rounded-xl hover:bg-white disabled:opacity-50 transition-all flex items-center justify-center shadow-lg active:scale-90"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {response && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-10 bg-slate-950/40 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl opacity-50" />
            <div className="prose prose-invert prose-sm max-w-none relative z-10 markdown-body">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!response && !loading && (
        <div className="grid grid-cols-2 gap-4 mt-4 relative z-10">
          {[
            { label: 'Bulk Phase', icon: Apple },
            { label: 'Cut Phase', icon: ChevronRight },
          ].map(p => (
            <button 
              key={p.label}
              onClick={() => { setPrompt(p.label); getMealPlan(); }}
              className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-xl hover:border-amber-500/20 hover:bg-amber-500/5 transition-all group/btn"
            >
              <span className="text-[10px] font-black text-slate-500 group-hover/btn:text-amber-500 transition-colors uppercase tracking-[0.2em]">{p.label}</span>
              <p.icon size={14} className="text-slate-700 group-hover/btn:text-amber-500" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
