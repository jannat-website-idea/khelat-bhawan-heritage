import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Edit2, Trash2, RotateCcw, Check, Sparkles, Calendar, Clock, MapPin, Image, Tag, FileText, AlertTriangle } from 'lucide-react';
import { getAssetUrl } from '../utils/assetHelper';
import { isPastEvent } from '../data/eventsData';

const PRESET_IMAGES = [
  { label: 'Durga Puja Thakur Dalan', path: '/images/unnamed_6.webp' },
  { label: 'Classical Music Courtyard', path: '/images/SDP_0282.jpg' },
  { label: 'Architecture Walk / Facade', path: '/images/SDP_0344.jpg' },
  { label: 'Courtyard Arches Night', path: '/images/SDP_0291.jpg' },
  { label: 'Sanctified Room / Blessing', path: '/images/rk01.png' },
  { label: 'Nat Mandir / Workshop', path: '/images/unnamed_12.webp' },
  { label: 'Grand Colonnade Corridor', path: '/images/khelat-bhawan-colonnade-corridor.jpg' },
  { label: 'Vintage Estate Hall', path: '/images/SDP_0365.jpg' },
];

const emptyEventForm = {
  id: '',
  category: 'upcoming',
  featured: false,
  titleEn: '',
  titleBn: '',
  dateEn: '',
  dateBn: '',
  timeEn: '',
  timeBn: '',
  locationEn: 'Pathuria Ghata Ghosh Bari, Khelat Bhawan',
  locationBn: 'পাথুরিয়াঘাটা ঘোষ বাড়ি, খেলাৎ ভবন',
  image: '/images/unnamed_6.webp',
  badgeEn: 'Flagship Cultural Festival',
  badgeBn: 'প্রধান সাংস্কৃতিক উৎসব',
  descEn: '',
  descBn: '',
  highlightsEn: '',
  highlightsBn: '',
  whatsappMessage: ''
};

export default function EventManagerModal({
  isOpen,
  onClose,
  events,
  onSaveEvent,
  onDeleteEvent,
  onResetDefaults,
  lang = 'en'
}) {
  const isBn = lang === 'bn';
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'form'
  const [editingEventId, setEditingEventId] = useState(null);
  const [formData, setFormData] = useState(emptyEventForm);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notification, setNotification] = useState('');

  if (!isOpen) return null;

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleStartAdd = () => {
    setEditingEventId(null);
    setFormData({
      ...emptyEventForm,
      id: `event-${Date.now()}`
    });
    setActiveTab('form');
  };

  const handleStartEdit = (event) => {
    setEditingEventId(event.id);
    setFormData({
      id: event.id,
      category: event.category || 'upcoming',
      featured: !!event.featured,
      titleEn: typeof event.title === 'object' ? event.title.en : event.title || '',
      titleBn: typeof event.title === 'object' ? event.title.bn : '',
      dateEn: typeof event.date === 'object' ? event.date.en : event.date || '',
      dateBn: typeof event.date === 'object' ? event.date.bn : '',
      timeEn: typeof event.time === 'object' ? event.time.en : event.time || '',
      timeBn: typeof event.time === 'object' ? event.time.bn : '',
      locationEn: typeof event.location === 'object' ? event.location.en : event.location || '',
      locationBn: typeof event.location === 'object' ? event.location.bn : '',
      image: event.image || '/images/unnamed_6.webp',
      badgeEn: typeof event.badge === 'object' ? event.badge.en : event.badge || '',
      badgeBn: typeof event.badge === 'object' ? event.badge.bn : '',
      descEn: typeof event.desc === 'object' ? event.desc.en : event.desc || '',
      descBn: typeof event.desc === 'object' ? event.desc.bn : '',
      highlightsEn: event.highlights?.en ? event.highlights.en.join('\n') : '',
      highlightsBn: event.highlights?.bn ? event.highlights.bn.join('\n') : '',
      whatsappMessage: event.whatsappMessage || ''
    });
    setActiveTab('form');
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.titleEn.trim()) {
      alert('Please enter an Event Title in English');
      return;
    }
    if (!formData.dateEn.trim()) {
      alert('Please enter an Event Date in English (e.g. November 14, 2026)');
      return;
    }

    const newEvent = {
      id: formData.id || `event-${Date.now()}`,
      category: formData.category,
      featured: formData.featured,
      title: {
        en: formData.titleEn.trim(),
        bn: formData.titleBn.trim() || formData.titleEn.trim()
      },
      date: {
        en: formData.dateEn.trim(),
        bn: formData.dateBn.trim() || formData.dateEn.trim()
      },
      time: {
        en: formData.timeEn.trim() || 'All Day',
        bn: formData.timeBn.trim() || 'সারাদিন'
      },
      location: {
        en: formData.locationEn.trim() || 'Khelat Bhawan',
        bn: formData.locationBn.trim() || 'খেলাৎ ভবন'
      },
      image: formData.image.trim() || '/images/unnamed_6.webp',
      badge: {
        en: formData.badgeEn.trim() || 'Cultural Event',
        bn: formData.badgeBn.trim() || 'সাংস্কৃতিক অনুষ্ঠান'
      },
      desc: {
        en: formData.descEn.trim(),
        bn: formData.descBn.trim() || formData.descEn.trim()
      },
      highlights: {
        en: formData.highlightsEn.split('\n').map(s => s.trim()).filter(Boolean),
        bn: formData.highlightsBn.split('\n').map(s => s.trim()).filter(Boolean)
      },
      whatsappMessage: formData.whatsappMessage.trim() || `Hello, I would like to enquire about ${formData.titleEn.trim()} at Khelat Bhawan.`
    };

    onSaveEvent(newEvent);
    showNotification(editingEventId ? 'Event updated successfully!' : 'New event added successfully!');
    setActiveTab('list');
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#140b08] text-[#f5efe6] border border-[#d8ae62]/50 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#d8ae62]/20 flex items-center justify-between bg-[#1e100c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#8a2034] text-[#d8ae62] flex items-center justify-center border border-[#d8ae62]/40 shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                {isBn ? 'ইভেন্ট ও সাংস্কৃতিক ক্যালেন্ডার ব্যবস্থাপনা' : 'Events & Cultural Calendar Manager'}
              </h2>
              <p className="text-[11px] text-[#d8ae62] font-sans">
                {isBn ? 'ইভেন্ট যোগ করুন, সম্পাদনা করুন বা বাতিল করুন' : 'Add, Edit, Update or Delete Heritage Events'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8a2034] text-white flex items-center justify-center transition-all border border-white/20 hover:border-[#d8ae62]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className="bg-emerald-900/90 text-emerald-100 px-6 py-2 text-xs font-semibold flex items-center gap-2 border-b border-emerald-500/40 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="px-6 pt-3 pb-2 border-b border-[#d8ae62]/20 flex items-center justify-between gap-3 bg-[#180e0a]">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                activeTab === 'list'
                  ? 'bg-[#8a2034] text-white border border-[#d8ae62]'
                  : 'bg-white/5 text-[#d8ae62] hover:bg-white/10 border border-transparent'
              }`}
            >
              {isBn ? `সকল ইভেন্ট (${events.length})` : `All Events (${events.length})`}
            </button>
            <button
              onClick={handleStartAdd}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'form' && !editingEventId
                  ? 'bg-[#8a2034] text-white border border-[#d8ae62]'
                  : 'bg-emerald-800/80 text-white hover:bg-emerald-700 border border-emerald-500/40'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? 'নতুন ইভেন্ট যোগ করুন' : '+ Add New Event'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset events to the default list? Any custom edits will be reverted.')) {
                onResetDefaults();
                showNotification('Events reset to default collection!');
              }
            }}
            className="text-[11px] text-[#f0e8d8]/60 hover:text-[#d8ae62] flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-white/5"
            title="Restore original default events"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isBn ? 'ডিফল্ট রিসেট' : 'Reset Defaults'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'list' ? (
            /* Events List View */
            <div className="space-y-4">
              {events.map((ev, idx) => {
                const isPast = isPastEvent(ev);
                const titleStr = typeof ev.title === 'object' ? ev.title.en : ev.title;
                const dateStr = typeof ev.date === 'object' ? ev.date.en : ev.date;
                const timeStr = typeof ev.time === 'object' ? ev.time.en : ev.time;
                const badgeStr = typeof ev.badge === 'object' ? ev.badge.en : ev.badge;

                return (
                  <div
                    key={ev.id || idx}
                    className="p-4 rounded-xl bg-[#1e100c]/80 border border-[#d8ae62]/30 hover:border-[#d8ae62] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={getAssetUrl(ev.image)}
                        alt={titleStr}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-[#d8ae62]/30 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8a2034] text-white font-semibold">
                            {badgeStr || 'Event'}
                          </span>
                          {isPast ? (
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-700 text-stone-200 font-semibold border border-stone-500/50">
                              Past Event
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-100 font-semibold border border-emerald-500/50">
                              Upcoming
                            </span>
                          )}
                          {ev.featured && (
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              Featured
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-base font-bold text-white leading-snug">
                          {titleStr}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-[#d8ae62]">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#d8ae62]" /> {dateStr}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#d8ae62]" /> {timeStr}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                      <button
                        onClick={() => handleStartEdit(ev)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#d8ae62]/10 hover:bg-[#d8ae62] text-[#d8ae62] hover:text-black text-xs font-semibold transition-all flex items-center gap-1 border border-[#d8ae62]/40"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      {deleteConfirmId === ev.id ? (
                        <div className="flex items-center gap-1.5 bg-red-950/80 p-1 rounded-lg border border-red-500/40">
                          <button
                            onClick={() => {
                              onDeleteEvent(ev.id);
                              setDeleteConfirmId(null);
                              showNotification('Event deleted successfully.');
                            }}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1 text-white/70 hover:text-white text-[11px]"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(ev.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/70 text-red-300 hover:text-red-100 text-xs font-semibold transition-all flex items-center gap-1 border border-red-800/40"
                          title="Delete event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Add / Edit Form */
            <form onSubmit={handleSubmitForm} className="space-y-6">
              <div className="bg-[#1e100c] p-4 rounded-xl border border-[#d8ae62]/30 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#d8ae62] flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  <span>{editingEventId ? 'Edit Heritage Event' : 'Add New Heritage Event'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="text-xs text-[#f0e8d8]/70 hover:text-white underline"
                >
                  ← Back to Events List
                </button>
              </div>

              {/* Title Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider">
                    Event Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="e.g. 172nd Annual Durga Puja Celebration"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider">
                    Event Title (Bengali)
                  </label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                    placeholder="e.g. ১৭২তম বার্ষিক দুর্গাপূজা মহোৎসব"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Date & Time Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Event Date (English) *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dateEn}
                    onChange={(e) => setFormData({ ...formData, dateEn: e.target.value })}
                    placeholder="e.g. October 18 – 22, 2026 or November 14, 2026"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                  <p className="text-[10px] text-[#f0e8d8]/60">
                    Dates in the past are automatically recognized and badged as Past Events.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Event Time (English)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.timeEn}
                    onChange={(e) => setFormData({ ...formData, timeEn: e.target.value })}
                    placeholder="e.g. 5:30 PM – 9:30 PM or All Day"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Bengali Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider">
                    Event Date (Bengali)
                  </label>
                  <input
                    type="text"
                    value={formData.dateBn}
                    onChange={(e) => setFormData({ ...formData, dateBn: e.target.value })}
                    placeholder="e.g. ১৮ – ২২ অক্টোবর, ২০২৬"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider">
                    Event Time (Bengali)
                  </label>
                  <input
                    type="text"
                    value={formData.timeBn}
                    onChange={(e) => setFormData({ ...formData, timeBn: e.target.value })}
                    placeholder="e.g. সন্ধ্যা ৫:৩০ – রাত ৯:৩০"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Location & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Location (English)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.locationEn}
                    onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
                    placeholder="e.g. Thakur Dalan, Khelat Bhawan"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Badge Tag (English)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.badgeEn}
                    onChange={(e) => setFormData({ ...formData, badgeEn: e.target.value })}
                    placeholder="e.g. Flagship Festival, Musical Heritage, Guided Tour"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5" />
                  <span>Event Photo (Select Preset or Enter Image Path)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.path })}
                      className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                        formData.image === img.path
                          ? 'border-[#d8ae62] ring-2 ring-[#d8ae62] scale-102'
                          : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={getAssetUrl(img.path)} alt={img.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                        <span className="text-[10px] text-white leading-tight font-medium drop-shadow">{img.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Or enter custom image path / URL e.g. /images/SDP_0282.jpg"
                  className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none mt-2"
                />
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Description (English)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.descEn}
                    onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                    placeholder="Detailed description of the heritage event..."
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Description (Bengali)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.descBn}
                    onChange={(e) => setFormData({ ...formData, descBn: e.target.value })}
                    placeholder="অনুষ্ঠানের বিস্তারিত বিবরণ বাংলায়..."
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Highlights (One per line) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider">
                    Key Highlights (English - 1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.highlightsEn}
                    onChange={(e) => setFormData({ ...formData, highlightsEn: e.target.value })}
                    placeholder="Traditional Ekchala Idol&#10;108 Deepam Sandhi Puja&#10;Classical Dhaki Performance"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider">
                    Key Highlights (Bengali - 1 per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.highlightsBn}
                    onChange={(e) => setFormData({ ...formData, highlightsBn: e.target.value })}
                    placeholder="ঐতিহ্যবাহী একচালা প্রতিমা&#10;১০৮ প্রদীপের সন্ধিপূজা&#10;শাস্ত্রীয় ঢাকের বাদন"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Checkboxes & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-[#d8ae62] text-[#8a2034] focus:ring-[#d8ae62]"
                  />
                  <label htmlFor="featuredCheckbox" className="text-xs font-semibold text-[#f0e8d8]">
                    Feature this event with gold badge
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#d8ae62] uppercase tracking-wider">
                    WhatsApp Enquiry Text
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappMessage}
                    onChange={(e) => setFormData({ ...formData, whatsappMessage: e.target.value })}
                    placeholder="Pre-filled message when visitor clicks WhatsApp button"
                    className="w-full bg-[#120705] border border-[#d8ae62]/40 focus:border-[#d8ae62] rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#d8ae62]/30">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-white text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#8a2034] hover:bg-[#a42a42] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg border border-[#d8ae62]"
                >
                  {editingEventId ? 'Save Changes' : 'Publish Event'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
