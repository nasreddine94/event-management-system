import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import Login from './Login';
import EventListing from './EventListing';
import AttendeeDashboard from './AttendeeDashboard';
import ExhibitorDashboard from './ExhibitorDashboard';
import ManagerDashboard from './ManagerDashboard';
import PartnerDashboard from './PartnerDashboard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout() {
  const { user, logout, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Login />;

  const renderDashboard = () => {
    switch (user.role) {
      case 'ATTENDEE': return <AttendeeDashboard />;
      case 'EXHIBITOR': return <ExhibitorDashboard />;
      case 'MANAGER': return <ManagerDashboard />;
      case 'PARTNER': return <PartnerDashboard />;
      default: return <EventListing />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg"></div>
              EventEvo
            </h1>

            <div className="hidden md:flex items-center gap-6">
              <button className="text-sm font-medium text-neutral-600 hover:text-brand-primary transition-colors">Events</button>
              <button className="text-sm font-medium text-neutral-600 hover:text-brand-primary transition-colors">Speakers</button>
              <button className="text-sm font-medium text-neutral-600 hover:text-brand-primary transition-colors">Exhibitors</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-neutral-100 px-3 py-1.5 rounded-xl border border-neutral-200">
              <Search size={16} className="text-neutral-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-40"
              />
            </div>

            <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-xl transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-neutral-200 mx-2"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{user.name}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">{user.role}</p>
              </div>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-xl border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={logout}
                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-neutral-50/50">
        {renderDashboard()}
      </main>

      <footer className="bg-white border-t border-neutral-100 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">© 2026 EventEvo Ecosystem. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="text-sm text-neutral-400 hover:text-neutral-600">Privacy Policy</button>
            <button className="text-sm text-neutral-400 hover:text-neutral-600">Terms of Service</button>
            <button className="text-sm text-neutral-400 hover:text-neutral-600">Help Center</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
