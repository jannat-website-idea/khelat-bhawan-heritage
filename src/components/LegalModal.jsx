import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, FileText, Download, Upload, CheckCircle2 } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, defaultType = 'privacy', lang = 'en' }) {
  const [activeType, setActiveType] = useState(defaultType);
  const [customContent, setCustomContent] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const isBn = lang === 'bn';

  useEffect(() => {
    setActiveType(defaultType);
  }, [defaultType, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    
    // Read text from uploaded file (supports TXT/DOCX text extraction)
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setCustomContent(text);
      }
    };
    reader.readAsText(file);
  };

  const privacyTextEn = `
# Privacy Policy — Khelat Bhawan Heritage Estate
**Last Updated:** October 2026

### 1. Overview & Heritage Custodianship
Khelat Bhawan (Pathuria Ghata Ghosh Bari), established in 1845 and administered under the perpetual trusts (*Lakshmi Narayan Gopal Radha Krishna Jew Trust, Khelat Ghosh Memorial Trust, and Artist Nectar Council of Culture*), is committed to safeguarding the digital privacy and personal data of our visitors, patrons, scholars, and event guests.

### 2. Information We Collect
We collect only the essential personal details necessary to facilitate official communications, heritage visits, and estate reservations:
- **Contact Inquiries:** Name, email address, phone number, and event specifications submitted through our reservation and contact forms.
- **Automated Logging:** Anonymous analytics including browser type, language preferences, and device characteristics to optimize heritage exhibition rendering across screen dimensions.
- **Media Inquiries:** Credentials of researchers, journalists, and classical musicians requesting archival access.

### 3. Purpose of Processing
Your data is used strictly for:
- Responding to heritage reservation requests and issuing official booking references within our 48-hour Concierge SLA.
- Coordinating spiritual festival access (such as Durga Puja Sandhi Puja invitations and Jagadhatri Puja VIP visits).
- Disagreeing with and strictly prohibiting any third-party commercial sale or data brokering.

### 4. Data Security & Storage
All personal data is encrypted in transit and stored in protected databases with dual automated administrative verification. Access is restricted exclusively to authorized trust stewards and estate management.

### 5. Contact & Data Rights
For inquiries regarding your personal information, or to request deletion of your records, contact our estate office at:
- **Email:** councilofculture.ghoshbari47@gmail.com
- **Address:** 47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India
  `;

  const termsTextEn = `
# Terms of Use & Heritage Estate Protocol
**Last Updated:** October 2026

### 1. Acceptance of Terms
By accessing the Khelat Bhawan digital archive and estate services, you agree to comply with all architectural conservation protocols, intellectual property guidelines, and reservation terms outlined herein.

### 2. Heritage Estate Reservations & Conduct
- **Sacred & Living Heritage:** Khelat Bhawan is an active, sanctified 19th-century private palace. All guests and event attendees are expected to maintain reverence and decorum fitting its 175-year cultural legacy.
- **Booking SLA & Verification:** Reservation inquiries submitted via this website are preliminary requests subject to written trust approval and date-block confirmation within 48 hours.
- **Cancellation & Rescheduling:** Event dates may be adjusted in coordination with our concierge team, subject to the ceremonial calendar of family pujas and classical music conventions.

### 3. Visual Archive & Copyright
- All photographic prints, architectural drawings, 3D panoramic displays, and audio/video recordings hosted on this website are protected under Indian and international copyright law.
- Personal and academic use is permitted with appropriate citation. Commercial reproduction or unauthorized filming requires prior written consent from the Khelat Ghosh Memorial Trust.

### 4. Code of Architectural Preservation
For guests attending private weddings, concerts, or shoots on premise:
- No structural alterations, nail insertions, or non-reversible fixtures may be applied to the marble courtyards, Corinthian pillars, or antique Belgian glass chandeliers.
- Smoking, open fire, and unapproved pyrotechnics are strictly prohibited across the heritage mansion.

### 5. Governance & Jurisdiction
These terms shall be governed by the laws of India and the jurisdiction of the courts of Kolkata, West Bengal.
  `;

  const privacyTextBn = `
# গোপনীয়তা নীতি — খেলাৎ ভবন রাজবাড়ি এস্টেট
**সর্বশেষ সংস্করণ:** অক্টোবর ২০২৬

### ১. ভূমিকা ও ঐতিহ্য সংরক্ষণ
১৮৪৫ সালে প্রতিষ্ঠিত পাথুরিয়াঘাটা ঘোষ বাড়ি (খেলাৎ ভবন) এবং এর অধীনে পরিচালিত তিনটি ট্রাস্ট আমাদের ওয়েবসাইটের দর্শক, অনুরাগী ও অতিথিদের ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা ও গোপনীয়তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ।

### ২. সংগৃহীত তথ্যের বিবরণ
- **অনুসন্ধান ও বুকিং:** নাম, ইমেল, ফোন নম্বর এবং অনুষ্ঠানের ধরণ।
- **স্বয়ংক্রিয় তথ্য:** ব্রাউজার ও ডিভাইসের প্রযুক্তিগত বিবরণ যাতে প্রদর্শনী সঠিকভাবে দৃশ্যমান হয়।
- কোনো অবস্থাতেই আপনার তথ্য কোনো তৃতীয় পক্ষের কাছে বাণিজ্যিক উদ্দেশ্যে বিক্রি বা হস্তান্তর করা হয় না।

### ৩. যোগাযোগের ঠিকানা
- **ইমেল:** councilofculture.ghoshbari47@gmail.com
- **ঠিকানা:** ৪৭, পাথুরিয়াঘাটা স্ট্রিট, কলকাতা – ৭০০০১৬
  `;

  const termsTextBn = `
# ব্যবহারের শর্তাবলী ও ঐতিহ্য বিধিমালা
**সর্বশেষ সংস্করণ:** অক্টোবর ২০২৬

### ১. রাজবাড়ি ব্যবহারের নিয়মাবলী
খেলাৎ ভবন একটি জীবন্ত ঐতিহ্য ও পবিত্র দেবস্থান। এখানে আয়োজিত যেকোনো সামাজিক, শাস্ত্রীয় ও সাংস্কৃতিক অনুষ্ঠানে রাজবাড়ির ঐতিহাসিক মর্যাদা ও স্থাপত্যের সুরক্ষা রক্ষা করা বাধ্যতামূলক।

### ২. কপিরাইট ও বৌদ্ধিক সম্পত্তি
ওয়েবসাইটের সমস্ত ছবি, ভিডিও ও ঐতিহাসিক তথ্য খেলাৎ ভবন ট্রাস্টের নিজস্ব সম্পত্তি। বাণিজ্যিক ব্যবহারের পূর্বে লিখিত অনুমতি গ্রহণ আবশ্যক।

### ৩. বুকিং ও নিশ্চয়তা
অনলাইন অনুসন্ধান প্রেরণের পর আমাদের কনসিয়ার্জ টিম পরবর্তী ৪৮ ঘণ্টার মধ্যে বিস্তারিত তথ্যের সাথে যোগাযোগ করবে।
  `;

  const currentText = customContent 
    ? customContent 
    : (activeType === 'privacy' ? (isBn ? privacyTextBn : privacyTextEn) : (isBn ? termsTextBn : termsTextEn));

  return createPortal(
    <div 
      className="fixed inset-0 z-[10001] overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200" 
      onMouseDown={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-card rounded-2xl shadow-2xl border border-border/80 overflow-hidden text-foreground max-h-[90vh] flex flex-col"
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-dialog-title"
      >
        {/* Header Bar */}
        <div className="bg-muted/70 px-6 py-5 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              {activeType === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold block">
                {isBn ? 'আইনি ও নীতিগত সনদ' : 'Legal & Trust Governance'}
              </span>
              <h3 id="legal-dialog-title" className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                {activeType === 'privacy' 
                  ? (isBn ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy') 
                  : (isBn ? 'ব্যবহারের শর্তাবলী (Terms of Use)' : 'Terms of Use')}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-card hover:bg-background text-muted-foreground hover:text-foreground border border-border/60 flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-sm cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Upload Bar */}
        <div className="px-6 py-3 bg-background/50 border-b border-border/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveType('privacy'); setCustomContent(null); }}
              className={`px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeType === 'privacy' && !customContent
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border/60'
              }`}
            >
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </button>
            <button
              onClick={() => { setActiveType('terms'); setCustomContent(null); }}
              className={`px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeType === 'terms' && !customContent
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border/60'
              }`}
            >
              {isBn ? 'শর্তাবলী' : 'Terms of Use'}
            </button>
          </div>

          {/* CMS Upload Hook */}
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card hover:bg-muted/80 text-muted-foreground hover:text-foreground border border-border/60 cursor-pointer transition-colors text-[11px] font-medium">
              <Upload className="w-3.5 h-3.5 text-primary" />
              <span>{isBn ? 'ডকুমেন্ট আপলোড (CMS)' : 'Upload DOCX / PDF'}</span>
              <input 
                type="file" 
                accept=".txt,.docx,.pdf,.md" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
            </label>
            {uploadedFileName && (
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {uploadedFileName}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 font-sans overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
          {currentText}
        </div>

        {/* Footer Actions */}
        <div className="bg-muted/50 px-6 py-4 border-t border-border/60 flex items-center justify-between text-xs">
          <span className="text-muted-foreground font-serif italic">
            Pathuria Ghata Ghosh Bari Trust Governance © 1845–{new Date().getFullYear()}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
