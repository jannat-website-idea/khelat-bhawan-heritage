import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Save, RotateCcw, Plus, Trash2, Edit3, Image, Video, 
  Calendar, Clock, MapPin, Sparkles, Shield, CheckCircle2, 
  Star, Eye, EyeOff, UploadCloud, MessageSquare, Phone, Mail, 
  FileText, Check, AlertCircle, XCircle, RefreshCw, Inbox, User, Layers,
  ListPlus, ChevronLeft, ChevronRight
} from 'lucide-react';
import { getCMSData, saveCMSData, resetCMSData } from '../data/cmsStore';
import { 
  getEnquiries, 
  approveReservation, 
  rejectReservation, 
  cancelAndReallocateReservation 
} from '../data/enquiriesStore';

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

const BENGALI_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];
const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const toBengaliNumber = (num) => String(num).replace(/[0-9]/g, (d) => BENGALI_DIGITS[d]);

export default function AdminCMSDashboard({ isOpen, onClose }) {
  // 6 Sections: events, rentals, feedback, gallery, settings, legal
  const [activeSection, setActiveSection] = useState('events');
  const [cmsData, setCmsData] = useState(getCMSData);
  const [enquiriesList, setEnquiriesList] = useState(getEnquiries);
  const [rentalSubTab, setRentalSubTab] = useState('enquiries'); // 'enquiries' or 'packages'
  
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activeRentalIndex, setActiveRentalIndex] = useState(0);
  const [activeEnquiryIndex, setActiveEnquiryIndex] = useState(0);
  const [activeFeedbackIndex, setActiveFeedbackIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [notification, setNotification] = useState('');

  // Event Calendar Picker state
  const [showEventDatePicker, setShowEventDatePicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth());
  const [rangeStartDate, setRangeStartDate] = useState(null);

  // New highlight input state
  const [newHighlightText, setNewHighlightText] = useState('');

  // Rejection reason prompt state
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionTargetId, setRejectionTargetId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCmsData(getCMSData());
      setEnquiriesList(getEnquiries());
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

  useEffect(() => {
    const handleEnqUpdate = (e) => {
      setEnquiriesList(e.detail || getEnquiries());
    };
    window.addEventListener('khelat_enquiries_updated', handleEnqUpdate);
    return () => window.removeEventListener('khelat_enquiries_updated', handleEnqUpdate);
  }, []);

  if (!isOpen) return null;

  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
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
      galleryImages: ['/images/SDP_0282.jpg'],
      badge: { en: 'Special Event', bn: 'বিশেষ অনুষ্ঠান' },
      desc: { en: 'Share details of the celebration here.', bn: 'অনুষ্ঠানের বিস্তারিত বিবরণ এখানে লিখুন।' },
      highlights: { 
        en: ['Classical Music Baithak', 'Heritage Architecture Walk', 'Illuminated Courtyard'], 
        bn: ['শাস্ত্রীয় সঙ্গীত সন্ধ্যা', 'ঐতিহ্য পরিক্রমা', 'আলোকোজ্জ্বল প্রাঙ্গণ'] 
      },
      whatsappNumber: '9831093021'
    };
    const updated = [newEv, ...(cmsData.events || [])];
    setCmsData({ ...cmsData, events: updated });
    setActiveEventIndex(0);
    notify('➕ New event added! You can now edit its details, dates, and highlights.');
  };

  const deleteEvent = (idx) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updated = (cmsData.events || []).filter((_, i) => i !== idx);
      setCmsData({ ...cmsData, events: updated });
      setActiveEventIndex(0);
      notify('🗑️ Event deleted!');
    }
  };

  // Event Calendar Picker Actions
  const handleSelectEventCalendarDay = (day) => {
    const selectedDate = new Date(pickerYear, pickerMonth, day);
    const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (!rangeStartDate) {
      // Single date select or first date of range
      const enDateStr = `${monthNamesEn[pickerMonth]} ${day}, ${pickerYear}`;
      const bnDateStr = `${toBengaliNumber(day)} ${BENGALI_MONTHS[pickerMonth]}, ${toBengaliNumber(pickerYear)}`;
      
      updateEventField(activeEventIndex, 'date', enDateStr, 'en');
      updateEventField(activeEventIndex, 'date', bnDateStr, 'bn');
      setRangeStartDate(selectedDate);
      notify(`📅 Date set to ${enDateStr}! Click another day if selecting a date range.`);
    } else {
      // Complete range
      const startDay = rangeStartDate.getDate();
      const startMonth = rangeStartDate.getMonth();
      const startYear = rangeStartDate.getFullYear();
      
      let enRange = '';
      let bnRange = '';
      
      if (startMonth === pickerMonth && startYear === pickerYear) {
        const minDay = Math.min(startDay, day);
        const maxDay = Math.max(startDay, day);
        enRange = `${monthNamesEn[pickerMonth]} ${minDay} – ${maxDay}, ${pickerYear}`;
        bnRange = `${toBengaliNumber(minDay)} – ${toBengaliNumber(maxDay)} ${BENGALI_MONTHS[pickerMonth]}, ${toBengaliNumber(pickerYear)}`;
      } else {
        enRange = `${monthNamesEn[startMonth]} ${startDay}, ${startYear} – ${monthNamesEn[pickerMonth]} ${day}, ${pickerYear}`;
        bnRange = `${toBengaliNumber(startDay)} ${BENGALI_MONTHS[startMonth]}, ${toBengaliNumber(startYear)} – ${toBengaliNumber(day)} ${BENGALI_MONTHS[pickerMonth]}, ${toBengaliNumber(pickerYear)}`;
      }

      updateEventField(activeEventIndex, 'date', enRange, 'en');
      updateEventField(activeEventIndex, 'date', bnRange, 'bn');
      setRangeStartDate(null);
      setShowEventDatePicker(false);
      notify(`📅 Date range set to: ${enRange}`);
    }
  };

  // Highlights handlers
  const addEventHighlight = (idx) => {
    if (!newHighlightText.trim()) return;
    const ev = cmsData.events[idx];
    const currentHighlightsEn = Array.isArray(ev?.highlights?.en) 
      ? ev.highlights.en 
      : Array.isArray(ev?.highlights) 
      ? ev.highlights 
      : [];
    
    const updatedHighlightsEn = [...currentHighlightsEn, newHighlightText.trim()];
    
    const updatedEvents = [...cmsData.events];
    updatedEvents[idx] = {
      ...ev,
      highlights: {
        ...(ev.highlights || {}),
        en: updatedHighlightsEn
      }
    };
    
    setCmsData({ ...cmsData, events: updatedEvents });
    setNewHighlightText('');
    notify('✨ New highlight bullet added!');
  };

  const deleteEventHighlight = (eventIdx, highlightIdx) => {
    const ev = cmsData.events[eventIdx];
    const currentHighlightsEn = Array.isArray(ev?.highlights?.en) 
      ? ev.highlights.en 
      : Array.isArray(ev?.highlights) 
      ? ev.highlights 
      : [];
    
    const updatedHighlightsEn = currentHighlightsEn.filter((_, i) => i !== highlightIdx);
    
    const updatedEvents = [...cmsData.events];
    updatedEvents[eventIdx] = {
      ...ev,
      highlights: {
        ...(ev.highlights || {}),
        en: updatedHighlightsEn
      }
    };
    
    setCmsData({ ...cmsData, events: updatedEvents });
    notify('🗑️ Highlight removed!');
  };

  // ==========================================
  // 2. RESERVATION ENQUIRIES ACTIONS
  // ==========================================
  const handleApproveEnquiry = async (enquiryId) => {
    await approveReservation(enquiryId);
    setEnquiriesList(getEnquiries());
    notify('✅ Reservation APPROVED! Date is now BLOCKED on the website calendar & confirmation email dispatched.');
  };

  const openRejectModal = (enquiryId) => {
    setRejectionTargetId(enquiryId);
    setRejectionReason('Date conflict with scheduled temple ceremonies / private conservation.');
    setRejectionModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectionTargetId) return;
    await rejectReservation(rejectionTargetId, rejectionReason);
    setEnquiriesList(getEnquiries());
    setRejectionModalOpen(false);
    notify('❌ Reservation REJECTED. Polite notification email sent to the guest.');
  };

  const handleCancelAndReallocate = async (enquiryId) => {
    if (window.confirm('Cancel this booking and REALLOCATE the date slot on the live calendar for other guests?')) {
      await cancelAndReallocateReservation(enquiryId);
      setEnquiriesList(getEnquiries());
      notify('🔄 Booking CANCELLED & REALLOCATED! The date is now available on the live website calendar.');
    }
  };

  // ==========================================
  // 2B. RENTAL PACKAGES HANDLERS
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

  const pendingEnquiriesCount = enquiriesList.filter(e => e.status === 'pending').length;

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
                  Full CRUD & Booking Moderation Active
                </span>
              </div>
              <p className="text-[11px] text-[#f0e8d8]/60 font-sans">
                Interactive event calendar date picker, multiple key highlights manager, booking approval & email dispatch.
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
          
          {/* NAVIGATION SIDEBAR: 6 STREAMLINED SECTIONS */}
          <aside className="w-64 sm:w-72 bg-black/50 border-r border-white/10 p-3 space-y-1.5 overflow-y-auto shrink-0">
            <div className="text-[10px] uppercase font-mono tracking-widest text-[#d8ae62] px-3 py-2 font-bold">
              CMS Sections (6 Active)
            </div>

            {[
              { id: 'events', label: '🎪 Events & Celebrations', count: (cmsData.events || []).length },
              { 
                id: 'rentals', 
                label: '🏰 Reservations & Bookings', 
                badge: pendingEnquiriesCount > 0 ? `${pendingEnquiriesCount} New` : `${enquiriesList.length}` 
              },
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
                {tab.badge ? (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    pendingEnquiriesCount > 0 ? 'bg-amber-500 text-black animate-pulse' : 'bg-white/10 text-[#d8ae62]'
                  }`}>
                    {tab.badge}
                  </span>
                ) : tab.count !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-[#d8ae62] font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-6 px-3 text-[11px] text-[#f0e8d8]/50 space-y-2 border-t border-white/10 mt-6">
              <p className="font-semibold text-[#d8ae62]">💡 Events & Highlights:</p>
              <p>• <strong>Calendar Picker:</strong> Select Month, Year, and Date to auto-format event dates.</p>
              <p>• <strong>Highlights Manager:</strong> Add multiple key bullet points with individual delete options.</p>
              <p>• <strong>Photo Upload:</strong> Upload main cover banner and additional event photos.</p>
            </div>
          </aside>

          {/* EDITOR WORKSPACE */}
          <main className="flex-1 p-6 overflow-y-auto bg-black/20">
            
            {/* =========================================================================
                1. EVENTS & CELEBRATIONS (WITH CALENDAR PICKER & MULTI-HIGHLIGHTS)
               ========================================================================= */}
            {activeSection === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#d8ae62]">🎪 Events & Celebrations</h3>
                    <p className="text-xs text-[#f0e8d8]/60">Select or add an event. Use the interactive calendar date picker and add multiple key highlights.</p>
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
                      onClick={() => {
                        setActiveEventIndex(i);
                        setShowEventDatePicker(false);
                      }}
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
                  const highlightsList = Array.isArray(ev?.highlights?.en) 
                    ? ev.highlights.en 
                    : Array.isArray(ev?.highlights) 
                    ? ev.highlights 
                    : [];

                  const daysInPickerMonth = new Date(pickerYear, pickerMonth + 1, 0).getDate();
                  const firstDayInPickerMonth = new Date(pickerYear, pickerMonth, 1).getDay();

                  return (
                    <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-6">
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

                      {/* ============================================================
                          CALENDAR DATE PICKER SEGMENT FOR EVENTS
                         ============================================================ */}
                      <div className="p-4 rounded-xl bg-black/50 border border-[#d8ae62]/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#d8ae62]" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                              Event Date & Calendar Selector
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowEventDatePicker(!showEventDatePicker)}
                            className="px-3 py-1 rounded-lg bg-[#5a1722] hover:bg-[#721d2b] border border-[#d8ae62]/40 text-[11px] text-[#f5efe6] font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{showEventDatePicker ? 'Hide Calendar' : 'Open Interactive Calendar'}</span>
                          </button>
                        </div>

                        {/* Dropdown / Interactive Calendar Drawer */}
                        {showEventDatePicker && (
                          <div className="p-4 rounded-xl bg-[#1a0f0a] border border-[#d8ae62]/40 space-y-3 animate-in fade-in duration-200">
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                              <span className="text-[11px] text-[#d8ae62] font-semibold">
                                Select Month & Year to Pick Single Date or Range:
                              </span>
                              
                              <div className="flex items-center gap-2">
                                <select
                                  value={pickerMonth}
                                  onChange={(e) => setPickerMonth(Number(e.target.value))}
                                  className="px-2.5 py-1 rounded bg-black/70 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                                >
                                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, idx) => (
                                    <option key={m} value={idx}>{m}</option>
                                  ))}
                                </select>

                                <select
                                  value={pickerYear}
                                  onChange={(e) => setPickerYear(Number(e.target.value))}
                                  className="px-2.5 py-1 rounded bg-black/70 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                                >
                                  {[2026, 2027, 2028, 2029, 2030].map(y => (
                                    <option key={y} value={y}>{y}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Calendar Days Grid */}
                            <div>
                              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-[#d8ae62]/80 uppercase mb-1">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                  <div key={d}>{d}</div>
                                ))}
                              </div>

                              <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: firstDayInPickerMonth }).map((_, i) => (
                                  <div key={`cal-pad-${i}`} className="h-7" />
                                ))}
                                {Array.from({ length: daysInPickerMonth }).map((_, i) => {
                                  const day = i + 1;
                                  return (
                                    <button
                                      key={`day-${day}`}
                                      type="button"
                                      onClick={() => handleSelectEventCalendarDay(day)}
                                      className="h-7 rounded text-xs font-mono font-semibold bg-white/5 hover:bg-[#d8ae62] hover:text-[#2c1208] text-white border border-white/10 transition-colors flex items-center justify-center cursor-pointer"
                                    >
                                      {day}
                                    </button>
                                  );
                                })}
                              </div>
                              <p className="text-[10px] text-white/50 mt-2">
                                💡 Tip: Click once to set a single date. Click a second day to create a multi-day date range.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Direct Editable Text Inputs for Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="block text-[11px] font-semibold text-white/80 mb-1">
                              Event Date Display (English)
                            </label>
                            <input
                              type="text"
                              value={ev.date?.en || ''}
                              onChange={(e) => updateEventField(activeEventIndex, 'date', e.target.value, 'en')}
                              placeholder="e.g. October 18 – 22, 2026"
                              className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62] font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-white/80 mb-1">
                              Event Date Display (Bengali)
                            </label>
                            <input
                              type="text"
                              value={ev.date?.bn || ''}
                              onChange={(e) => updateEventField(activeEventIndex, 'date', e.target.value, 'bn')}
                              placeholder="e.g. ১৮ – ২২ অক্টোবর, ২০২৬"
                              className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Timings, Location & Category Badge */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-white/80">Event Cultural Badge</label>
                          <input
                            type="text"
                            value={ev.badge?.en || ''}
                            onChange={(e) => updateEventField(activeEventIndex, 'badge', e.target.value, 'en')}
                            placeholder="e.g. Flagship Cultural Festival"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                        </div>
                      </div>

                      {/* ============================================================
                          MULTIPLE KEY HIGHLIGHTS SEGMENT (ADD, EDIT, DELETE)
                         ============================================================ */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/15 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ListPlus className="w-4 h-4 text-[#d8ae62]" />
                            <span className="text-xs font-bold text-[#d8ae62] uppercase tracking-wider font-mono">
                              Key Highlights Segment ({highlightsList.length} Highlights)
                            </span>
                          </div>
                          <span className="text-[10px] text-white/50">Add multiple bullet points</span>
                        </div>

                        {/* Existing Highlights List with Delete options */}
                        <div className="space-y-2">
                          {highlightsList.map((hl, hIdx) => (
                            <div 
                              key={`hl-${hIdx}`}
                              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs"
                            >
                              <div className="flex items-center gap-2 flex-1">
                                <span className="w-2 h-2 rounded-full bg-[#d8ae62] shrink-0" />
                                <span className="text-white font-medium">{hl}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => deleteEventHighlight(activeEventIndex, hIdx)}
                                className="w-7 h-7 rounded-lg bg-red-900/40 hover:bg-red-800 text-red-300 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                                title="Delete this highlight"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add New Highlight Row */}
                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="text"
                            value={newHighlightText}
                            onChange={(e) => setNewHighlightText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addEventHighlight(activeEventIndex);
                              }
                            }}
                            placeholder="Enter a new key highlight (e.g. 171-year Ekchala Idol, Classical Sarod recital)..."
                            className="flex-1 px-3.5 py-2 rounded-xl bg-black/70 border border-white/20 text-xs text-white outline-none focus:border-[#d8ae62]"
                          />
                          <button
                            type="button"
                            onClick={() => addEventHighlight(activeEventIndex)}
                            className="px-4 py-2 rounded-xl bg-[#5a1722] hover:bg-[#721d2b] border border-[#d8ae62]/50 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Highlight</span>
                          </button>
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
                2. RESERVATIONS & BOOKINGS (INQUIRIES INBOX + PACKAGES)
               ========================================================================= */}
            {activeSection === 'rentals' && (
              <div className="space-y-6">
                
                {/* SUB-NAVIGATION: INBOX vs PACKAGES */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#d8ae62]">🏰 Reservations & Booking Control</h3>
                    <p className="text-xs text-[#f0e8d8]/60">Review booking enquiries in read-only mode, approve/reject, auto-block dates, or cancel & reallocate slots.</p>
                  </div>
                  
                  <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/15">
                    <button
                      onClick={() => setRentalSubTab('enquiries')}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        rentalSubTab === 'enquiries'
                          ? 'bg-[#d8ae62] text-[#2c1208] font-bold shadow'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Inbox className="w-3.5 h-3.5" />
                      <span>Booking Enquiries Inbox</span>
                      {pendingEnquiriesCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-bold">
                          {pendingEnquiriesCount}
                        </span>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setRentalSubTab('packages')}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        rentalSubTab === 'packages'
                          ? 'bg-[#d8ae62] text-[#2c1208] font-bold shadow'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Rental Packages ({cmsData.rentals?.length || 0})</span>
                    </button>
                  </div>
                </div>

                {/* VIEW 1: LIVE BOOKING ENQUIRIES INBOX */}
                {rentalSubTab === 'enquiries' && (
                  <div className="space-y-5">
                    
                    {/* Enquiry List Bar */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {enquiriesList.map((enq, i) => {
                        const isPending = enq.status === 'pending';
                        const isApproved = enq.status === 'approved';
                        const isRejected = enq.status === 'rejected';
                        const isCancelled = enq.status === 'cancelled';

                        let badge = '⏳ Pending';
                        let badgeBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                        if (isApproved) {
                          badge = '✅ Booked';
                          badgeBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
                        } else if (isRejected) {
                          badge = '❌ Rejected';
                          badgeBg = 'bg-red-500/20 text-red-300 border-red-500/40';
                        } else if (isCancelled) {
                          badge = '🔄 Reallocated';
                          badgeBg = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
                        }

                        return (
                          <button
                            key={enq.id || i}
                            onClick={() => setActiveEnquiryIndex(i)}
                            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex flex-col items-start gap-1 shrink-0 transition-all cursor-pointer border ${
                              activeEnquiryIndex === i
                                ? 'bg-white/15 border-[#d8ae62] text-white shadow-lg'
                                : 'bg-black/40 border-white/10 text-white/70 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{enq.name}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${badgeBg}`}>
                                {badge}
                              </span>
                            </div>
                            <div className="text-[10px] text-white/50 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#d8ae62]" />
                              <span>{enq.preferredDate || 'Date not set'}</span>
                              <span>•</span>
                              <span>{enq.reference}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Enquiry Detailed Read-Only View */}
                    {enquiriesList[activeEnquiryIndex] && (() => {
                      const enq = enquiriesList[activeEnquiryIndex];
                      const isPending = enq.status === 'pending';
                      const isApproved = enq.status === 'approved';
                      const isRejected = enq.status === 'rejected';
                      const isCancelled = enq.status === 'cancelled';

                      return (
                        <div className="bg-white/5 border border-white/15 rounded-2xl p-6 space-y-6">
                          
                          {/* Header with Reference & Status */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-[#d8ae62] px-2.5 py-1 bg-black/60 rounded border border-[#d8ae62]/40">
                                  REF #{enq.reference}
                                </span>
                                <h4 className="text-base font-bold text-white">{enq.name}</h4>
                              </div>
                              <div className="text-[11px] text-white/50 mt-1">
                                Submitted on: {new Date(enq.receivedAt || Date.now()).toLocaleString()}
                              </div>
                            </div>

                            {/* Current Status Badge */}
                            <div>
                              {isPending && (
                                <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-500/50 text-xs font-bold flex items-center gap-1.5">
                                  <Clock className="w-4 h-4" />
                                  <span>Pending Review</span>
                                </span>
                              )}
                              {isApproved && (
                                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-500/50 text-xs font-bold flex items-center gap-1.5">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  <span>Approved & Booked (Date Blocked on Live Calendar)</span>
                                </span>
                              )}
                              {isRejected && (
                                <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-200 border border-red-500/50 text-xs font-bold flex items-center gap-1.5">
                                  <XCircle className="w-4 h-4 text-red-400" />
                                  <span>Rejected (Notification Sent)</span>
                                </span>
                              )}
                              {isCancelled && (
                                <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-200 border border-blue-500/50 text-xs font-bold flex items-center gap-1.5">
                                  <RefreshCw className="w-4 h-4 text-blue-400" />
                                  <span>Cancelled (Date Slot Freed & Reallocated)</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Read-Only Guest & Event Information Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
                            <div>
                              <div className="text-[10px] uppercase font-mono tracking-wider text-[#d8ae62] font-semibold">Guest Name</div>
                              <div className="text-white font-medium mt-0.5">{enq.name}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase font-mono tracking-wider text-[#d8ae62] font-semibold">Email Address</div>
                              <div className="text-white font-medium mt-0.5">{enq.email}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase font-mono tracking-wider text-[#d8ae62] font-semibold">Phone Number</div>
                              <div className="text-white font-medium mt-0.5">{enq.phone}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase font-mono tracking-wider text-[#d8ae62] font-semibold">Requested Date</div>
                              <div className="text-[#d8ae62] font-bold mt-0.5 text-sm">{enq.preferredDate || 'Not specified'}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase font-mono tracking-wider text-white/60 font-semibold">Event / Experience Type</div>
                              <div className="text-white font-medium mt-0.5">{enq.eventType}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase font-mono tracking-wider text-white/60 font-semibold">Estimated Guests</div>
                              <div className="text-white font-medium mt-0.5">{enq.guests || '100 – 300'}</div>
                            </div>
                            <div className="sm:col-span-2">
                              <div className="text-[10px] uppercase font-mono tracking-wider text-white/60 font-semibold">Concierge Notes</div>
                              <div className="text-white/80 italic mt-0.5">{enq.notes || 'None'}</div>
                            </div>
                          </div>

                          {/* Read-Only Guest Message */}
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-[#d8ae62]">Special Inquiries & Event Requirements (Read-Only)</label>
                            <div className="w-full p-3.5 rounded-xl bg-black/60 border border-white/20 text-xs text-white/90 leading-relaxed font-sans">
                              {enq.message || 'No special requirements supplied.'}
                            </div>
                          </div>

                          {/* ACTION BUTTONS & AUTOMATED EMAIL STATUS */}
                          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <div className="text-xs text-white/60">
                              Automated email notifications trigger immediately upon status change.
                            </div>

                            <div className="flex items-center gap-3">
                              
                              {/* Approve Button */}
                              {enq.status !== 'approved' && (
                                <button
                                  type="button"
                                  onClick={() => handleApproveEnquiry(enq.id)}
                                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-105"
                                >
                                  <Check className="w-4 h-4" />
                                  <span>Approve & Block Date on Calendar</span>
                                </button>
                              )}

                              {/* Reject Button */}
                              {enq.status !== 'rejected' && (
                                <button
                                  type="button"
                                  onClick={() => openRejectModal(enq.id)}
                                  className="px-4 py-2.5 rounded-xl bg-red-900/80 hover:bg-red-800 text-red-200 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                  <span>Reject Enquiry</span>
                                </button>
                              )}

                              {/* Cancel & Reallocate Button (If already approved or active) */}
                              {enq.status === 'approved' && (
                                <button
                                  type="button"
                                  onClick={() => handleCancelAndReallocate(enq.id)}
                                  className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-blue-200 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-105"
                                  title="Frees up the date on the live calendar so other guests can book it"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Cancel Booking & Reallocate Slot</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* VIEW 2: RENTAL PACKAGES MANAGEMENT */}
                {rentalSubTab === 'packages' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <h4 className="text-base font-bold text-white">Experience Packages & Inclusions</h4>
                        <p className="text-xs text-[#f0e8d8]/60">Edit titles, guest capacity, photos, descriptions, and inclusions for wedding, cinema, and concert packages.</p>
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

        {/* MODAL: REJECTION REASON PROMPT */}
        {rejectionModalOpen && (
          <div className="fixed inset-0 z-[100001] bg-black/80 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#1c120c] border border-red-800/60 rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <XCircle className="w-5 h-5" />
                <span>Decline Reservation Enquiry</span>
              </div>
              <p className="text-xs text-[#f0e8d8]/70">
                Please provide the reason for declining. A polite, formal email will be sent automatically to the guest explaining the status.
              </p>
              <div>
                <label className="block text-xs font-semibold text-[#d8ae62] mb-1">Reason for Decline</label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-xs text-white outline-none focus:border-red-500"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectionModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-xs text-white font-bold cursor-pointer"
                >
                  Send Polite Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
