import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '../lib/utils';

import { MOCK_EVENTS } from '../data/mockData';

export default function EventListing() {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Discover Events</h2>
        <p className="text-neutral-500 mt-2">Find the best tech, design, and business gatherings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group glass rounded-3xl overflow-hidden card-hover"
          >
            <div className="relative h-48">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-secondary">
                {event.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-neutral-500 text-sm line-clamp-2 mb-4">{event.description}</p>

              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Calendar size={16} className="text-brand-primary" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <MapPin size={16} className="text-brand-primary" />
                  {event.location}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <span className="text-lg font-bold text-brand-primary">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </span>
                <button className="flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors">
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
