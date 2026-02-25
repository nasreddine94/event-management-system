import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  HelpCircle,
  Heart,
  History,
  User as UserIcon,
  LayoutGrid,
  Calendar,
  Ticket,
  MessageSquare,
  Map as MapIcon,
  Gamepad,
  Trophy,
  ArrowRight,
  Filter,
  CheckCircle2,
  Lock,
  Zap,
  ChevronRight,
  MapPin,
  Clock,
  Info,
  CreditCard,
  Plus,
  Mail,
  Phone,
  Briefcase,
  Building2,
  FileText,
  ShieldCheck,
  Share2,
  Download,
  Mic,
  Video,
  FileQuestion,
  Image as ImageIcon,
  MessageCircle,
  QrCode,
  Layout,
  ExternalLink,
  Target,
  LogOut,
  Bell,
  Settings,
  ChevronLeft,
  ThumbsUp,
  Play,
  Award,
  Send
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '../lib/utils';
import {
  MOCK_EVENTS,
  MOCK_USER,
  MOCK_SESSIONS,
  MOCK_EXHIBITORS,
  MOCK_CONNECTIONS,
  MOCK_LEADERBOARD,
  MOCK_GAMES,
  MOCK_CHATS,
  MOCK_SPEAKERS,
  MOCK_WALL_POSTS,
  MOCK_POLLS,
  MOCK_FORUM_POSTS,
  MOCK_GALLERY,
  MOCK_VIDEOS,
  MOCK_DETAILS
} from '../data/mockData';

// Types
type Role = 'Visitor' | 'User' | 'Attendee';

export default function AttendeeDashboard() {
  const [activeRole, setActiveRole] = useState<Role>('Visitor');
  const [showOTP, setShowOTP] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const handleRoleSwitch = (newRole: Role) => {
    if (newRole === 'Attendee' && activeRole !== 'Attendee') {
      setShowOTP(true);
    } else {
      setActiveRole(newRole);
      setActiveSection('Home');
    }
  };

  const verifyOTP = () => {
    setActiveRole('Attendee');
    setShowOTP(false);
    setActiveSection('Dashboard');
  };

  const sections = {
    Visitor: [
      { id: 'Home', icon: LayoutGrid, label: 'Home' },
      { id: 'Search', icon: Search, label: 'Search' },
      { id: 'FAQs', icon: HelpCircle, label: 'FAQs' },
    ],
    User: [
      { id: 'Home', icon: LayoutGrid, label: 'Dashboard' },
      { id: 'Favorites', icon: Heart, label: 'Favorites' },
      { id: 'History', icon: History, label: 'My History' },
      { id: 'Profile', icon: UserIcon, label: 'Edit Profile' },
    ],
    Attendee: [
      { id: 'Dashboard', icon: LayoutGrid, label: 'Dashboard' },
      { id: 'Agenda', icon: Calendar, label: 'Agenda' },
      { id: 'Ticket', icon: Ticket, label: 'My Ticket' },
      { id: 'Networking', icon: Users, label: 'Networking' },
      { id: 'Exhibitors', icon: Building2, label: 'Exhibitors' },
      { id: 'Map', icon: MapIcon, label: 'Floor Map' },
      { id: 'Games', icon: Gamepad, label: 'Event Games' },
      { id: 'Leaderboard', icon: Trophy, label: 'Leaderboard' },
    ]
  };

  const Sidebar = () => (
    <aside className="w-72 bg-white border-r border-neutral-100 flex flex-col h-screen sticky top-0 shrink-0">
      {/* User info / Logo */}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-black text-neutral-900 tracking-tight">EventEvo</h1>
            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Attendee Hub</p>
          </div>
        </div>

        {/* Role Switcher - Integrated */}
        <div className="p-1 text-neutral-500 text-xs font-bold uppercase tracking-wider mb-2 px-2">
          Your Access
        </div>
        <div className="glass p-1.5 rounded-2xl flex flex-col gap-1 mb-8">
          {(['Visitor', 'User', 'Attendee'] as Role[]).map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSwitch(role)}
              className={cn(
                "w-full px-4 py-2 rounded-xl text-left text-sm font-bold transition-all flex items-center justify-between",
                activeRole === role
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-neutral-500 hover:bg-neutral-50"
              )}
            >
              {role}
              {activeRole === role && <ChevronRight size={14} />}
            </button>
          ))}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {sections[activeRole].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeSection === item.id
                  ? "bg-neutral-900 text-white shadow-lg shadow-neutral-900/10"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <item.icon size={20} className={activeSection === item.id ? "text-white" : "text-neutral-400"} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Footer / Account */}
      <div className="mt-auto p-6 border-t border-neutral-100">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 group cursor-pointer hover:bg-neutral-100 transition-all border border-transparent hover:border-neutral-200">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-brand-primary/10 flex-shrink-0">
            <img src={MOCK_USER.avatar} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-neutral-900 truncate">{MOCK_USER.firstName}</p>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Premium Access</p>
          </div>
          <LogOut size={16} className="text-neutral-300 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header Area */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
                {activeSection === 'Home' || activeSection === 'Dashboard' ? `Welcome, ${MOCK_USER.firstName}` : activeSection}
              </h2>
              <p className="text-neutral-500 font-medium">
                {activeRole === 'Visitor' ? 'Browse the hottest tech events of 2026' : 'Your personal event headquarters'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 bg-white border border-neutral-200 rounded-2xl text-neutral-500 hover:bg-neutral-50 transition-all relative">
                <Bell size={20} />
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <button className="p-3 bg-white border border-neutral-200 rounded-2xl text-neutral-500 hover:bg-neutral-50 transition-all">
                <Settings size={20} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeRole === 'Visitor' && (
              <motion.div
                key={`visitor-${activeSection}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <VisitorContent onSectionChange={setActiveSection} activeSection={activeSection} />
              </motion.div>
            )}

            {activeRole === 'User' && (
              <motion.div
                key={`user-${activeSection}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <UserContent onSectionChange={setActiveSection} activeSection={activeSection} />
              </motion.div>
            )}

            {activeRole === 'Attendee' && (
              <motion.div
                key={`attendee-${activeSection}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AttendeeContent onSectionChange={setActiveSection} activeSection={activeSection} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOTP && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
              onClick={() => setShowOTP(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass p-8 rounded-[2.5rem] w-full max-w-md relative z-10 text-center"
            >
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="text-brand-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">OTP Verification</h2>
              <p className="text-neutral-500 text-sm mb-8">
                The Event Manager approved your registration. Enter the 6-digit code sent to <span className="text-neutral-900 font-medium">alex@eventdemo.com</span>.
              </p>

              <div className="flex justify-between gap-2 mb-8">
                {[4, 2, 7, 1, 9, 3].map((digit, i) => (
                  <div key={i} className="w-12 h-14 bg-white border-2 border-neutral-100 rounded-xl flex items-center justify-center text-xl font-bold text-brand-primary">
                    {digit}
                  </div>
                ))}
              </div>

              <button
                onClick={verifyOTP}
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all mb-4"
              >
                Verify and Enter Event
              </button>

              <p className="text-xs text-neutral-400">
                Code expires in <span className="text-neutral-600 font-bold">14:32</span>. Didn't receive it? <button className="text-brand-primary font-bold">Resend</button>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components (Internalized for prototype speed/simplicity)

function VisitorContent({ onSectionChange, activeSection }: { onSectionChange: (s: string) => void, activeSection: string }) {
  const categories = ['All', 'Business', 'Tech', 'Design', 'Health', 'Education', 'Culture'];
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="space-y-8">

      {activeSection === 'Home' && (
        <div className="space-y-8">
          <div className="glass p-6 rounded-[2.5rem] flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full bg-neutral-100 px-6 py-4 rounded-2xl flex items-center gap-3 border border-neutral-200">
              <Search className="text-neutral-400" size={20} />
              <input type="text" placeholder="Search events..." className="bg-transparent border-none outline-none w-full text-base font-medium" />
            </div>
            <button className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg">Find Events</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap ${activeCategory === c ? 'bg-brand-primary text-white shadow-md' : 'glass text-neutral-500'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_EVENTS.map(event => (
              <div key={event.id} className="glass rounded-[2rem] overflow-hidden group cursor-pointer border-white/50 hover:shadow-xl transition-all duration-500">
                <img src={event.image} alt="" className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <div className="flex items-center gap-2 text-neutral-500 text-sm mb-6"><MapPin size={16} /> {event.location}</div>
                  <button className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary transition-all">
                    Register Now <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeSection === 'Search' && (
        <div className="space-y-8">
          <div className="glass p-6 rounded-[2.5rem] flex items-center gap-4 border-white/50">
            <div className="flex-1 bg-neutral-100 px-6 py-4 rounded-2xl flex items-center gap-3 border border-neutral-200">
              <Search className="text-neutral-400" size={20} />
              <input type="text" placeholder="Search events by name, location or category..." className="bg-transparent border-none outline-none w-full text-base font-medium" />
            </div>
            <button className="glass p-4 rounded-2xl text-neutral-500 hover:text-brand-primary transition-colors">
              <Filter size={24} />
            </button>
          </div>
          <div className="flex justify-between items-center px-2">
            <div className="text-neutral-500 font-bold">Showing <span className="text-neutral-900">12</span> events in <span className="text-brand-primary">All Categories</span></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_EVENTS.map(event => (
              <div key={event.id} className="glass rounded-[2rem] overflow-hidden group cursor-pointer border-white/50 hover:shadow-xl transition-all duration-500">
                <img src={event.image} alt="" className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-4">{event.title}</h3>
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-400">
                    <div className="flex items-center gap-2"><Calendar size={14} /> {event.date}</div>
                    <div className="text-brand-primary">{event.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'FAQs' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Frequently Asked Questions</h2>
            <p className="text-neutral-500 font-medium">Everything you need to know about EventEvo and our summits.</p>
          </div>
          {[
            { q: 'How do I register for an event?', a: 'You can browse our events, select the one you want to attend, and click "Register Now". You will be guided through the payment and registration process.' },
            { q: 'What is the Attendee Dashboard?', a: 'Once registered and verified via OTP, you gain access to the Attendee Dashboard which includes your ticket, event agenda, networking tools, and interactive floor maps.' },
            { q: 'Can I get a refund for my ticket?', a: 'Refund policies vary by event. Please check the specific event details or contact the organizer through the "Event Details" section.' }
          ].map((faq, i) => (
            <div key={i} className="glass p-8 rounded-[2rem] border-white/50 group hover:shadow-md transition-all">
              <h4 className="font-black text-xl mb-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary text-sm">Q</div>
                {faq.q}
              </h4>
              <p className="text-neutral-500 font-medium leading-relaxed pl-11">{faq.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserContent({ onSectionChange, activeSection }: { onSectionChange: (s: string) => void, activeSection: string }) {
  return (
    <div className="space-y-8">
      {activeSection === 'Home' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Upcoming Events', value: '3', icon: Calendar, color: 'text-blue-500' },
            { label: 'Saved Favorites', value: '12', icon: Heart, color: 'text-red-500' },
            { label: 'Events Attended', value: '8', icon: CheckCircle2, color: 'text-green-500' },
            { label: 'Total Spent', value: '24k DZD', icon: CreditCard, color: 'text-brand-primary' }
          ].map(stat => (
            <div key={stat.label} className="glass p-6 rounded-[2rem] border-white/50">
              <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm ${stat.color}`}><stat.icon size={24} /></div>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'Favorites' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_EVENTS.slice(0, 3).map(event => (
            <div key={event.id} className="glass rounded-[2rem] overflow-hidden group cursor-pointer border-white/50">
              <img src={event.image} alt="" className="h-40 w-full object-cover" />
              <div className="p-5">
                <h4 className="font-bold text-base mb-2">{event.title}</h4>
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold leading-none mb-4"><MapPin size={12} /> {event.location}</div>
                <button className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold text-sm">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'History' && (
        <div className="glass rounded-[2.5rem] overflow-hidden border-white/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/50 border-b border-neutral-100">
                  <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-wider">Event</th>
                  <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                  <th className="px-10 py-5 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Algeria Startup Summit', date: 'March 15, 2026', status: 'Registered' },
                  { name: 'Tech Days Algiers', date: 'Jan 10, 2026', status: 'Attended' },
                  { name: 'Design Conf 2025', date: 'Dec 05, 2025', status: 'Attended' }
                ].map((entry, i) => (
                  <tr key={i} className="border-b border-neutral-50 last:border-0 hover:bg-white/40 transition-colors">
                    <td className="px-8 py-5 font-bold text-neutral-900">{entry.name}</td>
                    <td className="px-8 py-5 text-sm text-neutral-500">{entry.date}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${entry.status === 'Registered' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                        }`}>{entry.status}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-brand-primary font-bold text-sm hover:underline">View Receipt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'Profile' && (
        <div className="max-w-4xl mx-auto">
          <div className="glass p-10 rounded-[3rem] border-white/60">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <img src={MOCK_USER.avatar} alt="" className="w-40 h-40 rounded-[3rem] object-cover shadow-xl border-4 border-white" />
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg"><Plus size={20} /></button>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black mb-1">{MOCK_USER.firstName} {MOCK_USER.lastName}</h3>
                  <p className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Premium Member</p>
                </div>
              </div>
              <div className="flex-1 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">First Name</label>
                    <input type="text" defaultValue="Alex" className="w-full bg-white border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Last Name</label>
                    <input type="text" defaultValue="Benali" className="w-full bg-white border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Email Address</label>
                  <input type="email" defaultValue={MOCK_USER.email} className="w-full bg-white border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <button className="bg-brand-primary text-white py-5 rounded-[1.5rem] font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all">Save Profile</button>
                  <button className="glass py-5 rounded-[1.5rem] font-bold border-white/40 hover:bg-white transition-all text-neutral-600">Change Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AttendeeContent({ onSectionChange, activeSection }: { onSectionChange: (s: string) => void, activeSection: string }) {
  const modules = [
    { icon: Calendar, name: 'Agenda', category: 'Event' },
    { icon: Users, name: 'Network', category: 'People' },
    { icon: Ticket, name: 'My Ticket', category: 'Event' },
    { icon: MessageCircle, name: 'Chats', category: 'People' },
    { icon: Info, name: 'Exhibitors', category: 'Venue' },
    { icon: MapIcon, name: 'Floor Map', category: 'Venue' },
    { icon: Gamepad, name: 'Games', category: 'Engagement' },
    { icon: Trophy, name: 'Leaderboard', category: 'Engagement' },
    { icon: Mic, name: 'Speakers', category: 'People' },
    { icon: ImageIcon, name: 'Event Wall', category: 'Engagement' },
    { icon: FileQuestion, name: 'Polls', category: 'Engagement' },
    { icon: Zap, name: 'Sponsors', category: 'Venue' },
    { icon: MessageSquare, name: 'Forum', category: 'People' },
    { icon: ImageIcon, name: 'Gallery', category: 'Event' },
    { icon: Video, name: 'Videos', category: 'Event' },
    { icon: CheckCircle2, name: 'Quiz', category: 'Engagement' },
    { icon: Search, name: 'Scavenger Hunt', category: 'Engagement' },
    { icon: Info, name: 'Details', category: 'Event' },
  ];

  return (
    <div className="space-y-8 pb-32">
      <AnimatePresence mode="wait">
        {activeSection === 'Dashboard' && (
          <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="glass p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 border-white/60">
              <div className="relative z-10 text-center md:text-left">
                <div className="text-brand-primary font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2 justify-center md:justify-start">
                  <CheckCircle2 size={16} /> Checked In
                </div>
                <h2 className="text-3xl font-black mb-1">Algeria Startup Summit 2026</h2>
                <p className="text-neutral-500 font-medium">March 15 - 17 • Palais de la Culture, Alger</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-auto">
                {[
                  { label: 'Day', value: '1/3', icon: Calendar },
                  { label: 'Sessions', value: '4', icon: Mic },
                  { label: 'Connections', value: '8', icon: Users },
                  { label: 'Points', value: '340', icon: Target }
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black text-brand-primary">{s.value}</div>
                    <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-tighter">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {modules.map((m, i) => (
                <button
                  key={i}
                  onClick={() => onSectionChange(m.name === 'Floor Map' ? 'Map' : m.name)}
                  className="glass p-6 rounded-[2rem] flex flex-col items-center gap-3 group hover:bg-brand-primary hover:text-white transition-all duration-300 border-white/50"
                >
                  <div className="w-12 h-12 bg-brand-primary/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center text-brand-primary group-hover:text-white transition-colors">
                    <m.icon size={24} />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm">{m.name}</div>
                    <div className="text-[10px] uppercase opacity-40 group-hover:opacity-60">{m.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Agenda' && (
          <motion.div key="agenda" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            {[1, 2].map(day => (
              <div key={day} className="space-y-4">
                <h3 className="text-xl font-bold px-4 flex items-center gap-2">
                  <Calendar size={20} className="text-brand-primary" /> Day {day} Content
                </h3>
                <div className="space-y-3">
                  {MOCK_SESSIONS.filter(s => s.day === day).map(session => (
                    <div key={session.id} className="glass p-6 rounded-[2rem] border-white/50 flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-24 flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm">
                        <div className="text-brand-primary font-black text-lg">{session.time.split(' ')[0]}</div>
                        <div className="text-[10px] font-bold text-neutral-400 uppercase">{session.time.split(' ')[1]}</div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="text-lg font-bold mb-1">{session.title}</h4>
                        <p className="text-sm text-neutral-500">{session.speaker} • {session.company} • <span className="text-brand-primary font-bold">{session.location}</span></p>
                      </div>
                      <button className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${session.isSaved ? 'bg-amber-100 text-amber-600' : 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90'
                        }`}>
                        {session.isSaved ? <Zap size={16} fill="currentColor" /> : <Plus size={16} />}
                        {session.isSaved ? 'Saved' : 'Save Session'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeSection === 'Ticket' && (
          <motion.div key="ticket" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-2xl relative border border-neutral-100">
              <div className="bg-brand-primary p-12 text-center text-white relative">
                <div className="absolute top-8 left-8 w-12 h-12 bg-white/20 rounded-full blur-xl" />
                <h2 className="text-3xl font-black mb-2">Algeria Startup Summit</h2>
                <p className="text-brand-secondary font-bold opacity-80 uppercase tracking-widest text-xs">March 15-17 • Alger</p>
                <div className="mt-6 inline-block bg-brand-secondary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">Checked In</div>
              </div>
              <div className="p-10 text-center space-y-8">
                <div className="flex justify-between text-left">
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Attendee</div>
                    <div className="font-black text-lg">Alex Benali</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Pass Type</div>
                    <div className="font-black text-lg text-brand-primary">VIP Pass</div>
                  </div>
                </div>
                <div className="bg-neutral-50 p-6 rounded-[2.5rem] inline-block shadow-inner border border-neutral-100">
                  <QRCodeSVG value="ALG26-4271-93VIP" size={200} />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-neutral-300 uppercase">Ticket ID</div>
                  <div className="font-mono text-sm text-neutral-400 font-bold">ALG26-4271-93VIP</div>
                </div>
                <div className="pt-8 grid grid-cols-3 gap-4 border-t border-dashed border-neutral-100">
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-brand-primary transition-colors"><Plus size={20} /></div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400 group-hover:text-neutral-600">Wallet</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-brand-primary transition-colors"><Download size={20} /></div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400 group-hover:text-neutral-600">PDF</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-brand-primary transition-colors"><Share2 size={20} /></div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400 group-hover:text-neutral-600">Share</span>
                  </button>
                </div>
              </div>
              <div className="bg-neutral-50 py-4 text-center border-t border-neutral-100">
                <p className="text-[10px] font-bold text-neutral-300">VALID FOR ALL ACCESS ZONES</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Networking' && (
          <motion.div key="networking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-3xl font-black mb-1">Networking Hub</h2>
                <p className="text-neutral-500 font-medium">1,200 total attendees • <span className="text-brand-primary font-bold">180 active now</span></p>
              </div>
              <div className="flex gap-2">
                {['Investors', 'Founders', 'Designers', 'Engineers'].map(f => (
                  <button key={f} className="glass px-4 py-2 rounded-full text-xs font-bold hover:bg-white transition-all">{f}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_CONNECTIONS.map(person => (
                <div key={person.id} className="glass p-6 rounded-[2.5rem] border-white/50 group hover:bg-white transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img src={person.avatar} alt={person.name} className="w-20 h-20 rounded-3xl object-cover shadow-sm" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg leading-tight">{person.name}</h4>
                      <p className="text-sm text-neutral-400 font-medium">{person.role} at <span className="text-neutral-900 font-bold">{person.company}</span></p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${person.isConnected ? 'bg-neutral-100 text-neutral-400' : 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90'}`}>
                      {person.isConnected ? <CheckCircle2 size={18} /> : <Plus size={18} />}
                      {person.isConnected ? 'Connected' : 'Connect'}
                    </button>
                    {person.canBookMeeting && (
                      <button className="bg-amber-100 text-amber-600 px-4 py-3 rounded-2xl font-bold text-sm flex items-center justify-center">
                        <Calendar size={18} />
                      </button>
                    )}
                    <button className="glass w-12 h-12 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-brand-primary transition-colors">
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Exhibitors' && (
          <motion.div key="exhibitors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black mb-1">Exhibitor Hall</h2>
              <p className="text-neutral-500 font-medium">80 exhibitors across 6 exhibition zones</p>
              <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
                {['All', 'Gold', 'Silver', 'Tech', 'Finance'].map(c => (
                  <button key={c} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${c === 'All' ? 'bg-brand-primary text-white shadow-md' : 'glass text-neutral-400 hover:bg-white'}`}>{c}</button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-bold flex items-center gap-2 px-2">
                <Trophy size={20} className="text-amber-500" /> Gold Sponsors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_EXHIBITORS.filter(ex => ex.tier === 'Gold').map(ex => (
                  <div key={ex.id} className="glass p-6 rounded-[2.5rem] border-white/60 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                      <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Gold Sponsor</span>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-24 h-24 bg-white rounded-3xl p-4 shadow-sm group-hover:shadow-md transition-all">
                        <img src={ex.logo} alt={ex.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-black mb-1">{ex.name}</h4>
                        <p className="text-neutral-400 text-sm font-bold uppercase tracking-wider mb-3">{ex.category}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg">Booth {ex.booth}</span>
                          <span className="text-xs font-bold text-brand-primary">{ex.zone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <button className="bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary transition-all">
                        <MapIcon size={18} /> Navigate
                      </button>
                      <button className="glass py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all border-white/40">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xl font-bold flex items-center gap-2 px-2">
                <Zap size={20} className="text-brand-primary" /> Silver Sponsors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_EXHIBITORS.filter(ex => ex.tier === 'Silver').map(ex => (
                  <div key={ex.id} className="glass p-6 rounded-[2rem] border-white/40 flex flex-col items-center text-center group">
                    <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-sm mb-4">
                      <img src={ex.logo} alt={ex.name} className="w-full h-full object-contain" />
                    </div>
                    <h4 className="font-bold text-lg mb-1">{ex.name}</h4>
                    <p className="text-xs text-neutral-400 font-bold uppercase mb-4">{ex.category}</p>
                    <div className="text-xs font-bold text-neutral-900 bg-neutral-100 w-full py-2 rounded-xl mb-4">Booth {ex.booth}</div>
                    <button className="text-brand-primary font-bold text-sm hover:underline">View Profile</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Map' && (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="glass p-8 rounded-[3rem] border-white/60 relative overflow-hidden min-h-[500px] flex items-center justify-center">
              <svg viewBox="0 0 800 500" className="w-full max-w-2xl drop-shadow-2xl">
                <rect x="50" y="50" width="700" height="400" rx="30" fill="#fcfcfc" stroke="#e5e5e5" strokeWidth="2" />
                <g className="cursor-pointer group">
                  <rect x="80" y="80" width="300" height="150" rx="20" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="2" />
                  <text x="100" y="110" className="text-xs font-bold fill-neutral-400 uppercase">Zone A: Entrance & Gold</text>
                  <rect x="100" y="130" width="80" height="80" rx="10" fill="white" stroke="#10b981" strokeWidth="3" />
                  <text x="140" y="175" textAnchor="middle" className="text-[10px] font-black fill-brand-primary">DJEZZY</text>
                  <rect x="200" y="130" width="80" height="80" rx="10" fill="white" stroke="#10b981" strokeWidth="3" />
                  <text x="240" y="175" textAnchor="middle" className="text-[10px] font-black fill-brand-primary">BNA</text>
                  <circle cx="140" cy="200" r="15" className="fill-brand-primary animate-pulse opacity-20" />
                  <circle cx="140" cy="200" r="4" className="fill-brand-primary" />
                </g>
                <g>
                  <rect x="420" y="80" width="300" height="150" rx="20" fill="#eff6ff" stroke="#dbeafe" strokeWidth="2" />
                  <text x="440" y="110" className="text-xs font-bold fill-neutral-400 uppercase">Zone B: Tech & Sessions</text>
                  <rect x="440" y="130" width="120" height="80" rx="10" fill="white" />
                  <text x="500" y="175" textAnchor="middle" className="text-[10px] font-black fill-blue-500">HALL B</text>
                </g>
                <g>
                  <rect x="80" y="270" width="300" height="150" rx="20" fill="#fff7ed" stroke="#ffedd5" strokeWidth="2" />
                  <text x="100" y="300" className="text-xs font-bold fill-neutral-400 uppercase">Zone C: Catering & Lounge</text>
                </g>
                <g>
                  <rect x="420" y="270" width="300" height="150" rx="20" fill="#faf5ff" stroke="#f3e8ff" strokeWidth="2" />
                  <text x="440" y="300" className="text-xs font-bold fill-neutral-400 uppercase">Zone D: Startup Pitch</text>
                </g>
              </svg>
              <div className="absolute bottom-8 right-8 glass p-4 rounded-2xl flex flex-col gap-2 border-white/40">
                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500"><div className="w-3 h-3 bg-brand-primary rounded-full border-2 border-white" /> YOU ARE HERE</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500"><div className="w-3 h-3 border-2 border-brand-primary rounded-md" /> GOLD SPONSOR</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500"><div className="w-3 h-3 bg-blue-100 rounded-md" /> SESSION HALL</div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Games' && (
          <motion.div key="games" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="glass p-8 rounded-[2.5rem] bg-neutral-900 border-none text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black mb-2">Gamification Hub</h2>
                  <p className="text-neutral-400 font-medium">Complete challenges and win exclusive prizes from our sponsors.</p>
                </div>
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-black text-brand-primary">340</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-amber-500">12th</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">Global Rank</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_GAMES.map(game => (
                <div key={game.id} className="glass p-6 rounded-[2.5rem] border-white/50 group h-full flex flex-col">
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold group-hover:text-brand-primary transition-colors">{game.name}</h4>
                      <span className="text-brand-primary font-black text-xs">+{game.points} PTS</span>
                    </div>
                    <p className="text-sm text-neutral-500 font-medium mb-6">{game.description}</p>
                  </div>
                  <div className="mt-auto space-y-3">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-neutral-400 uppercase">Progress</span>
                      <span className="text-neutral-900">{game.completed} / {game.total}</span>
                    </div>
                    <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                      <div className="h-full bg-brand-primary transition-all duration-1000 ease-out" style={{ width: `${(game.completed / game.total) * 100}%` }} />
                    </div>
                    <button className="w-full mt-4 bg-neutral-100 group-hover:bg-brand-primary group-hover:text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">Open Mission</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Leaderboard' && (
          <motion.div key="leader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
            <div className="text-center mb-12">
              <Trophy className="mx-auto text-amber-500 mb-4" size={48} />
              <h2 className="text-4xl font-black mb-2 text-neutral-900">Event Leaderboard</h2>
              <p className="text-neutral-500 font-medium text-lg">Top contributors and challenge winners</p>
            </div>

            <div className="glass rounded-[3.5rem] overflow-hidden border-white/60 shadow-2xl bg-white/40 backdrop-blur-2xl">
              {MOCK_LEADERBOARD.map((item, i) => (
                <div key={item.id} className={`flex items-center justify-between px-10 py-8 transition-all ${item.name === 'Alex Benali' ? 'bg-brand-primary/10 border-y border-brand-primary/10' : 'border-b border-neutral-50 last:border-0'}`}>
                  <div className="flex items-center gap-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${item.rank === 1 ? 'bg-amber-100 text-amber-600 shadow-sm' : item.rank === 2 ? 'bg-neutral-200 text-neutral-600' : item.rank === 3 ? 'bg-amber-600/10 text-amber-800' : 'text-neutral-400'}`}>
                      {item.rank}
                    </div>
                    <div className="flex items-center gap-5">
                      <img src={`https://picsum.photos/seed/${item.name}/200`} className="w-16 h-16 rounded-[1.5rem] object-cover border-4 border-white shadow-md" alt="" />
                      <div>
                        <div className="font-black text-xl text-neutral-900">{item.name}</div>
                        {item.name === 'Alex Benali' && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
                            <div className="text-[10px] font-black uppercase text-brand-primary tracking-widest">You are here</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-brand-primary">{item.points}</div>
                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Points</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Chats' && (
          <motion.div key="chats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-[3.5rem] border-white/60 overflow-hidden flex h-[650px] shadow-3xl">
            <div className="w-80 border-r border-neutral-100 flex flex-col bg-white/60 backdrop-blur-3xl">
              <div className="p-8 border-b border-neutral-100/50">
                <h3 className="text-2xl font-black text-neutral-900 tracking-tight">Messages</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {MOCK_CHATS.map(chat => (
                  <button key={chat.id} className="w-full p-8 flex gap-5 hover:bg-white transition-all border-b border-neutral-50 text-left group">
                    <div className="relative shrink-0">
                      <img src={chat.participant.avatar} className="w-14 h-14 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform" alt="" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="font-black truncate text-neutral-900 group-hover:text-brand-primary transition-colors">{chat.participant.name}</div>
                        <div className="text-[10px] text-neutral-400 font-bold">{chat.time}</div>
                      </div>
                      <div className="text-sm text-neutral-400 truncate font-medium">{chat.lastMessage}</div>
                      {chat.unreadCount > 0 && (
                        <div className="mt-3 inline-block bg-brand-primary text-white text-[10px] font-black px-3 py-1 rounded-xl shadow-lg shadow-brand-primary/20">{chat.unreadCount} New</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-white">
              <div className="p-8 border-b border-neutral-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img src={MOCK_CHATS[0].participant.avatar} className="w-12 h-12 rounded-2xl shadow-lg border-2 border-white" alt="" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                  </div>
                  <div>
                    <div className="font-black text-xl text-neutral-900">{MOCK_CHATS[0].participant.name}</div>
                    <div className="text-[10px] text-green-500 font-bold uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" /> Active Now
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="glass w-12 h-12 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-brand-primary hover:bg-neutral-50 transition-all border-white/40"><Phone size={20} /></button>
                  <button className="glass w-12 h-12 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-brand-primary hover:bg-neutral-50 transition-all border-white/40"><Video size={20} /></button>
                </div>
              </div>
              <div className="flex-1 p-10 space-y-8 overflow-y-auto bg-neutral-50/30">
                {MOCK_CHATS[0].messages.map(m => (
                  <div key={m.id} className={`flex ${m.senderId === 'u1' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-6 rounded-[2.5rem] text-sm font-bold shadow-xl transition-all ${m.senderId === 'u1' ? 'bg-neutral-900 text-white rounded-tr-none' : 'bg-white text-neutral-900 border border-neutral-100 rounded-tl-none'}`}>
                      {m.text}
                      <div className={`text-[9px] mt-3 font-black uppercase tracking-widest opacity-40 ${m.senderId === 'u1' ? 'text-white text-right' : 'text-neutral-400'}`}>{m.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8 border-t border-neutral-100 flex gap-6 bg-white">
                <div className="flex-1 relative">
                  <input type="text" placeholder="Send a message..." className="w-full bg-neutral-50 px-8 py-5 rounded-[2rem] text-sm font-bold outline-none border border-neutral-100 focus:ring-4 ring-brand-primary/10 transition-all pr-16" />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-neutral-300 hover:text-brand-primary transition-colors"><Zap size={20} /></button>
                </div>
                <button className="bg-brand-primary text-white p-5 rounded-[2rem] shadow-2xl shadow-brand-primary/30 hover:scale-110 active:scale-90 transition-all"><Send size={24} fill="currentColor" /></button>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Speakers' && (
          <motion.div key="speakers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-5xl font-black text-neutral-900 tracking-tight">Thought Leaders</h2>
              <p className="text-neutral-500 font-medium text-lg">Meeting the minds behind the future of Mediterranean tech.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {MOCK_SPEAKERS.map(speaker => (
                <div key={speaker.id} className="glass p-10 rounded-[4rem] border-white/60 text-center group hover:bg-white transition-all duration-700 flex flex-col hover:shadow-3xl">
                  <div className="relative mb-8 inline-block mx-auto">
                    <img src={speaker.avatar} className="w-36 h-36 rounded-[3rem] object-cover shadow-2xl group-hover:scale-110 transition-transform duration-1000" alt="" />
                    <div className="absolute -bottom-3 -right-3 bg-brand-primary text-white p-4 rounded-3xl shadow-xl border-8 border-white group-hover:rotate-12 transition-transform">
                      <Mic size={20} fill="currentColor" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-1 group-hover:text-brand-primary transition-colors text-neutral-900">{speaker.name}</h3>
                  <p className="text-brand-primary font-black text-[10px] uppercase tracking-[0.3em] mb-8">{speaker.role} • {speaker.company}</p>
                  <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-10 flex-1 italic line-clamp-4">"{speaker.bio}"</p>
                  <div className="flex flex-col gap-4">
                    <button className="bg-neutral-900 text-white w-full py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-primary transition-all shadow-xl hover:shadow-brand-primary/30 active:scale-95">Complete Bio</button>
                    <div className="flex justify-center gap-6">
                      {['linkedin', 'twitter'].map(social => (
                        <button key={social} className="glass w-12 h-12 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-brand-primary transition-all border-white/40 hover:bg-white"><Share2 size={20} /></button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Event Wall' && (
          <motion.div key="wall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
            <div className="glass p-12 rounded-[4rem] border-white/60 flex flex-col md:flex-row gap-8 items-center bg-white/50 backdrop-blur-3xl shadow-2xl border-2">
              <div className="relative">
                <img src={MOCK_USER.avatar} className="w-20 h-20 rounded-[2rem] shadow-xl border-4 border-white" alt="" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-md" />
              </div>
              <button className="flex-1 bg-white/80 hover:bg-white text-left px-12 py-6 rounded-[2.5rem] text-neutral-400 font-bold transition-all border border-neutral-100 shadow-xl group">
                <span className="group-hover:text-neutral-900 transition-colors">Share your event experience, {MOCK_USER.firstName}...</span>
              </button>
              <div className="flex gap-8 text-neutral-400">
                <button className="hover:text-brand-primary transition-all hover:scale-125"><ImageIcon size={32} /></button>
                <button className="hover:text-brand-primary transition-all hover:scale-125"><Video size={32} /></button>
              </div>
            </div>

            <div className="space-y-16">
              {MOCK_WALL_POSTS.map(post => (
                <div key={post.id} className="glass rounded-[5rem] border-white/60 overflow-hidden shadow-3xl hover:shadow-brand-primary/5 transition-all duration-1000 bg-white/40 backdrop-blur-3xl group border-2">
                  <div className="p-12 pb-0 flex justify-between items-start">
                    <div className="flex gap-8 items-center">
                      <img src={post.avatar} className="w-16 h-16 rounded-[1.8rem] object-cover shadow-xl border-4 border-white group-hover:rotate-3 transition-transform" alt="" />
                      <div>
                        <div className="font-black text-2xl text-neutral-900 tracking-tight">{post.author}</div>
                        <div className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-3 mt-1">
                          <Clock size={16} /> {post.time}
                        </div>
                      </div>
                    </div>
                    <button className="text-neutral-200 hover:text-neutral-900 transition-all p-3 hover:bg-white rounded-full"><Plus className="rotate-45" size={36} /></button>
                  </div>
                  <div className="p-12">
                    <p className="text-neutral-800 font-medium text-2xl leading-[1.6] mb-10">{post.content}</p>
                    {post.image && (
                      <div className="relative group/img overflow-hidden rounded-[3.5rem] border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                        <img src={post.image} className="w-full h-auto transition-transform duration-2000 group-hover/img:scale-110" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000" />
                      </div>
                    )}
                  </div>
                  <div className="p-12 pt-0 flex justify-between items-center mt-4">
                    <div className="flex gap-12">
                      <button className="flex items-center gap-4 font-black text-lg text-neutral-400 hover:text-red-500 transition-all group/btn">
                        <div className="glass w-16 h-16 rounded-[2rem] flex items-center justify-center group-hover/btn:bg-red-50 transition-all shadow-xl group-hover/btn:scale-110">
                          <Heart size={28} className="group-hover/btn:fill-current" />
                        </div>
                        <span className="group-hover/btn:text-neutral-900 transition-colors text-2xl">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-4 font-black text-lg text-neutral-400 hover:text-brand-primary transition-all group/btn">
                        <div className="glass w-16 h-16 rounded-[2rem] flex items-center justify-center group-hover/btn:bg-brand-primary/10 transition-all shadow-xl group-hover/btn:scale-110">
                          <MessageCircle size={28} />
                        </div>
                        <span className="group-hover/btn:text-neutral-900 transition-colors text-2xl">{post.comments}</span>
                      </button>
                    </div>
                    <button className="bg-neutral-900 text-white px-10 py-5 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brand-primary transition-all shadow-2xl active:scale-90">
                      Full Post <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Polls' && (
          <motion.div key="polls" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-neutral-900 tracking-tight">Active Polls</h2>
              <p className="text-neutral-500 font-medium text-lg">Real-time community sentiment and decision making.</p>
            </div>
            <div className="space-y-10">
              {MOCK_POLLS.map(poll => (
                <div key={poll.id} className={`glass p-16 rounded-[5rem] border-white/60 shadow-3xl transition-all duration-1000 bg-white/40 backdrop-blur-3xl ${!poll.isActive && 'opacity-60 saturate-0'}`}>
                  <div className="flex justify-between items-center mb-12">
                    <div className={`px-8 py-3 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl ${poll.isActive ? 'bg-red-500 text-white animate-pulse' : 'bg-neutral-100 text-neutral-500'}`}>
                      {poll.isActive ? 'LIVE POLL' : 'CLOSED'}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-black text-neutral-400 uppercase tracking-widest bg-white/50 px-6 py-3 rounded-2xl shadow-sm">
                      <Users size={18} className="text-brand-primary" /> {poll.totalVotes} responses
                    </div>
                  </div>
                  <h3 className="text-3xl font-black mb-12 leading-tight text-neutral-900">{poll.question}</h3>
                  <div className="space-y-6">
                    {poll.options.map((opt, i) => (
                      <button key={i} disabled={!poll.isActive} className="w-full relative group perspective-1000">
                        <div className="w-full h-24 bg-white/80 rounded-[2.5rem] overflow-hidden border-2 border-white group-hover:border-brand-primary transition-all shadow-xl group-hover:shadow-brand-primary/20">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(opt.votes / poll.totalVotes) * 100}%` }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className="h-full bg-gradient-to-r from-brand-primary via-brand-primary to-brand-secondary opacity-20"
                          />
                        </div>
                        <div className="absolute inset-0 px-12 flex justify-between items-center">
                          <span className="font-black text-neutral-900 text-2xl group-hover:translate-x-2 transition-transform">{opt.text}</span>
                          <span className="font-black text-brand-primary text-3xl group-hover:scale-110 transition-transform">{Math.round((opt.votes / poll.totalVotes) * 100)}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {poll.isActive && (
                    <div className="mt-12 flex items-center justify-center gap-4 text-neutral-400">
                      <div className="h-px w-12 bg-neutral-100" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Vote to see live results</span>
                      <div className="h-px w-12 bg-neutral-100" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Sponsors' && (
          <motion.div key="sponsors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-6xl font-black text-neutral-900 tracking-tighter leading-tight">Driving Innovation <span className="text-brand-primary">Together</span></h2>
              <p className="text-neutral-500 font-medium text-xl leading-relaxed">Meet the progressive companies supporting the ecosystem and defining the future of tech in Maghreb.</p>
              <div className="h-2 w-32 bg-brand-primary mx-auto rounded-full shadow-lg shadow-brand-primary/20" />
            </div>

            <div className="space-y-32">
              <div className="space-y-12">
                <div className="flex items-center gap-10">
                  <div className="flex-1 h-px bg-neutral-100" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.6em] text-neutral-300">Platinum Ecosystem Partners</h3>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="glass p-16 rounded-[5rem] border-white/80 text-center flex flex-col items-center hover:bg-white transition-all duration-1000 hover:scale-[1.05] hover:shadow-3xl group border-2 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
                      <div className="w-48 h-48 bg-white rounded-[3rem] p-10 shadow-2xl mb-10 flex items-center justify-center transition-all group-hover:rotate-6 group-hover:shadow-brand-primary/10">
                        <img src={`https://picsum.photos/seed/sponsor${i}/400`} className="max-w-full max-h-full object-contain" alt="" />
                      </div>
                      <h4 className="text-3xl font-black mb-2 text-neutral-900 group-hover:text-brand-primary transition-colors">Global Synergy</h4>
                      <p className="text-neutral-400 font-black text-[12px] uppercase tracking-[0.3em] mb-10">Ecosystem Enabler</p>
                      <button className="mt-auto px-10 py-5 rounded-[2rem] bg-neutral-900 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-brand-primary hover:shadow-2xl transition-all active:scale-95">
                        View Mission <ExternalLink size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 px-6">
                {[4, 5, 6, 7, 8, 9].map(i => (
                  <div key={i} className="glass p-10 rounded-[3.5rem] border-white/60 flex flex-col items-center justify-center hover:bg-white transition-all duration-500 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 hover:scale-110 aspect-square shadow-xl hover:shadow-brand-primary/5 group">
                    <img src={`https://picsum.photos/seed/sponsor${i}/400`} className="w-full h-auto object-contain transition-all duration-700" alt="" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Forum' && (
          <motion.div key="forum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-black text-neutral-900 tracking-tight">Community Forum</h2>
              <p className="text-neutral-500 font-medium text-lg">In-depth discussions, Q&A, and knowledge sharing.</p>
            </div>
            <div className="space-y-10">
              {MOCK_FORUM_POSTS.map(post => (
                <div key={post.id} className="glass p-12 rounded-[5rem] border-white/60 shadow-3xl hover:bg-white transition-all duration-1000 bg-white/40 group border-2">
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex gap-8 items-center">
                      <div className="glass w-20 h-20 rounded-[2.5rem] flex items-center justify-center bg-brand-primary/10 text-brand-primary border-white shadow-xl">
                        <MessageSquare size={36} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-neutral-900 group-hover:text-brand-primary transition-colors tracking-tight">{post.title}</h3>
                        <div className="flex items-center gap-6 mt-2">
                          <span className="text-[11px] font-black uppercase text-brand-primary tracking-[0.3em] bg-brand-primary/10 px-4 py-1.5 rounded-xl border border-brand-primary/20">{post.category}</span>
                          <span className="text-xs font-bold text-neutral-400">Started by <span className="text-neutral-900">{post.author}</span> • {post.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-16 border-t border-neutral-100 pt-10 mt-10">
                    <div className="flex items-center gap-4 text-neutral-400 font-black text-xs uppercase tracking-widest">
                      <MessageCircle size={22} className="text-brand-primary" /> {post.replies} Replies
                    </div>
                    <div className="flex items-center gap-4 text-neutral-400 font-black text-xs uppercase tracking-widest">
                      <Users size={22} className="text-brand-primary" /> {post.views} Views
                    </div>
                    <button className="ml-auto bg-neutral-900 text-white px-10 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-primary transition-all shadow-2xl active:scale-95">Enter Discussion</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Gallery' && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-6xl font-black text-neutral-900 tracking-tighter">Event Gallery</h2>
                <p className="text-neutral-500 font-medium text-xl mt-3 max-w-xl">A visual journey through the most impactful moments of the Mediterranean Tech Summit.</p>
              </div>
              <button className="bg-neutral-900 text-white px-12 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-brand-primary transition-all shadow-3xl active:scale-90 shrink-0">
                Upload Photo <Plus size={24} />
              </button>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
              {MOCK_GALLERY.map(item => (
                <div key={item.id} className="break-inside-avoid relative group rounded-[4rem] overflow-hidden border-8 border-white shadow-3xl hover:shadow-brand-primary/20 transition-all duration-2000 bg-white/40 translate-y-0 hover:-translate-y-4">
                  <img src={item.url} className="w-full h-auto transition-transform duration-[3s] group-hover:scale-125" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 flex flex-col justify-end p-12 translate-y-10 group-hover:translate-y-0">
                    <p className="text-white font-black text-2xl mb-3 tracking-tight">{item.caption}</p>
                    <p className="text-brand-primary text-[11px] font-black uppercase tracking-[0.3em]">By <span className="text-white">{item.author}</span></p>
                    <div className="flex gap-6 mt-10">
                      <button className="glass w-14 h-14 rounded-[1.8rem] flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all shadow-xl"><Heart size={24} /></button>
                      <button className="glass w-14 h-14 rounded-[1.8rem] flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all shadow-xl"><Share2 size={24} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Videos' && (
          <motion.div key="videos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <h2 className="text-6xl font-black text-neutral-900 tracking-tighter">On-Demand Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {MOCK_VIDEOS.map(video => (
                <div key={video.id} className="glass rounded-[5rem] border-white/60 overflow-hidden shadow-3xl hover:bg-white transition-all duration-1000 group border-2 flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-1000 backdrop-blur-[2px]">
                      <div className="w-24 h-24 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-3xl scale-0 group-hover:scale-100 transition-transform duration-700 group-hover:rotate-12">
                        <Play size={40} fill="currentColor" className="ml-2" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 right-6 bg-brand-primary/90 text-white px-6 py-2 rounded-2xl text-[11px] font-black tracking-[0.3em] backdrop-blur-xl shadow-xl">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-12 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black text-neutral-900 mb-6 group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">{video.title}</h3>
                    <div className="mt-auto pt-8 border-t border-neutral-100/50 flex justify-between items-center text-neutral-400 font-black text-[10px] uppercase tracking-[0.4em]">
                      <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neutral-200 rounded-full" /> {video.views} Views</span>
                      <span className="text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-lg">{video.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-8">
              <div className="glass w-32 h-32 rounded-[3rem] flex items-center justify-center bg-neutral-900 border-neutral-800 text-brand-primary mx-auto shadow-3xl shadow-brand-primary/10 relative group">
                <div className="absolute inset-0 bg-brand-primary/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all" />
                <FileQuestion size={56} className="relative z-10" />
              </div>
              <h2 className="text-7xl font-black text-neutral-900 tracking-tighter">Mastery Check</h2>
              <p className="text-neutral-500 font-medium text-2xl max-w-2xl mx-auto leading-relaxed">Demonstrate your technical depth and secure your position on the leaderboards.</p>
            </div>
            <div className="glass p-20 rounded-[6rem] border-white/60 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white/40 backdrop-blur-3xl text-center relative overflow-hidden ring-8 ring-white/50 border-4">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-bl-[15rem] -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-tr-[15rem] -ml-20 -mb-20" />
              <div className="relative z-10">
                <div className="text-brand-primary font-black text-[12px] uppercase tracking-[0.6em] mb-6 flex items-center justify-center gap-4">
                  <div className="h-px w-8 bg-current" /> CHAMPIONSHIP CHALLENGE <div className="h-px w-8 bg-current" />
                </div>
                <h3 className="text-5xl font-black mb-12 text-neutral-900 leading-[1.1] tracking-tight">Advanced Mediterranean Tech <br />Ecosystem Quiz 2026</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
                  <div className="glass bg-white/60 p-10 rounded-[3rem] border-2 border-white shadow-xl hover:scale-105 transition-transform">
                    <div className="text-neutral-400 font-black text-[11px] uppercase tracking-[0.4em] mb-3">Total Modules</div>
                    <div className="text-4xl font-black text-neutral-900">15 <span className="text-lg text-neutral-300">Tasks</span></div>
                  </div>
                  <div className="glass bg-white/60 p-10 rounded-[3rem] border-2 border-white shadow-xl hover:scale-105 transition-transform">
                    <div className="text-neutral-400 font-black text-[11px] uppercase tracking-[0.4em] mb-3">Potential Earnings</div>
                    <div className="text-4xl font-black text-brand-primary">+500 <span className="text-lg text-brand-primary/40">XP</span></div>
                  </div>
                </div>
                <button className="bg-neutral-900 text-white w-full py-8 rounded-[3rem] font-black text-sm uppercase tracking-[0.5em] hover:bg-brand-primary transition-all shadow-3xl hover:shadow-brand-primary/40 active:scale-95 text-center">Enter Assessment Portal</button>
                <div className="mt-12 flex items-center justify-center gap-8">
                  <div className="flex items-center gap-2 text-[11px] font-black text-neutral-400 uppercase tracking-widest">
                    <Clock size={16} /> 4:21:05 REMAINING
                  </div>
                  <div className="h-1 w-1 bg-neutral-200 rounded-full" />
                  <div className="flex items-center gap-2 text-[11px] font-black text-neutral-400 uppercase tracking-widest">
                    <Users size={16} /> 1,240 ATTEMPTS
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Scavenger Hunt' && (
          <motion.div key="hunt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-16">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-12 border-b border-neutral-100 pb-16">
              <div className="text-center lg:text-left space-y-4">
                <h2 className="text-7xl font-black text-neutral-900 tracking-tighter">Digital Expedition</h2>
                <p className="text-neutral-500 font-medium text-2xl max-w-2xl leading-relaxed">Navigate the physical venue using our digital keys to unlock high-tier rewards.</p>
              </div>
              <div className="glass p-12 rounded-[4rem] border-white/80 bg-neutral-900 border-4 text-center shrink-0 w-80 shadow-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-primary mb-4">Missions Completed</div>
                  <div className="text-6xl font-black text-white tracking-tighter">04<span className="text-neutral-700 text-3xl mx-2">/</span>10</div>
                  <div className="mt-6 w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-primary w-[40%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { title: 'The Startup Nexus', icon: <Building2 />, desc: 'Locate the hidden terminal at the entrance of the primary exhibition quadrant.', status: 'Completed', color: 'text-green-500', bg: 'bg-green-50/50' },
                { title: 'The Visionary Hall', icon: <Video />, desc: 'Identify the visual key projected near the north focal point after the keynote.', status: 'Locked', color: 'text-neutral-300', bg: 'bg-neutral-50/20' },
                { title: 'Community Node', icon: <MessageSquare />, desc: 'Establish a peer-to-peer connection with an invitee to generate the final key.', status: 'Active', color: 'text-brand-primary', bg: 'bg-brand-primary/5' },
                { title: 'The Innovation Lab', icon: <Target />, desc: 'Authorize the VR simulation sequence to secure your biometric credentials.', status: 'Locked', color: 'text-neutral-300', bg: 'bg-neutral-50/20' }
              ].map((m, i) => (
                <div key={i} className={`glass p-12 rounded-[5rem] border-white/60 shadow-3xl hover:bg-white transition-all duration-1000 border-2 group relative overflow-hidden ${m.status === 'Active' ? 'ring-4 ring-brand-primary/20 border-brand-primary' : 'bg-white/40'}`}>
                  <div className="flex gap-10 items-start relative z-10">
                    <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center bg-white shadow-2xl ${m.status === 'Completed' ? 'text-green-500' : 'text-neutral-300'} group-hover:scale-110 transition-transform duration-700 group-hover:rotate-6`}>
                      {m.status === 'Completed' ? <CheckCircle2 size={40} /> : m.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-[12px] font-black uppercase tracking-[0.4em] mb-4 ${m.color}`}>{m.status}</div>
                      <h3 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight leading-tight">{m.title}</h3>
                      <p className="text-neutral-500 text-lg font-medium leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  {m.status === 'Active' && (
                    <button className="mt-12 w-full bg-neutral-900 text-white py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-3xl hover:bg-brand-primary transition-all active:scale-95 group-hover:shadow-brand-primary/30">Activate Scanner</button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Details' && (
          <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-8xl font-black text-neutral-900 tracking-tighter">Event Protocol</h2>
              <div className="h-3 w-40 bg-brand-primary mx-auto rounded-full shadow-2xl shadow-brand-primary/30" />
              <p className="text-neutral-500 font-medium text-2xl max-w-2xl mx-auto">Essential intelligence for a seamless High-Tier event experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="glass p-16 rounded-[6rem] border-white/60 shadow-3xl bg-white/40 backdrop-blur-3xl border-2 hover:bg-white transition-all duration-1000 group">
                <div className="flex items-center gap-6 mb-12">
                  <div className="glass w-20 h-20 rounded-[2.5rem] flex items-center justify-center bg-brand-primary/10 text-brand-primary border-white shadow-xl group-hover:rotate-12 transition-transform">
                    <Info size={40} />
                  </div>
                  <h3 className="text-4xl font-black text-neutral-900 tracking-tight">Logistics</h3>
                </div>
                <div className="space-y-12">
                  {MOCK_DETAILS.logistics.map((l, i) => (
                    <div key={i} className="flex gap-8 group/item">
                      <div className="w-2 h-2 bg-brand-primary rounded-full mt-3.5 shrink-0 group-hover/item:scale-[2.5] transition-all duration-500" />
                      <div>
                        <p className="text-2xl font-black text-neutral-900 mb-2 truncate">{l.title}</p>
                        <p className="text-neutral-400 font-medium leading-relaxed text-lg">{l.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-16 rounded-[6rem] border-white/60 shadow-3xl bg-white/40 backdrop-blur-3xl border-2 hover:bg-white transition-all duration-1000 group">
                <div className="flex items-center gap-6 mb-12">
                  <div className="glass w-20 h-20 rounded-[2.5rem] flex items-center justify-center bg-brand-primary/10 text-brand-primary border-white shadow-xl group-hover:rotate-12 transition-transform">
                    <ShieldCheck size={40} />
                  </div>
                  <h3 className="text-4xl font-black text-neutral-900 tracking-tight">Core Integrity</h3>
                </div>
                <div className="space-y-12">
                  {MOCK_DETAILS.safety.map((s, i) => (
                    <div key={i} className="flex gap-8 group/item">
                      <div className="w-2 h-2 bg-brand-primary rounded-full mt-3.5 shrink-0 group-hover/item:scale-[2.5] transition-all duration-500" />
                      <div>
                        <p className="text-2xl font-black text-neutral-900 mb-2 truncate">{s.title}</p>
                        <p className="text-neutral-400 font-medium leading-relaxed text-lg">{s.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass p-20 rounded-[6rem] border-white/60 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.5)] bg-neutral-900 text-white border-2 text-center group overflow-hidden relative ring-8 ring-neutral-900/10">
              <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10">
                <h3 className="text-5xl font-black mb-6 tracking-tight">Immediate Assistance Node</h3>
                <p className="text-neutral-400 font-medium text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">Our protocol support team is available via high-bandwidth nodes 24/7 during the event cycle.</p>
                <div className="flex flex-col md:flex-row justify-center gap-10">
                  <button className="bg-white text-neutral-900 px-16 py-6 rounded-[3rem] font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 hover:bg-brand-primary hover:text-white transition-all shadow-3xl hover:scale-105 active:scale-95 group/btn shrink-0">
                    <Phone size={24} className="group-hover/btn:animate-bounce" /> Call Support
                  </button>
                  <button className="glass bg-neutral-800 border-white/10 text-white px-16 py-6 rounded-[3rem] font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-5 hover:border-brand-primary transition-all hover:scale-105 active:scale-95 group/btn shrink-0">
                    <Mail size={24} className="group-hover/btn:animate-pulse" /> Dispatch Email
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}
