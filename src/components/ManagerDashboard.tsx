import React, { useState, useEffect } from 'react';
import {
  Globe,
  Ticket,
  Megaphone,
  Smartphone,
  ScanLine,
  Users,
  FileText,
  Bell,
  BarChart3,
  Settings,
  Plus,
  MoreVertical,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  CreditCard,
  ArrowRight,
  Activity,
  PieChart,
  Mail,
  Layout,
  Shield,
  Monitor,
  Gamepad,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

import WebsiteBuilder from './WebsiteBuilder';
import ContentPages from './ContentPages';

const sidebarItems = [
  { id: 'home', label: 'Home', icon: Globe },
  { id: 'website', label: 'Website', icon: Globe },
  {
    id: 'registration',
    label: 'Registration',
    icon: Ticket,
    subItems: [
      { id: 'reg-dashboard', label: 'Dashboard', type: 'item' },
      { id: 'reg-form', label: 'Registration Form', type: 'item' },
      { id: 'reg-preview', label: 'Preview & Embed', type: 'item' },
      { id: 'mailers-header', label: 'Mailers', type: 'header' },
      { id: 'reg-confirmed', label: 'Confirmed Registrations', type: 'item' },
      { id: 'reg-waitlisted', label: 'Waitlisted Registrations', type: 'item' },
      { id: 'ticketing-header', label: 'Ticketing', type: 'header' },
      { id: 'reg-tickets', label: 'Manage Tickets', type: 'item' },
      { id: 'reg-addons', label: 'Add-ons', type: 'item' },
      { id: 'reg-discounts', label: 'Discounts', type: 'item' },
      { id: 'reg-access', label: 'Access Codes', type: 'item' },
      { id: 'reg-payment', label: 'Payment Gateway', type: 'item' },
      { id: 'purchases-header', label: 'Purchases', type: 'header' },
      { id: 'reg-purch-tickets', label: 'Tickets', type: 'item' },
      { id: 'reg-orders', label: 'Orders', type: 'item' },
      { id: 'reg-settings', label: 'Settings', type: 'item', separator: true },
    ]
  },
  {
    id: 'promotions',
    label: 'Promotions',
    icon: Megaphone,
    subItems: [
      { id: 'prom-dashboard', label: 'Dashboard', type: 'item' },
      { id: 'mailers-header', label: 'Mailers', type: 'header', separator: true },
      { id: 'contacts-header', label: 'Contacts', type: 'header' },
      { id: 'prom-contacts', label: 'Contacts', type: 'item' },
      { id: 'prom-tags', label: 'Contact Tags', type: 'item' },
      { id: 'prom-unsub', label: 'Unsubscribers', type: 'item' },
      { id: 'prom-settings', label: 'Settings', type: 'item', separator: true },
    ]
  },
  {
    id: 'event-app',
    label: 'Event App',
    icon: Smartphone,
    subItems: [
      { id: 'app-dashboard', label: 'Dashboard', type: 'item', separator: true },
      { id: 'design-header', label: 'Design', type: 'header' },
      { id: 'app-branding', label: 'App Branding', type: 'item' },
      { id: 'app-layout', label: 'App Layout', type: 'item', separator: true },
      { id: 'manage-header', label: 'Manage', type: 'header' },
      { id: 'app-profile', label: 'Attendee Profile', type: 'item' },
      { id: 'app-meetings', label: 'Meetings', type: 'item' },
      { id: 'app-gamification', label: 'Gamification', type: 'item', separator: true },
      { id: 'app-settings', label: 'Settings', type: 'item' },
    ]
  },
  {
    id: 'check-in',
    label: 'Check-in',
    icon: ScanLine,
    subItems: [
      { id: 'check-dash', label: 'Check-in Dashboard', type: 'item' },
      { id: 'check-onsite', label: 'On-site Check-in', type: 'item' },
      { id: 'check-badges', label: 'Badge Printing', type: 'item' },
      { id: 'check-kiosk', label: 'Kiosk Mode', type: 'item' },
    ]
  },
  {
    id: 'people',
    label: 'People',
    icon: Users,
    separator: true,
    subItems: [
      { id: 'people-users-header', label: 'USERS', type: 'header' },
      { id: 'people-home', label: 'Home', type: 'item' },
      { id: 'people-locked', label: 'Locked/Blocked Users', type: 'item', separator: true },
      { id: 'people-groups-header', label: 'GROUPS', type: 'header', separator: true, hasChevron: true },
      { id: 'people-settings-header', label: 'SETTINGS', type: 'header' },
      { id: 'people-manage-groups', label: 'Manage Groups', type: 'item', separator: true },
      { id: 'people-reporting-header', label: 'REPORTING', type: 'header' },
      { id: 'people-manage-reports', label: 'Manage Reports', type: 'item' },
    ]
  },
  {
    id: 'content',
    label: 'Content',
    icon: FileText,
    subItems: [
      { id: 'cont-all', label: 'All Content', type: 'item' },
    ]
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    navTitle: 'Push Notifications',
    subItems: [
      { id: 'notif-sent', label: 'Sent', type: 'item' },
      { id: 'notif-drafts', label: 'Drafts', type: 'item' },
      { id: 'notif-scheduled', label: 'Scheduled', type: 'item', separator: true },
      { id: 'notif-import-header', label: 'IMPORT', type: 'header' },
      { id: 'notif-import', label: 'Import', type: 'item' },
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    navTitle: 'Analytics',
    subItems: [
      { id: 'ana-reg', label: 'Registrations', type: 'item' },
      { id: 'ana-app', label: 'Event App', type: 'item' },
      { id: 'ana-session', label: 'Session', type: 'item' },
      { id: 'ana-booths', label: 'Booths', type: 'item' },
      { id: 'ana-onsite', label: 'Onsite Check-In', type: 'item' },
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    subItems: [
      { id: 'set-collab', label: 'Collaborators', type: 'item' },
      { id: 'set-code', label: 'Event Code', type: 'item' },
      { id: 'set-lang', label: 'Languages', type: 'item' },
      { id: 'set-vis', label: 'Visibility', type: 'item' },
      { id: 'set-white', label: 'White Labeling', type: 'item', separator: true },
      { id: 'set-int-header', label: 'Integrations', type: 'header', hasChevron: true, separator: true },
      { id: 'set-package', label: 'Current Package', type: 'item' },
      { id: 'set-dup', label: 'Duplicate Event', type: 'item' },
      { id: 'set-trans', label: 'Transfer Event', type: 'item' },
    ]
  },
];

export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('registration');
  const [activeSubTab, setActiveSubTab] = useState('reg-dashboard');

  useEffect(() => {
    const activeItem = sidebarItems.find(item => item.id === activeTab);
    if (activeItem?.subItems) {
      const firstItem = activeItem.subItems.find(si => si.type === 'item');
      if (firstItem) setActiveSubTab(firstItem.id);
    }
  }, [activeTab]);

  const getSubTabLabel = () => {
    const activeItem = sidebarItems.find(item => item.id === activeTab);
    const subItem = activeItem?.subItems?.find(si => si.id === activeSubTab);
    return subItem?.label || activeTab.replace('-', ' ');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'website': return <WebsiteBuilder />;
      case 'content': return <ContentPages />;
      case 'registration': return renderRegistrationContent();
      case 'promotions': return renderPromotionsContent();
      case 'event-app': return renderAppContent();
      case 'check-in': return renderCheckInContent();
      case 'people': return renderPeopleContent();
      case 'notifications': return renderNotificationsContent();
      case 'analytics': return renderAnalyticsContent();
      case 'settings': return renderSettingsContent();
      default: return renderDefaultContent();
    }
  };

  const renderDefaultContent = () => (
    <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold capitalize">{getSubTabLabel()}</h2>
            <p className="text-neutral-500 text-sm">Manage your event {activeTab} and assets.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-all">
              <Download size={16} /> Export
            </button>
            <button className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-secondary transition-all">
              <Plus size={16} /> Create New
            </button>
          </div>
        </div>

        {/* Stats Grid with "Charte" feel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Activity', value: '2,482', trend: '+15%', color: 'blue', data: [40, 70, 45, 90, 65, 80] },
            { label: 'Engagement', value: '84%', trend: '+5%', color: 'green', data: [30, 40, 60, 50, 70, 90] },
            { label: 'Completion', value: '92%', trend: 'Stable', color: 'purple', data: [80, 85, 82, 88, 90, 92] },
            { label: 'Pending Tasks', value: '12', trend: '-2', color: 'orange', data: [20, 15, 18, 12, 10, 12] },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-3xl flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full",
                  stat.color === 'green' ? "bg-green-100 text-green-700" :
                    stat.color === 'blue' ? "bg-blue-100 text-blue-700" :
                      "bg-neutral-100 text-neutral-600"
                )}>
                  {stat.trend}
                </span>
              </div>

              {/* Simple Sparkline Chart */}
              <div className="mt-auto h-10 flex items-end gap-1">
                {stat.data.map((val, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex-1 rounded-t-sm transition-all duration-500",
                      stat.color === 'blue' ? "bg-blue-400" :
                        stat.color === 'green' ? "bg-green-400" :
                          stat.color === 'purple' ? "bg-purple-400" :
                            "bg-orange-400"
                    )}
                    style={{ height: `${val}%` }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unified Content Table */}
        <div className="glass rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input
                  type="text"
                  placeholder={`Search ${getSubTabLabel()}...`}
                  className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>
              <button className="p-2 bg-neutral-100 rounded-xl text-neutral-500 hover:bg-neutral-200 transition-colors">
                <Filter size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Showing 1-10 of 124 items</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50/50 text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name / Title</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Last Activity</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  { name: 'Global Tech Summit 2026', type: 'Primary', status: 'Active', date: 'Just now' },
                  { name: 'VIP Registration Form', type: 'Form', status: 'Published', date: '1 hour ago' },
                  { name: 'Speaker Onboarding', type: 'Process', status: 'In Progress', date: '3 hours ago' },
                  { name: 'Sponsorship Deck v2', type: 'Asset', status: 'Draft', date: 'Yesterday' },
                  { name: 'Mobile App Launch', type: 'Release', status: 'Scheduled', date: '2 days ago' },
                  { name: 'Exhibitor Booth Layout', type: 'Map', status: 'Published', date: '3 days ago' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                          <FileText size={16} />
                        </div>
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{item.type}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider",
                        item.status === 'Active' || item.status === 'Published' ? "bg-green-100 text-green-700" :
                          item.status === 'Draft' ? "bg-neutral-100 text-neutral-600" :
                            "bg-blue-100 text-blue-700"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{item.date}</td>
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

          <div className="p-4 bg-neutral-50/50 border-t border-neutral-100 flex justify-center">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(p => (
                <button
                  key={p}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                    p === 1 ? "bg-brand-primary text-white" : "text-neutral-500 hover:bg-neutral-200"
                  )}
                >
                  {p}
                </button>
              ))}
              <button className="w-8 h-8 rounded-lg text-neutral-500 hover:bg-neutral-200 flex items-center justify-center">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  const renderRegistrationContent = () => {
    return (
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Sub-view: Dashboard */}
          {activeSubTab === 'reg-dashboard' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold">Registration Dashboard</h2>
                  <p className="text-neutral-500 text-sm">Real-time overview of your event registrations.</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-all">
                    <Download size={16} /> Export Data
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Registrations', value: '1,284', trend: '+12%', color: 'blue' },
                  { label: 'Revenue', value: '$42,500', trend: '+8%', color: 'green' },
                  { label: 'Conversion Rate', value: '64%', trend: '+2%', color: 'purple' },
                  { label: 'Check-in Ready', value: '842', trend: '75%', color: 'orange' },
                ].map((stat, i) => (
                  <div key={i} className="glass p-6 rounded-3xl">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <div className="flex justify-between items-end">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full",
                        stat.color === 'green' ? "bg-green-100 text-green-700" :
                          stat.color === 'blue' ? "bg-blue-100 text-blue-700" :
                            "bg-neutral-100 text-neutral-600"
                      )}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[2rem] border-white/60 shadow-sm">
                  <h3 className="font-bold mb-6">Registration Trend</h3>
                  <div className="h-48 flex items-end gap-2">
                    {[40, 60, 45, 90, 65, 80, 70, 85, 95, 100].map((val, i) => (
                      <div key={i} className="flex-1 bg-brand-primary/20 rounded-t-lg relative group">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${val}%` }}
                          className="absolute bottom-0 left-0 right-0 bg-brand-primary rounded-t-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass p-8 rounded-[2rem] border-white/60 shadow-sm">
                  <h3 className="font-bold mb-6">Ticket Distribution</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Early Bird', count: 450, color: 'bg-blue-500' },
                      { label: 'Standard', count: 620, color: 'bg-brand-primary' },
                      { label: 'VIP Pass', count: 180, color: 'bg-purple-500' },
                    ].map((t, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span>{t.label}</span>
                          <span>{t.count}</span>
                        </div>
                        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", t.color)} style={{ width: `${(t.count / 1284 * 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-view: Registration Form */}
          {activeSubTab === 'reg-form' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Form Builder</h2>
                  <p className="text-neutral-500 text-sm">Customize fields for event sign-up.</p>
                </div>
                <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                  <Plus size={18} /> Add Field
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-10 rounded-[2.5rem] bg-white border-white/80 shadow-3xl">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <Layout size={20} className="text-brand-primary" /> Preview
                  </h3>
                  <div className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-neutral-400 uppercase tracking-widest pl-1">Full Name *</label>
                      <input type="text" placeholder="e.g. Alex Benali" className="w-full bg-neutral-50 border border-neutral-100 px-6 py-4 rounded-2xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-neutral-400 uppercase tracking-widest pl-1">Email Address *</label>
                      <input type="email" placeholder="alex@company.com" className="w-full bg-neutral-50 border border-neutral-100 px-6 py-4 rounded-2xl outline-none" />
                    </div>
                    <button className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] mt-4 shadow-2xl">Complete</button>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="glass p-6 rounded-[2rem]">
                    <h4 className="font-bold mb-4 text-sm">Core Fields</h4>
                    <div className="space-y-3">
                      {['Personal Info', 'Work Info', 'Social Profiles'].map(f => (
                        <div key={f} className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-100">
                          <span className="text-sm font-medium">{f}</span>
                          <Settings size={14} className="text-neutral-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-view: Confirmed Registrations */}
          {activeSubTab === 'reg-confirmed' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Confirmed Attendees</h2>
                  <p className="text-neutral-500 text-sm">Manage all validated participants.</p>
                </div>
                <button className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2">
                  <Plus size={18} /> Add Manually
                </button>
              </div>

              <div className="glass rounded-[2rem] overflow-hidden border-white/60">
                <div className="p-6 border-b border-neutral-100 bg-white/50 flex justify-between items-center">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                    <input type="text" placeholder="Search attendees..." className="w-full pl-12 pr-6 py-3 bg-white border border-neutral-100 rounded-2xl text-sm" />
                  </div>
                  <div className="flex gap-3">
                    <button className="glass px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-bold text-neutral-600 border-white"><Download size={16} /> Export</button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-50/50 text-[10px] uppercase font-black tracking-widest text-neutral-400">
                      <tr>
                        <th className="px-8 py-5">Attendee</th>
                        <th className="px-8 py-5">Ticket Type</th>
                        <th className="px-8 py-5">Payment Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {[
                        { name: 'Alex Benali', email: 'alex@startup.dz', ticket: 'VIP Pass', status: 'Paid' },
                        { name: 'Sarah Moussaoui', email: 's.moussa@tech.com', ticket: 'Early Bird', status: 'Paid' },
                        { name: 'Karim Ziane', email: 'karim@venture.ly', ticket: 'Standard', status: 'Complementary' },
                      ].map((reg, i) => (
                        <tr key={i} className="hover:bg-neutral-50/30 transition-all group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary">{reg.name.charAt(0)}</div>
                              <div>
                                <div className="font-bold text-neutral-900 text-sm">{reg.name}</div>
                                <div className="text-[11px] text-neutral-400 font-medium">{reg.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-lg">{reg.ticket}</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest",
                              reg.status === 'Paid' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            )}>{reg.status}</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="p-2 text-neutral-400 hover:text-brand-primary"><MoreVertical size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for other registration sub-tabs */}
          {['reg-dashboard', 'reg-form', 'reg-confirmed'].indexOf(activeSubTab) === -1 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-300">
                <Ticket size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-800">{getSubTabLabel()}</h3>
                <p className="text-neutral-500 max-w-sm mx-auto mt-2">This module is currently being initialized as part of our premium registration suite.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  };

  const renderPromotionsContent = () => {
    return (
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          {activeSubTab === 'prom-dashboard' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold">Marketing Dashboard</h2>
                  <p className="text-neutral-500 text-sm">Monitor campaign performance and reach.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Emails Sent', value: '8,420', trend: '+24%', color: 'blue' },
                  { label: 'Open Rate', value: '38.2%', trend: '+4.1%', color: 'green' },
                  { label: 'Click Rate', value: '12.4%', trend: '-1.2%', color: 'orange' },
                ].map((stat, i) => (
                  <div key={i} className="glass p-8 rounded-3xl">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <div className="flex justify-between items-end">
                      <h3 className="text-3xl font-bold">{stat.value}</h3>
                      <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        stat.color === 'green' ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-600"
                      )}>{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass p-10 rounded-[2.5rem] border-white/60">
                <h3 className="font-bold mb-8">Recent Campaigns</h3>
                <div className="space-y-6">
                  {[
                    { title: 'Early Bird Reminder', date: '2 days ago', sent: 1200, opens: '42%' },
                    { title: 'Speaker Announcement', date: '5 days ago', sent: 3400, opens: '35%' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white/50 rounded-2xl border border-neutral-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white"><Mail size={20} /></div>
                        <div>
                          <h4 className="font-bold text-neutral-900">{c.title}</h4>
                          <p className="text-xs text-neutral-400">{c.date} • {c.sent} Recipients</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-brand-primary">{c.opens} Open Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'prom-contacts' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Audience & Contacts</h2>
                  <p className="text-neutral-500 text-sm">Unified database of all prospective attendees.</p>
                </div>
                <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                  <Plus size={18} /> Import Contacts
                </button>
              </div>

              <div className="glass rounded-[2rem] overflow-hidden">
                <div className="p-12 text-center text-neutral-400">
                  <Users size={48} className="mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-bold text-neutral-600">Contact Database Initializing</h3>
                  <p className="text-xs mt-1">Ready to import and segment your audience.</p>
                </div>
              </div>
            </div>
          )}

          {['prom-dashboard', 'prom-contacts'].indexOf(activeSubTab) === -1 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <Megaphone size={48} className="text-neutral-200" />
              <h3 className="text-xl font-bold">{getSubTabLabel()}</h3>
              <p className="text-neutral-500">Promotions configuration for {activeSubTab} coming soon.</p>
            </div>
          )}
        </div>
      </main>
    );
  };

  const renderAppContent = () => {
    return (
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          {activeSubTab === 'app-dashboard' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">App Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Downloads', value: '2,150' },
                  { label: 'Active Users', value: '1,840' },
                  { label: 'Avg. Session', value: '12m 45s' },
                ].map((stat, i) => (
                  <div key={i} className="glass p-8 rounded-3xl">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'app-branding' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">App Branding</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[2rem]">
                  <h3 className="font-bold mb-6">Visual Identity</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100">
                      <span className="text-sm font-medium">Primary Theme Color</span>
                      <div className="w-8 h-8 bg-brand-primary rounded-lg shadow-sm" />
                    </div>
                  </div>
                </div>
                <div className="glass p-8 rounded-[2rem] flex flex-col items-center justify-center">
                  <div className="w-48 h-[360px] bg-neutral-900 rounded-[2.5rem] border-4 border-neutral-800 relative flex items-center justify-center">
                    <div className="text-white opacity-20 font-black text-xl tracking-tighter italic uppercase">EventApp</div>
                  </div>
                  <p className="text-xs font-bold text-neutral-400 mt-6">Digital Prototype View</p>
                </div>
              </div>
            </div>
          )}

          {['app-dashboard', 'app-branding'].indexOf(activeSubTab) === -1 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <Smartphone size={48} className="text-neutral-200" />
              <h3 className="text-xl font-bold">{getSubTabLabel()}</h3>
              <p className="text-neutral-500">Configure your mobile event experience.</p>
            </div>
          )}
        </div>
      </main>
    );
  };

  const renderCheckInContent = () => {
    return (
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          {activeSubTab === 'check-dash' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Check-in Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Checked In', value: '742', total: '1,284', color: 'green' },
                  { label: 'Not Checked In', value: '542', total: '1,284', color: 'orange' },
                  { label: 'Check-in Velocity', value: '45/hr', color: 'blue' },
                ].map((stat, i) => (
                  <div key={i} className="glass p-8 rounded-3xl">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    {stat.total && (
                      <div className="mt-4 w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          stat.color === 'green' ? "bg-green-500" : "bg-orange-500"
                        )} style={{ width: `${(parseInt(stat.value.replace(',', '')) / parseInt(stat.total.replace(',', '')) * 100)}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'check-onsite' && (
            <div className="max-w-2xl mx-auto py-12">
              <div className="glass p-12 rounded-[3rem] text-center border-brand-primary/20">
                <div className="w-32 h-32 bg-neutral-900 rounded-[2rem] mx-auto mb-8 flex items-center justify-center text-brand-primary shadow-2xl relative">
                  <ScanLine size={64} />
                  <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-brand-primary/50 blur-sm" />
                </div>
                <h3 className="text-2xl font-bold mb-4">On-site QR Scanner</h3>
                <p className="text-neutral-500 mb-10">Point the camera at the attendee's digital ticket or badge to validate entrance.</p>
                <button className="bg-brand-primary text-white w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-xl">Initialize Camera</button>
              </div>
            </div>
          )}

          {['check-dash', 'check-onsite'].indexOf(activeSubTab) === -1 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <ScanLine size={48} className="text-neutral-200" />
              <h3 className="text-xl font-bold">{getSubTabLabel()}</h3>
              <p className="text-neutral-500">Check-in module for {activeSubTab} coming soon.</p>
            </div>
          )}
        </div>
      </main>
    );
  };

  const renderPeopleContent = () => {
    return (
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          {activeSubTab === 'people-home' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <p className="text-neutral-500 text-sm">Review and manage all system users and roles.</p>
                </div>
              </div>

              <div className="glass rounded-[2rem] overflow-hidden">
                <div className="p-8 text-center text-neutral-400">
                  <Users size={48} className="mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-bold text-neutral-600">User Directory</h3>
                  <p className="text-xs mt-1">Populating system users and administrative roles.</p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab !== 'people-home' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <Users size={48} className="text-neutral-200" />
              <h3 className="text-xl font-bold">{getSubTabLabel()}</h3>
              <p className="text-neutral-500">People management configuration for {activeSubTab} coming soon.</p>
            </div>
          )}
        </div>
      </main>
    );
  };

  const renderNotificationsContent = () => {
    return (
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Notifications</h2>
              <p className="text-neutral-500 text-sm">Manage push notifications and automated alerts.</p>
            </div>
          </div>
          <div className="glass p-12 rounded-[3rem] text-center">
            <Bell size={48} className="mx-auto mb-4 text-neutral-200" />
            <h3 className="text-xl font-bold text-neutral-800">Communication Center</h3>
            <p className="text-neutral-500 mt-2">Create and schedule announcements for your attendees.</p>
          </div>
        </div>
      </main>
    );
  };

  const renderAnalyticsContent = () => {
    return (
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Event Insights</h2>
              <p className="text-neutral-500 text-sm">Deep dive into event data and performance.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-[2rem]">
              <h3 className="font-bold mb-4">Traffic Sources</h3>
              <div className="aspect-square bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 flex items-center justify-center text-neutral-300">
                Analytics Visualization
              </div>
            </div>
            <div className="glass p-8 rounded-[2rem]">
              <h3 className="font-bold mb-4">User Engagement</h3>
              <div className="aspect-square bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 flex items-center justify-center text-neutral-300">
                Engagement heatmaps
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };

  const renderSettingsContent = () => {
    return (
      <main className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Event Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4">
              {['General', 'Regional', 'Language', 'Advanced'].map(cat => (
                <div key={cat} className="p-4 rounded-2xl font-bold text-sm bg-white border border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-all">
                  {cat}
                </div>
              ))}
            </div>
            <div className="md:col-span-2 glass p-10 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-6">General Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                  <div>
                    <div className="font-bold text-sm">Public Visibility</div>
                    <div className="text-xs text-neutral-500">Enable searching on public directories.</div>
                  </div>
                  <div className="w-10 h-6 bg-brand-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };


  const activeSidebarItem = sidebarItems.find(item => item.id === activeTab);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* Primary Sidebar */}
      <aside className="w-64 border-r border-neutral-100 flex flex-col py-4 overflow-y-auto bg-white shrink-0">
        {sidebarItems.map((item) => (
          <React.Fragment key={item.id}>
            {item.separator && <div className="my-4 border-t border-neutral-100 mx-4" />}
            <button
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all relative",
                activeTab === item.id
                  ? "text-brand-primary bg-brand-primary/5 border-r-2 border-brand-primary"
                  : "text-neutral-500 hover:bg-neutral-50"
              )}
            >
              <item.icon size={18} className={activeTab === item.id ? "text-brand-primary" : "text-neutral-400"} />
              {item.label}
            </button>
          </React.Fragment>
        ))}

      </aside>

      {/* Secondary Sidebar (Sub-navigation) */}
      {activeSidebarItem?.subItems && (
        <aside className="w-60 border-r border-neutral-100 flex flex-col py-6 overflow-y-auto bg-neutral-50/30 shrink-0">
          <div className="px-6 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <ChevronLeft size={18} className="text-neutral-400 cursor-pointer hover:text-neutral-600" />
              <h3 className="text-lg font-bold text-neutral-800">{activeSidebarItem.navTitle || activeSidebarItem.label}</h3>
            </div>
            <div className="h-0.5 w-12 bg-neutral-200 mt-2"></div>
          </div>

          <div className="flex flex-col">
            {activeSidebarItem.subItems.map((subItem) => (
              <React.Fragment key={subItem.id}>
                {subItem.type === 'header' ? (
                  <div className="px-6 py-3 mt-4 flex items-center justify-between group cursor-pointer">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{subItem.label}</h4>
                    {subItem.hasChevron && <ChevronRight size={14} className="text-neutral-300 group-hover:text-neutral-500 transition-colors" />}
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveSubTab(subItem.id)}
                    className={cn(
                      "px-6 py-2.5 text-sm font-medium transition-all text-left",
                      activeSubTab === subItem.id
                        ? "text-brand-primary bg-white shadow-sm"
                        : "text-neutral-600 hover:text-neutral-900"
                    )}
                  >
                    {subItem.label}
                  </button>
                )}
                {subItem.separator && <div className="my-4 border-t border-neutral-100 mx-6" />}
              </React.Fragment>
            ))}
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      {renderContent()}
    </div>
  );
}
