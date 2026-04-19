import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, Flame, Fingerprint, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
  setUser: (user: any) => void;
}

export default function Auth({ setUser }: AuthProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setErrorMsg('');
    
    try {
      const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = activeTab === 'login' ? { email } : { email, name };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('vanguard_user', JSON.stringify(data));
        setUser(data);
        navigate('/'); // push to dashboard
      } else {
        setErrorMsg(data.error || 'Authentication Failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Critical failure connecting to neural hub.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 relative">
      {/* Background Ornaments */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center justify-center mb-6">
             <Fingerprint className="text-amber-500" size={32} />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-2">
            Secure Uplink
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            Provide operational credentials to initialize payload.
          </p>
        </div>

        <div className="bento-card bg-slate-900 border-white/5 p-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          {/* Tabs */}
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-white/5 mb-8 relative z-10">
            {['login', 'register'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  setErrorMsg('');
                }}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-lg relative ${activeTab === tab ? 'text-slate-900 shadow-md' : 'text-slate-500 hover:text-white'}`}
              >
                {activeTab === tab && (
                  <motion.div 
                    layoutId="auth-tab" 
                    className="absolute inset-0 bg-amber-500 rounded-lg pointer-events-none shrink-0" 
                  />
                )}
                <span className="relative z-10">{tab === 'login' ? 'Authenticate' : 'Initialize'}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
            <AnimatePresence mode="popLayout">
              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                >
                  <Activity size={14} /> {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              {activeTab === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Operator Designation</label>
                    <input
                      type="text"
                      placeholder="CALLSIGN / NAME"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-950 border border-white/10 px-5 py-4 rounded-xl text-white text-xs font-bold uppercase tracking-widest focus:border-amber-500 outline-none transition-colors w-full placeholder:text-slate-700"
                      required={activeTab === 'register'}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4">Secure Frequency (Email)</label>
              <input
                type="email"
                placeholder="OPERATOR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-950 border border-white/10 px-5 py-4 rounded-xl text-white text-xs font-bold uppercase tracking-widest focus:border-amber-500 outline-none transition-colors w-full placeholder:text-slate-700"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn-primary py-4 mt-4 w-full flex justify-center items-center gap-3 relative overflow-hidden group"
            >
              {loading ? (
                <span className="animate-pulse">Awaiting Sync...</span>
              ) : (
                <>
                  {activeTab === 'login' ? 'Establish Uplink' : 'Create Record'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
