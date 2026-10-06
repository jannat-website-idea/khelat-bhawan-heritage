import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Save, RotateCcw, Plus, Trash2, Edit3, Image, Video, 
  Calendar, Clock, MapPin, Sparkles, Shield, CheckCircle2, 
  Layers, Users, Crown, FileText, Phone, Mail, HelpCircle, ExternalLink
} from 'lucide-react';
import { getCMSData, saveCMSData, resetCMSData, initialCMSData } from '../data/cmsStore';
import { getAssetUrl } from '../utils/assetHelper';

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
  const [activeSection, setActiveSection] = useState('events'); // events, timeline, settings, about, founder, rentals, legal
  const [cmsData, setCmsData] = useState(getCMSData);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [activeRentalIndex, setActiveRentalIndex] = useState(0);
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
    setTimeout(() => setNotification(''), 3000);
  };

  const handleSaveAll = () => {
    saveCMSData(cmsData);
    notify('✅ All changes saved and published live to website!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all website content back to the original curated defaults?')) {
      const def = resetCMSData();
      setCmsData(def);
      notify('🔄 Restored all content to curated defaults!');
    }
  };

  // Event handlers
  const updateEventField = (idx, field, val, subKey = null) => {
    const updated = [...cmsData.events];
    if (subKey) {
      updated[idx] = { ...updated[idx], [field]: { ...updated[idx][field], [subKey]: val } };
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
    const updated = [newEv, ...cmsData.events];
    setCmsData({ ...cmsData, events: updated });
    setActiveEventIndex(0);
    notify('➕ New event created!');
  };

  const deleteEvent = (idx) => {
    if (window.confirm('Delete this event?')) {
      const updated = cmsData.events.filter((_, i) => i !== idx);
      setCmsData({ ...cmsData, events: updated });
      setActiveEventIndex(0);
      notify('🗑️ Event deleted!');
    }
  };

  // Timeline handlers
  const updateTimelineField = (idx, field, val, subKey = null) => {
    const updated = [...cmsData.timeline];
    if (subKey) {
      updated[idx] = { ...updated[idx], [field]: { ...updated[idx][field], [subKey]: val } };
    } else {
      updated[idx] = { ...updated[idx], [field]: val };
    }
    setCmsData({ ...cmsData, timeline: updated });
  };

  const addTimelineMilestone = () => {
    const newM = {
      year: `${new Date().getFullYear()}`,
      badge: { en: 'NEW MILESTONE', bn: 'নতুন ইতিহাস' },
      title: { en: 'New Historical Milestone', bn: 'ঐতিহাসিক মাইলফলক' },
      desc: { en: 'Historical narrative of this milestone.', bn: 'এই মাইলফলকের ঐতিহাসিক বিবরণ।' },
      image: '/images/SDP_0344.jpg'
    };
    const updated = [...cmsData.timeline, newM];
    setCmsData({ ...cmsData, timeline: updated });
    setActiveTimelineIndex(updated.length - 1);
    notify('➕ New timeline milestone created!');
  };

  const deleteTimelineMilestone = (idx) => {
    if (window.confirm('Delete this timeline milestone?')) {
      const updated = cmsData.timeline.filter((_, i) => i !== idx);
      setCmsData({ ...cmsData, timeline: updated });
      setActiveTimelineIndex(0);
      notify('🗑️ Milestone deleted!');
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
                  Khelat Bhawan Estate CMS Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                  Live Visual Editor
                </span>
              </div>
              <p className="text-[11px] text-[#f0e8d8]/60 font-sans">
                Edit, add, delete, or replace any text, images, events, and hours. Changes save immediately.
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
          
          {/* NAVIGATION SIDEBAR */}
          <aside className="w-64 sm:w-72 bg-black/50 border-r border-white/10 p-3 space-y-1 overflow-y-auto shrink-0">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#d8ae62] px-3 py-2 font-bold">
              Website Content Sections
            </div>

            {[
              { id: 'events', label: '🎪 Palace Events (5)', count: cmsData.events?.length },
              { id: 'timeline', label: '⏳ History Timeline (6)', count: cmsData.timeline?.length },
              { id: 'settings', label: '⚙️ Site Settings & Hero Video' },
              { id: 'about', label: '🏛️ Heritage & About Story' },
              { id: 'founder', label: '👑 Founder (Babu Khelat Ghosh)' },
              { id: 'rentals', label: '🏰 Rental Packages (3)' },
              { id: 'legal', label: '📜 Terms & Privacy Policies' }
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
              </button>
            ))}

            <div className="pt-6 px-3 text-[11px] text-[#f0e8d8]/50 space-y-2 border-t border-white/10 mt-6">
              <p className="font-semibold text-[#d8ae62]">💡 Client Guide:</p>
              <p>1. Select any section to view and edit its text and images.</p>
              <p>2. Click <strong>"Save & Publish"</strong> to apply changes to the live site immediately.</p>
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
                    <h3 className="font-serif text-xl font-bold text-[#d8ae62]">🎪 Palace Events & Celebrations</h3>
                    <p className="text-xs text-[#f0e8d8]/60">Select an event below to edit its title, date, time, venue, photos, and WhatsApp button.</p>
                  </div>
                  <button
                    onClick={addEvent}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Event</span>
                  </button>
                </div>

                {/* Event Selector Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {cmsData.events.map((ev, i) => (
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
                {cmsData.events[activeEventIndex] && (() => {
                  const ev = cmsData.events[activeEventIndex];
                  return (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono tracking-wider text-[#d8ae62] font-bold">
                          Editing: {ev.title?.en}
                        </span>
                        <button
                          onClick={() => deleteEvent(activeEventIndex)}
                          className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
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

                      {/* Image Picker */}
                      <div>
                        <label className="block text-xs font-semibold mb-1.5 text-[#d8ae62]">Cover Image (Select Preset or Enter Custom Path)</label>
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
                        <p className="text-[10px] text-emerald-400/80">
                          When visitors click "Click to Enquire", WhatsApp opens directly to this phone number.
                        </p>
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
                2. HISTORY TIMELINE
               ========================================================================= */}
            {activeSection === 'timeline' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#d8ae62]">⏳ History Timeline Milestones</h3>
                    <p className="text-xs text-[#f0e8d8]/60">Manage the 1845–Present historical milestones displayed on the History Timeline page.</p>
                  </div>
                  <button
                    onClick={addTimelineMilestone}
                    className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Milestone</span>
                  </button>
                </div>

                {/* Milestone Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {cmsData.timeline.map((m, i) => (
                    <button
                      key={m.year || i}
                      onClick={() => setActiveTimelineIndex(i)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                        activeTimelineIndex === i
                          ? 'bg-[#d8ae62] text-[#2c1208] font-bold shadow-md'
                          : 'bg-white/10 text-white/80 hover:bg-white/15'
                      }`}
                    >
                      <span>{m.year}</span>
                    </button>
                  ))}
                </div>

                {cmsData.timeline[activeTimelineIndex] && (() => {
                  const m = cmsData.timeline[activeTimelineIndex];
                  return (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-mono tracking-wider text-[#d8ae62] font-bold">
                          Editing Milestone: {m.year} — {m.title?.en}
                        </span>
                        <button
                          onClick={() => deleteTimelineMilestone(activeTimelineIndex)}
                          className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Milestone</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Year / Period *</label>
                          <input
                            type="text"
                            value={m.year || ''}
                            onChange={(e) => updateTimelineField(activeTimelineIndex, 'year', e.target.value)}
                            placeholder="e.g. 1845"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Era Badge Label (EN)</label>
                          <input
                            type="text"
                            value={m.badge?.en || ''}
                            onChange={(e) => updateTimelineField(activeTimelineIndex, 'badge', e.target.value, 'en')}
                            placeholder="e.g. ESTATE FOUNDATION"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Milestone Title (EN)</label>
                          <input
                            type="text"
                            value={m.title?.en || ''}
                            onChange={(e) => updateTimelineField(activeTimelineIndex, 'title', e.target.value, 'en')}
                            placeholder="Title of milestone"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Historical Narrative (English)</label>
                        <textarea
                          rows={4}
                          value={typeof m.desc === 'object' ? m.desc.en : m.desc || ''}
                          onChange={(e) => updateTimelineField(activeTimelineIndex, 'desc', e.target.value, 'en')}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* =========================================================================
                3. SITE SETTINGS & HERO VIDEO
               ========================================================================= */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#d8ae62]">⚙️ Site Settings, Visiting Hours & Hero Video</h3>
                  <p className="text-xs text-[#f0e8d8]/60">Manage homepage background film, visiting hours, and official estate contact info.</p>
                </div>

                <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Visiting Hours (English)</label>
                      <input
                        type="text"
                        value={cmsData.settings.visitingHoursEn || ''}
                        onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, visitingHoursEn: e.target.value } })}
                        placeholder="Mon – Sat: 11:00 AM – 7:00 PM"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Official Contact Email</label>
                      <input
                        type="email"
                        value={cmsData.settings.email || ''}
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
                        value={cmsData.settings.phonePrimary || ''}
                        onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, phonePrimary: e.target.value } })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Secondary Phone Number</label>
                      <input
                        type="text"
                        value={cmsData.settings.phoneSecondary || ''}
                        onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, phoneSecondary: e.target.value } })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Physical Estate Address</label>
                    <input
                      type="text"
                      value={cmsData.settings.address || ''}
                      onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, address: e.target.value } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Custom Hero Background Video URL (MP4)</label>
                    <input
                      type="text"
                      value={cmsData.settings.heroVideoUrl || ''}
                      onChange={(e) => setCmsData({ ...cmsData, settings: { ...cmsData.settings, heroVideoUrl: e.target.value } })}
                      placeholder="Leave blank to use default palace film (/Videos/hero-palace-film.mp4)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                4. TERMS OF USE & PRIVACY POLICY
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
                      rows={6}
                      value={cmsData.legal?.privacyTextEn || ''}
                      onChange={(e) => setCmsData({ ...cmsData, legal: { ...cmsData.legal, privacyTextEn: e.target.value } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Terms of Use Text (Markdown/Text)</label>
                    <textarea
                      rows={6}
                      value={cmsData.legal?.termsTextEn || ''}
                      onChange={(e) => setCmsData({ ...cmsData, legal: { ...cmsData.legal, termsTextEn: e.target.value } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                5. FOUNDER
               ========================================================================= */}
            {activeSection === 'founder' && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#d8ae62]">👑 Founder (Babu Khelat Ghosh)</h3>
                  <p className="text-xs text-[#f0e8d8]/60">Edit the founder's biography, name, and archival portraits.</p>
                </div>

                <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Founder Name (EN)</label>
                      <input
                        type="text"
                        value={cmsData.founder?.name?.en || ''}
                        onChange={(e) => setCmsData({ ...cmsData, founder: { ...cmsData.founder, name: { ...cmsData.founder.name, en: e.target.value } } })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Lifespan Era</label>
                      <input
                        type="text"
                        value={cmsData.founder?.years || ''}
                        onChange={(e) => setCmsData({ ...cmsData, founder: { ...cmsData.founder, years: e.target.value } })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Biography Narrative (English)</label>
                    <textarea
                      rows={5}
                      value={cmsData.founder?.biography?.en || ''}
                      onChange={(e) => setCmsData({ ...cmsData, founder: { ...cmsData.founder, biography: { ...cmsData.founder.biography, en: e.target.value } } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                6. HERITAGE & ABOUT
               ========================================================================= */}
            {activeSection === 'about' && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#d8ae62]">🏛️ Heritage & About Story</h3>
                  <p className="text-xs text-[#f0e8d8]/60">Edit the heritage title, subtitle, and history narrative.</p>
                </div>

                <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Heritage Title (EN)</label>
                    <input
                      type="text"
                      value={cmsData.about?.title?.en || ''}
                      onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, title: { ...cmsData.about.title, en: e.target.value } } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Subtitle / Tagline (EN)</label>
                    <textarea
                      rows={2}
                      value={cmsData.about?.subtitle?.en || ''}
                      onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, subtitle: { ...cmsData.about.subtitle, en: e.target.value } } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">History Overview (EN)</label>
                    <textarea
                      rows={4}
                      value={cmsData.about?.historyOverview?.en || ''}
                      onChange={(e) => setCmsData({ ...cmsData, about: { ...cmsData.about, historyOverview: { ...cmsData.about.historyOverview, en: e.target.value } } })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                7. RENTAL PACKAGES
               ========================================================================= */}
            {activeSection === 'rentals' && (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl font-bold text-[#d8ae62]">🏰 Heritage Rental Packages</h3>
                  <p className="text-xs text-[#f0e8d8]/60">Manage weddings, cinema shoots, and classical concert booking packages.</p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  {cmsData.rentals.map((r, i) => (
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

                {cmsData.rentals[activeRentalIndex] && (() => {
                  const r = cmsData.rentals[activeRentalIndex];
                  return (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Package Title (EN)</label>
                          <input
                            type="text"
                            value={r.title?.en || ''}
                            onChange={(e) => {
                              const updated = [...cmsData.rentals];
                              updated[activeRentalIndex] = { ...r, title: { ...r.title, en: e.target.value } };
                              setCmsData({ ...cmsData, rentals: updated });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Guest Capacity</label>
                          <input
                            type="text"
                            value={r.capacity || ''}
                            onChange={(e) => {
                              const updated = [...cmsData.rentals];
                              updated[activeRentalIndex] = { ...r, capacity: e.target.value };
                              setCmsData({ ...cmsData, rentals: updated });
                            }}
                            placeholder="e.g. 100 – 600 Guests"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Description (EN)</label>
                        <textarea
                          rows={4}
                          value={typeof r.desc === 'object' ? r.desc.en : r.desc || ''}
                          onChange={(e) => {
                            const updated = [...cmsData.rentals];
                            updated[activeRentalIndex] = { ...r, desc: { ...r.desc, en: e.target.value } };
                            setCmsData({ ...cmsData, rentals: updated });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white"
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>,
    document.body
  );
}
