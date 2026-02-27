/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  MapPin, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  User, 
  DollarSign, 
  Send, 
  CheckCircle2,
  AlertCircle,
  Info,
  Globe,
  Heart
} from 'lucide-react';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit request');

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=2000" 
            alt="Orchestra background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-950/50 to-stone-950 z-0" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6 block">
              The World Sends Us Garbage, We Send Back Music
            </span>
            <h1 className="text-6xl md:text-8xl text-white serif font-light leading-tight mb-8">
              Recycled Orchestra <br />
              <span className="italic">of Cateura</span>
            </h1>
            <p className="text-stone-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
              From the landfill of Cateura, Paraguay, comes a story of hope, resilience, and the transformative power of music.
            </p>
            <a 
              href="#booking-form" 
              className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-stone-950 px-10 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Request a Performance
            </a>
          </motion.div>
        </div>
      </header>

      {/* Video Section */}
      <section className="py-24 px-4 bg-brand-paper">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl serif text-stone-900 leading-tight">
                A Symphony of <br />
                <span className="italic">Transformation</span>
              </h2>
              <div className="w-20 h-1 bg-brand-gold" />
              <p className="text-stone-600 leading-relaxed text-lg">
                The Recycled Orchestra of Cateura is a group of children from a slum built on a landfill in Paraguay. They play instruments made entirely from trash—violins from oil cans, flutes from water pipes, and cellos from packing crates.
              </p>
              <p className="text-stone-600 leading-relaxed text-lg">
                Their mission is to show the world that beauty can be found in the most unexpected places and that poverty should not limit a child's potential.
              </p>
              <div className="flex items-center gap-4 text-brand-earth font-semibold">
                <Globe className="w-5 h-5" />
                <span>Based in Cateura, Paraguay</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-8 border-white"
            >
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/OyM-WaC0-Gg" 
                title="Landfill Harmonic - The Recycled Orchestra of Cateura" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl serif mb-4 italic">Why Your Support Matters</h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Every performance is a lifeline for the community of Cateura.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Heart className="w-8 h-8 text-brand-gold" />,
                title: "Education",
                desc: "Proceeds fund the music school in Paraguay, providing free lessons to hundreds of children."
              },
              {
                icon: <Globe className="w-8 h-8 text-brand-gold" />,
                title: "Global Awareness",
                desc: "Sharing the message of environmental sustainability and social transformation through art."
              },
              {
                icon: <Music className="w-8 h-8 text-brand-gold" />,
                title: "Opportunity",
                desc: "Giving children the chance to travel the world and see a future beyond the landfill."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-gold/30 transition-colors"
              >
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-stone-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="booking-form" className="py-24 px-4 bg-brand-paper">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Form Sidebar */}
              <div className="md:col-span-2 bg-brand-earth p-10 text-white">
                <h2 className="text-3xl serif italic mb-6">Booking Inquiry</h2>
                <p className="text-stone-300 mb-8 font-light">
                  Due to high demand and our commitment to the children's education, we carefully select our performance venues.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Info className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Requirements</h4>
                      <p className="text-xs text-stone-300">Institutions are expected to cover travel, lodging, and meals for the orchestra.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Heart className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm uppercase tracking-wider mb-1">Mission Support</h4>
                      <p className="text-xs text-stone-300">Additional contributions directly support our school and social projects in Cateura.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actual Form */}
              <div className="md:col-span-3 p-10">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Institution Name</label>
                          <div className="relative">
                            <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input 
                              required
                              name="institution_name"
                              type="text" 
                              placeholder="School or Organization Name" 
                              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Contact Name</label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                              <input 
                                required
                                name="contact_name"
                                type="text" 
                                placeholder="Full Name" 
                                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                              />
                            </div>
                          </div>
                          <div className="relative">
                            <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                              <input 
                                required
                                name="phone"
                                type="tel" 
                                placeholder="+1 (555) 000-0000" 
                                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input 
                              required
                              name="email"
                              type="email" 
                              placeholder="email@institution.edu" 
                              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input 
                              required
                              name="location"
                              type="text" 
                              placeholder="City, Country" 
                              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Preferred Date</label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                              <input 
                                required
                                name="preferred_date"
                                type="date" 
                                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                              />
                            </div>
                          </div>
                          <div className="relative">
                            <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Preferred Time</label>
                            <div className="relative">
                              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                              <input 
                                required
                                name="preferred_time"
                                type="time" 
                                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="relative">
                          <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Estimated Budget (USD)</label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input 
                              required
                              name="budget"
                              type="text" 
                              placeholder="e.g. $5,000 - $10,000" 
                              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                            />
                          </div>
                          <p className="text-[10px] text-stone-400 mt-1">Please include travel, lodging, and performance fee.</p>
                        </div>

                        <div className="relative">
                          <label className="text-xs font-bold uppercase text-stone-500 mb-1 block">Additional Message</label>
                          <textarea 
                            name="message"
                            rows={3}
                            placeholder="Tell us more about your event..." 
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all resize-none"
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{error}</span>
                        </div>
                      )}

                      <button 
                        disabled={isSubmitting}
                        type="submit" 
                        className="w-full bg-brand-earth hover:bg-stone-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Submit Inquiry
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 mb-2">Inquiry Received</h3>
                      <p className="text-stone-600 mb-8">
                        Thank you for your interest. Our team will review your request and get back to you within 5-7 business days.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-brand-earth font-semibold hover:underline"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="serif text-2xl italic mb-2">Recycled Orchestra of Cateura</h3>
            <p className="text-stone-500 text-sm">© {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://www.recycledorchestracateura.com/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-brand-gold transition-colors">Official Website</a>
            <a href="#" className="text-stone-400 hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-stone-400 hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
