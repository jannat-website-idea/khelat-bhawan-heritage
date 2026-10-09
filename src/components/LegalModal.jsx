import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, FileText, Download, ExternalLink, FileCheck, Paperclip } from 'lucide-react';
import { sanityClient } from '../sanity/client';
import { LEGAL_POLICY_QUERY } from '../sanity/queries';

export default function LegalModal({ isOpen, onClose, defaultType = 'privacy', lang = 'en' }) {
  const [activeType, setActiveType] = useState(defaultType);
  const [sanityPolicy, setSanityPolicy] = useState(null);
  const isBn = lang === 'bn';

  useEffect(() => {
    sanityClient.fetch(LEGAL_POLICY_QUERY)
      .then((data) => {
        if (data) setSanityPolicy(data);
      })
      .catch((err) => {
        console.warn('Sanity legal policy fallback:', err);
      });
  }, [isOpen]);

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

  const fallbackPrivacyTextEn = `
# Privacy Policy — Khelat Bhawan Heritage Estate
**Last Updated:** ${sanityPolicy?.lastUpdated || 'October 2026'}

### 1. Overview & Heritage Custodianship
Khelat Bhawan (Pathuria Ghata Ghosh Bari), established in 1845 and administered under the perpetual trusts (*Lakshmi Narayan Gopal Radha Krishna Jew Trust, Khelat Ghosh Memorial Trust, and Artist Nectar Council of Culture*), is committed to safeguarding the digital privacy and personal data of our visitors, patrons, scholars, and event guests.

### 2. Information We Collect
We collect only the essential personal details necessary to facilitate official communications, heritage visits, and estate reservations:
- **Contact Inquiries:** Name, email address, phone number, and event specifications submitted through our reservation and contact forms.
- **Automated Logging:** Anonymous analytics including browser type, language preferences, and device characteristics to optimize heritage exhibition rendering across screen dimensions.
- **Media Inquiries:** Credentials of researchers, journalists, and classical musicians requesting archival access.

### 3. Purpose of Processing
Your data is used strictly for responding to heritage reservation requests, issuing booking confirmations within 48 hours, and coordinating cultural access. We strictly prohibit any third-party commercial sale or data brokering.

### 4. Data Security & Stewardship
All personal data is encrypted in transit and stored in protected databases with dual administrative verification.

### 5. Contact & Trust Office
- **Email:** councilofculture.ghoshbari47@gmail.com
- **Address:** 47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India
  `;

  const fallbackTermsTextEn = `
# Terms of Use & Heritage Estate Protocol
**Last Updated:** ${sanityPolicy?.lastUpdated || 'October 2026'}

### 1. Acceptance of Terms
By accessing the Khelat Bhawan digital archive and estate services, you agree to comply with all architectural conservation protocols, intellectual property guidelines, and reservation terms outlined herein.

### 2. Heritage Estate Reservations & Conduct
- **Sacred & Living Heritage:** Khelat Bhawan is an active, sanctified 19th-century private palace. All guests and event attendees are expected to maintain reverence and decorum fitting its 175-year cultural legacy.
- **Booking SLA & Verification:** Reservation inquiries submitted via this website are preliminary requests subject to written trust approval and date-block confirmation within 48 hours.
- **Cancellation & Rescheduling:** Event dates may be adjusted in coordination with our concierge team, subject to the ceremonial calendar of family pujas and classical music conventions.

### 3. Visual Archive & Copyright
- All photographic prints, architectural drawings, 3D panoramic displays, and audio/video recordings hosted on this website are protected under Indian and international copyright law.
- Commercial reproduction or filming requires prior written consent from the Khelat Ghosh Memorial Trust.

### 4. Code of Architectural Preservation
For guests attending private weddings, concerts, or shoots on premise:
- No structural alterations, nail insertions, or non-reversible fixtures may be applied to the marble courtyards, Corinthian pillars, or antique Belgian glass chandeliers.
- Smoking, open fire, and unapproved pyrotechnics are strictly prohibited across the heritage mansion.

### 5. Governance & Jurisdiction
These terms shall be governed by the laws of India and the jurisdiction of the courts of Kolkata, West Bengal.
  `;

  const fallbackPrivacyTextBn = `
# গোপনীয়তা নীতি — খেলাৎ ভবন রাজবাড়ি এস্টেট
**সর্বশেষ সংস্করণ:** ${sanityPolicy?.lastUpdated || 'অক্টোবর ২০২৬'}

### ১. ভূমিকা ও ঐতিহ্য সংরক্ষণ
১৮৪৫ সালে প্রতিষ্ঠিত পাথুরিয়াঘাটা ঘোষ বাড়ি (খেলাৎ ভবন) এবং এর অধীনে পরিচালিত ট্রাস্ট আমাদের ওয়েবসাইটের দর্শক ও অতিথিদের তথ্যের সর্বোচ্চ গোপনীয়তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ।

### ২. সংগৃহীত তথ্যের বিবরণ
- অনুসন্ধান ও বুকিং: নাম, ইমেল, ফোন নম্বর এবং অনুষ্ঠানের বিবরণ।
- কোনো অবস্থাতেই আপনার তথ্য কোনো তৃতীয় পক্ষের কাছে বাণিজ্যিক উদ্দেশ্যে বিক্রি বা হস্তান্তর করা হয় না।

### ৩. যোগাযোগের ঠিকানা
- ইমেল: councilofculture.ghoshbari47@gmail.com
- ঠিকানা: ৪৭, পাথুরিয়াঘাটা স্ট্রিট, কলকাতা – ৭০০০১৬
  `;

  const fallbackTermsTextBn = `
# ব্যবহারের শর্তাবলী ও ঐতিহ্য বিধিমালা
**সর্বশেষ সংস্করণ:** ${sanityPolicy?.lastUpdated || 'অক্টোবর ২০২৬'}

### ১. রাজবাড়ি ব্যবহারের নিয়মাবলী
খেলাৎ ভবন একটি জীবন্ত ঐতিহ্য ও পবিত্র দেবস্থান। এখানে আয়োজিত যেকোনো সামাজিক, শাস্ত্রীয় ও সাংস্কৃতিক অনুষ্ঠানে রাজবাড়ির ঐতিহাসিক মর্যাদা ও স্থাপত্যের সুরক্ষা রক্ষা করা বাধ্যতামূলক।

### ২. কপিরাইট ও বৌদ্ধিক সম্পত্তি
ওয়েবসাইটের সমস্ত ছবি, ভিডিও ও ঐতিহাসিক তথ্য খেলাৎ ভবন ট্রাস্টের নিজস্ব সম্পত্তি।

### ৩. বুকিং ও নিশ্চয়তা
অনলাইন অনুসন্ধান প্রেরণের পর আমাদের কনসিয়ার্জ টিম পরবর্তী ৪৮ ঘণ্টার মধ্যে বিস্তারিত তথ্যের সাথে যোগাযোগ করবে।
  `;

  const livePrivacyText = isBn 
    ? (sanityPolicy?.privacyContent?.bn || fallbackPrivacyTextBn)
    : (sanityPolicy?.privacyContent?.en || fallbackPrivacyTextEn);

  const liveTermsText = isBn 
    ? (sanityPolicy?.termsContent?.bn || fallbackTermsTextBn)
    : (sanityPolicy?.termsContent?.en || fallbackTermsTextEn);

  const currentText = activeType === 'privacy' ? livePrivacyText : liveTermsText;
  
  // Active PDF file uploaded via Sanity CMS
  const activePdfUrl = activeType === 'terms' ? sanityPolicy?.termsPdfUrl : sanityPolicy?.privacyPdfUrl;
  const activePdfFilename = activeType === 'terms' 
    ? (sanityPolicy?.termsPdfFilename || 'Khelat_Bhawan_Terms_of_Use.pdf') 
    : (sanityPolicy?.privacyPdfFilename || 'Khelat_Bhawan_Privacy_Policy.pdf');

  const additionalDocs = sanityPolicy?.additionalDocuments || [];

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
                  ? (isBn ? 'গোপনীয়তা নীতি (Privacy Policy)' : (sanityPolicy?.privacyTitle?.en || 'Privacy Policy')) 
                  : (isBn ? 'ব্যবহারের শর্তাবলী (Terms of Use)' : (sanityPolicy?.termsTitle?.en || 'Terms of Use'))}
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

        {/* Policy tabs */}
        <div className="px-6 py-3 bg-background/50 border-b border-border/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveType('privacy')}
              className={`px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeType === 'privacy'
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border/60'
              }`}
            >
              {isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
            </button>
            <button
              onClick={() => setActiveType('terms')}
              className={`px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeType === 'terms'
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border/60'
              }`}
            >
              {isBn ? 'শর্তাবলী' : 'Terms of Use'}
            </button>
          </div>

          {/* CMS-Uploaded Official PDF Download Button */}
          {activePdfUrl && (
            <a
              href={activePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={activePdfFilename}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/30 transition-all font-medium text-xs shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isBn ? 'অফিশিয়াল পিডিএফ ডাউনলোড করুন' : 'Download Official PDF'}</span>
            </a>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 font-sans overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed text-foreground/90">
          
          {/* Highlight banner if PDF is attached from CMS */}
          {activePdfUrl && (
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground text-xs sm:text-sm">
                    {isBn ? 'অনুমোদিত আইনি নথি সংযুক্ত' : 'Official Legal Document Attached'}
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    {activePdfFilename} • {isBn ? 'খেলাৎ ভবন ট্রাস্টের স্বাক্ষরিত নথি' : 'Approved by Khelat Bhawan Trust Office'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-card hover:bg-background border border-border text-foreground text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isBn ? 'দেখুন' : 'View PDF'}</span>
                </a>
                <a
                  href={activePdfUrl}
                  download={activePdfFilename}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
                </a>
              </div>
            </div>
          )}

          {/* Body Text */}
          <div className="whitespace-pre-line space-y-3">
            {currentText}
          </div>

          {/* Additional CMS Documents Section if uploaded */}
          {additionalDocs && additionalDocs.length > 0 && (
            <div className="pt-6 border-t border-border/50">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-primary mb-3 flex items-center gap-2">
                <Paperclip className="w-4 h-4" />
                {isBn ? 'অন্যান্য সম্পর্কিত আইনি নথি ও ফর্ম' : 'Additional Legal Forms & Guidelines'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {additionalDocs.map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate text-foreground">{doc.title}</p>
                      {doc.desc && <p className="text-[10px] text-muted-foreground truncate">{doc.desc}</p>}
                    </div>
                    {doc.fileUrl && (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={doc.filename || 'Document.pdf'}
                        className="p-2 rounded-lg bg-card hover:bg-background border border-border text-primary shrink-0 transition-colors"
                        aria-label="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
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
