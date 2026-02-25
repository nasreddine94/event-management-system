import React, { useState, useMemo } from 'react';
import {
  Home,
  Inbox,
  Package,
  ShoppingBag,
  DollarSign,
  User,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  ChevronRight,
  MoreVertical,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  MessageSquare,
  Plus,
  Download,
  Trash2,
  Copy,
  Edit3,
  Eye,
  MapPin,
  Calendar,
  Users,
  Globe,
  Linkedin,
  ShieldCheck,
  X,
  Send,
  Paperclip,
  Truck,
  CreditCard,
  Star,
  Phone,
  Mail
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import FeatureStatusIndicator from './FeatureStatusIndicator';

// --- Types ---
type View = 'home' | 'rfqs' | 'bookings' | 'services' | 'finances' | 'profile' | 'notifications' | 'settings';
type RFQStatus = 'NEW' | 'RESPONDED' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';
type BookingStatus = 'CONFIRMED' | 'IN PROGRESS' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
type PayoutStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'PROCESSING' | 'FAILED';

interface RFQ {
  id: string;
  eventName: string;
  organizer: string;
  service: string;
  category: string;
  budget: string;
  eventDate: string;
  deadline: string;
  status: RFQStatus;
  receivedAt: string;
  description?: string;
  requirements?: string[];
  attendance?: string;
  location?: string;
}

interface Booking {
  id: string;
  ref: string;
  eventName: string;
  eventDate: string;
  service: string;
  organizer: string;
  organizerContact: string;
  organizerPhone: string;
  organizerEmail: string;
  totalValue: number;
  payoutStatus: PayoutStatus;
  deliveryStatus: BookingStatus;
  date: string;
  platformFee: number;
  depositPaid: number;
  payoutDate: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  status: 'Active' | 'Paused';
  views: number;
  rfqs: number;
}

// --- Mock Data ---
const MOCK_DATA = {
  partner: {
    companyName: "ProAV Rentals",
    category: "AV Equipment",
    verified: true,
    rating: 4.8,
    totalReviews: 63,
    avatar: "https://picsum.photos/seed/proav/200/200"
  },
  metrics: [
    { label: 'Active RFQs', value: 7, trend: '+3 new', data: [4, 6, 5, 8, 7, 9, 7] },
    { label: 'Confirmed Bookings', value: 24, trend: '+18%', data: [15, 18, 22, 20, 25, 24, 24] },
    { label: 'Total Revenue', value: '$12,480', trend: '+22%', data: [8000, 9500, 11000, 10500, 12000, 12480, 12480] },
    { label: 'Response Rate', value: '94%', trend: 'Stable', data: [92, 94, 93, 95, 94, 94, 94] },
  ],
  rfqs: [
    {
      id: 'RFQ-2026-0412',
      eventName: "Global Tech Summit 2026",
      organizer: "EventEvo Inc.",
      service: "AV Equipment — Main Stage",
      category: "AV Equipment",
      budget: "$8,000 – $12,000",
      eventDate: "March 15, 2026",
      deadline: "18h 42m",
      status: "NEW",
      receivedAt: "2 hours ago",
      location: "San Francisco Convention Center",
      attendance: "5,000+",
      description: "Full audio and visual setup for the main keynote stage. Includes 4K LED walls, line array sound system, and live streaming support.",
      requirements: [
        "4K LED Wall (12m x 4m)",
        "Redundant audio mixing consoles",
        "4x Wireless handheld mics + 4x Lavaliers",
        "On-site technician for 3 days"
      ]
    },
    {
      id: 'RFQ-2026-0389',
      eventName: "Startup Pitch Night",
      organizer: "TechHub DZ",
      service: "Microphones + PA System",
      category: "AV Equipment",
      budget: "$1,200 – $2,500",
      eventDate: "March 22, 2026",
      deadline: "3 days",
      status: "RESPONDED",
      receivedAt: "1 day ago"
    },
    {
      id: 'RFQ-2026-0355',
      eventName: "Corporate Gala Dinner",
      organizer: "Luxe Events",
      service: "Ambient Lighting & Sound",
      category: "Lighting",
      budget: "$4,000 – $6,000",
      eventDate: "April 05, 2026",
      deadline: "5 days",
      status: "ACCEPTED",
      receivedAt: "3 days ago"
    },
    {
      id: 'RFQ-2026-0312',
      eventName: "Education Expo",
      organizer: "EduGlobal",
      service: "Projector Rentals (10 units)",
      category: "AV Equipment",
      budget: "$2,000 – $3,500",
      eventDate: "April 12, 2026",
      deadline: "Expired",
      status: "EXPIRED",
      receivedAt: "1 week ago"
    }
  ] as RFQ[],
  bookings: [
    { id: '1', ref: "#EVT-2026-0089", eventName: "Tech Innovators Meetup", eventDate: "Feb 28, 2026", service: "PA System + Projector", organizer: "InnovateX", organizerContact: "John Doe", organizerPhone: "+1 234 567 890", organizerEmail: "john@innovatex.com", totalValue: 1500, payoutStatus: "PAID", deliveryStatus: "DELIVERED", date: "2026-02-28", platformFee: 120, depositPaid: 500, payoutDate: "Feb 20, 2026" },
    { id: '2', ref: "#EVT-2026-0102", eventName: "Digital Marketing Workshop", eventDate: "March 02, 2026", service: "Full AV Setup", organizer: "GrowthLabs", organizerContact: "Sarah Smith", organizerPhone: "+1 987 654 321", organizerEmail: "sarah@growthlabs.io", totalValue: 3200, payoutStatus: "PARTIAL", deliveryStatus: "CONFIRMED", date: "2026-03-02", platformFee: 256, depositPaid: 1000, payoutDate: "March 15, 2026" },
    { id: '3', ref: "#EVT-2026-0115", eventName: "Product Launch: Vision Pro 2", eventDate: "March 10, 2026", service: "LED Wall + Sound", organizer: "Futurism", organizerContact: "Mike Ross", organizerPhone: "+1 555 012 345", organizerEmail: "mike@futurism.com", totalValue: 8500, payoutStatus: "PENDING", deliveryStatus: "IN PROGRESS", date: "2026-03-10", platformFee: 680, depositPaid: 2500, payoutDate: "March 25, 2026" },
  ] as Booking[],
  services: [
    { id: 's1', name: "Full Stage AV Package", category: "AV Equipment", price: "From $2,500/day", image: "https://picsum.photos/seed/av1/400/300", status: "Active", views: 1240, rfqs: 45 },
    { id: 's2', name: "Standard PA System", category: "AV Equipment", price: "From $500/day", image: "https://picsum.photos/seed/av2/400/300", status: "Active", views: 850, rfqs: 28 },
    { id: 's3', name: "4K LED Wall Rental", category: "AV Equipment", price: "From $1,200/day", image: "https://picsum.photos/seed/av3/400/300", status: "Paused", views: 620, rfqs: 12 },
  ] as Service[],
  revenueData: [
    { month: 'Sep', revenue: 8200 },
    { month: 'Oct', revenue: 9400 },
    { month: 'Nov', revenue: 11200 },
    { month: 'Dec', revenue: 10800 },
    { month: 'Jan', revenue: 12100 },
    { month: 'Feb', revenue: 12480 },
  ],
  payouts: [
    { ref: "PAY-001", bookings: "Tech Innovators Meetup", gross: 1500, fee: 120, net: 1380, status: "PAID", date: "Feb 20, 2026" },
    { ref: "PAY-002", bookings: "Design Week 2026", gross: 4200, fee: 336, net: 3864, status: "PAID", date: "Feb 12, 2026" },
    { ref: "PAY-003", bookings: "Startup Pitch Night", gross: 1800, fee: 144, net: 1656, status: "PROCESSING", date: "Feb 25, 2026" },
  ]
};

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-emerald-100 text-emerald-700',
  RESPONDED: 'bg-blue-100 text-blue-700',
  ACCEPTED: 'bg-emerald-100 text-emerald-700',
  DECLINED: 'bg-neutral-100 text-neutral-600',
  EXPIRED: 'bg-red-100 text-red-700',
  CONFIRMED: 'bg-emerald-100 text-emerald-700',
  'IN PROGRESS': 'bg-blue-100 text-blue-700',
  DELIVERED: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-neutral-100 text-neutral-600',
  DISPUTED: 'bg-red-100 text-red-700',
  PAID: 'bg-emerald-100 text-emerald-700',
  PARTIAL: 'bg-orange-100 text-orange-700',
  PENDING: 'bg-neutral-100 text-neutral-600',
  PROCESSING: 'bg-blue-100 text-blue-700',
  FAILED: 'bg-red-100 text-red-700',
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
          <h3 className="font-bold text-neutral-900">Recent RFQs</h3>
          <button onClick={() => onNavigate('rfqs')} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
              <tr>
                <th className="px-6 py-4">Event / Service</th>
                <th className="px-6 py-4">Manager</th>
                <th className="px-6 py-4">Budget</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_DATA.rfqs.slice(0, 4).map((rfq) => (
                <tr key={rfq.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{rfq.eventName}</p>
                      <p className="text-xs text-neutral-500">{rfq.service}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{rfq.organizer}</td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">{rfq.budget}</td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", STATUS_COLORS[rfq.status])}>
                      {rfq.status}
                    </span>
                  </td>
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

      <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 p-6">
        <h3 className="font-bold text-neutral-900 mb-6">Upcoming Deliveries</h3>
        <div className="space-y-4">
          {MOCK_DATA.bookings.map((booking) => (
            <div key={booking.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-100">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                "bg-purple-50 text-purple-600"
              )}>
                <Truck size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-neutral-900 truncate">{booking.eventName}</p>
                <p className="text-xs text-neutral-500">{booking.eventDate} · {booking.service}</p>
              </div>
              <span className={cn(
                "text-[10px] font-bold px-2 py-1 rounded-md",
                STATUS_COLORS[booking.deliveryStatus]
              )}>
                {booking.deliveryStatus === 'IN PROGRESS' ? 'In Transit' : booking.deliveryStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
      <h3 className="font-bold text-neutral-900 mb-6">Revenue Overview</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_DATA.revenueData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <Tooltip
              cursor={{ fill: '#F9FAFB' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const RFQInboxView = ({ onSelectRFQ }: { onSelectRFQ: (rfq: RFQ) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="text"
                placeholder="Search requests..."
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
            <select className="bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 outline-none">
              <option>All Statuses</option>
              <option>New</option>
              <option>Responded</option>
              <option>Accepted</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
              <tr>
                <th className="px-6 py-4">Event / Organizer</th>
                <th className="px-6 py-4">Service Category</th>
                <th className="px-6 py-4">Event Date</th>
                <th className="px-6 py-4">Budget Range</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_DATA.rfqs.map((rfq) => (
                <tr
                  key={rfq.id}
                  onClick={() => onSelectRFQ(rfq)}
                  className="hover:bg-neutral-50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{rfq.eventName}</p>
                      <p className="text-xs text-neutral-500">{rfq.organizer}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2 py-1 bg-purple-50 text-purple-700 rounded-md">
                      {rfq.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{rfq.eventDate}</td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">{rfq.budget}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                      <Clock size={14} />
                      {rfq.deadline}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", STATUS_COLORS[rfq.status])}>
                      {rfq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-white border border-neutral-200 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-all">
                      View & Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const RFQDetailView = ({ rfq, onBack }: { rfq: RFQ, onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors">
        <ChevronRight className="rotate-180" size={16} /> Back to Inbox
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - RFQ Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[12px] shadow-sm border border-neutral-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2 block">RFQ Details</span>
                <h2 className="text-2xl font-bold text-neutral-900 mb-1">{rfq.eventName}</h2>
                <p className="text-neutral-500">Requested by {rfq.organizer}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-red-600 font-bold mb-1">
                  <Clock size={18} />
                  <span>Respond within {rfq.deadline}</span>
                </div>
                <p className="text-xs text-neutral-400">Received {rfq.receivedAt}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Event Date</p>
                <p className="text-sm font-bold text-neutral-900">{rfq.eventDate}</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm font-bold text-neutral-900">{rfq.location || 'TBD'}</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Attendance</p>
                <p className="text-sm font-bold text-neutral-900">{rfq.attendance || 'N/A'}</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Budget Range</p>
                <p className="text-sm font-bold text-emerald-600">{rfq.budget}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-neutral-900 mb-2">Service Requested</h4>
                <div className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-bold mb-3">
                  {rfq.category}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {rfq.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {rfq.requirements?.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 mb-3">Attachments</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-all">
                    <FileText size={16} className="text-red-500" /> floor_plan_v2.pdf
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-all">
                    <FileText size={16} className="text-blue-500" /> event_brief.pdf
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thread Section */}
          <div className="bg-white p-8 rounded-[12px] shadow-sm border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-6">Messages</h3>
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <img src="https://i.pravatar.cc/150?u=manager" className="w-10 h-10 rounded-full shrink-0" alt="" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-neutral-900">Alex Rivera</span>
                    <span className="text-[10px] text-neutral-400 font-bold">2 hours ago</span>
                  </div>
                  <div className="p-4 bg-neutral-50 rounded-2xl rounded-tl-none text-sm text-neutral-600">
                    Hi ProAV team, we're looking for a top-tier setup for our keynote. Please let us know if you have the 4K LED wall available for these dates.
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <textarea
                className="w-full pl-4 pr-12 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[100px]"
                placeholder="Type your message..."
              />
              <button className="absolute bottom-3 right-3 p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Proposal Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100 sticky top-24">
            <h3 className="font-bold text-neutral-900 mb-6">Your Proposal</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Proposal Title</label>
                <input type="text" defaultValue={`Proposal for ${rfq.eventName}`} className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Total Quote ($)</label>
                <input type="number" placeholder="9500" className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Description</label>
                <textarea
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[120px]"
                  placeholder="Describe your offer in detail..."
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                <span className="text-xs font-bold text-neutral-600">Confirm Availability</span>
                <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="pt-4 space-y-3">
                <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                  Send Proposal
                </button>
                <button className="w-full bg-white text-red-600 border border-red-100 py-3 rounded-xl font-bold hover:bg-red-50 transition-all">
                  Decline RFQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingsView = ({ onSelectBooking }: { onSelectBooking: (b: Booking) => void }) => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 overflow-hidden">
        <div className="border-b border-neutral-100">
          <div className="flex px-6">
            {['All', 'Upcoming', 'In Progress', 'Completed', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-4 text-sm font-bold transition-all relative",
                  activeTab === tab ? "text-emerald-600" : "text-neutral-500 hover:text-neutral-700"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="booking-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
              <tr>
                <th className="px-6 py-4">Booking Ref</th>
                <th className="px-6 py-4">Event / Date</th>
                <th className="px-6 py-4">Organizer</th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4">Payout</th>
                <th className="px-6 py-4">Delivery</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_DATA.bookings.map((booking) => (
                <tr
                  key={booking.id}
                  onClick={() => onSelectBooking(booking)}
                  className="hover:bg-neutral-50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm font-bold text-emerald-600">{booking.ref}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-neutral-900">{booking.eventName}</p>
                      <p className="text-xs text-neutral-500">{booking.eventDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{booking.organizer}</td>
                  <td className="px-6 py-4 text-sm font-bold text-neutral-900">${booking.totalValue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", STATUS_COLORS[booking.payoutStatus])}>
                      {booking.payoutStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", STATUS_COLORS[booking.deliveryStatus])}>
                      {booking.deliveryStatus}
                    </span>
                  </td>
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
    </div>
  );
};

const BookingDetailView = ({ booking, onBack }: { booking: Booking, onBack: () => void }) => {
  const milestones = [
    { label: 'Booking Confirmed', date: 'Feb 10, 2026', status: 'completed' },
    { label: 'Deposit Received', date: 'Feb 12, 2026', status: 'completed' },
    { label: 'Equipment Preparation', date: 'Feb 25, 2026', status: 'current' },
    { label: 'Delivery & Setup', date: 'Feb 28, 2026', status: 'upcoming' },
    { label: 'Event Completion', date: 'Mar 01, 2026', status: 'upcoming' },
    { label: 'Final Payout', date: 'Mar 05, 2026', status: 'upcoming' },
  ];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors">
        <ChevronRight className="rotate-180" size={16} /> Back to Bookings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[12px] shadow-sm border border-neutral-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Booking Summary</span>
                  <span className="text-sm font-bold text-neutral-400">{booking.ref}</span>
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-1">{booking.eventName}</h2>
                <p className="text-neutral-500">{booking.service}</p>
              </div>
              <div className="text-right">
                <span className={cn("text-xs font-bold px-3 py-1 rounded-full", STATUS_COLORS[booking.deliveryStatus])}>
                  {booking.deliveryStatus}
                </span>
                <p className="text-xs text-neutral-400 mt-2">Booked on {booking.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Event Date</p>
                <p className="text-sm font-bold text-neutral-900">{booking.eventDate}</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Total Value</p>
                <p className="text-sm font-bold text-neutral-900">${booking.totalValue.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Payout Status</p>
                <p className="text-sm font-bold text-emerald-600">{booking.payoutStatus}</p>
              </div>
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Next Payout</p>
                <p className="text-sm font-bold text-neutral-900">{booking.payoutDate}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-neutral-900 mb-6">Milestone Tracker</h4>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-100" />
                  <div className="space-y-8 relative">
                    {milestones.map((m, i) => (
                      <div key={i} className="flex items-start gap-6">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white",
                          m.status === 'completed' ? "bg-emerald-500 text-white" :
                            m.status === 'current' ? "bg-white border-emerald-500 text-emerald-500" : "bg-neutral-100 text-neutral-400"
                        )}>
                          {m.status === 'completed' ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                        </div>
                        <div>
                          <p className={cn("text-sm font-bold", m.status === 'upcoming' ? "text-neutral-400" : "text-neutral-900")}>{m.label}</p>
                          <p className="text-xs text-neutral-500">{m.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-4">Payment Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Service Fee</span>
                    <span className="font-medium text-neutral-900">${booking.totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Platform Fee (8%)</span>
                    <span className="font-medium text-red-500">-${booking.platformFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-neutral-100">
                    <span className="font-bold text-neutral-900">Net Payout</span>
                    <span className="font-bold text-emerald-600">${(booking.totalValue - booking.platformFee).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-400 pt-1">
                    <span>Deposit Paid by Organizer</span>
                    <span>${booking.depositPaid.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-6">Organizer Contact</h3>
            <div className="flex items-center gap-4 mb-6">
              <img src={`https://i.pravatar.cc/150?u=${booking.organizer}`} className="w-12 h-12 rounded-full" alt="" />
              <div>
                <p className="font-bold text-neutral-900">{booking.organizerContact}</p>
                <p className="text-xs text-neutral-500">{booking.organizer}</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-neutral-50 text-neutral-700 py-2.5 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-all">
                <MessageSquare size={18} /> Message Organizer
              </button>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-neutral-50 text-neutral-700 py-2.5 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-all">
                  <Phone size={18} /> Call
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-neutral-50 text-neutral-700 py-2.5 rounded-xl text-sm font-bold hover:bg-neutral-100 transition-all">
                  <Mail size={18} /> Email
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-4">Documents</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-all group">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-red-500" />
                  <span className="text-xs font-bold text-neutral-700">Contract_Signed.pdf</span>
                </div>
                <Download size={16} className="text-neutral-400 group-hover:text-neutral-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-all group">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-blue-500" />
                  <span className="text-xs font-bold text-neutral-700">Service_Agreement.pdf</span>
                </div>
                <Download size={16} className="text-neutral-400 group-hover:text-neutral-600" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
              Mark as Delivered
            </button>
            <button className="w-full bg-white text-red-600 border border-red-100 py-4 rounded-xl font-bold hover:bg-red-50 transition-all">
              Raise a Dispute
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesView = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-neutral-900">My Services</h3>
          <p className="text-sm text-neutral-500">Manage your marketplace listings</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
          <Plus size={18} /> Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DATA.services.map((service) => (
          <div key={service.id} className="bg-white rounded-[12px] shadow-sm border border-neutral-100 overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
              <img src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-purple-700 rounded-md shadow-sm">
                  {service.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-bold shadow-sm",
                  service.status === 'Active' ? "bg-emerald-500 text-white" : "bg-neutral-500 text-white"
                )}>
                  {service.status}
                </div>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-neutral-900 mb-1">{service.name}</h4>
              <p className="text-sm font-bold text-emerald-600 mb-4">{service.price}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-2 bg-neutral-50 rounded-lg text-center">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Views</p>
                  <p className="text-sm font-bold text-neutral-900">{service.views}</p>
                </div>
                <div className="p-2 bg-neutral-50 rounded-lg text-center">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">RFQs</p>
                  <p className="text-sm font-bold text-neutral-900">{service.rfqs}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-neutral-50 text-neutral-700 py-2 rounded-xl text-xs font-bold hover:bg-neutral-100 transition-all">
                  <Edit3 size={14} /> Edit
                </button>
                <button className="p-2 bg-neutral-50 text-neutral-500 rounded-xl hover:bg-neutral-100 transition-all">
                  <Copy size={14} />
                </button>
                <button className="p-2 bg-neutral-50 text-red-500 rounded-xl hover:bg-red-50 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FinancesView = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Earned', value: '$84,200', trend: 'All time' },
          { label: 'This Month', value: '$12,480', trend: '+22%' },
          { label: 'Pending Payout', value: '$1,656', trend: 'Processing' },
          { label: 'Next Payout', value: 'Feb 28', trend: 'In 3 days' },
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

      <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
        <h3 className="font-bold text-neutral-900 mb-6">Revenue Growth</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_DATA.revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-[12px] shadow-sm border border-neutral-100 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
          <h3 className="font-bold text-neutral-900">Payout History</h3>
          <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Download All <Download size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500 font-bold">
              <tr>
                <th className="px-6 py-4">Payout Ref</th>
                <th className="px-6 py-4">Booking(s)</th>
                <th className="px-6 py-4">Gross</th>
                <th className="px-6 py-4">Fee (8%)</th>
                <th className="px-6 py-4">Net Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_DATA.payouts.map((p, i) => (
                <tr key={i} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-neutral-900">{p.ref}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{p.bookings}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">${p.gross.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-red-500">-${p.fee.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-600">${p.net.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md", STATUS_COLORS[p.status])}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProfileView = () => {
  return (
    <div className="space-y-8">
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">Verification Status</h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 size={14} /> Business Info
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 size={14} /> ID Verified
              </span>
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                <AlertCircle size={14} /> Insurance (Expiring soon)
              </span>
            </div>
          </div>
        </div>
        <button className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all">
          Update Documents
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[12px] shadow-sm border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-6">Company Profile</h3>
            <div className="flex items-center gap-8 mb-8">
              <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center bg-neutral-50 group cursor-pointer hover:border-emerald-500 transition-colors overflow-hidden relative">
                <img src={MOCK_DATA.partner.avatar} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" alt="" />
                <Plus className="text-neutral-400 mb-2 group-hover:text-emerald-500 transition-colors" size={24} />
                <span className="text-[10px] font-bold text-neutral-400 group-hover:text-emerald-500 transition-colors">Change Logo</span>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Company Name</label>
                  <input type="text" defaultValue={MOCK_DATA.partner.companyName} className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Website</label>
                  <input type="text" placeholder="https://proav-rentals.com" className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1 block">Description</label>
                <textarea
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 min-h-[120px]"
                  defaultValue="Leading provider of professional AV equipment for corporate events, summits, and gala dinners. Over 15 years of experience in the industry."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-[12px] shadow-sm border border-neutral-100">
            <h3 className="font-bold text-neutral-900 mb-6">Reviews & Rating</h3>
            <div className="text-center mb-8">
              <h4 className="text-4xl font-black text-neutral-900 mb-2">{MOCK_DATA.partner.rating}</h4>
              <div className="flex justify-center gap-1 text-orange-400 mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill={i <= 4 ? "currentColor" : "none"} />)}
              </div>
              <p className="text-sm text-neutral-500">Based on {MOCK_DATA.partner.totalReviews} reviews</p>
            </div>
            <div className="space-y-4">
              {[
                { label: '5 Stars', count: 48, percent: 76 },
                { label: '4 Stars', count: 12, percent: 19 },
                { label: '3 Stars', count: 3, percent: 5 },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-neutral-500 w-12">{row.label}</span>
                  <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${row.percent}%` }} />
                  </div>
                  <span className="text-xs font-bold text-neutral-900 w-8">{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsView = () => {
  const notifications = [
    { id: 1, type: 'RFQ', title: 'New RFQ Received', message: 'Global Tech Summit 2026 is requesting a quote for AV Equipment.', time: '2 hours ago', unread: true, icon: Inbox, color: 'text-blue-600 bg-blue-50' },
    { id: 2, type: 'Booking', title: 'Booking Confirmed', message: 'InnovateX has confirmed the booking for Tech Innovators Meetup.', time: '5 hours ago', unread: true, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { id: 3, type: 'Payment', title: 'Payout Processing', message: 'Your payout of $1,656 is being processed.', time: '1 day ago', unread: false, icon: DollarSign, color: 'text-purple-600 bg-purple-50' },
    { id: 4, type: 'Alert', title: 'Insurance Expiring', message: 'Your public liability insurance expires in 14 days. Please upload a new certificate.', time: '2 days ago', unread: false, icon: AlertCircle, color: 'text-orange-600 bg-orange-50' },
  ];

  return (
    <div className="max-w-3xl space-y-4">
      {notifications.map((n) => (
        <div key={n.id} className={cn(
          "bg-white p-4 rounded-2xl border transition-all flex gap-4",
          n.unread ? "border-emerald-100 shadow-sm" : "border-neutral-100"
        )}>
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", n.color)}>
            <n.icon size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-neutral-900">{n.title}</h4>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{n.time}</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{n.message}</p>
          </div>
          {n.unread && <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />}
        </div>
      ))}
    </div>
  );
};

const SettingsView = () => {
  return (
    <div className="max-w-2xl space-y-8">
      <div className="bg-white p-8 rounded-[12px] shadow-sm border border-neutral-100 space-y-8">
        <div>
          <h3 className="font-bold text-neutral-900 mb-6">Account Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div>
                <p className="text-sm font-bold text-neutral-900">Email Notifications</p>
                <p className="text-xs text-neutral-500">Receive RFQ and booking alerts via email</p>
              </div>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div>
                <p className="text-sm font-bold text-neutral-900">SMS Alerts</p>
                <p className="text-xs text-neutral-500">Get instant text messages for urgent RFQs</p>
              </div>
              <div className="w-10 h-5 bg-neutral-200 rounded-full relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-neutral-900 mb-6">Security</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all">
              <span className="text-sm font-bold text-neutral-700">Change Password</span>
              <ChevronRight size={18} className="text-neutral-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all">
              <span className="text-sm font-bold text-neutral-700">Two-Factor Authentication</span>
              <span className="text-xs font-bold text-emerald-600">Enabled</span>
            </button>
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard ---

export default function PartnerDashboard() {
  const { logout } = useAuth();
  const [activeView, setActiveView] = useState<View>('home');
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rfqs', label: 'RFQ Inbox', icon: Inbox, badge: 7 },
    { id: 'bookings', label: 'Bookings', icon: Package },
    { id: 'services', label: 'My Services', icon: ShoppingBag },
    { id: 'finances', label: 'Finances', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderView = () => {
    if (selectedRFQ && activeView === 'rfqs') {
      return <RFQDetailView rfq={selectedRFQ} onBack={() => setSelectedRFQ(null)} />;
    }

    if (selectedBooking && activeView === 'bookings') {
      return <BookingDetailView booking={selectedBooking} onBack={() => setSelectedBooking(null)} />;
    }

    switch (activeView) {
      case 'home': return <HomeView onNavigate={setActiveView} />;
      case 'rfqs': return <RFQInboxView onSelectRFQ={setSelectedRFQ} />;
      case 'bookings': return <BookingsView onSelectBooking={setSelectedBooking} />;
      case 'services': return <ServicesView />;
      case 'finances': return <FinancesView />;
      case 'profile': return <ProfileView />;
      case 'notifications': return <NotificationsView />;
      case 'settings': return <SettingsView />;
      default: return <HomeView onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-100 flex flex-col py-6 bg-white shrink-0">
        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => (
            <FeatureStatusIndicator key={item.id} featureId={`partner-${item.id}`} className="px-4">
              <button
                onClick={() => {
                  setActiveView(item.id as View);
                  setSelectedRFQ(null);
                }}
                className={cn(
                  "w-full flex items-center justify-between py-3 rounded-xl text-sm font-bold transition-all",
                  activeView === item.id
                    ? "bg-emerald-50 text-emerald-600 px-4"
                    : "text-neutral-500 hover:text-neutral-900 px-4"
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
            </FeatureStatusIndicator>
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
        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-neutral-50/30">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView + (selectedRFQ ? '-detail' : '')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 capitalize">
                      {selectedRFQ ? 'RFQ Detail' : activeView.replace('-', ' ')}
                    </h2>
                    <p className="text-neutral-500 text-sm">
                      {selectedRFQ ? `Responding to ${selectedRFQ.id}` : `Welcome back, ${MOCK_DATA.partner.companyName}.`}
                    </p>
                  </div>
                  {activeView === 'rfqs' && !selectedRFQ && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-xl border border-orange-100">
                      <AlertCircle size={16} />
                      <span className="text-xs font-bold">7 Pending Requests</span>
                    </div>
                  )}
                </div>

                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
