import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, X, CheckCircle, UserPlus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Note: In a real app, we'd use a library like html5-qrcode, 
// but for this demo we'll simulate the scan with a manual ID entry or just a "Scan" button.

export default function BadgeScanner({ onScan }: { onScan: (id: string) => void }) {
  const [isScanning, setIsScanning] = useState(false);
  const [manualId, setManualId] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleScan = async (id: string) => {
    setStatus('idle');
    try {
      await onScan(id);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={() => setIsScanning(true)}
        className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
      >
        <Camera size={24} />
        Scan Attendee Badge
      </button>

      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsScanning(false)}
              className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={32} />
            </button>

            <div className="w-full max-w-sm aspect-square border-2 border-brand-primary rounded-3xl relative overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-transparent animate-pulse"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brand-primary shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
              
              <div className="absolute inset-0 flex items-center justify-center text-white/50">
                <Camera size={64} className="opacity-20" />
              </div>
            </div>

            <div className="text-center text-white mb-8">
              <h3 className="text-xl font-bold mb-2">Align Badge in Frame</h3>
              <p className="text-white/60">Scanning will happen automatically</p>
            </div>

            <div className="w-full max-w-sm space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  placeholder="Or enter ID manually (e.g. 2)"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-brand-primary"
                />
                <button 
                  onClick={() => {
                    handleScan(manualId);
                    setIsScanning(false);
                  }}
                  className="bg-brand-primary text-white px-6 rounded-xl font-bold"
                >
                  Enter
                </button>
              </div>
            </div>

            <style>{`
              @keyframes scan {
                0%, 100% { transform: translateY(-100%); }
                50% { transform: translateY(100%); }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl z-[110]"
          >
            <CheckCircle size={20} />
            <span className="font-bold">Lead Captured Successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
