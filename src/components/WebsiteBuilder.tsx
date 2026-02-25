import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  ChevronDown, 
  GripVertical, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Eye, 
  Save,
  MousePointer2,
  Type,
  Image as ImageIcon,
  Square,
  Layers,
  Search,
  Maximize2,
  ChevronLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const sections = [
  { id: 'hero', name: 'Hero Three - With C...' },
  { id: 'sessions', name: 'Event Sessions' },
  { id: 'speakers', name: 'Event Speakers - Ca...' },
  { id: 'sponsors', name: 'Event Sponsors' },
  { id: 'location', name: 'Location Map' },
  { id: 'cta', name: 'CTA - Full Width Ban...' },
];

export default function WebsiteBuilder() {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="flex-1 flex h-full bg-[#F8F9FA] overflow-hidden">
      {/* Left Sidebar: Pages & Sections */}
      <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col">
        <div className="p-4 border-b border-neutral-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Pages</h3>
            <button className="text-[10px] bg-neutral-100 hover:bg-neutral-200 px-2 py-1 rounded-md font-bold transition-colors">
              + Add New Page
            </button>
          </div>
          <div className="bg-white border border-brand-primary rounded-lg p-3 flex justify-between items-center shadow-sm">
            <span className="text-sm font-medium">Home</span>
            <Settings size={14} className="text-neutral-400" />
          </div>
          <button className="w-full text-center text-[10px] text-neutral-400 mt-3 flex items-center justify-center gap-1">
            <ChevronDown size={12} /> Show All Pages (1)
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Sections</h3>
            <div className="flex gap-1">
              <button className="text-[10px] bg-neutral-100 hover:bg-neutral-200 px-2 py-1 rounded-md font-bold transition-colors">+ Add Section</button>
              <button className="p-1 bg-neutral-100 rounded-md"><Maximize2 size={12} /></button>
            </div>
          </div>
          
          <div className="space-y-2">
            {sections.map((section) => (
              <div 
                key={section.id}
                className="group flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                <ChevronLeft size={14} className="text-neutral-300" />
                <Layers size={14} className="text-neutral-400" />
                <span className="text-xs text-neutral-600 truncate flex-1">{section.name}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Builder Toolbar */}
        <header className="h-12 bg-white border-b border-neutral-200 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-4">
            <div className="flex bg-neutral-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('desktop')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'desktop' ? "bg-white shadow-sm text-brand-primary" : "text-neutral-400")}
              >
                <Monitor size={16} />
              </button>
              <button 
                onClick={() => setViewMode('tablet')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'tablet' ? "bg-white shadow-sm text-brand-primary" : "text-neutral-400")}
              >
                <Tablet size={16} />
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'mobile' ? "bg-white shadow-sm text-brand-primary" : "text-neutral-400")}
              >
                <Smartphone size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-xs font-bold text-neutral-500 flex items-center gap-1 px-3 py-1.5 hover:bg-neutral-100 rounded-lg transition-all">
              <Eye size={14} /> Preview
            </button>
            <button className="text-xs font-bold bg-brand-primary text-white flex items-center gap-1 px-4 py-1.5 rounded-lg hover:bg-brand-secondary transition-all shadow-sm">
              <Save size={14} /> Publish
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-12 flex justify-center bg-[#E9ECEF] relative">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <motion.div 
            layout
            className={cn(
              "bg-white shadow-2xl transition-all duration-500 relative overflow-hidden",
              viewMode === 'desktop' ? "w-full max-w-5xl aspect-video" : 
              viewMode === 'tablet' ? "w-[768px] h-[1024px]" : 
              "w-[375px] h-[667px]"
            )}
          >
            {/* Website Preview Content */}
            <div className="absolute inset-0 bg-[#0088FF] flex flex-col items-center justify-center text-white p-12 text-center">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-6xl font-black mb-4 tracking-tighter"
              >
                ARIIS<span className="text-white/50">//</span> 2025
              </motion.h1>
              <h2 className="text-3xl font-bold mb-6">Tech Conference</h2>
              <p className="max-w-2xl text-lg text-white/80 leading-relaxed mb-10">
                With tens of thousands of entrepreneurs and investors, the Tech-Conference Live event is the largest conference for startups. Learn how to pitch VCs, find engineers and co-founders and launch products.
              </p>
              <button className="bg-[#FF3366] text-white px-10 py-4 rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-transform">
                Register
              </button>
            </div>

            {/* Selection Overlay (Simulated) */}
            <div className="absolute inset-0 pointer-events-none border-4 border-transparent hover:border-brand-primary/30 transition-colors"></div>
          </motion.div>

          {/* Zoom Indicator */}
          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-neutral-200 text-[10px] font-bold text-neutral-500 flex items-center gap-2">
            <Search size={12} /> 100%
          </div>
        </div>
      </main>

      {/* Right Sidebar: Properties */}
      <aside className="w-72 border-l border-neutral-200 bg-white flex flex-col">
        <div className="bg-brand-primary text-white px-4 py-2 text-[10px] font-bold flex items-center gap-2">
          <Monitor size={12} /> Configuring styles for Desktop
        </div>
        
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-brand-primary/10 rounded-md text-brand-primary">
              <Layers size={14} />
            </div>
            <h3 className="text-sm font-bold">Properties</h3>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
            <MousePointer2 size={32} className="text-neutral-200" />
          </div>
          <h4 className="text-sm font-bold mb-2">No Element Selected</h4>
          <p className="text-xs text-neutral-400">
            Click on any element to customize its properties and styling
          </p>
        </div>

        {/* Floating Help Icon */}
        <div className="p-4 flex justify-end">
          <div className="w-10 h-10 bg-[#2D1B69] rounded-2xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <div className="w-5 h-4 bg-white rounded-sm relative">
              <div className="absolute -bottom-1 right-1 w-2 h-2 bg-white rotate-45"></div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
