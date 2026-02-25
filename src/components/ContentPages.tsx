import React from 'react';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Info, 
  MapPin, 
  Clock, 
  Layout, 
  Folder, 
  HelpCircle, 
  Image, 
  Home, 
  Globe, 
  Mic, 
  Trophy, 
  Settings,
  Plus,
  ArrowRight,
  Search,
  Gamepad2,
  FileText,
  User,
  Radio,
  BarChart2,
  PlayCircle,
  Video,
  Monitor
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface PageItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
}

const publishedPages: PageItem[] = [
  { id: 'agenda', title: 'Agenda', category: 'Agenda', icon: Calendar },
  { id: 'attendee-list', title: 'Attendee List', category: 'People', icon: Users },
  { id: 'book-meeting', title: 'Book Meeting', category: 'People', icon: Plus },
  { id: 'chats', title: 'Chats', category: 'Chats', icon: MessageSquare },
  { id: 'details', title: 'Details', category: 'Info', icon: Info },
  { id: 'directions', title: 'Directions', category: 'Info', icon: MapPin },
  { id: 'event-contacts', title: 'Event Contacts', category: 'People', icon: Users },
  { id: 'event-wall', title: 'Event Wall', category: 'Timeline', icon: Image },
  { id: 'exhibitors', title: 'Exhibitors', category: 'Sponsors', icon: Layout },
  { id: 'expo', title: 'Expo', category: 'Folder', icon: Folder },
  { id: 'expo-addon', title: 'Expo Add-on', category: 'Booths', icon: Trophy },
  { id: 'faqs', title: 'FAQs', category: 'FAQs', icon: HelpCircle },
  { id: 'floor-map', title: 'Floor Map', category: 'Gallery', icon: Globe },
  { id: 'gallery', title: 'Gallery', category: 'Gallery', icon: Image },
  { id: 'home', title: 'Home', category: 'HomeScreen', icon: Home },
  { id: 'interactive-map', title: 'Interactive map', category: 'Web Views', icon: MapPin },
  { id: 'network', title: 'Network', category: 'Folder', icon: Users },
  { id: 'speakers', title: 'Speakers', category: 'Speakers', icon: Mic },
  { id: 'sponsors', title: 'Sponsors', category: 'Sponsors', icon: Trophy },
  { id: 'timeline', title: 'Timeline', category: 'Timeline', icon: Clock },
  { id: 'venue-maps', title: 'Venue Maps', category: 'Venue Maps', icon: MapPin },
];

const hiddenPages: PageItem[] = [
  { id: 'booth-hunt', title: 'Booth Hunt', category: 'Engagement', icon: Trophy },
  { id: 'booths-1', title: 'Booths', category: 'Booths', icon: Layout },
  { id: 'booths-2', title: 'Booths', category: 'Booths', icon: Layout },
  { id: 'booths-3', title: 'Booths', category: 'Booths', icon: Layout },
  { id: 'engage', title: 'Engage', category: 'Engagement', icon: MessageSquare },
  { id: 'engagement', title: 'Engagement', category: 'Engagement', icon: BarChart2 },
  { id: 'explore', title: 'Explore', category: 'Folder', icon: Search },
  { id: 'feedback', title: 'Feedback', category: 'Engagement', icon: FileText },
  { id: 'folder', title: 'Folder', category: 'Folder', icon: Folder },
  { id: 'forum', title: 'Forum', category: 'Forum', icon: Users },
  { id: 'game-1', title: 'Game 1', category: 'Engagement', icon: Gamepad2 },
  { id: 'game-2', title: 'Game 2', category: 'Engagement', icon: Gamepad2 },
  { id: 'games-1', title: 'Games', category: 'Folder', icon: Folder },
  { id: 'games-2', title: 'Games', category: 'Folder', icon: Folder },
  { id: 'info', title: 'Info-', category: 'Info', icon: Info },
  { id: 'leaderboard', title: 'Leaderboard', category: 'Leaderboard', icon: BarChart2 },
  { id: 'my-profile', title: 'My Profile', category: 'Profile', icon: User },
  { id: 'people', title: 'People', category: 'People', icon: Users },
  { id: 'podcasts', title: 'Podcasts', category: 'Gallery', icon: Radio },
  { id: 'polls', title: 'Polls', category: 'Engagement', icon: BarChart2 },
  { id: 'quiz', title: 'Quiz', category: 'Engagement', icon: HelpCircle },
  { id: 'scavenger-hunt', title: 'Scavenger Hunt', category: 'Engagement', icon: Search },
  { id: 'speakers-delete', title: 'Speakers-Delete', category: 'People', icon: Mic },
  { id: 'venue-maps-hidden', title: 'Venue Maps', category: 'Venue Maps', icon: MapPin },
  { id: 'videos', title: 'Videos', category: 'Gallery', icon: PlayCircle },
  { id: 'virtual-network', title: 'Virtual Network', category: 'Networking', icon: Monitor },
  { id: 'web-views', title: 'Web Views', category: 'Web Views', icon: Globe },
];

export default function ContentPages() {
  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50/30 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Content Pages</h2>
          <button className="bg-neutral-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-neutral-800 transition-all">
            Create a page
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <Info size={14} />
            </div>
            <p className="text-sm text-blue-700">
              You can add and remove pages to the event app from the <span className="font-bold">Event app &gt; App Layout page.</span>
            </p>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
            Go To App Layout
          </button>
        </div>

        {/* Published Pages Section */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-neutral-800 mb-6">Published Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {publishedPages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>
        </div>

        {/* Hidden Pages Section */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-neutral-400 mb-6">Hidden Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {hiddenPages.map((page) => (
              <PageCard key={page.id} page={page} isHidden />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageCard({ page, isHidden = false }: { page: PageItem; isHidden?: boolean; key?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white border border-neutral-100 rounded-xl p-4 shadow-sm flex flex-col justify-between group relative",
        isHidden && "opacity-80"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
          isHidden ? "bg-neutral-50 text-neutral-400" : "bg-neutral-50 text-neutral-600"
        )}>
          <page.icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate mb-0.5">{page.title}</h4>
          <p className="text-[11px] text-neutral-400 font-medium">{page.category}</p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-all">
          <Settings size={16} />
        </button>
      </div>
    </motion.div>
  );
}
