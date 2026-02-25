import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, User as UserIcon, Calendar, QrCode, ShieldCheck, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email);
    } catch (err) {
      setError('Invalid email. Try manager@example.com, alice@example.com, or bob@example.com');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-8 rounded-3xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-brand-primary w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to EventEvo</h1>
          <p className="text-neutral-500 mt-2">Unified Event Management Ecosystem</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-3 rounded-xl font-semibold hover:bg-brand-secondary transition-colors flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-neutral-100">
          <p className="text-xs text-center text-neutral-400 uppercase tracking-widest font-bold mb-4">Demo Accounts</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setEmail('manager@example.com')} className="text-xs p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center gap-2">
              <ShieldCheck size={14} /> Manager
            </button>
            <button onClick={() => setEmail('alice@example.com')} className="text-xs p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center gap-2">
              <UserIcon size={14} /> Attendee
            </button>
            <button onClick={() => setEmail('bob@example.com')} className="text-xs p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center gap-2">
              <QrCode size={14} /> Exhibitor
            </button>
            <button onClick={() => setEmail('sam@example.com')} className="text-xs p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center gap-2">
              <Briefcase size={14} /> Partner
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
