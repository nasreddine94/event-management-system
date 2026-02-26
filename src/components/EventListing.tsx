import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import { Calendar, MapPin, ArrowRight, X, CreditCard, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDate } from '../lib/utils';
import { MOCK_EVENTS } from '../data/mockData';

export default function EventListing() {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenModal = (event: Event) => {
    setSelectedEvent(event);
    setFormData({ name: '', email: '' });
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for registration/payment
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative">
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
            onClick={() => handleOpenModal(event)}
            className="group glass rounded-3xl overflow-hidden card-hover cursor-pointer"
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
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-primary transition-colors">{event.title}</h3>
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
                <button className="flex items-center gap-2 text-sm font-semibold text-brand-secondary group-hover:text-brand-primary transition-colors">
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
              >
                <X size={20} className="text-neutral-500" />
              </button>

              <div className="relative h-64 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6 rounded-t-3xl overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                    {selectedEvent.category}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {formatDate(selectedEvent.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {selectedEvent.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold mb-2">About this event</h4>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {selectedEvent.description}
                      <br /><br />
                      This is an amazing opportunity to connect with industry leaders and like-minded professionals. Registration is required to secure your spot.
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="bg-white/50 border border-white/20 p-6 rounded-2xl shadow-sm">
                    <div className="flex flex-col gap-1 mb-6 pb-6 border-b border-neutral-200">
                      <span className="text-sm font-medium text-neutral-500">Ticket Price</span>
                      <span className="text-3xl font-bold text-brand-secondary">
                        {selectedEvent.price === 0 ? 'Free Entry' : `$${selectedEvent.price}`}
                      </span>
                    </div>

                    {isSuccess ? (
                      <div className="text-center py-6 text-green-600 animate-fade-in">
                        <CheckCircle size={48} className="mx-auto mb-4" />
                        <h4 className="text-lg font-bold mb-2">Registration Complete!</h4>
                        <p className="text-sm text-green-600/80">Check your email for tickets.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">Full Name</label>
                          <input
                            required
                            type="text"
                            className="w-full px-4 py-2 bg-white/80 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address</label>
                          <input
                            required
                            type="email"
                            className="w-full px-4 py-2 bg-white/80 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none transition-all text-sm"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-3 px-4 rounded-xl text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${selectedEvent.price === 0
                              ? 'bg-brand-primary hover:bg-brand-primary/90 shadow-brand-primary/30'
                              : 'bg-brand-secondary hover:bg-brand-secondary/90 shadow-brand-secondary/30'
                            }`}
                        >
                          {isSubmitting ? (
                            <span className="animate-pulse">Processing...</span>
                          ) : selectedEvent.price === 0 ? (
                            'Register for Free'
                          ) : (
                            <>
                              <CreditCard size={18} />
                              Pay with SATIM
                            </>
                          )}
                        </button>
                        {selectedEvent.price > 0 && (
                          <p className="text-center text-xs text-neutral-400 mt-3 font-medium flex items-center justify-center gap-1">
                            Secure payment via <strong>SATIM</strong>
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
