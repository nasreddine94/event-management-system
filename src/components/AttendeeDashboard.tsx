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
  ArrowLeft,
  ThumbsUp,
  Play,
  Award,
  Send,
  X,
  Package
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '../lib/utils';
import FeatureStatusIndicator from './FeatureStatusIndicator';
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

function MobileDeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[320px] h-[650px] bg-neutral-900 rounded-[3rem] border-8 border-neutral-800 shadow-2xl overflow-hidden ring-4 ring-neutral-900/10 shrink-0">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-800 rounded-b-2xl z-50 flex items-center justify-center gap-1.5">
        <div className="w-10 h-1 bg-neutral-700 rounded-full" />
        <div className="w-1 h-1 bg-neutral-700 rounded-full" />
      </div>

      {/* Status Bar */}
      <div className="absolute top-0 inset-x-0 h-12 px-6 flex items-center justify-between text-[10px] font-bold text-neutral-400 z-40">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <Zap size={10} fill="currentColor" />
          <div className="w-4 h-2 rounded-sm border border-neutral-600 relative">
            <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-neutral-400" />
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="w-full h-full bg-neutral-50 overflow-y-auto pt-12 pb-6 px-4 scrollbar-none">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-neutral-700/30 rounded-full z-50" />
    </div>
  );
}

export default function AttendeeDashboard() {
  const [activeRole, setActiveRole] = useState<Role>('Visitor');
  const [showOTP, setShowOTP] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [previousSection, setPreviousSection] = useState('Home');

  // Event Selection & Registration State
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEventClick = (event: any) => {
    setPreviousSection(activeSection);
    setSelectedEvent(event);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      requirements: ''
    });
    setIsSuccess(false);
    setActiveSection('EventDetails');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Stay on page to show success, or could redirect
    }, 1500);
  };

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

        <nav className="space-y-1 mt-6">
          {sections[activeRole].map((item) => (
            <FeatureStatusIndicator key={item.id} featureId={`attendee-${activeRole}-${item.id}`} className="px-4">
              <button
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center justify-between py-3 rounded-xl text-sm font-bold transition-all",
                  activeSection === item.id
                    ? "bg-neutral-900 text-white shadow-lg shadow-neutral-900/10 px-4"
                    : "text-neutral-500 hover:text-neutral-900 px-4"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={activeSection === item.id ? "text-white" : "text-neutral-400"} />
                  {item.label}
                </div>
              </button>
            </FeatureStatusIndicator>
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

  // Enable dual-view (Web + Mobile) for all attendee roles
  const isDualView = true;

  return (
    <div className="flex min-h-screen bg-neutral-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex overflow-hidden">
        {/* Main/Web View (2/3 or Full) */}
        <main className={cn(
          "flex-1 p-8 overflow-y-auto transition-all duration-500",
          isDualView ? "lg:flex-[2]" : ""
        )}>
          <div className="max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {activeSection === 'EventDetails' && (
                    <button
                      onClick={() => setActiveSection(previousSection)}
                      className="p-2 -ml-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-400 hover:text-neutral-900"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
                    {activeSection === 'Home' || activeSection === 'Dashboard'
                      ? `Welcome, ${MOCK_USER.firstName}`
                      : activeSection === 'EventDetails'
                        ? 'Event Details'
                        : activeSection}
                  </h2>
                </div>
                <p className="text-neutral-500 font-medium">
                  {activeSection === 'EventDetails'
                    ? `Review and register for ${selectedEvent?.title}`
                    : activeRole === 'Visitor'
                      ? 'Browse the hottest tech events of 2026'
                      : 'Your personal event headquarters'}
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
                  <VisitorContent onSectionChange={setActiveSection} activeSection={activeSection} onEventClick={handleEventClick} />
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
                  <UserContent onSectionChange={setActiveSection} activeSection={activeSection} onEventClick={handleEventClick} />
                </motion.div>
              )}

              {activeRole === 'Attendee' && activeSection !== 'EventDetails' && (
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

              {activeSection === 'EventDetails' && selectedEvent && (
                <motion.div
                  key="event-details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventDetailsContent
                    event={selectedEvent}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleRegisterSubmit}
                    isSubmitting={isSubmitting}
                    isSuccess={isSuccess}
                    onBack={() => setActiveSection(previousSection)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile Preview View (1/3) */}
        {isDualView && (
          <aside className="hidden xl:flex flex-1 bg-neutral-100 border-l border-neutral-100 p-8 flex-col items-center justify-center overflow-hidden">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/10 rounded-full mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Live Mobile Sync</span>
              </div>
              <p className="text-neutral-400 font-bold text-xs">Simulating premium mobile experience</p>
            </div>

            <MobileDeviceFrame>
              <AnimatePresence mode="wait">
                {activeSection === 'EventDetails' && selectedEvent ? (
                  <motion.div
                    key="mobile-event-details"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  >
                    <EventDetailsContent
                      event={selectedEvent}
                      formData={formData}
                      setFormData={setFormData}
                      onSubmit={handleRegisterSubmit}
                      isSubmitting={isSubmitting}
                      isSuccess={isSuccess}
                      onBack={() => setActiveSection(previousSection)}
                      isMobileMode={true}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`mobile-${activeRole}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="w-full"
                  >
                    {activeRole === 'Visitor' && (
                      <VisitorContent
                        onSectionChange={setActiveSection}
                        activeSection={activeSection}
                        onEventClick={handleEventClick}
                        isMobileMode={true}
                      />
                    )}
                    {activeRole === 'User' && (
                      <UserContent
                        onSectionChange={setActiveSection}
                        activeSection={activeSection}
                        onEventClick={handleEventClick}
                        isMobileMode={true}
                      />
                    )}
                    {activeRole === 'Attendee' && (
                      <AttendeeContent
                        onSectionChange={setActiveSection}
                        activeSection={activeSection}
                        isMobileMode={true}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </MobileDeviceFrame>
          </aside>
        )}
      </div>

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

function VisitorContent({ onSectionChange, activeSection, onEventClick, isMobileMode }: { onSectionChange: (s: string) => void, activeSection: string, onEventClick: (e: any) => void, isMobileMode?: boolean }) {
  const categories = ['All', 'Business', 'Tech', 'Design', 'Health', 'Education', 'Culture'];
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="space-y-8">

      {activeSection === 'Home' && (
        <div className={cn("space-y-6", isMobileMode && "space-y-4")}>
          {/* Search Header */}
          <div className={cn(
            "glass p-6 rounded-[2.5rem] flex gap-4 items-center border-white/40",
            isMobileMode && "p-4 rounded-[2rem] shadow-sm flex-col bg-white"
          )}>
            <div className={cn(
              "flex-1 w-full bg-neutral-100 px-6 py-4 rounded-2xl flex items-center gap-3 border border-neutral-200/60",
              isMobileMode && "px-4 py-3 rounded-xl bg-neutral-50"
            )}>
              <Search className="text-neutral-400" size={isMobileMode ? 18 : 20} />
              <input
                type="text"
                placeholder="Find your next event..."
                className="bg-transparent border-none outline-none w-full text-base font-medium placeholder:text-neutral-400"
              />
            </div>
            {!isMobileMode ? (
              <button className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-all">
                Search
              </button>
            ) : (
              <button className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold shadow-md">
                Search Events
              </button>
            )}
          </div>

          {/* Categories */}
          <div className={cn(
            "flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x",
            isMobileMode && "px-1"
          )}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all snap-start",
                  activeCategory === c
                    ? "bg-brand-primary text-white shadow-md scale-105"
                    : isMobileMode ? "bg-white text-neutral-500 border border-neutral-100" : "glass text-neutral-500"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Event Content */}
          <div className={cn(
            "grid gap-8",
            isMobileMode ? "grid-cols-1 gap-6" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}>
            {MOCK_EVENTS.map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className={cn(
                  "glass rounded-[2rem] overflow-hidden group cursor-pointer border-white/50 hover:shadow-xl transition-all duration-500",
                  isMobileMode && "rounded-3xl bg-white shadow-sm border-neutral-100 p-3"
                )}
              >
                <div className="relative">
                  <img src={event.image} alt="" className={cn("h-56 w-full object-cover", isMobileMode && "h-48 rounded-2xl shadow-inner")} />
                  {isMobileMode && (
                    <div className="absolute top-3 right-3 glass p-2 rounded-xl text-brand-primary shadow-sm backdrop-blur-md">
                      <Heart size={16} />
                    </div>
                  )}
                </div>
                <div className={cn("p-6", isMobileMode && "p-4 space-y-3")}>
                  <div>
                    <h3 className={cn("text-xl font-bold mb-3", isMobileMode && "text-lg mb-1 leading-tight")}>{event.title}</h3>
                    <div className="flex items-center gap-2 text-neutral-500 text-sm"><MapPin size={16} /> {event.location}</div>
                  </div>

                  {!isMobileMode ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                      className="w-full mt-6 bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary transition-all group"
                    >
                      Register Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-brand-primary font-black text-lg">{event.price}</span>
                      <button className="bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md">
                        Join
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeSection === 'Search' && (
        <div className={cn("space-y-8", isMobileMode && "space-y-4")}>
          <div className={cn(
            "glass p-6 rounded-[2.5rem] flex items-center gap-4 border-white/50",
            isMobileMode && "p-3 rounded-2xl bg-white shadow-sm border-neutral-100"
          )}>
            <div className={cn(
              "flex-1 bg-neutral-100 px-6 py-4 rounded-2xl flex items-center gap-3 border border-neutral-200",
              isMobileMode && "px-4 py-3 rounded-xl bg-neutral-50"
            )}>
              <Search className="text-neutral-400" size={isMobileMode ? 18 : 20} />
              <input type="text" placeholder={isMobileMode ? "Search..." : "Search events by name, location or category..."} className="bg-transparent border-none outline-none w-full text-base font-medium" />
            </div>
            <button className={cn(
              "glass p-4 rounded-2xl text-neutral-500 hover:text-brand-primary transition-colors",
              isMobileMode && "p-3 bg-neutral-50 border-neutral-100"
            )}>
              <Filter size={isMobileMode ? 20 : 24} />
            </button>
          </div>
          <div className="flex justify-between items-center px-2">
            <div className={cn("text-neutral-500 font-bold", isMobileMode && "text-sm")}>
              Showing <span className="text-neutral-900">12</span> events
            </div>
          </div>
          <div className={cn(
            "grid gap-8",
            isMobileMode ? "grid-cols-1 gap-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}>
            {MOCK_EVENTS.map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className={cn(
                  "glass rounded-[2rem] overflow-hidden group cursor-pointer border-white/50 hover:shadow-xl transition-all duration-500",
                  isMobileMode && "rounded-2xl bg-white shadow-sm flex items-center p-2 gap-4"
                )}
              >
                <img src={event.image} alt="" className={cn("h-48 w-full object-cover", isMobileMode && "h-20 w-20 rounded-xl")} />
                <div className={cn("p-6", isMobileMode && "p-0 flex-1")}>
                  <h3 className={cn("font-bold text-lg mb-4", isMobileMode && "text-sm mb-1 line-clamp-1")}>{event.title}</h3>
                  <div className={cn("flex justify-between items-center text-xs font-bold text-neutral-400", isMobileMode && "flex-col items-start gap-1")}>
                    <div className="flex items-center gap-2"><Calendar size={isMobileMode ? 12 : 14} /> {event.date}</div>
                    <div className="text-brand-primary">{event.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'FAQs' && (
        <div className={cn("max-w-3xl mx-auto space-y-6", isMobileMode && "space-y-4 px-1")}>
          <div className={cn("text-center mb-12", isMobileMode && "mb-6")}>
            <h2 className={cn("text-4xl font-black mb-4", isMobileMode && "text-2xl mb-2")}>FAQs</h2>
            <p className={cn("text-neutral-500 font-medium", isMobileMode && "text-sm")}>Everything you need to know.</p>
          </div>
          {[
            { q: 'How do I register for an event?', a: 'You can browse our events, select the one you want to attend, and click "Register Now".' },
            { q: 'What is the Attendee Dashboard?', a: 'Once registered and verified via OTP, you gain access to the Attendee Dashboard with your ticket and tool.' },
            { q: 'Can I get a refund for my ticket?', a: 'Refund policies vary by event. Please check the specific event details.' }
          ].map((faq, i) => (
            <div key={i} className={cn(
              "glass p-8 rounded-[2rem] border-white/50 group hover:shadow-md transition-all",
              isMobileMode && "p-4 rounded-2xl bg-white border-neutral-100 shadow-sm"
            )}>
              <h4 className={cn("font-black text-xl mb-3 flex items-center gap-3", isMobileMode && "text-sm mb-2")}>
                <div className={cn("w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary text-sm", isMobileMode && "w-6 h-6 text-[10px]")}>Q</div>
                {faq.q}
              </h4>
              <p className={cn("text-neutral-500 font-medium leading-relaxed pl-11", isMobileMode && "text-[11px] pl-9")}>{faq.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserContent({ onSectionChange, activeSection, onEventClick, isMobileMode }: { onSectionChange: (s: string) => void, activeSection: string, onEventClick: (e: any) => void, isMobileMode?: boolean }) {
  return (
    <div className="space-y-8">
      {activeSection === 'Home' && (
        <div className={cn(
          "grid gap-6",
          isMobileMode ? "grid-cols-2 gap-3" : "grid-cols-2 md:grid-cols-4"
        )}>
          {[
            { label: isMobileMode ? 'Upcoming' : 'Upcoming Events', value: '3', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: isMobileMode ? 'Saved' : 'Saved Favorites', value: '12', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
            { label: isMobileMode ? 'Attended' : 'Events Attended', value: '8', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
            { label: isMobileMode ? 'Spent' : 'Total Spent', value: '24k', icon: CreditCard, color: 'text-brand-primary', bg: 'bg-brand-primary/5' }
          ].map(stat => (
            <div key={stat.label} className={cn(
              "glass p-6 rounded-[2rem] border-white/50",
              isMobileMode && "p-4 rounded-2xl bg-white shadow-sm border-neutral-100"
            )}>
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm",
                isMobileMode ? "w-10 h-10 rounded-xl mb-3" : "",
                stat.bg,
                stat.color
              )}>
                <stat.icon size={isMobileMode ? 20 : 24} />
              </div>
              <div className={cn("text-2xl font-black", isMobileMode && "text-xl")}>{stat.value}</div>
              <div className={cn("text-xs font-bold text-neutral-400 uppercase tracking-wider", isMobileMode && "text-[9px]")}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'Favorites' && (
        <div className={cn(
          "grid gap-6",
          isMobileMode ? "grid-cols-1 gap-4" : "grid-cols-1 md:grid-cols-3"
        )}>
          {MOCK_EVENTS.slice(0, 3).map(event => (
            <div
              key={event.id}
              onClick={() => onEventClick(event)}
              className={cn(
                "glass rounded-[2rem] overflow-hidden group cursor-pointer border-white/50",
                isMobileMode && "rounded-2xl bg-white shadow-sm border-neutral-100 p-2 flex items-center gap-4"
              )}
            >
              <img src={event.image} alt="" className={cn("h-40 w-full object-cover", isMobileMode && "h-20 w-20 rounded-xl")} />
              <div className={cn("p-5", isMobileMode && "p-0 flex-1 flex flex-col justify-center")}>
                <h4 className={cn("font-bold text-base mb-2", isMobileMode && "text-sm mb-1 line-clamp-1")}>{event.title}</h4>
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold leading-none mb-4"><MapPin size={12} /> {event.location}</div>
                {!isMobileMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onEventClick(event); }}
                    className="w-full bg-brand-primary text-white py-3 rounded-xl font-bold text-sm"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'History' && (
        <div className={cn(
          "glass rounded-[2.5rem] overflow-hidden border-white/50",
          isMobileMode && "rounded-3xl border-0 bg-transparent"
        )}>
          {isMobileMode ? (
            <div className="space-y-3">
              {[
                { name: 'Algeria Startup Summit', date: 'March 15, 2026', status: 'Registered' },
                { name: 'Tech Days Algiers', date: 'Jan 10, 2026', status: 'Attended' },
                { name: 'Design Conf 2025', date: 'Dec 05, 2025', status: 'Attended' }
              ].map((entry, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-neutral-900">{entry.name}</div>
                    <div className="text-[10px] text-neutral-400 font-bold">{entry.date}</div>
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider",
                    entry.status === 'Registered' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  )}>{entry.status}</span>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      )}

      {activeSection === 'Profile' && (
        <div className={cn("max-w-4xl mx-auto", isMobileMode && "px-1")}>
          <div className={cn("glass p-10 rounded-[3rem] border-white/60", isMobileMode && "p-6 rounded-3xl bg-white border-neutral-100 shadow-sm")}>
            <div className={cn("flex flex-col md:flex-row gap-12", isMobileMode && "gap-8")}>
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <img src={MOCK_USER.avatar} alt="" className={cn("w-40 h-40 rounded-[3rem] object-cover shadow-xl border-4 border-white", isMobileMode && "w-32 h-32 rounded-3xl")} />
                  <button className={cn("absolute -bottom-2 -right-2 w-10 h-10 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg", isMobileMode && "w-8 h-8 rounded-xl")}><Plus size={isMobileMode ? 16 : 20} /></button>
                </div>
                <div className="text-center">
                  <h3 className={cn("text-2xl font-black mb-1", isMobileMode && "text-lg")}>{MOCK_USER.firstName} {MOCK_USER.lastName}</h3>
                  <p className="text-neutral-500 font-bold uppercase tracking-wider text-xs">Premium Member</p>
                </div>
              </div>
              <div className="flex-1 space-y-8">
                <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", isMobileMode && "gap-4")}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">First Name</label>
                    <input type="text" defaultValue="Alex" className={cn("w-full bg-white border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all", isMobileMode && "py-3 rounded-xl")} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Last Name</label>
                    <input type="text" defaultValue="Benali" className={cn("w-full bg-white border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all", isMobileMode && "py-3 rounded-xl")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Email Address</label>
                  <input type="email" defaultValue={MOCK_USER.email} className={cn("w-full bg-white border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all", isMobileMode && "py-3 rounded-xl")} />
                </div>
                <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 pt-4", isMobileMode && "gap-3")}>
                  <button className={cn("bg-brand-primary text-white py-5 rounded-[1.5rem] font-bold shadow-lg shadow-brand-primary/20", isMobileMode && "py-3.5 rounded-xl")}>Save Profile</button>
                  <button className={cn("glass py-5 rounded-[1.5rem] font-bold border-white/40", isMobileMode && "py-3.5 rounded-xl")}>Change Password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AttendeeContent({ onSectionChange, activeSection, isMobileMode }: { onSectionChange: (s: string) => void, activeSection: string, isMobileMode?: boolean }) {
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
    <div className={cn("space-y-8 pb-32", isMobileMode && "space-y-6 pb-20 px-1")}>
      <AnimatePresence mode="wait">
        {activeSection === 'Dashboard' && (
          <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-8", isMobileMode && "space-y-6")}>
            <div className={cn(
              "glass p-8 rounded-[2.5rem] relative overflow-hidden flex justify-between items-center gap-8 border-white/60",
              isMobileMode ? "p-6 rounded-3xl flex-col bg-white border-neutral-100 shadow-sm" : "flex-col md:flex-row"
            )}>
              <div className={cn("relative z-10", isMobileMode ? "text-center" : "text-center md:text-left")}>
                <div className={cn("text-brand-primary font-bold text-sm uppercase tracking-widest mb-1 flex items-center gap-2", isMobileMode ? "justify-center" : "justify-center md:justify-start")}>
                  <CheckCircle2 size={16} /> Checked In
                </div>
                <h2 className={cn("text-3xl font-black mb-1", isMobileMode && "text-xl")}>Algeria Startup Summit 2026</h2>
                <p className={cn("text-neutral-500 font-medium", isMobileMode && "text-xs")}>March 15 - 17 • Palais de la Culture, Alger</p>
              </div>
              <div className={cn(
                "grid gap-6 w-full",
                isMobileMode ? "grid-cols-2 gap-4" : "grid-cols-2 md:grid-cols-4 md:w-auto"
              )}>
                {[
                  { label: 'Day', value: '1/3', icon: Calendar },
                  { label: isMobileMode ? 'Sess.' : 'Sessions', value: '4', icon: Mic },
                  { label: isMobileMode ? 'Conn.' : 'Connections', value: '8', icon: Users },
                  { label: 'Points', value: '340', icon: Target }
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className={cn("text-2xl font-black text-brand-primary", isMobileMode && "text-lg")}>{s.value}</div>
                    <div className={cn("text-[10px] uppercase font-bold text-neutral-400 tracking-tighter", isMobileMode && "text-[8px]")}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn(
              "grid gap-4",
              isMobileMode ? "grid-cols-3 gap-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
            )}>
              {modules.map((m, i) => (
                <button
                  key={i}
                  onClick={() => onSectionChange(m.name === 'Floor Map' ? 'Map' : m.name)}
                  className={cn(
                    "glass p-6 rounded-[2rem] flex flex-col items-center gap-3 group hover:bg-brand-primary hover:text-white transition-all duration-300 border-white/50",
                    isMobileMode && "p-3 rounded-2xl bg-white border-neutral-100 shadow-sm gap-1 hover:scale-105 active:scale-95"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 bg-brand-primary/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center text-brand-primary group-hover:text-white transition-colors",
                    isMobileMode && "w-10 h-10 rounded-xl"
                  )}>
                    <m.icon size={isMobileMode ? 20 : 24} />
                  </div>
                  <div className="text-center">
                    <div className={cn("font-bold text-sm", isMobileMode && "text-[11px] leading-tight mb-0.5")}>{m.name}</div>
                    {!isMobileMode && <div className="text-[10px] uppercase opacity-40 group-hover:opacity-60">{m.category}</div>}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Agenda' && (
          <motion.div key="agenda" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-8", isMobileMode && "space-y-4")}>
            {[1, 2].map(day => (
              <div key={day} className="space-y-4">
                <h3 className={cn("text-xl font-bold px-4 flex items-center gap-2", isMobileMode && "text-lg px-2")}>
                  <Calendar size={isMobileMode ? 18 : 20} className="text-brand-primary" /> Day {day} Content
                </h3>
                <div className="space-y-3">
                  {MOCK_SESSIONS.filter(s => s.day === day).map(session => (
                    <div key={session.id} className={cn(
                      "glass p-6 rounded-[2rem] border-white/50 flex gap-6 items-center",
                      isMobileMode ? "p-4 rounded-3xl bg-white border-neutral-100 shadow-sm flex-col text-center" : "flex-col md:flex-row"
                    )}>
                      <div className={cn(
                        "w-24 flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm",
                        isMobileMode && "w-full py-2 bg-neutral-50 shadow-none border border-neutral-100 flex-row gap-2"
                      )}>
                        <div className="text-brand-primary font-black text-lg">{session.time.split(' ')[0]}</div>
                        <div className="text-[10px] font-bold text-neutral-400 uppercase">{session.time.split(' ')[1]}</div>
                      </div>
                      <div className={cn("flex-1", isMobileMode ? "text-center" : "text-center md:text-left")}>
                        <h4 className={cn("text-lg font-bold mb-1", isMobileMode && "text-base")}>{session.title}</h4>
                        <p className={cn("text-sm text-neutral-500", isMobileMode && "text-[11px]")}>{session.speaker} • {session.company}</p>
                        {isMobileMode && <div className="text-brand-primary font-bold text-[11px] mt-1">{session.location}</div>}
                      </div>
                      <button className={cn(
                        "px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all",
                        isMobileMode && "w-full justify-center py-2.5 text-sm",
                        session.isSaved ? 'bg-amber-50 text-amber-600' : 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90'
                      )}>
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
          <motion.div key="ticket" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("flex justify-center", isMobileMode && "-mx-4")}>
            <div className={cn(
              "w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-2xl relative border border-neutral-100",
              isMobileMode && "rounded-none border-x-0 shadow-none"
            )}>
              <div className={cn("bg-brand-primary p-12 text-center text-white relative", isMobileMode && "p-8")}>
                <div className="absolute top-8 left-8 w-12 h-12 bg-white/20 rounded-full blur-xl" />
                <h2 className={cn("text-3xl font-black mb-2", isMobileMode && "text-2xl")}>Algeria Startup Summit</h2>
                <p className="text-brand-secondary font-bold opacity-80 uppercase tracking-widest text-xs">March 15-17 • Alger</p>
                <div className="mt-6 inline-block bg-brand-secondary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">Checked In</div>
              </div>
              <div className={cn("p-10 text-center space-y-8", isMobileMode && "p-6 space-y-6")}>
                <div className="flex justify-between text-left">
                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Attendee</div>
                    <div className={cn("font-black text-lg", isMobileMode && "text-base")}>Alex Benali</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-neutral-400 uppercase mb-1">Pass Type</div>
                    <div className={cn("font-black text-lg text-brand-primary", isMobileMode && "text-base")}>VIP Pass</div>
                  </div>
                </div>
                <div className={cn(
                  "bg-neutral-50 p-6 rounded-[2.5rem] inline-block shadow-inner border border-neutral-100",
                  isMobileMode && "p-4 rounded-2xl w-full"
                )}>
                  <QRCodeSVG value="ALG26-4271-93VIP" size={isMobileMode ? 180 : 200} className="mx-auto" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-neutral-300 uppercase">Ticket ID</div>
                  <div className="font-mono text-sm text-neutral-400 font-bold">ALG26-4271-93VIP</div>
                </div>
                <div className={cn(
                  "pt-8 grid grid-cols-3 gap-4 border-t border-dashed border-neutral-100",
                  isMobileMode && "pt-6 gap-2"
                )}>
                  <button className="flex flex-col items-center gap-2 group">
                    <div className={cn("w-12 h-12 glass rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-brand-primary transition-colors", isMobileMode && "w-10 h-10 rounded-xl")}><Plus size={20} /></div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400 group-hover:text-neutral-600">Wallet</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group">
                    <div className={cn("w-12 h-12 glass rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-brand-primary transition-colors", isMobileMode && "w-10 h-10 rounded-xl")}><Download size={20} /></div>
                    <span className="text-[10px] font-bold uppercase text-neutral-400 group-hover:text-neutral-600">PDF</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 group">
                    <div className={cn("w-12 h-12 glass rounded-2xl flex items-center justify-center text-neutral-400 group-hover:text-brand-primary transition-colors", isMobileMode && "w-10 h-10 rounded-xl")}><Share2 size={20} /></div>
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
          <motion.div key="networking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-8", isMobileMode && "space-y-6")}>
            <div className={cn("flex flex-col md:flex-row justify-between items-center gap-6", isMobileMode && "gap-4 items-start")}>
              <div>
                <h2 className={cn("text-3xl font-black mb-1", isMobileMode && "text-xl")}>Networking Hub</h2>
                <p className={cn("text-neutral-500 font-medium", isMobileMode && "text-xs")}>1,200 attendees • <span className="text-brand-primary font-bold">180 online</span></p>
              </div>
              <div className={cn("flex gap-2", isMobileMode && "w-full overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide")}>
                {['Investors', 'Founders', 'Designers', 'Engineers'].map(f => (
                  <button key={f} className="glass px-4 py-2 rounded-full text-xs font-bold hover:bg-white transition-all whitespace-nowrap">{f}</button>
                ))}
              </div>
            </div>
            <div className={cn(
              "grid gap-6",
              isMobileMode ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"
            )}>
              {MOCK_CONNECTIONS.map(person => (
                <div key={person.id} className={cn(
                  "glass p-6 rounded-[2.5rem] border-white/50 group hover:bg-white transition-all duration-500",
                  isMobileMode && "p-5 rounded-3xl"
                )}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img src={person.avatar} alt={person.name} className={cn("w-20 h-20 rounded-3xl object-cover shadow-sm", isMobileMode && "w-16 h-16 rounded-2xl")} />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h4 className={cn("font-black text-lg leading-tight", isMobileMode && "text-base")}>{person.name}</h4>
                      <p className={cn("text-sm text-neutral-400 font-medium", isMobileMode && "text-xs")}>{person.role} at <span className="text-neutral-900 font-bold">{person.company}</span></p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className={cn(
                      "flex-1 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                      person.isConnected ? 'bg-neutral-100 text-neutral-400' : 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90',
                      isMobileMode && "py-2.5 text-xs rounded-xl"
                    )}>
                      {person.isConnected ? <CheckCircle2 size={18} /> : <Plus size={18} />}
                      {person.isConnected ? 'Connected' : 'Connect'}
                    </button>
                    {person.canBookMeeting && (
                      <button className={cn("bg-amber-100 text-amber-600 px-4 py-3 rounded-2xl font-bold text-sm flex items-center justify-center", isMobileMode && "px-3 py-2.5 rounded-xl")}>
                        <Calendar size={isMobileMode ? 16 : 18} />
                      </button>
                    )}
                    <button className={cn("glass w-12 h-12 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-brand-primary transition-colors", isMobileMode && "w-10 h-10 rounded-xl")}>
                      <MessageSquare size={isMobileMode ? 16 : 18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Exhibitors' && (
          <motion.div key="exhibitors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-12", isMobileMode && "space-y-8")}>
            <div className={cn("text-center md:text-left", isMobileMode && "text-left px-2")}>
              <h2 className={cn("text-3xl font-black mb-1", isMobileMode && "text-xl")}>Exhibitor Hall</h2>
              <p className={cn("text-neutral-500 font-medium", isMobileMode && "text-xs")}>80 exhibitors across 6 exhibition zones</p>
              <div className={cn("flex flex-wrap gap-2 mt-6 justify-center md:justify-start", isMobileMode && "overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide justify-start flex-nowrap")}>
                {['All', 'Gold', 'Silver', 'Tech', 'Finance'].map(c => (
                  <button key={c} className={cn(
                    "px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                    c === 'All' ? 'bg-brand-primary text-white shadow-md' : 'glass text-neutral-400 hover:bg-white',
                    isMobileMode && "px-4 py-1.5 text-xs"
                  )}>{c}</button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className={cn("text-xl font-bold flex items-center gap-2 px-2", isMobileMode && "text-base uppercase tracking-widest")}>
                <Trophy size={20} className="text-amber-500" /> Gold Sponsors
              </h3>
              <div className={cn(
                "grid gap-6",
                isMobileMode ? "grid-cols-1" : "md:grid-cols-2"
              )}>
                {MOCK_EXHIBITORS.filter(ex => ex.tier === 'Gold').map(ex => (
                  <div key={ex.id} className={cn(
                    "glass p-6 rounded-[2.5rem] border-white/60 relative overflow-hidden group",
                    isMobileMode && "p-5 rounded-3xl"
                  )}>
                    <div className="absolute top-0 right-0 p-4">
                      <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Gold</span>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className={cn("w-24 h-24 bg-white rounded-3xl p-4 shadow-sm group-hover:shadow-md transition-all", isMobileMode && "w-20 h-20 rounded-2xl p-3")}>
                        <img src={ex.logo} alt={ex.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className={cn("text-2xl font-black mb-1", isMobileMode && "text-lg")}>{ex.name}</h4>
                        <p className={cn("text-neutral-400 text-sm font-bold uppercase tracking-wider mb-3", isMobileMode && "text-[10px] mb-2")}>{ex.category}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-lg">Booth {ex.booth}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <button className={cn("bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary transition-all", isMobileMode && "py-3 text-xs")}>
                        <MapIcon size={18} /> Navigate
                      </button>
                      <button className={cn("glass py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all border-white/40", isMobileMode && "py-3 text-xs")}>
                        Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className={cn("text-xl font-bold flex items-center gap-2 px-2", isMobileMode && "text-base uppercase tracking-widest")}>
                <Zap size={20} className="text-brand-primary" /> Silver Sponsors
              </h3>
              <div className={cn(
                "grid gap-6",
                isMobileMode ? "grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"
              )}>
                {MOCK_EXHIBITORS.filter(ex => ex.tier === 'Silver').map(ex => (
                  <div key={ex.id} className={cn(
                    "glass p-6 rounded-[2rem] border-white/40 flex flex-col items-center text-center group",
                    isMobileMode && "p-4 rounded-2xl"
                  )}>
                    <div className={cn("w-20 h-20 bg-white rounded-2xl p-3 shadow-sm mb-4", isMobileMode && "w-16 h-16 mb-3")}>
                      <img src={ex.logo} alt={ex.name} className="w-full h-full object-contain" />
                    </div>
                    <h4 className={cn("font-bold text-lg mb-1", isMobileMode && "text-sm")}>{ex.name}</h4>
                    <p className={cn("text-xs text-neutral-400 font-bold uppercase mb-4", isMobileMode && "text-[9px] mb-2")}>{ex.category}</p>
                    <div className={cn("text-xs font-bold text-neutral-900 bg-neutral-100 w-full py-2 rounded-xl mb-4", isMobileMode && "text-[10px] py-1.5")}>Booth {ex.booth}</div>
                    <button className="text-brand-primary font-bold text-sm hover:underline">Profile</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Map' && (
          <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-8", isMobileMode && "space-y-4")}>
            <div className={cn(
              "glass p-8 rounded-[3rem] border-white/60 relative overflow-hidden min-h-[500px] flex items-center justify-center bg-white/40",
              isMobileMode && "p-4 rounded-3xl min-h-[300px] overflow-x-auto"
            )}>
              <div className={cn(isMobileMode && "w-[600px] shrink-0")}>
                <svg viewBox="0 0 800 500" className="w-full drop-shadow-2xl">
                  <rect x="50" y="50" width="700" height="400" rx="30" fill="#fcfcfc" stroke="#e5e5e5" strokeWidth="2" />
                  <g className="cursor-pointer group">
                    <rect x="80" y="80" width="300" height="150" rx="20" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="2" />
                    <text x="100" y="110" className="text-xs font-bold fill-neutral-400 uppercase">Zone A: Entrance</text>
                    <rect x="100" y="130" width="80" height="80" rx="10" fill="white" stroke="#10b981" strokeWidth="3" />
                    <text x="140" y="175" textAnchor="middle" className="text-[10px] font-black fill-brand-primary">DJEZZY</text>
                    <rect x="200" y="130" width="80" height="80" rx="10" fill="white" stroke="#10b981" strokeWidth="3" />
                    <text x="240" y="175" textAnchor="middle" className="text-[10px] font-black fill-brand-primary">BNA</text>
                    <circle cx="140" cy="200" r="15" className="fill-brand-primary animate-pulse opacity-20" />
                    <circle cx="140" cy="200" r="4" className="fill-brand-primary" />
                  </g>
                  <g>
                    <rect x="420" y="80" width="300" height="150" rx="20" fill="#eff6ff" stroke="#dbeafe" strokeWidth="2" />
                    <text x="440" y="110" className="text-xs font-bold fill-neutral-400 uppercase">Zone B: Tech</text>
                    <rect x="440" y="130" width="120" height="80" rx="10" fill="white" />
                    <text x="500" y="175" textAnchor="middle" className="text-[10px] font-black fill-blue-500">HALL B</text>
                  </g>
                  <g>
                    <rect x="80" y="270" width="300" height="150" rx="20" fill="#fff7ed" stroke="#ffedd5" strokeWidth="2" />
                    <text x="100" y="300" className="text-xs font-bold fill-neutral-400 uppercase">Zone C: Catering</text>
                  </g>
                  <g>
                    <rect x="420" y="270" width="300" height="150" rx="20" fill="#faf5ff" stroke="#f3e8ff" strokeWidth="2" />
                    <text x="440" y="300" className="text-xs font-bold fill-neutral-400 uppercase">Zone D: Pitch</text>
                  </g>
                </svg>
              </div>
            </div>
            {isMobileMode ? (
              <div className="bg-white p-4 rounded-2xl border border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase">Current Zone</p>
                    <p className="font-bold text-neutral-900 text-xs">Hall A • Entrance</p>
                  </div>
                </div>
                <button className="text-brand-primary font-bold text-xs">Find me</button>
              </div>
            ) : (
              <div className="absolute bottom-8 right-8 glass p-4 rounded-2xl flex flex-col gap-2 border-white/40">
                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500"><div className="w-3 h-3 bg-brand-primary rounded-full border-2 border-white" /> YOU ARE HERE</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500"><div className="w-3 h-3 border-2 border-brand-primary rounded-md" /> GOLD SPONSOR</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500"><div className="w-3 h-3 bg-blue-100 rounded-md" /> SESSION HALL</div>
              </div>
            )}
          </motion.div>
        )}

        {activeSection === 'Games' && (
          <motion.div key="games" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-8", isMobileMode && "space-y-6")}>
            <div className={cn(
              "glass p-8 rounded-[2.5rem] bg-neutral-900 border-none text-white overflow-hidden relative",
              isMobileMode && "p-6 rounded-3xl"
            )}>
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
              <div className={cn("relative z-10 flex flex-col md:flex-row justify-between items-center gap-8", isMobileMode && "gap-4")}>
                <div className={cn("text-center md:text-left", isMobileMode && "text-left")}>
                  <h2 className={cn("text-3xl font-black mb-2", isMobileMode && "text-xl mb-1")}>Gamification Hub</h2>
                  <p className={cn("text-neutral-400 font-medium", isMobileMode && "text-[10px] leading-tight")}>Complete challenges and win prizes.</p>
                </div>
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className={cn("text-4xl font-black text-brand-primary", isMobileMode && "text-2xl")}>340</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Points</div>
                  </div>
                  <div className="text-center">
                    <div className={cn("text-4xl font-black text-amber-500", isMobileMode && "text-2xl")}>12th</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Rank</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={cn(
              "grid gap-6",
              isMobileMode ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3"
            )}>
              {MOCK_GAMES.map(game => (
                <div key={game.id} className={cn(
                  "glass p-6 rounded-[2.5rem] border-white/50 group h-full flex flex-col",
                  isMobileMode && "p-5 rounded-3xl"
                )}>
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={cn("text-xl font-bold group-hover:text-brand-primary transition-colors", isMobileMode && "text-base")}>{game.name}</h4>
                      <span className="text-brand-primary font-black text-xs">+{game.points}</span>
                    </div>
                    <p className={cn("text-sm text-neutral-500 font-medium mb-6", isMobileMode && "text-xs mb-4")}>{game.description}</p>
                  </div>
                  <div className="mt-auto space-y-3">
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span className="text-neutral-400 uppercase">Progress</span>
                      <span className="text-neutral-900">{game.completed} / {game.total}</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-primary transition-all" style={{ width: `${(game.completed / game.total) * 100}%` }} />
                    </div>
                    <button className={cn("w-full mt-4 bg-neutral-100 group-hover:bg-brand-primary group-hover:text-white py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all", isMobileMode && "py-2.5 rounded-xl")}>Mission</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Leaderboard' && (
          <motion.div key="leader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("max-w-3xl mx-auto space-y-6", isMobileMode && "px-1 space-y-4")}>
            <div className={cn("text-center mb-12", isMobileMode && "mb-6")}>
              <Trophy className={cn("mx-auto text-amber-500 mb-4", isMobileMode && "w-8 h-8 mb-2")} size={48} />
              <h2 className={cn("text-4xl font-black mb-2 text-neutral-900", isMobileMode && "text-2xl")}>Leaderboard</h2>
              <p className={cn("text-neutral-500 font-medium text-lg", isMobileMode && "text-sm")}>Top contributors and winners</p>
            </div>

            <div className={cn(
              "glass rounded-[3.5rem] overflow-hidden border-white/60 shadow-2xl bg-white/40",
              isMobileMode && "rounded-3xl border-neutral-100 shadow-sm"
            )}>
              {MOCK_LEADERBOARD.map((item, i) => (
                <div key={item.id} className={cn(
                  "flex items-center justify-between px-10 py-8 transition-all border-b border-neutral-50 last:border-0",
                  item.name === 'Alex Benali' && "bg-brand-primary/10",
                  isMobileMode && "px-5 py-4"
                )}>
                  <div className="flex items-center gap-8 md:gap-8 gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg",
                      item.rank === 1 ? 'bg-amber-100 text-amber-600' : 'text-neutral-400',
                      isMobileMode && "w-8 h-8 rounded-xl text-sm"
                    )}>
                      {item.rank}
                    </div>
                    <div className="flex items-center gap-5 md:gap-5 gap-3">
                      <img src={`https://picsum.photos/seed/${item.name}/200`} className={cn("w-16 h-16 rounded-[1.5rem] object-cover border-4 border-white shadow-md", isMobileMode && "w-10 h-10 rounded-xl border-2")} alt="" />
                      <div>
                        <div className={cn("font-black text-xl text-neutral-900", isMobileMode && "text-sm")}>{item.name}</div>
                        {item.name === 'Alex Benali' && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                            <div className="text-[8px] font-black uppercase text-brand-primary">YOU</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-3xl font-black text-brand-primary", isMobileMode && "text-lg")}>{item.points}</div>
                    <div className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">PTS</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {activeSection === 'Chats' && (
          <motion.div key="chats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn(
            "glass border-white/60 overflow-hidden flex shadow-3xl",
            isMobileMode ? "h-[500px] rounded-3xl" : "h-[650px] rounded-[3.5rem]"
          )}>
            <div className={cn(
              "border-r border-neutral-100 flex flex-col bg-white/60 backdrop-blur-3xl",
              isMobileMode ? "w-full" : "w-80"
            )}>
              <div className={cn("p-8 border-b border-neutral-100/50", isMobileMode && "p-4")}>
                <h3 className={cn("text-2xl font-black text-neutral-900 tracking-tight", isMobileMode && "text-xl")}>Messages</h3>
              </div>
              <div className="flex-1 overflow-y-auto">
                {MOCK_CHATS.map(chat => (
                  <button key={chat.id} className={cn(
                    "w-full p-8 flex gap-5 hover:bg-white transition-all border-b border-neutral-50 text-left group",
                    isMobileMode && "p-4 gap-3"
                  )}>
                    <div className="relative shrink-0">
                      <img src={chat.participant.avatar} className={cn("w-14 h-14 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform", isMobileMode && "w-10 h-10 rounded-xl")} alt="" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <div className={cn("font-black truncate text-neutral-900 group-hover:text-brand-primary transition-colors", isMobileMode && "text-sm")}>{chat.participant.name}</div>
                        <div className="text-[10px] text-neutral-400 font-bold">{chat.time}</div>
                      </div>
                      <div className={cn("text-sm text-neutral-400 truncate font-medium", isMobileMode && "text-xs")}>{chat.lastMessage}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {!isMobileMode && (
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
            )}
          </motion.div>
        )}

        {activeSection === 'Speakers' && (
          <motion.div key="speakers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-12", isMobileMode && "space-y-6")}>
            <div className={cn("text-center md:text-left space-y-2", isMobileMode && "text-left")}>
              <h2 className={cn("text-5xl font-black text-neutral-900 tracking-tight", isMobileMode && "text-3xl")}>Speakers</h2>
              <p className={cn("text-neutral-500 font-medium text-lg", isMobileMode && "text-sm leading-tight")}>Meeting the minds behind the future of tech.</p>
            </div>
            <div className={cn(
              "grid gap-10",
              isMobileMode ? "grid-cols-2 gap-4" : "md:grid-cols-2 lg:grid-cols-4"
            )}>
              {MOCK_SPEAKERS.map(speaker => (
                <div key={speaker.id} className={cn(
                  "glass p-10 rounded-[4rem] border-white/60 text-center group hover:bg-white transition-all duration-700 flex flex-col hover:shadow-3xl",
                  isMobileMode && "p-5 rounded-3xl"
                )}>
                  <div className={cn("relative mb-8 inline-block mx-auto", isMobileMode && "mb-4")}>
                    <img src={speaker.avatar} className={cn("w-36 h-36 rounded-[3rem] object-cover shadow-2xl group-hover:scale-110 transition-transform duration-1000", isMobileMode && "w-20 h-20 rounded-2xl")} alt="" />
                    <div className={cn("absolute -bottom-3 -right-3 bg-brand-primary text-white p-4 rounded-3xl shadow-xl border-8 border-white", isMobileMode && "p-2 border-4 -bottom-1 -right-1 rounded-xl")}>
                      <Mic size={isMobileMode ? 14 : 20} fill="currentColor" />
                    </div>
                  </div>
                  <h3 className={cn("text-2xl font-black mb-1 group-hover:text-brand-primary transition-colors text-neutral-900", isMobileMode && "text-base")}>{speaker.name}</h3>
                  <p className={cn("text-brand-primary font-black text-[10px] uppercase tracking-[0.3em] mb-8", isMobileMode && "text-[8px] mb-4")}>{speaker.company}</p>
                  {!isMobileMode && <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-10 flex-1 italic line-clamp-4">"{speaker.bio}"</p>}
                  <div className="flex flex-col gap-4">
                    <button className={cn("bg-neutral-900 text-white w-full py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-primary transition-all shadow-xl hover:shadow-brand-primary/30 active:scale-95", isMobileMode && "py-3 rounded-xl")}>Bio</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Event Wall' && (
          <motion.div key="wall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("max-w-4xl mx-auto space-y-12", isMobileMode && "space-y-6")}>
            <div className={cn(
              "glass p-12 rounded-[4rem] border-white/60 flex flex-col md:flex-row gap-8 items-center bg-white/50 backdrop-blur-3xl shadow-2xl border-2",
              isMobileMode && "p-6 rounded-3xl bg-white border-neutral-100 shadow-sm gap-4"
            )}>
              <div className="relative">
                <img src={MOCK_USER.avatar} className={cn("w-20 h-20 rounded-[2rem] shadow-xl border-4 border-white", isMobileMode && "w-12 h-12 rounded-xl border-2")} alt="" />
                <div className={cn("absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-md", isMobileMode && "w-4 h-4 border-2")} />
              </div>
              <button className={cn(
                "flex-1 bg-white/80 hover:bg-white text-left px-12 py-6 rounded-[2.5rem] text-neutral-400 font-bold transition-all border border-neutral-100 shadow-xl group",
                isMobileMode && "px-6 py-3 rounded-2xl text-xs"
              )}>
                <span className="group-hover:text-neutral-900 transition-colors">What's on your mind?</span>
              </button>
              <div className={cn("flex gap-8 text-neutral-400", isMobileMode && "gap-4")}>
                <button className="hover:text-brand-primary transition-all hover:scale-125"><ImageIcon size={isMobileMode ? 24 : 32} /></button>
                <button className="hover:text-brand-primary transition-all hover:scale-125"><Video size={isMobileMode ? 24 : 32} /></button>
              </div>
            </div>

            <div className={cn("space-y-16", isMobileMode && "space-y-6")}>
              {MOCK_WALL_POSTS.map(post => (
                <div key={post.id} className={cn(
                  "glass rounded-[5rem] border-white/60 overflow-hidden shadow-3xl hover:shadow-brand-primary/5 transition-all duration-1000 bg-white/40 backdrop-blur-3xl group border-2",
                  isMobileMode && "rounded-3xl bg-white border-neutral-100 shadow-sm"
                )}>
                  <div className={cn("p-12 pb-0 flex justify-between items-start", isMobileMode && "p-6 pb-0")}>
                    <div className={cn("flex gap-8 items-center", isMobileMode && "gap-4")}>
                      <img src={post.avatar} className={cn("w-16 h-16 rounded-[1.8rem] object-cover shadow-xl border-4 border-white group-hover:rotate-3 transition-transform", isMobileMode && "w-10 h-10 rounded-xl border-2")} alt="" />
                      <div>
                        <div className={cn("font-black text-2xl text-neutral-900 tracking-tight", isMobileMode && "text-base")}>{post.author}</div>
                        <div className={cn("text-[11px] font-black text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-3 mt-1", isMobileMode && "text-[9px]")}>
                          <Clock size={isMobileMode ? 12 : 16} /> {post.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cn("p-12", isMobileMode && "p-6")}>
                    <p className={cn("text-neutral-800 font-medium text-2xl leading-[1.6] mb-10", isMobileMode && "text-sm mb-4 leading-relaxed")}>{post.content}</p>
                    {post.image && (
                      <div className={cn(
                        "relative group/img overflow-hidden rounded-[3.5rem] border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]",
                        isMobileMode && "rounded-2xl border-4"
                      )}>
                        <img src={post.image} className="w-full h-auto transition-transform duration-2000 group-hover/img:scale-110" alt="" />
                      </div>
                    )}
                  </div>
                  <div className={cn("p-12 pt-0 flex justify-between items-center mt-4", isMobileMode && "p-6 pt-0 mt-0")}>
                    <div className={cn("flex gap-12", isMobileMode && "gap-6")}>
                      <button className="flex items-center gap-4 font-black text-lg text-neutral-400 group/btn">
                        <div className={cn("glass w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-xl group-hover:bg-red-50 group-hover:text-red-500 transition-all", isMobileMode && "w-10 h-10 rounded-xl shadow-sm")}>
                          <Heart size={isMobileMode ? 20 : 28} />
                        </div>
                        <span className={cn("text-2xl", isMobileMode && "text-sm")}>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-4 font-black text-lg text-neutral-400 group/btn">
                        <div className={cn("glass w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-xl group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all", isMobileMode && "w-10 h-10 rounded-xl shadow-sm")}>
                          <MessageCircle size={isMobileMode ? 20 : 28} />
                        </div>
                        <span className={cn("text-2xl", isMobileMode && "text-sm")}>{post.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Polls' && (
          <motion.div key="polls" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("max-w-3xl mx-auto space-y-12", isMobileMode && "space-y-6")}>
            <div className={cn("text-center space-y-4", isMobileMode && "space-y-2")}>
              <h2 className={cn("text-5xl font-black text-neutral-900 tracking-tight", isMobileMode && "text-3xl")}>Live Polls</h2>
              <p className={cn("text-neutral-500 font-medium text-lg", isMobileMode && "text-sm")}>Community sentiment in real-time.</p>
            </div>
            <div className={cn("space-y-10", isMobileMode && "space-y-4")}>
              {MOCK_POLLS.map(poll => (
                <div key={poll.id} className={cn(
                  "glass p-16 rounded-[5rem] border-white/60 shadow-3xl transition-all duration-1000 bg-white/40 backdrop-blur-3xl",
                  isMobileMode && "p-6 rounded-3xl bg-white border-neutral-100 shadow-sm",
                  !poll.isActive && 'opacity-60 saturate-0'
                )}>
                  <div className={cn("flex justify-between items-center mb-12", isMobileMode && "mb-6")}>
                    <div className={cn(
                      "px-8 py-3 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl",
                      isMobileMode && "px-4 py-1.5 rounded-xl text-[9px]",
                      poll.isActive ? 'bg-red-500 text-white animate-pulse' : 'bg-neutral-100 text-neutral-500'
                    )}>
                      {poll.isActive ? 'LIVE' : 'CLOSED'}
                    </div>
                    <div className={cn("flex items-center gap-3 text-xs font-black text-neutral-400 uppercase tracking-widest", isMobileMode && "text-[9px] gap-2")}>
                      <Users size={isMobileMode ? 14 : 18} className="text-brand-primary" /> {poll.totalVotes}
                    </div>
                  </div>
                  <h3 className={cn("text-3xl font-black mb-12 leading-tight text-neutral-900", isMobileMode && "text-lg mb-6")}>{poll.question}</h3>
                  <div className={cn("space-y-6", isMobileMode && "space-y-3")}>
                    {poll.options.map((opt, i) => (
                      <button key={i} disabled={!poll.isActive} className="w-full relative group">
                        <div className={cn(
                          "w-full h-24 bg-white/80 rounded-[2.5rem] overflow-hidden border-2 border-white group-hover:border-brand-primary transition-all shadow-xl",
                          isMobileMode && "h-14 rounded-2xl border-neutral-100"
                        )}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(opt.votes / poll.totalVotes) * 100}%` }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className="h-full bg-gradient-to-r from-brand-primary via-brand-primary to-brand-secondary opacity-20"
                          />
                        </div>
                        <div className={cn("absolute inset-0 px-12 flex justify-between items-center", isMobileMode && "px-6")}>
                          <span className={cn("font-black text-neutral-900 text-2xl group-hover:translate-x-2 transition-transform", isMobileMode && "text-sm")}>{opt.text}</span>
                          <span className={cn("font-black text-brand-primary text-3xl", isMobileMode && "text-xl")}>{Math.round((opt.votes / poll.totalVotes) * 100)}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Sponsors' && (
          <motion.div key="sponsors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-24", isMobileMode && "space-y-8")}>
            <div className={cn("text-center space-y-6 max-w-3xl mx-auto", isMobileMode && "space-y-3")}>
              <h2 className={cn("text-6xl font-black text-neutral-900 tracking-tighter leading-tight", isMobileMode && "text-3xl")}>Our <span className="text-brand-primary">Partners</span></h2>
              <p className={cn("text-neutral-500 font-medium text-xl leading-relaxed", isMobileMode && "text-sm leading-tight")}>The progressive companies defining the future of tech.</p>
              <div className={cn("h-2 w-32 bg-brand-primary mx-auto rounded-full shadow-lg shadow-brand-primary/20", isMobileMode && "h-1 w-16")} />
            </div>

            <div className={cn("space-y-32", isMobileMode && "space-y-12")}>
              <div className={cn("space-y-12", isMobileMode && "space-y-6")}>
                <div className="flex items-center gap-10">
                  <div className="flex-1 h-px bg-neutral-100" />
                  <h3 className={cn("text-[11px] font-black uppercase tracking-[0.6em] text-neutral-300", isMobileMode && "text-[9px] tracking-[0.3em]")}>Platinum Partners</h3>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>
                <div className={cn(
                  "grid gap-12 px-6",
                  isMobileMode ? "grid-cols-1 gap-6" : "md:grid-cols-3"
                )}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className={cn(
                      "glass p-16 rounded-[5rem] border-white/80 text-center flex flex-col items-center hover:bg-white transition-all duration-1000 group border-2 relative overflow-hidden",
                      isMobileMode && "p-8 rounded-3xl"
                    )}>
                      <div className={cn("w-48 h-48 bg-white rounded-[3rem] p-10 shadow-2xl mb-10 flex items-center justify-center", isMobileMode && "w-32 h-32 rounded-2xl p-6 mb-4")}>
                        <img src={`https://picsum.photos/seed/sponsor${i}/400`} className="max-w-full max-h-full object-contain" alt="" />
                      </div>
                      <h4 className={cn("text-3xl font-black mb-2 text-neutral-900 group-hover:text-brand-primary transition-colors", isMobileMode && "text-xl")}>InnovCorp</h4>
                      <p className={cn("text-neutral-400 font-black text-[12px] uppercase tracking-[0.3em] mb-10", isMobileMode && "text-[9px] mb-6")}>Ecosystem Enabler</p>
                      <button className={cn("mt-auto px-10 py-5 rounded-[2rem] bg-neutral-900 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-brand-primary transition-all active:scale-95", isMobileMode && "py-3 rounded-xl")}>
                        View Mission <ExternalLink size={isMobileMode ? 12 : 16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn(
                "grid gap-10 px-6",
                isMobileMode ? "grid-cols-3 gap-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
              )}>
                {[4, 5, 6, 7, 8, 9].map(i => (
                  <div key={i} className={cn(
                    "glass p-10 rounded-[3.5rem] border-white/60 flex flex-col items-center justify-center hover:bg-white transition-all duration-500 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 hover:scale-110 aspect-square shadow-xl group",
                    isMobileMode && "p-4 rounded-2xl"
                  )}>
                    <img src={`https://picsum.photos/seed/sponsor${i}/400`} className="w-full h-auto object-contain" alt="" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Forum' && (
          <motion.div key="forum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("max-w-4xl mx-auto space-y-12", isMobileMode && "space-y-6")}>
            <div className={cn("text-center space-y-4", isMobileMode && "text-left")}>
              <h2 className={cn("text-5xl font-black text-neutral-900 tracking-tight", isMobileMode && "text-3xl")}>Community Forum</h2>
              <p className={cn("text-neutral-500 font-medium text-lg", isMobileMode && "text-sm")}>Discussions and knowledge sharing.</p>
            </div>
            <div className={cn("space-y-10", isMobileMode && "space-y-4")}>
              {MOCK_FORUM_POSTS.map(post => (
                <div key={post.id} className={cn(
                  "glass p-12 rounded-[5rem] border-white/60 shadow-3xl hover:bg-white transition-all duration-1000 bg-white/40 group border-2",
                  isMobileMode && "p-6 rounded-3xl bg-white border-neutral-100 shadow-sm"
                )}>
                  <div className={cn("flex justify-between items-start mb-10", isMobileMode && "mb-4")}>
                    <div className={cn("flex gap-8 items-center", isMobileMode && "gap-4")}>
                      <div className={cn(
                        "glass w-20 h-20 rounded-[2.5rem] flex items-center justify-center bg-brand-primary/10 text-brand-primary border-white shadow-xl",
                        isMobileMode && "w-12 h-12 rounded-2xl shadow-none"
                      )}>
                        <MessageSquare size={isMobileMode ? 24 : 36} />
                      </div>
                      <div>
                        <h3 className={cn("text-3xl font-black text-neutral-900 group-hover:text-brand-primary transition-colors tracking-tight", isMobileMode && "text-base")}>{post.title}</h3>
                        <div className={cn("flex items-center gap-6 mt-2", isMobileMode && "gap-3")}>
                          <span className={cn("text-[11px] font-black uppercase text-brand-primary tracking-[0.3em] bg-brand-primary/10 px-4 py-1.5 rounded-xl", isMobileMode && "text-[8px] px-2 py-0.5 tracking-normal")}>{post.category}</span>
                          <span className={cn("text-xs font-bold text-neutral-400", isMobileMode && "text-[10px]")}>{post.replies} Replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className={cn("w-full bg-neutral-900 text-white py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-brand-primary transition-all shadow-2xl", isMobileMode && "py-3 rounded-xl")}>Join Discussion</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Gallery' && (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-16", isMobileMode && "space-y-8")}>
            <div className={cn("flex flex-col md:flex-row justify-between items-center gap-8", isMobileMode && "flex-col items-center gap-4 text-center")}>
              <div className={cn("text-center md:text-left", isMobileMode && "text-center")}>
                <h2 className={cn("text-6xl font-black text-neutral-900 tracking-tighter", isMobileMode && "text-3xl")}>Event Gallery</h2>
                <p className={cn("text-neutral-500 font-medium text-xl mt-3 max-w-xl", isMobileMode && "text-sm")}>Visual journey through our ecosystem.</p>
              </div>
              <button className={cn("bg-neutral-900 text-white px-12 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] flex items-center gap-4 hover:bg-brand-primary transition-all shadow-3xl shrink-0", isMobileMode && "px-8 py-4 rounded-2xl")}>
                Upload Photo <Plus size={isMobileMode ? 20 : 24} />
              </button>
            </div>
            <div className={cn(
              "columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12",
              isMobileMode && "columns-2 gap-4 space-y-4"
            )}>
              {MOCK_GALLERY.map(item => (
                <div key={item.id} className={cn(
                  "break-inside-avoid relative group rounded-[4rem] overflow-hidden border-8 border-white shadow-3xl hover:shadow-brand-primary/20 transition-all duration-2000 bg-white/40",
                  isMobileMode && "rounded-2xl border-2 mb-4"
                )}>
                  <img src={item.url} className="w-full h-auto transition-transform duration-[3s] group-hover:scale-125" alt="" />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/40 to-transparent flex flex-col justify-end p-12 transition-all duration-1000",
                    isMobileMode ? "p-4 opacity-100" : "opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0"
                  )}>
                    <p className={cn("text-white font-black text-2xl mb-3 tracking-tight", isMobileMode && "text-xs mb-1")}>{item.caption}</p>
                    <div className={cn("flex gap-4", !isMobileMode && "mt-10")}>
                      <button className={cn("glass w-14 h-14 rounded-[1.8rem] flex items-center justify-center text-white", isMobileMode && "w-8 h-8 rounded-lg")}><Heart size={isMobileMode ? 14 : 24} /></button>
                      <button className={cn("glass w-14 h-14 rounded-[1.8rem] flex items-center justify-center text-white", isMobileMode && "w-8 h-8 rounded-lg")}><Share2 size={isMobileMode ? 14 : 24} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Videos' && (
          <motion.div key="videos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("space-y-16", isMobileMode && "space-y-8")}>
            <h2 className={cn("text-6xl font-black text-neutral-900 tracking-tighter", isMobileMode && "text-3xl")}>On-Demand</h2>
            <div className={cn(
              "grid gap-12",
              isMobileMode ? "grid-cols-1 gap-6" : "md:grid-cols-2 lg:grid-cols-3"
            )}>
              {MOCK_VIDEOS.map(video => (
                <div key={video.id} className={cn(
                  "glass rounded-[5rem] border-white/60 overflow-hidden shadow-3xl hover:bg-white transition-all duration-1000 group border-2 flex flex-col",
                  isMobileMode && "rounded-3xl bg-white border-neutral-100 shadow-sm"
                )}>
                  <div className="relative aspect-video overflow-hidden">
                    <img src={video.thumbnail} className="w-full h-full object-cover" alt="" />
                    <div className={cn("absolute inset-0 bg-black/40 flex items-center justify-center", !isMobileMode && "opacity-0 group-hover:opacity-100 transition-all")}>
                      <div className={cn("w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-3xl", isMobileMode && "w-12 h-12")}>
                        <Play size={isMobileMode ? 24 : 36} fill="currentColor" className="ml-1" />
                      </div>
                    </div>
                    <div className={cn("absolute bottom-4 right-4 bg-black/60 text-white px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest backdrop-blur-md", isMobileMode && "bottom-2 right-2 px-2 py-0.5 text-[8px]")}>
                      {video.duration}
                    </div>
                  </div>
                  <div className={cn("p-12 flex-1 flex flex-col", isMobileMode && "p-6")}>
                    <h3 className={cn("text-2xl font-black text-neutral-900 mb-6 group-hover:text-brand-primary transition-colors leading-tight line-clamp-2", isMobileMode && "text-base mb-2")}>{video.title}</h3>
                    <div className={cn("mt-auto pt-8 border-t border-neutral-100/50 flex justify-between items-center text-neutral-400 font-black text-[10px] uppercase tracking-[0.4em]", isMobileMode && "pt-4 text-[8px]")}>
                      <span>{video.views} Views</span>
                      <span className="text-brand-primary">{video.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("max-w-4xl mx-auto space-y-16", isMobileMode && "space-y-8")}>
            <div className={cn("text-center space-y-8", isMobileMode && "space-y-4")}>
              <div className={cn(
                "glass w-32 h-32 rounded-[3rem] flex items-center justify-center bg-neutral-900 border-neutral-800 text-brand-primary mx-auto shadow-3xl",
                isMobileMode && "w-16 h-16 rounded-2xl"
              )}>
                <FileQuestion size={isMobileMode ? 32 : 56} />
              </div>
              <h2 className={cn("text-7xl font-black text-neutral-900 tracking-tighter", isMobileMode && "text-4xl")}>Mastery</h2>
              <p className={cn("text-neutral-500 font-medium text-2xl max-w-2xl mx-auto leading-relaxed", isMobileMode && "text-sm")}>Prove your technical depth.</p>
            </div>
            <div className={cn(
              "glass p-20 rounded-[6rem] border-white/60 shadow-3xl bg-white/40 backdrop-blur-3xl text-center relative overflow-hidden",
              isMobileMode && "p-8 rounded-[2.5rem] bg-white border-neutral-100"
            )}>
              <div className="relative z-10">
                <h3 className={cn("text-5xl font-black mb-12 text-neutral-900 leading-[1.1]", isMobileMode && "text-xl mb-6")}>Advanced Tech <br />Ecosystem Quiz</h3>
                <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 mb-16", isMobileMode && "gap-4 mb-8")}>
                  <div className={cn("glass bg-white/60 p-10 rounded-[3rem] shadow-xl", isMobileMode && "p-6 rounded-2xl shadow-none bg-neutral-50")}>
                    <div className={cn("text-neutral-400 font-black text-[11px] uppercase tracking-widest mb-3", isMobileMode && "text-[8px] mb-1")}>Modules</div>
                    <div className={cn("text-4xl font-black text-neutral-900", isMobileMode && "text-2xl")}>15</div>
                  </div>
                  <div className={cn("glass bg-white/60 p-10 rounded-[3rem] shadow-xl", isMobileMode && "p-6 rounded-2xl shadow-none bg-neutral-50")}>
                    <div className={cn("text-neutral-400 font-black text-[11px] uppercase tracking-widest mb-3", isMobileMode && "text-[8px] mb-1")}>Potential</div>
                    <div className={cn("text-4xl font-black text-brand-primary", isMobileMode && "text-2xl")}>+500 <span className="text-lg">XP</span></div>
                  </div>
                </div>
                <button className={cn("bg-neutral-900 text-white w-full py-8 rounded-[3rem] font-black text-sm uppercase tracking-[0.5em] hover:bg-brand-primary transition-all shadow-3xl", isMobileMode && "py-4 rounded-2xl text-xs tracking-widest")}>Start Assessment</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'Scavenger Hunt' && (
          <motion.div key="hunt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("max-w-5xl mx-auto space-y-16", isMobileMode && "space-y-8")}>
            <div className={cn("flex flex-col lg:flex-row justify-between items-center gap-12 pb-16", isMobileMode && "pb-8 gap-6")}>
              <div className={cn("text-center lg:text-left space-y-4", isMobileMode && "text-left space-y-2")}>
                <h2 className={cn("text-7xl font-black text-neutral-900 tracking-tighter", isMobileMode && "text-3xl")}>Expedition</h2>
                <p className={cn("text-neutral-500 font-medium text-2xl max-w-2xl leading-relaxed", isMobileMode && "text-sm")}>Navigate physical venue to unlock rewards.</p>
              </div>
              <div className={cn(
                "glass p-12 rounded-[4rem] bg-neutral-900 text-center shrink-0 w-80 shadow-3xl",
                isMobileMode && "w-full p-6 rounded-3xl"
              )}>
                <div className={cn("text-[11px] font-black uppercase tracking-widest text-brand-primary mb-4", isMobileMode && "mb-2")}>Missions</div>
                <div className={cn("text-6xl font-black text-white tracking-tighter", isMobileMode && "text-4xl")}>04<span className="text-neutral-700 text-3xl mx-2">/</span>10</div>
              </div>
            </div>

            <div className={cn("grid gap-12", isMobileMode ? "grid-cols-1 gap-6" : "md:grid-cols-2")}>
              {[
                { title: 'The Startup Nexus', icon: <Building2 />, desc: 'Locate entrance terminal.', status: 'Completed', color: 'text-green-500' },
                { title: 'Visionary Hall', icon: <Video />, desc: 'Identify projected key.', status: 'Locked', color: 'text-neutral-300' },
                { title: 'Community Node', icon: <MessageSquare />, desc: 'Establish P2P connection.', status: 'Active', color: 'text-brand-primary' }
              ].map((m, i) => (
                <div key={i} className={cn(
                  "glass p-12 rounded-[5rem] border-white/60 shadow-3xl transition-all border-2",
                  isMobileMode && "p-6 rounded-3xl",
                  m.status === 'Active' ? 'border-brand-primary' : 'bg-white/40'
                )}>
                  <div className={cn("flex gap-10 items-start", isMobileMode && "gap-4")}>
                    <div className={cn(
                      "w-20 h-20 rounded-[2.5rem] flex items-center justify-center bg-white shadow-2xl transition-all",
                      isMobileMode && "w-12 h-12 rounded-xl shadow-none bg-neutral-50",
                      m.status === 'Completed' ? 'text-green-500' : 'text-neutral-300'
                    )}>
                      {m.status === 'Completed' ? <CheckCircle2 size={isMobileMode ? 24 : 40} /> : m.icon}
                    </div>
                    <div className="flex-1">
                      <div className={cn("text-[12px] font-black uppercase tracking-widest mb-4", isMobileMode && "mb-1 text-[8px]", m.color)}>{m.status}</div>
                      <h3 className={cn("text-3xl font-black text-neutral-900 tracking-tight leading-tight", isMobileMode && "text-base")}>{m.title}</h3>
                      <p className={cn("text-neutral-500 text-lg font-medium leading-relaxed", isMobileMode && "text-xs")}>{m.desc}</p>
                    </div>
                  </div>
                  {m.status === 'Active' && (
                    <button className={cn("mt-12 w-full bg-neutral-900 text-white py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-3xl hover:bg-brand-primary transition-all", isMobileMode && "mt-6 py-3 rounded-xl")}>Scan QR</button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'Details' && (
          <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("max-w-5xl mx-auto space-y-20", isMobileMode && "space-y-8")}>
            <div className={cn("text-center space-y-6", isMobileMode && "space-y-3")}>
              <h2 className={cn("text-8xl font-black text-neutral-900 tracking-tighter leading-tight", isMobileMode && "text-4xl")}>Protocol</h2>
              <p className={cn("text-neutral-500 font-medium text-2xl max-w-3xl mx-auto leading-relaxed", isMobileMode && "text-sm leading-tight")}>Essential information for attendees.</p>
            </div>

            <div className={cn("grid gap-16", isMobileMode ? "grid-cols-1 gap-8" : "md:grid-cols-2")}>
              {[
                { title: 'Logistics', icon: <Package />, data: MOCK_DETAILS.logistics },
                { title: 'Security', icon: <ShieldCheck />, data: MOCK_DETAILS.safety }
              ].map((section, idx) => (
                <div key={idx} className={cn(
                  "glass p-16 rounded-[6rem] border-white/60 shadow-3xl bg-white/40 backdrop-blur-3xl border-2",
                  isMobileMode && "p-8 rounded-3xl bg-white border-neutral-100 shadow-sm"
                )}>
                  <div className={cn("flex items-center gap-6 mb-12", isMobileMode && "mb-6 gap-4")}>
                    <div className={cn(
                      "glass w-20 h-20 rounded-[2.5rem] flex items-center justify-center bg-brand-primary/10 text-brand-primary border-white shadow-xl",
                      isMobileMode && "w-12 h-12 rounded-xl shadow-none"
                    )}>
                      {React.cloneElement(section.icon as React.ReactElement, { size: isMobileMode ? 24 : 40 })}
                    </div>
                    <h3 className={cn("text-4xl font-black text-neutral-900 tracking-tight", isMobileMode && "text-xl")}>{section.title}</h3>
                  </div>
                  <div className={cn("space-y-12", isMobileMode && "space-y-4")}>
                    {section.data.map((item, i) => (
                      <div key={i} className={cn("flex gap-8 items-start", isMobileMode && "gap-4")}>
                        <div className={cn("w-2 h-2 bg-brand-primary rounded-full mt-3 shrink-0", isMobileMode && "w-1.5 h-1.5 mt-2")} />
                        <div>
                          <p className={cn("text-2xl font-black text-neutral-900 mb-2 truncate", isMobileMode && "text-base mb-1")}>{item.title}</p>
                          <p className={cn("text-neutral-400 font-medium leading-relaxed text-lg", isMobileMode && "text-[10px] leading-tight")}>{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={cn(
              "glass p-20 rounded-[6rem] border-white/60 shadow-3xl bg-neutral-900 text-white text-center group relative overflow-hidden",
              isMobileMode && "p-10 rounded-3xl"
            )}>
              <div className="relative z-10">
                <h3 className={cn("text-5xl font-black mb-6", isMobileMode && "text-2xl")}>Assistance Node</h3>
                <p className={cn("text-neutral-400 font-medium text-2xl mb-12 leading-relaxed", isMobileMode && "text-sm mb-8")}>Protocol support available 24/7.</p>
                <div className={cn("flex flex-col md:flex-row justify-center gap-10", isMobileMode && "gap-4")}>
                  <button className={cn("bg-white text-neutral-900 px-16 py-6 rounded-[3rem] font-black text-sm uppercase tracking-widest", isMobileMode && "px-8 py-4 rounded-xl")}>Call Support</button>
                  <button className={cn("glass bg-neutral-800 text-white px-16 py-6 rounded-[3rem] font-black text-sm uppercase tracking-widest", isMobileMode && "px-8 py-4 rounded-xl")}>Dispatch Email</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </div >
  );
}

function EventDetailsContent({
  event,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
  isSuccess,
  onBack,
  isMobileMode
}: {
  event: any,
  formData: any,
  setFormData: (d: any) => void,
  onSubmit: (e: any) => void,
  isSubmitting: boolean,
  isSuccess: boolean,
  onBack: () => void,
  isMobileMode?: boolean
}) {
  return (
    <div className={cn("space-y-8 pb-32", isMobileMode && "space-y-6 pb-24")}>
      {/* Hero Header */}
      <div className={cn(
        "relative h-96 -mx-8 -mt-8 mb-12 overflow-hidden",
        isMobileMode && "h-80 -mx-4 -mt-6 mb-6 rounded-b-[2.5rem] shadow-xl"
      )}>
        <img src={event.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

        {isMobileMode && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all z-20"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className={cn("absolute inset-x-0 bottom-0 p-12", isMobileMode && "p-6")}>
          <div className="max-w-7xl mx-auto">
            <div className="inline-block bg-brand-primary text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              {event.category}
            </div>
            <h1 className={cn("text-5xl font-black text-white mb-6 leading-tight max-w-4xl", isMobileMode && "text-2xl mb-4")}>{event.title}</h1>
            <div className={cn("flex flex-wrap items-center gap-8 text-white/80 font-bold", isMobileMode && "gap-4 text-xs")}>
              <div className="flex items-center gap-3">
                <Calendar className="text-brand-primary" size={isMobileMode ? 16 : 20} />
                <span>{event.date}</span>
              </div>
              {!isMobileMode && (
                <div className="flex items-center gap-3">
                  <Clock className="text-brand-primary" size={20} />
                  <span>09:00 AM - 05:00 PM</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPin className="text-brand-primary" size={isMobileMode ? 16 : 20} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(
        "grid gap-12",
        isMobileMode ? "grid-cols-1" : "lg:grid-cols-3"
      )}>
        {/* Main Content */}
        <div className={cn(
          "space-y-12",
          isMobileMode ? "space-y-6" : "lg:col-span-2"
        )}>
          <section className={cn(
            "glass p-10 rounded-[3rem] border-white/60",
            isMobileMode && "p-6 rounded-3xl bg-white border-neutral-100 shadow-sm"
          )}>
            <h3 className={cn("text-2xl font-black mb-6", isMobileMode && "text-lg mb-4")}>About this event</h3>
            <div className="prose prose-neutral max-w-none">
              <p className={cn("text-lg text-neutral-600 leading-relaxed font-medium mb-6", isMobileMode && "text-sm text-neutral-500 mb-4")}>
                {event.description}
              </p>
              {!isMobileMode && (
                <p className="text-neutral-500 leading-relaxed font-medium">
                  Join us for an immersive experience at the {event.title}. This event brings together industry leaders, innovators, and enthusiasts for a day of networking, learning, and growth.
                  <br /><br />
                  Whether you're looking to expand your knowledge, connect with peers, or discover the latest trends in {event.category}, this is the place to be. We have curated a premium lineup of speakers and workshops designed to provide actionable insights and meaningful connections.
                </p>
              )}
            </div>
          </section>

          <section className={cn(
            "glass p-10 rounded-[3rem] border-white/60",
            isMobileMode && "p-6 rounded-3xl bg-white border-neutral-100 shadow-sm"
          )}>
            <h3 className={cn("text-2xl font-black mb-8", isMobileMode && "text-lg mb-4")}>Event Location</h3>
            <div className={cn(
              "aspect-video w-full bg-neutral-100 rounded-[2rem] overflow-hidden relative border border-neutral-200",
              isMobileMode && "rounded-2xl"
            )}>
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <MapPin size={isMobileMode ? 32 : 40} className="text-brand-primary" />
                <div className="text-center px-4">
                  <p className={cn("font-black text-neutral-900", isMobileMode && "text-sm")}>{event.location}</p>
                  <p className={cn("text-sm font-bold text-neutral-400 uppercase tracking-widest", isMobileMode && "text-[10px]")}>Main Hall • Conference Center</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar / Registration */}
        <div className={cn("space-y-8", isMobileMode && "space-y-6")}>
          <div id="registration-form" className={cn(
            "glass p-8 rounded-[3rem] border-white/60 sticky top-8 shadow-2xl shadow-neutral-200/50",
            isMobileMode && "relative top-0 p-6 rounded-3xl bg-white border-neutral-100 shadow-sm"
          )}>
            <div className={cn("flex justify-between items-end mb-8 pb-8 border-b border-neutral-100", isMobileMode && "mb-6 pb-6")}>
              <div>
                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1">Standard Access</p>
                <h4 className={cn("text-3xl font-black text-neutral-900", isMobileMode && "text-xl")}>
                  {event.price === 0 ? 'Free' : `${event.price} DZD`}
                </h4>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available
                </div>
              </div>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-brand-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-brand-primary">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-2xl font-black text-neutral-900 mb-2">You're Registered!</h4>
                <p className="text-neutral-500 font-medium mb-8">A confirmation email has been sent to {formData.email}.</p>
                <button
                  onClick={onBack}
                  className="w-full py-4 glass rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full bg-neutral-50 border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all text-sm"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-neutral-50 border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all text-sm"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Phone Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+213 5XX XX XX XX"
                    className="w-full bg-neutral-50 border border-neutral-100 px-5 py-4 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all text-sm"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className={cn("grid gap-4", isMobileMode ? "grid-cols-1" : "grid-cols-2")}>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Designer"
                      className="w-full bg-neutral-50 border border-neutral-100 px-5 py-3.5 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all text-sm"
                      value={formData.jobTitle}
                      onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-neutral-400 tracking-widest px-1">Company</label>
                    <input
                      type="text"
                      placeholder="e.g. TechAl"
                      className="w-full bg-neutral-50 border border-neutral-100 px-5 py-3.5 rounded-2xl font-bold shadow-sm outline-none focus:border-brand-primary transition-all text-sm"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2",
                      isMobileMode && "py-4 rounded-2xl",
                      event.price === 0
                        ? "bg-brand-primary text-white shadow-brand-primary/20 hover:scale-[1.02]"
                        : "bg-neutral-900 text-white shadow-neutral-900/20 hover:scale-[1.02]"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Registering...</span>
                    ) : event.price === 0 ? (
                      'Reserve Spot'
                    ) : (
                      <>
                        <CreditCard size={16} />
                        Purchase Tickets
                      </>
                    )}
                  </button>
                </div>

                {event.price > 0 && (
                  <div className="flex flex-col items-center gap-4 mt-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
                      <ShieldCheck size={14} className="text-neutral-400" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Secure SATIM Payment</span>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {isMobileMode && (
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-400">
                <Building2 size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Organizer</p>
                <p className="font-bold text-neutral-900">Algeria Innov Hub</p>
              </div>
              <button className="w-10 h-10 glass rounded-xl flex items-center justify-center text-brand-primary">
                <MessageCircle size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Sticky Bottom Bar for Mobile */}
        {isMobileMode && !isSuccess && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-neutral-100 z-50 flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-500">
            <div className="pl-2">
              <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest">Access Pass</p>
              <p className="font-black text-lg text-neutral-900">{event.price === 0 ? 'Free' : `${event.price} DZD`}</p>
            </div>
            <button
              onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 bg-brand-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-primary/20 active:scale-95 transition-all text-center"
            >
              Sign Up Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
