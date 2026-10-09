import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Save, RotateCcw, Plus, Trash2, Edit3, Image, Video, 
  Calendar, Clock, MapPin, Sparkles, Shield, CheckCircle2, 
  Star, Eye, EyeOff, UploadCloud, MessageSquare, Phone, Mail, 
  FileText, Check, AlertCircle
} from 'lucide-react';
import { getCMSData, saveCMSData, resetCMSData } from '../data/cmsStore';

const PRESET_IMAGES = [
  { label: 'Durga Puja Thakur Dalan', path: '/images/unnamed_6.webp' },
  { label: 'Classical Music Courtyard', path: '/images/SDP_0282.jpg' },
  { label: 'Architecture Walk / Facade', path: '/images/SDP_0344.jpg' },
  { label: 'Courtyard Arches Night', path: '/images/SDP_0291.jpg' },
  { label: 'Sanctified Room / Sri Ramakrishna', path: '/images/rk01.png' },
  { label: 'Nat Mandir / Workshop', path: '/images/unnamed_12.webp' },
  { label: 'Colonnade Corridor', path: '/images/khelat-bhawan-colonnade-corridor.jpg' },
  { label: 'Living Monument Hall', path: '/images/SDP_0368.jpg' },
  { label: 'Family Trust Archives', path: '/images/SDP_0299.jpg' },
  { label: 'Founder Marble Bust', path: '/images/khelat-ghosh-portrait-clean.png' }
];

export default function AdminCMSDashboard({ isOpen, onClose }) {
  // 6 Specified Sections: events, rentals, feedback, gallery, settings, legal
  const [activeSection, setActiveSection] = useState('events');
  const [cmsData, setCmsData] = useState(getCMSData);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activeRentalIndex, setActiveRentalIndex] = useState(0);
  const [activeFeedbackIndex, setActiveFeedbackIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCmsData(getCMSData());
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKey = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleSaveAll = () => {
    saveCMSData(cmsData);
    notify('✅ All updates successfully saved and published live!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all website CMS content back to original curated defaults?')) {
      const def = resetCMSData();
      setCmsData(def);
      notify('🔄 Reset to default curated content!');
    }
  };

  // ==========================================
  // 1. EVENT HANDLERS
  // ==========================================
  const updateEventField = (idx, field, val, subKey = null) => {
    const updated = [...(cmsData.events || [])];
    if (subKey) {
      updated[idx] = { ...updated[idx], [field]: { ...(updated[idx][field] || {}), [subKey]: val } };
    } else {
      updated[idx] = { ...updated[idx], [field]: val };
    }
    setCmsData({ ...cmsData, events: updated });
  };

  const addEvent = () => {
    const newEv = {
      id: `custom-event-${Date.now()}`,
      category: 'upcoming',
      featured: true,
      title: { en: 'New Palace Celebration', bn: 'নতুন রাজকীয় অনুষ্ঠান' },
      date: { en: 'December 25, 2026', bn: '২৫ ডিসেম্বর, ২০২৬' },
      time: { en: '6:00 PM – 9:00 PM', bn: 'সন্ধ্যা ৬:০০ – রাত ৯:০০' },
      location: { en: 'Thakur Dalan, Khelat Bhawan', bn: 'ঠাকুর দালান, খেলাৎ ভবন' },
      image: '/images/unnamed_6.webp',
      badge: { en: 'Special Event', bn: 'বিশেষ অনুষ্ঠান' },
      desc: { en: 'Share details of the celebration here.', bn: 'অনুষ্ঠানের বিস্তারিত বিবরণ এখানে লিখুন।' },
      highlights: { en: ['Classical Music', 'Heritage Walk'], bn: ['শাস্ত্রীয় সঙ্গীত', 'ঐতিহ্য পরিক্রমা'] },
      whatsappNumber: '9831093021'
    };
    const updated = [newEv, ...(cmsData.events || [])];
    setCmsData({ ...cmsData, events: updated });
    setActiveEventIndex(0);
    notify('➕ New event added! You can now edit its details.');
  };

  const deleteEvent = (idx) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updated = (cmsData.events || []).filter((_, i) => i !== idx);
      setCmsData({ ...cmsData, events: updated });
      setActiveEventIndex(0);
      notify('🗑️ Event deleted!');
    }
  };

  // ==========================================
  // 2. RESERVATION / RENTAL HANDLERS
  // ==========================================
  const updateRentalField = (idx, field, val, subKey = null) => {
    const updated = [...(cmsData.rentals || [])];
    if (subKey) {
      updated[idx] = { ...updated[idx], [field]: { ...(updated[idx][field] || {}), [subKey]: val } };
    } else {
      updated[idx] = { ...updated[idx], [field]: val };
    }
    setCmsData({ ...cmsData, rentals: updated });
  };

  const addRentalPackage = () => {
    const newRental = {
      id: `rental-pkg-${Date.now()}`,
      title: { en: 'New Heritage Experience Package', bn: 'নতুন হেরিটেজ প্যাকেজ' },
      category: 'Weddings & Celebrations',
      capacity: '50 – 300 Guests',
      image: '/images/SDP_0282.jpg',
      desc: {
        en: 'Details and inclusions for this heritage palace experience.',
        bn: 'এই হেরিটেজ অভিজ্ঞতার বিস্তারিত বিবরণ।'
      },
      features: ['Exclusive Courtyard Access', 'Heritage Lighting', 'Hospitality Liaison']
    };
    const updated = [...(cmsData.rentals || []), newRental];
    setCmsData({ ...cmsData, rentals: updated });
    setActiveRentalIndex(updated.length - 1);
    notify('➕ New reservation package added!');
  };

  const deleteRentalPackage = (idx) => {
    if (window.confirm('Are you sure you want to delete this reservation package?')) {
      const updated = (cmsData.rentals || []).filter((_, i) => i !== idx);
      setCmsData({ ...cmsData, rentals: updated });
      setActiveRentalIndex(0);
      notify('🗑️ Reservation package deleted!');
    }
  };

  // ==========================================
  // 3. FEEDBACK / REVIEWS HANDLERS
  // ==========================================
  const updateFeedbackField = (idx, field, val) => {
    const updated = [...(cmsData.feedback || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setCmsData({ ...cmsData, feedback: updated });
  };

  const addFeedbackReview = () => {
    const newFb = {
      id: `fb-${Date.now()}`,
      name: 'Guest Name',
      rating: 5,
      visitType: 'Heritage Tour & Visit',
      review: 'A magnificent experience visiting the historical Khelat Bhawan palace.',
      isApproved: true,
      date: 'Current Month'
    };
    const updated = [newFb, ...(cmsData.feedback || [])];
    setCmsData({ ...cmsData, feedback: updated });
    setActiveFeedbackIndex(0);
    notify('➕ New guest review created!');
  };

  const deleteFeedbackReview = (idx) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updated = (cmsData.feedback || []).filter((_, i) => i !== idx);
      setCmsData({ ...cmsData, feedback: updated });
      setActiveFeedbackIndex(0);
      notify('🗑️ Guest review deleted!');
    }
  };

  // ==========================================
  // 4. GALLERY HANDLERS
  // ==========================================
  const updateGalleryField = (idx, field, val, subKey = null) => {
    const updated = [...(cmsData.gallery || [])];
    if (subKey) {
      updated[idx] = { ...updated[idx], [field]: { ...(updated[idx][field] || {}), [subKey]: val } };
    } else {
      updated[idx] = { ...updated[idx], [field]: val };
    }
    setCmsData({ ...cmsData, gallery: updated });
  };

  const addGalleryItem = () => {
    const newGal = {
      id: `gal-${Date.now()}`,
      title: { en: 'New Palace Photograph', bn: 'নতুন ছবি' },
      mediaType: 'image',
      category: 'architecture',
      src: '/images/SDP_0282.jpg',
      photographer: 'Estate Archives',
      year: `${new Date().getFullYear()}`,
      desc: { en: 'Archival capture of Khelat Bhawan.', bn: 'খেলাৎ ভবনের চিত্র।' }
    };
    const updated = [newGal, ...(cmsData.gallery || [])];
    setCmsData({ ...cmsData, gallery: updated });
    setActiveGalleryIndex(0);
    notify('➕ New gallery item added!');
  };

  const deleteGalleryItem = (idx) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      const updated = (cmsData.gallery || []).filter((_, i) => i !== idx);
      setCmsData({ ...cmsData, gallery: updated });
      setActiveGalleryIndex(0);
      notify('🗑️ Gallery item deleted!');
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl h-[94vh] bg-[#120b08] text-[#f5efe6] border border-[#d8ae62]/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* TOP BAR */}
        <header className="px-6 py-4 border-b border-white/15 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5a1722] border border-[#d8ae62]/40 flex items-center justify-center text-[#d8ae62]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#f5efe6]">
                  Khelat Bhawan CMS Control Panel
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                  Full CRUD & Upload Enabled
                </span>
              </div>
              <p className="text-[11px] text-[#f0e8d8]/60 font-sans">
                Edit, add, delete, and upload items for Events, Reservations, Feedback, Gallery, Contact, and Terms & Policy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {notification && (
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-900/90 text-emerald-200 border border-emerald-500 animate-in fade-in">
                {notification}
              </span>
            )}
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
              title="Reset all content to curated defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2 rounded-xl bg-[#d8ae62] hover:bg-[#c99f53] text-[#2c1208] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* MAIN BODY: SIDEBAR + EDITOR PANE */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* NAVIGATION SIDEBAR: EXACTLY 6 STREAMLINED SECTIONS */}
          <aside className="w-64 sm:w-72 bg-black/50 border-r border-white/10 p-3 space-y-1.5 overflow-y-auto shrink-0">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#d8ae62] px-3 py-2 font-bold">
              CMS Sections (6 Active)
            </div>

            {[
              { id: 'events', label: '🎪 Events & Celebrations', count: (cmsData.events || []).length },
              { id: 'rentals', label: '🏰 Reservations & Heritage Rental', count: (cmsData.rentals || []).length },
              { id: 'feedback', label: '⭐ Guest Reviews & Feedback', count: (cmsData.feedback || []).length },
              { id: 'gallery', label: '🖼️ Visual Gallery & Films', count: (cmsData.gallery || []).length },
              { id: 'settings', label: '📍 Contact & Visiting Hours' },
              { id: 'legal', label: '📜 Terms & Privacy Policy' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  activeSection === tab.id
                    ? 'bg-[#5a1722] text-[#f5efe6] border border-[#d8ae62]/50 shadow-md font-bold'
                    : 'text-[#f0e8d8]/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-[#d8ae62] font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-6 px-3 text-[11px] text-[#f0e8d8]/50 space-y-2 border-t border-white/10 mt-6">
              <p className="font-semibold text-[#d8ae62]">💡 CMS Controls:</p>
              <p>• <strong>Add / Upload:</strong> Use top buttons to create items or select photos/videos.</p>
              <p>• <strong>Edit:</strong> Modify any text, number, timing, or photo URL in-place.</p>
              <p>• <strong>Delete:</strong> Remove unwanted events, packages, or gallery entries.</p>
              <p>• <strong>Save & Publish:</strong> Instantly updates the live website.</p>
            </div>
          </aside>

          {/* EDITOR WORKSPACE */}
          <main className="flex-1 p-6 overflow-y-auto bg-black/20">
            
            {/* =========================================================================
                1. EVENTS & CELEBRATIONS
               ========================================================================= */}
            {activeSection === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#d8ae62]">🎪 Events & Celebrations</h3>
                    <p className="text-xs text-[#f0e8d8]/60">Manage cultural celebrations, dates, timings, venue hall, and WhatsApp enquiry button.</p>
                  </div>
                  <button
                    onClick={addEvent}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload / Add Event</span>
                  </button>
                </div>

                {/* Event Selector Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {(cmsData.events || []).map((ev, i) => (
                    <button
                      key={ev.id || i}
                      onClick={() => setActiveEventIndex(i)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                        activeEventIndex === i
                          ? 'bg-[#d8ae62] text-[#2c1208] font-bold shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/15'
                      }`}
                    >
                      <span>{ev.title?.en || `Event ${i + 1}`}</span>
                    </button>
                  ))}
                </div>

                {/* Active Event Edit Form */}
                {cmsData.events && cmsData.events[activeEventIndex] && (() => {
                  const ev = cmsData.events[activeEventIndex];
                  return (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono tracking-wider text-[#d8ae62] font-bold">
                          Editing Event #{activeEventIndex + 1}: {ev.title?.en}
                        </span>
                        <button
                          onClick={() => deleteEvent(activeEventIndex)}
                          className="px-3.5 py-1.5 rounded-lg bg-red-900/70 hover:bg-red-800 text-red-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Event</span>
                        </button>
                      </div>

                      {/* Bilingual Titles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Event Title (English) *</label>
                          <input
                            type="text"
                            value={ev.title?.en || ''}
                            onChange={(e) => updateEventField(activeEventIndex, 'title', e.target.value, 'en')}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Event Title (Bengali)</label>
                          <input
                            type="text"
                            value={ev.title?.bn || ''}
                            onChange={(e) => updateEventField(activeEventIndex, 'title', e.target.value, 'bn')}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                      </div>

                      {/* Dates & Timings */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-white/80">Event Date (English)</label>
                          <input
                            type="text"
                            value={ev.date?.en || ''}
                            onChange={(e) => updateEventField(activeEventIndex, 'date', e.target.value, 'en')}
                            placeholder="e.g. October 18 – 22, 2026"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-white/80">Daily Timing</label>
                          <input
                            type="text"
                            value={ev.time?.en || ''}
                            onChange={(e) => updateEventField(activeEventIndex, 'time', e.target.value, 'en')}
                            placeholder="e.g. 5:30 PM – 9:30 PM"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-white/80">Venue / Location</label>
                          <input
                            type="text"
                            value={ev.location?.en || ''}
                            onChange={(e) => updateEventField(activeEventIndex, 'location', e.target.value, 'en')}
                            placeholder="e.g. Thakur Dalan, Khelat Bhawan"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                      </div>

                      {/* Image Picker / Upload */}
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-[#d8ae62]">Cover Image (Select Preset or Enter Image URL / File Path)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {PRESET_IMAGES.map((img) => (
                            <button
                              key={img.path}
                              type="button"
                              onClick={() => updateEventField(activeEventIndex, 'image', img.path)}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 cursor-pointer ${
                                ev.image === img.path
                                  ? 'bg-[#d8ae62] text-[#2c1208] border-[#d8ae62]'
                                  : 'bg-black/40 text-white/70 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <span>{img.label}</span>
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={ev.image || ''}
                          onChange={(e) => updateEventField(activeEventIndex, 'image', e.target.value)}
                          placeholder="Image URL or file path (e.g. /images/unnamed_6.webp)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono outline-none focus:border-[#d8ae62]"
                        />
                      </div>

                      {/* WhatsApp routing */}
                      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
                        <label className="block text-xs font-semibold text-emerald-300">
                          📱 WhatsApp Inquiry Number (Direct redirect on "Click to Enquire")
                        </label>
                        <input
                          type="text"
                          value={ev.whatsappNumber || '9831093021'}
                          onChange={(e) => updateEventField(activeEventIndex, 'whatsappNumber', e.target.value)}
                          placeholder="9831093021"
                          className="w-full px-3.5 py-2 rounded-lg bg-black/70 border border-emerald-700/50 text-xs text-white font-mono"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Event Full Description (English)</label>
                        <textarea
                          rows={4}
                          value={typeof ev.desc === 'object' ? ev.desc.en : ev.desc || ''}
                          onChange={(e) => updateEventField(activeEventIndex, 'desc', e.target.value, 'en')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* =========================================================================
                2. RESERVATIONS & HERITAGE RENTAL
               ========================================================================= */}
            {activeSection === 'rentals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#d8ae62]">🏰 Reservations & Heritage Rental</h3>
                    <p className="text-xs text-[#f0e8d8]/60">Manage rental packages for royal weddings, cinema shoots, and classical cultural soirees.</p>
                  </div>
                  <button
                    onClick={addRentalPackage}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload / Add Package</span>
                  </button>
                </div>

                {/* Package Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {(cmsData.rentals || []).map((r, i) => (
                    <button
                      key={r.id || i}
                      onClick={() => setActiveRentalIndex(i)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                        activeRentalIndex === i
                          ? 'bg-[#d8ae62] text-[#2c1208] font-bold shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/15'
                      }`}
                    >
                      <span>{r.title?.en || `Package ${i + 1}`}</span>
                    </button>
                  ))}
                </div>

                {cmsData.rentals && cmsData.rentals[activeRentalIndex] && (() => {
                  const r = cmsData.rentals[activeRentalIndex];
                  return (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono tracking-wider text-[#d8ae62] font-bold">
                          Editing Package #{activeRentalIndex + 1}: {r.title?.en}
                        </span>
                        <button
                          onClick={() => deleteRentalPackage(activeRentalIndex)}
                          className="px-3.5 py-1.5 rounded-lg bg-red-900/70 hover:bg-red-800 text-red-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Package</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Package Title (EN) *</label>
                          <input
                            type="text"
                            value={r.title?.en || ''}
                            onChange={(e) => updateRentalField(activeRentalIndex, 'title', e.target.value, 'en')}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Guest Capacity</label>
                          <input
                            type="text"
                            value={r.capacity || ''}
                            onChange={(e) => updateRentalField(activeRentalIndex, 'capacity', e.target.value)}
                            placeholder="e.g. 100 – 600 Guests"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                      </div>

                      {/* Image Picker */}
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-[#d8ae62]">Cover Photograph</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {PRESET_IMAGES.map((img) => (
                            <button
                              key={img.path}
                              type="button"
                              onClick={() => updateRentalField(activeRentalIndex, 'image', img.path)}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 cursor-pointer ${
                                r.image === img.path
                                  ? 'bg-[#d8ae62] text-[#2c1208] border-[#d8ae62]'
                                  : 'bg-black/40 text-white/70 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <span>{img.label}</span>
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={r.image || ''}
                          onChange={(e) => updateRentalField(activeRentalIndex, 'image', e.target.value)}
                          placeholder="Image URL or file path (e.g. /images/SDP_0282.jpg)"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono outline-none focus:border-[#d8ae62]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Description & Inclusions (EN)</label>
                        <textarea
                          rows={4}
                          value={typeof r.desc === 'object' ? r.desc.en : r.desc || ''}
                          onChange={(e) => updateRentalField(activeRentalIndex, 'desc', e.target.value, 'en')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* =========================================================================
                3. GUEST REVIEWS & FEEDBACK
               ========================================================================= */}
            {activeSection === 'feedback' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#d8ae62]">⭐ Guest Reviews & Feedback Moderation</h3>
                    <p className="text-xs text-[#f0e8d8]/60">Approve, moderate, edit, add, or remove visitor reflections and testimonials.</p>
                  </div>
                  <button
                    onClick={addFeedbackReview}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload / Add Review</span>
                  </button>
                </div>

                {/* Feedback Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {(cmsData.feedback || []).map((fb, i) => (
                    <button
                      key={fb.id || i}
                      onClick={() => setActiveFeedbackIndex(i)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                        activeFeedbackIndex === i
                          ? 'bg-[#d8ae62] text-[#2c1208] font-bold shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/15'
                      }`}
                    >
                      <span>{fb.name || `Review ${i + 1}`}</span>
                      <span className="text-[10px] text-amber-300">★{fb.rating || 5}</span>
                      {fb.isApproved ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Live on website" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-amber-500" title="Pending approval" />
                      )}
                    </button>
                  ))}
                </div>

                {cmsData.feedback && cmsData.feedback[activeFeedbackIndex] && (() => {
                  const fb = cmsData.feedback[activeFeedbackIndex];
                  return (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono tracking-wider text-[#d8ae62] font-bold">
                          Review #{activeFeedbackIndex + 1} from: {fb.name}
                        </span>
                        <button
                          onClick={() => deleteFeedbackReview(activeFeedbackIndex)}
                          className="px-3.5 py-1.5 rounded-lg bg-red-900/70 hover:bg-red-800 text-red-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Review</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Guest Name *</label>
                          <input
                            type="text"
                            value={fb.name || ''}
                            onChange={(e) => updateFeedbackField(activeFeedbackIndex, 'name', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Star Rating (1 – 5)</label>
                          <select
                            value={fb.rating || 5}
                            onChange={(e) => updateFeedbackField(activeFeedbackIndex, 'rating', Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          >
                            <option value={5}>★★★★★ 5 Stars (Excellent)</option>
                            <option value={4}>★★★★☆ 4 Stars (Very Good)</option>
                            <option value={3}>★★★☆☆ 3 Stars (Good)</option>
                            <option value={2}>★★☆☆☆ 2 Stars (Fair)</option>
                            <option value={1}>★☆☆☆☆ 1 Star</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Visit / Occasion Type</label>
                          <input
                            type="text"
                            value={fb.visitType || ''}
                            onChange={(e) => updateFeedbackField(activeFeedbackIndex, 'visitType', e.target.value)}
                            placeholder="e.g. Heritage Walk, Concert"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                      </div>

                      {/* Approval Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10">
                        <div>
                          <div className="text-xs font-bold text-white">Publish on Public Website</div>
                          <div className="text-[11px] text-white/50">When turned ON, this review appears in the website guest reflections section.</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateFeedbackField(activeFeedbackIndex, 'isApproved', !fb.isApproved)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                            fb.isApproved
                              ? 'bg-emerald-800 text-emerald-100 border border-emerald-500'
                              : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          }`}
                        >
                          {fb.isApproved ? <Check className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          <span>{fb.isApproved ? 'Approved (Live)' : 'Hidden (Draft)'}</span>
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Review / Reflections Text *</label>
                        <textarea
                          rows={4}
                          value={fb.review || ''}
                          onChange={(e) => updateFeedbackField(activeFeedbackIndex, 'review', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* =========================================================================
                4. VISUAL GALLERY & FILMS
               ========================================================================= */}
            {activeSection === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#d8ae62]">🖼️ Visual Gallery & Films</h3>
                    <p className="text-xs text-[#f0e8d8]/60">Manage high-resolution photography, archival imagery, and heritage films.</p>
                  </div>
                  <button
                    onClick={addGalleryItem}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload / Add Media</span>
                  </button>
                </div>

                {/* Gallery Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {(cmsData.gallery || []).map((item, i) => (
                    <button
                      key={item.id || i}
                      onClick={() => setActiveGalleryIndex(i)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                        activeGalleryIndex === i
                          ? 'bg-[#d8ae62] text-[#2c1208] font-bold shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/15'
                      }`}
                    >
                      {item.mediaType === 'video' ? <Video className="w-3.5 h-3.5" /> : <Image className="w-3.5 h-3.5" />}
                      <span>{item.title?.en || `Item ${i + 1}`}</span>
                    </button>
                  ))}
                </div>

                {cmsData.gallery && cmsData.gallery[activeGalleryIndex] && (() => {
                  const item = cmsData.gallery[activeGalleryIndex];
                  return (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono tracking-wider text-[#d8ae62] font-bold">
                          Editing Gallery Item #{activeGalleryIndex + 1}: {item.title?.en}
                        </span>
                        <button
                          onClick={() => deleteGalleryItem(activeGalleryIndex)}
                          className="px-3.5 py-1.5 rounded-lg bg-red-900/70 hover:bg-red-800 text-red-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Item</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Title (English) *</label>
                          <input
                            type="text"
                            value={item.title?.en || ''}
                            onChange={(e) => updateGalleryField(activeGalleryIndex, 'title', e.target.value, 'en')}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Media Type</label>
                          <select
                            value={item.mediaType || 'image'}
                            onChange={(e) => updateGalleryField(activeGalleryIndex, 'mediaType', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          >
                            <option value="image">Photograph (Image)</option>
                            <option value="video">Heritage Film (Video)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Category Filter</label>
                          <select
                            value={item.category || 'architecture'}
                            onChange={(e) => updateGalleryField(activeGalleryIndex, 'category', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          >
                            <option value="architecture">Architecture & Courtyards</option>
                            <option value="festivals">Rituals & Durga Puja</option>
                            <option value="cultural">Classical Soirees & Cultural</option>
                            <option value="cinema">Royal Film Shoots & Cinema</option>
                          </select>
                        </div>
                      </div>

                      {/* Photo / Video File URL & Presets */}
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-[#d8ae62]">Media File URL or Path (Upload or Enter Link)</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {PRESET_IMAGES.map((img) => (
                            <button
                              key={img.path}
                              type="button"
                              onClick={() => updateGalleryField(activeGalleryIndex, 'src', img.path)}
                              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 cursor-pointer ${
                                item.src === img.path
                                  ? 'bg-[#d8ae62] text-[#2c1208] border-[#d8ae62]'
                                  : 'bg-black/40 text-white/70 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <span>{img.label}</span>
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={item.src || ''}
                          onChange={(e) => updateGalleryField(activeGalleryIndex, 'src', e.target.value)}
                          placeholder="e.g. /images/SDP_0282.jpg or /Videos/hero-palace-film.mp4"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono outline-none focus:border-[#d8ae62]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Archivist / Photographer Credit</label>
                          <input
                            type="text"
                            value={item.photographer || ''}
                            onChange={(e) => updateGalleryField(activeGalleryIndex, 'photographer', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Year / Era (e.g. 1845, 2026)</label>
                          <input
                            type="text"
                            value={item.year || ''}
                            onChange={(e) => updateGalleryField(activeGalleryIndex, 'year', e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Caption / Historical Story (EN)</label>
                        <textarea
                          rows={3}
                          value={typeof item.desc === 'object' ? item.desc.en : item.desc || ''}
                          onChange={(e) => updateGalleryField(activeGalleryIndex, 'desc', e.target.value, 'en')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* =========================================================================
                5. CONTACT INFORMATION & VISITING HOURS
               ========================================================================= */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#d8ae62]">📍 Contact Information & Visiting Hours</h3>
                  <p className="text-xs text-[#f0e8d8]/60">Manage visiting hours, estate contact numbers, official email, physical address, and hero video film.</p>
                </div>

                <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Visiting Hours (English)</label>
                      <input
                        type="text"
                        value={cmsData.settings?.visitingHoursEn || ''}
                        onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, visitingHoursEn: e.target.value } })}
                        placeholder="Mon – Sat: 11:00 AM – 7:00 PM"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Official Contact Email</label>
                      <input
                        type="email"
                        value={cmsData.settings?.email || ''}
                        onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, email: e.target.value } })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Primary Phone Number</label>
                      <input
                        type="text"
                        value={cmsData.settings?.phonePrimary || ''}
                        onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, phonePrimary: e.target.value } })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Secondary Phone Number</label>
                      <input
                        type="text"
                        value={cmsData.settings?.phoneSecondary || ''}
                        onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, phoneSecondary: e.target.value } })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Physical Estate Address</label>
                    <input
                      type="text"
                      value={cmsData.settings?.address || ''}
                      onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, address: e.target.value } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Google Maps URL Link</label>
                    <input
                      type="text"
                      value={cmsData.settings?.googleMapsUrl || ''}
                      onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, googleMapsUrl: e.target.value } })}
                      placeholder="https://share.google/TFFurvjijjI8QM8eg"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Custom Hero Background Video URL (MP4)</label>
                    <input
                      type="text"
                      value={cmsData.settings?.heroVideoUrl || ''}
                      onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, heroVideoUrl: e.target.value } })}
                      placeholder="Leave blank to use default palace film (/Videos/hero-palace-film.mp4)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                6. TERMS OF USE & PRIVACY POLICY
               ========================================================================= */}
            {activeSection === 'legal' && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#d8ae62]">📜 Terms of Use & Privacy Policies</h3>
                  <p className="text-xs text-[#f0e8d8]/60">Directly edit the text shown in the Privacy Policy and Terms of Use modals.</p>
                </div>

                <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Privacy Policy Text (Markdown/Text)</label>
                    <textarea
                      rows={8}
                      value={cmsData.legal?.privacyTextEn || ''}
                      onChange={(e) => setCmsData({ ...cmsData, legal: { ...cmsData.legal, privacyTextEn: e.target.value } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Terms of Use Text (Markdown/Text)</label>
                    <textarea
                      rows={8}
                      value={cmsData.legal?.termsTextEn || ''}
                      onChange={(e) => setCmsData({ ...cmsData, legal: { ...cmsData.legal, termsTextEn: e.target.value } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>,
    document.body
  );
}
