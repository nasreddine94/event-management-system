import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Users, 
  Store, 
  BarChart3, 
  Target, 
  Bell, 
  Settings, 
  LogOut, 
  Search, 
  Scan, 
  MoreVertical, 
  Filter, 
  Download, 
  Plus, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Twitter, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  X,
  Calendar,
  Video,
  MapPin,
  Upload,
  Trash2,
  Eye
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

// --- Types ---
type View = 'home' | 'leads' | 'booth' | 'analytics' | 'sponsorship' | 'notifications' | 'settings';
type LeadScore = 'Hot' | 'Warm' | 'Cold';
type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';

interface Lead {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  score: LeadScore;
  status: LeadStatus;
  capturedAt: string;
  source: 'QR Scan' | 'Manual' | 'NFC';
  notes: string;
  avatar: string;
}

interface Meeting {
  id: string;
  attendeeName: string;
  time: string;
  type: 'In-person' | 'Video';
  status: 'Confirmed' | 'Pending' | 'Completed';
}

// --- Mock Data ---
const MOCK_DATA = {
  exhibitor: {
    companyName: "TechNova Solutions",
    boothNumber: "B-42",
    package: "Gold Sponsor",
    event: "Global Tech Summit 2026",
    logo: "https://picsum.photos/seed/technova/200/200"
  },
  metrics: [
    { label: 'Total Leads', value: 148, trend: '+23%', data: [12, 18, 15, 22, 19, 25, 37] },
    { label: 'Booth Visitors', value: 312, trend: '+12%', data: [35, 42, 38, 55, 48, 62, 32] },
    { label: 'Meetings Scheduled', value: 9, trend: 'Stable', data: [1, 2, 1, 3, 1, 1, 0] },
    { label: 'Pending Follow-ups', value: 34, trend: '-5', data: [8, 12, 10, 5, 7, 4, 2] },
  ],
  leads: [
    { id: '1', name: "Sarah Chen", company: "Acme Corp", title: "CTO", email: "sarah@acme.com", phone: "+1 234 567 890", score: "Hot", status: "New", capturedAt: "10 min ago", source: "QR Scan", notes: "Interested in enterprise plan. Follow up by Friday.", avatar: "https://i.pravatar.cc/150?u=sarah" },
    { id: '2', name: "Marcus Webb", company: "Vertex AI", title: "VP Engineering", email: "m.webb@vertex.ai", phone: "+1 987 654 321", score: "Warm", status: "Contacted", capturedAt: "1 hour ago", source: "NFC", notes: "Discussed API integration possibilities.", avatar: "https://i.pravatar.cc/150?u=marcus" },
    { id: '3', name: "Lena Patel", company: "DataStream", title: "Product Manager", email: "lena@datastream.io", phone: "+1 555 012 345", score: "Cold", status: "New", capturedAt: "2 hours ago", source: "Manual", notes: "General inquiry about pricing.", avatar: "https://i.pravatar.cc/150?u=lena" },
    { id: '4', name: "David Miller", company: "CloudScale", title: "Solutions Architect", email: "david@cloudscale.com", phone: "+1 444 222 333", score: "Hot", status: "Qualified", capturedAt: "4 hours ago", source: "QR Scan", notes: "Ready for a demo next week.", avatar: "https://i.pravatar.cc/150?u=david" },
    { id: '5', name: "Emma Wilson", company: "Innovate Ltd", title: "CEO", email: "emma@innovate.com", phone: "+1 111 222 333", score: "Warm", status: "Contacted", capturedAt: "Yesterday", source: "QR Scan", notes: "Met at the networking lounge.", avatar: "https://i.pravatar.cc/150?u=emma" },
  ] as Lead[],
  meetings: [
    { id: 'm1', attendeeName: "Sarah Chen", time: "14:30", type: "In-person", status: "Confirmed" },
    { id: 'm2', attendeeName: "Marcus Webb", time: "16:00", type: "Video", status: "Pending" },
    { id: 'm3', attendeeName: "John Doe", time: "Tomorrow, 10:00", type: "In-person", status: "Confirmed" },
  ] as Meeting[],
  notifications: [
    { id: 'n1', type: 'Leads', message: 'New lead captured: Sarah Chen (Acme Corp)', time: '10 min ago', read: false },
    { id: 'n2', type: 'Meetings', message: 'Meeting request received from Marcus Webb', time: '1 hour ago', read: false },
    { id: 'n3', type: 'Announcements', message: 'Event Manager: Booth setup must be completed by 6 PM today.', time: '3 hours ago', read: true },
    { id: 'n4', type: 'Leads', message: 'Lead status changed to "Qualified" for David Miller', time: '4 hours ago', read: true },
  ]
};

const SCORE_COLORS = {
  Hot: 'bg-red-100 text-red-700',
  Warm: 'bg-orange-100 text-orange-700',
  Cold: 'bg-blue-100 text-blue-700'
};

const STATUS_COLORS = {
  New: 'bg-emerald-100 text-emerald-700',
  Contacted: 'bg-blue-100 text-blue-700',
  Qualified: 'bg-purple-100 text-purple-700',
  Lost: 'bg-neutral-100 text-neutral-600'
};

// --- Components ---

const MetricCard = ({ label, value, trend, data, color = "emerald" }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100 flex flex-col"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-neutral-500 mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-neutral-900">{value}</h3>
      </div>
      <span className={cn(
        "text-xs font-bold px-2 py-1 rounded-full",
        trend.startsWith('+') ? "bg-emerald-100 text-emerald-700" : 
        trend === 'Stable' ? "bg-neutral-100 text-neutral-600" : "bg-red-100 text-red-700"
      )}>
        {trend}
      </span>
    </div>
    <div className="h-12 w-full mt-auto flex items-end gap-1">
      {data.map((val: number, i: number) => (
        <div 
          key={i} 
          className={cn(
            "flex-1 rounded-t-sm transition-all duration-500",
            color === "emerald" ? "bg-emerald-400" : "bg-blue-400"
          )}
          style={{ height: `${(val / Math.max(...data)) * 100}%` }}
        />
      ))}
    </div>
  </motion.div>
);

const LeadScoreDonut = () => {
  const data = [
    { name: 'Hot', value: 45 },
    { name: 'Warm', value: 35 },
    { name: 'Cold', value: 20 },
  ];
  const COLORS = ['#EF4444', '#F97316', '#3B82F6'];

  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-2">
        {data.map((item, i) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <span className="text-xs font-medium text-neutral-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Views ---

const HomeView = ({ onNavigate }: { onNavigate: (v: View) => void }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {MOCK_DATA.metrics.map((m, i) => (
        <MetricCard key={i} {...m} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white rounded-[12px] shadow-sm border border-neutral-100 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
          <h3 className="font-bold text-neutral-900">Recent Leads</h3>
          <button onClick={() => onNavigate('leads')} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
              <tr>
                <th className="px-6 py-4">Name / Company</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Captured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_DATA.leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={lead.avatar} className="w-8 h-8 rounded-full" alt="" />
                      <div>
                        <p className="text-sm font-bold text-neutral-900">{lead.name}</p>
                        <p className="text-xs text-neutral-500">{lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", SCORE_COLORS[lead.score])}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500">{lead.capturedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 p-6">
          <h3 className="font-bold text-neutral-900 mb-6">Upcoming Meetings</h3>
          <div className="space-y-4">
            {MOCK_DATA.meetings.map((meeting) => (
              <div key={meeting.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-100">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  meeting.type === 'In-person' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                )}>
                  {meeting.type === 'In-person' ? <MapPin size={20} /> : <Video size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-neutral-900 truncate">{meeting.attendeeName}</p>
                  <p className="text-xs text-neutral-500">{meeting.time} · {meeting.type}</p>
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-1 rounded-md",
                  meeting.status === 'Confirmed' ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                )}>
                  {meeting.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 p-6">
          <h3 className="font-bold text-neutral-900 mb-4">Lead Score Breakdown</h3>
          <LeadScoreDonut />
        </div>
      </div>
    </div>
  </div>
);

const LeadsView = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = useMemo(() => {
    return MOCK_DATA.leads.filter(l => 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="relative">
      <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-6 border-b border-neutral-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input 
                type="text" 
                placeholder="Search leads..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button className="p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-500 hover:bg-neutral-100 transition-colors">
              <Filter size={18} />
            </button>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-neutral-200 px-4 py-2 rounded-xl text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition-all">
              <Download size={16} /> Export CSV
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">
              <Plus size={16} /> Add Lead
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
              <tr>
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Captured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead)}
                  className="hover:bg-neutral-50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={lead.avatar} className="w-10 h-10 rounded-full" alt="" />
                      <div>
                        <p className="text-sm font-bold text-neutral-900">{lead.name}</p>
                        <p className="text-xs text-neutral-500">{lead.company} · {lead.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", SCORE_COLORS[lead.score])}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", STATUS_COLORS[lead.status])}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500">{lead.source}</td>
                  <td className="px-6 py-4 text-xs text-neutral-500">{lead.capturedAt}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Side Panel */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 className="font-bold text-lg">Lead Details</h3>
                <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                <div className="flex flex-col items-center text-center mb-8">
                  <img src={selectedLead.avatar} className="w-24 h-24 rounded-full border-4 border-emerald-50 mb-4" alt="" />
                  <h4 className="text-xl font-bold text-neutral-900">{selectedLead.name}</h4>
                  <p className="text-neutral-500">{selectedLead.title} at {selectedLead.company}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
                      <Mail size={18} />
                    </button>
                    <button className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
                      <Phone size={18} />
                    </button>
                    <button className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
                      <Linkedin size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Lead Score</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Hot', 'Warm', 'Cold'] as LeadScore[]).map(score => (
                        <button 
                          key={score}
                          className={cn(
                            "py-2 rounded-xl text-xs font-bold border transition-all",
                            selectedLead.score === score 
                              ? "bg-emerald-500 text-white border-emerald-500" 
                              : "bg-white text-neutral-500 border-neutral-200 hover:border-emerald-500"
                          )}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Status</label>
                    <select className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20">
                      {['New', 'Contacted', 'Qualified', 'Lost'].map(status => (
                        <option key={status} value={status} selected={selectedLead.status === status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Notes</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[120px]"
                      placeholder="Add notes about this lead..."
                      defaultValue={selectedLead.notes}
                    />
                  </div>

                  <div className="pt-4">
                    <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                      Send Follow-up Email
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const BoothView = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 overflow-hidden">
      <div className="border-b border-neutral-100">
        <div className="flex px-6">
          {['profile', 'team', 'collateral', 'meetings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-4 text-sm font-bold capitalize transition-all relative",
                activeTab === tab ? "text-emerald-600" : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="booth-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        {activeTab === 'profile' && (
          <div className="max-w-2xl space-y-8">
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center bg-neutral-50 group cursor-pointer hover:border-emerald-500 transition-colors overflow-hidden relative">
                <img src={MOCK_DATA.exhibitor.logo} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" alt="" />
                <Upload className="text-neutral-400 mb-2 group-hover:text-emerald-500 transition-colors" size={24} />
                <span className="text-[10px] font-bold text-neutral-400 group-hover:text-emerald-500 transition-colors">Upload Logo</span>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Company Name</label>
                  <input type="text" defaultValue={MOCK_DATA.exhibitor.companyName} className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Tagline</label>
                  <input type="text" placeholder="Empowering the future of tech..." className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 block">Description</label>
              <textarea 
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[160px]"
                placeholder="Tell attendees about your company..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                  <input type="text" placeholder="https://..." className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">LinkedIn</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                  <input type="text" placeholder="linkedin.com/company/..." className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-neutral-900">Team Members</h4>
              <button className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">
                <Plus size={16} /> Invite Member
              </button>
            </div>
            <div className="border border-neutral-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {[
                    { name: 'Alex Rivera', email: 'alex@technova.com', role: 'Lead', status: 'Active' },
                    { name: 'Jordan Smith', email: 'jordan@technova.com', role: 'Staff', status: 'Active' },
                    { name: 'Casey Chen', email: 'casey@technova.com', role: 'Staff', status: 'Invited' },
                  ].map((member, i) => (
                    <tr key={i} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-neutral-900">{member.name}</p>
                        <p className="text-xs text-neutral-500">{member.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{member.role}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-1 rounded-md",
                          member.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-600"
                        )}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'collateral' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-neutral-200 rounded-3xl p-12 text-center hover:border-emerald-500 transition-colors group cursor-pointer bg-neutral-50/50">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="text-emerald-500" size={24} />
              </div>
              <h4 className="font-bold text-neutral-900 mb-1">Upload Digital Collateral</h4>
              <p className="text-sm text-neutral-500">Drag and drop PDFs or product sheets (Max 10MB)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Product Brochure 2026.pdf', size: '2.4 MB', date: 'Feb 20, 2026', downloads: 124 },
                { name: 'Enterprise Solutions.pdf', size: '4.1 MB', date: 'Feb 18, 2026', downloads: 89 },
              ].map((file, i) => (
                <div key={i} className="p-4 border border-neutral-100 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow bg-white">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-900 truncate">{file.name}</p>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{file.size} · {file.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-600">{file.downloads} DLs</p>
                    <div className="flex gap-1 mt-1">
                      <button className="p-1.5 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AnalyticsView = () => {
  const lineData = [
    { time: '9 AM', leads: 12 },
    { time: '11 AM', leads: 28 },
    { time: '1 PM', leads: 45 },
    { time: '3 PM', leads: 32 },
    { time: '5 PM', leads: 18 },
  ];

  const sourceData = [
    { name: 'QR Scan', value: 65 },
    { name: 'NFC', value: 25 },
    { name: 'Manual', value: 10 },
  ];
  const COLORS = ['#10B981', '#3B82F6', '#F97316'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: '148', trend: '+23%' },
          { label: 'Booth Visitors', value: '312', trend: '+12%' },
          { label: 'Avg. Time at Booth', value: '4.5m', trend: '+0.8m' },
          { label: 'Conversion Rate', value: '47.4%', trend: '+5.2%' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
            <p className="text-sm font-medium text-neutral-500 mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-neutral-900">{kpi.value}</h3>
              <span className="text-xs font-bold text-emerald-600">{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
          <h3 className="font-bold text-neutral-900 mb-6">Leads Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
          <h3 className="font-bold text-neutral-900 mb-6">Lead Sources</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {sourceData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs font-medium text-neutral-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SponsorshipView = () => (
  <div className="space-y-8">
    <div className="bg-white p-8 rounded-[12px] shadow-sm border border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
          <Target size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-neutral-900">Gold Sponsor</h3>
          <p className="text-neutral-500">Your current sponsorship package</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {[
          { label: 'Logo on Website', active: true },
          { label: 'Banner Ad', active: true },
          { label: 'Session Slot', active: false },
          { label: 'Push Notification', active: true },
        ].map((benefit, i) => (
          <div key={i} className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border",
            benefit.active ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-neutral-50 text-neutral-400 border-neutral-100"
          )}>
            {benefit.active ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
            {benefit.label}
          </div>
        ))}
      </div>
      <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all">
        Upgrade Package
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
        <h3 className="font-bold text-neutral-900 mb-6">Branding Assets</h3>
        <div className="space-y-4">
          {[
            { slot: 'Main Banner', dims: '1920 × 400', status: 'Approved' },
            { slot: 'Side Banner', dims: '300 × 600', status: 'Pending' },
            { slot: 'Mobile Banner', dims: '320 × 50', status: 'Approved' },
          ].map((asset, i) => (
            <div key={i} className="p-4 border border-neutral-100 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-neutral-900">{asset.slot}</p>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">{asset.dims}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "text-[10px] font-bold px-2 py-1 rounded-md",
                  asset.status === 'Approved' ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                )}>
                  {asset.status}
                </span>
                <button className="p-2 bg-neutral-50 text-neutral-500 rounded-xl hover:bg-neutral-100 transition-colors">
                  <Upload size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
        <h3 className="font-bold text-neutral-900 mb-6">Impressions Tracker</h3>
        <div className="space-y-6">
          {[
            { label: 'Website Banner', count: '12,482', trend: '+15%' },
            { label: 'Mobile App Ad', count: '8,931', trend: '+8%' },
            { label: 'Email Newsletter', count: '4,200', trend: 'Stable' },
          ].map((track, i) => (
            <div key={i}>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{track.label}</p>
                  <h4 className="text-xl font-bold text-neutral-900">{track.count}</h4>
                </div>
                <span className="text-xs font-bold text-emerald-600">{track.trend}</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const NotificationsView = () => (
  <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 overflow-hidden">
    <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
      <h3 className="font-bold text-neutral-900">Notifications</h3>
      <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Mark all as read</button>
    </div>
    <div className="divide-y divide-neutral-100">
      {MOCK_DATA.notifications.map((n) => (
        <div key={n.id} className={cn(
          "p-6 flex items-start gap-4 hover:bg-neutral-50 transition-colors cursor-pointer",
          !n.read && "bg-emerald-50/30"
        )}>
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            n.type === 'Leads' ? "bg-emerald-100 text-emerald-600" :
            n.type === 'Meetings' ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
          )}>
            {n.type === 'Leads' ? <Users size={20} /> : 
             n.type === 'Meetings' ? <Calendar size={20} /> : <AlertCircle size={20} />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{n.type}</span>
              <span className="text-[10px] font-bold text-neutral-400">{n.time}</span>
            </div>
            <p className={cn("text-sm", n.read ? "text-neutral-600" : "text-neutral-900 font-medium")}>
              {n.message}
            </p>
          </div>
          {!n.read && <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />}
        </div>
      ))}
    </div>
  </div>
);

// --- Main Dashboard ---

export default function ExhibitorDashboard() {
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState<View>('home');
  const [isSyncing, setIsSyncing] = useState(false);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'leads', label: 'Leads', icon: Users, badge: 148 },
    { id: 'booth', label: 'Booth Setup', icon: Store },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'sponsorship', label: 'Sponsorship', icon: Target },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'home': return <HomeView onNavigate={setActiveView} />;
      case 'leads': return <LeadsView />;
      case 'booth': return <BoothView />;
      case 'analytics': return <AnalyticsView />;
      case 'sponsorship': return <SponsorshipView />;
      case 'notifications': return <NotificationsView />;
      default: return <HomeView onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-100 flex flex-col py-6 bg-white shrink-0">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black italic">E</div>
            <span className="text-xl font-black tracking-tighter text-neutral-900">EventEvo</span>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeView === item.id 
                  ? "bg-emerald-50 text-emerald-600" 
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                {item.label}
              </div>
              {item.badge && (
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full",
                  activeView === item.id ? "bg-emerald-500 text-white" : "bg-neutral-100 text-neutral-500"
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 mt-auto pt-6 border-t border-neutral-100">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-neutral-100 bg-white flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Search leads, meetings, or assets..." 
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-xl border border-neutral-100">
              <Calendar size={16} className="text-neutral-400" />
              <span className="text-xs font-bold text-neutral-600">{MOCK_DATA.exhibitor.event}</span>
            </div>

            <button className="relative p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-neutral-100" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-neutral-900 leading-none">{MOCK_DATA.exhibitor.companyName}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">EXHIBITOR</p>
              </div>
              <img 
                src={user?.avatar || "https://i.pravatar.cc/150?u=tech"} 
                className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" 
                alt="" 
              />
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-neutral-50/30">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 capitalize">{activeView.replace('-', ' ')}</h2>
                    <p className="text-neutral-500 text-sm">Welcome back, {MOCK_DATA.exhibitor.companyName}. Here's what's happening today.</p>
                  </div>
                  {activeView === 'home' && (
                    <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                      <Scan size={18} /> Scan Lead
                    </button>
                  )}
                </div>

                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Floating Scan Button (Mobile) */}
        <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30">
          <Scan size={24} />
        </button>

        {/* Sync Banner */}
        <AnimatePresence>
          {isSyncing && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-50"
            >
              <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-bold">Syncing leads...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
