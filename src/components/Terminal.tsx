import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, ChevronRight, Zap, Target, BookOpen, ShoppingBag, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Terminal = ({ isOpen, onClose }: TerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Neural System Initialized...', 'Type /help for tactical commands.']);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setHistory(prev => [...prev, `> ${input}`]);
    setInput('');

    // Command Logic
    if (cmd === '/help') {
      setHistory(prev => [...prev, 'Available Protocols:', '/train - Access Command Center', '/learn - Access Neural Academy', '/shop - Access Tactical Supply', '/clear - Purge Terminal Buffer', '/status - System Integrity Check']);
    } else if (cmd === '/train') {
      setHistory(prev => [...prev, 'Rerouting to Command Center...']);
      navigate('/train');
      setTimeout(onClose, 500);
    } else if (cmd === '/learn') {
      setHistory(prev => [...prev, 'Rerouting to Neural Academy...']);
      navigate('/learn');
      setTimeout(onClose, 500);
    } else if (cmd === '/shop') {
      setHistory(prev => [...prev, 'Rerouting to Tactical Supply...']);
      navigate('/shop');
      setTimeout(onClose, 500);
    } else if (cmd === '/clear') {
      setHistory(['Buffer Purged.']);
    } else if (cmd === '/status') {
      setHistory(prev => [...prev, 'Integrity: 98.4%', 'Sync: ACTIVE', 'Neural Load: OPTIMAL', 'Uptime: 412:12:05']);
    } else {
      setHistory(prev => [...prev, `Error: Unknown protocol '${cmd}'`]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-black border border-amber-500/30 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <TerminalIcon size={16} className="text-amber-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Neural Terminal_v4.2</span>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div 
              ref={scrollRef}
              className="h-80 overflow-y-auto p-6 font-mono text-[11px] flex flex-col gap-2 scrollbar-hide"
            >
              {history.map((line, i) => (
                <div key={i} className={`${line.startsWith('>') ? 'text-amber-500 font-black' : line.startsWith('Error') ? 'text-rose-500' : 'text-slate-400 opacity-80'}`}>
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleCommand} className="p-4 bg-white/5 border-t border-white/5 flex items-center gap-3">
              <ChevronRight size={16} className="text-amber-500" />
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="EXECUTE CMD..."
                className="bg-transparent border-none outline-none text-white font-mono text-[11px] w-full placeholder:text-slate-700 uppercase tracking-widest"
              />
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
