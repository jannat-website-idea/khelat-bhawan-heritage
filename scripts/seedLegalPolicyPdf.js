import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const client = createClient({
  projectId: 'ncesiy4k',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: 'skerYXQ5piYLH0KgBgzaQLS5jflTdxfzDmDxzp3vobEo78cEgDGQMD3ubgfrfiXVgxjSyfQPxToOsQmBm',
  useCdn: false,
});

async function run() {
  console.log('📜 Seeding Terms & Privacy Policy in Sanity with PDF document uploads...');

  const termsPdfPath = path.join(rootDir, 'public', 'Khelat_Bhawan_Heritage_eBook.pdf');
  const guidelinesPdfPath = path.join(rootDir, 'public', 'Khelat_Bhawan_Brand_Guidelines.pdf');

  console.log('  📤 Uploading Terms PDF...');
  const termsAsset = await client.assets.upload('file', fs.createReadStream(termsPdfPath), {
    filename: 'Khelat_Bhawan_Terms_of_Use_Protocol.pdf'
  });
  console.log(`  ✓ Terms PDF asset created: ${termsAsset._id}`);

  console.log('  📤 Uploading Additional Guidelines PDF...');
  const guidelinesAsset = await client.assets.upload('file', fs.createReadStream(guidelinesPdfPath), {
    filename: 'Khelat_Bhawan_Estate_Guidelines.pdf'
  });
  console.log(`  ✓ Guidelines PDF asset created: ${guidelinesAsset._id}`);

  const legalDoc = {
    _id: 'legalPolicy',
    _type: 'legalPolicy',
    lastUpdated: 'October 2026',
    termsTitle: {
      en: 'Terms of Use & Heritage Estate Protocol',
      bn: 'ব্যবহারের শর্তাবলী ও এস্টেট নীতিমালা'
    },
    termsPdf: {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: termsAsset._id
      }
    },
    termsContent: {
      en: `# Terms of Use & Heritage Estate Protocol
**Last Updated:** October 2026

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
These terms shall be governed by the laws of India and the jurisdiction of the courts of Kolkata, West Bengal.`,
      bn: `# ব্যবহারের শর্তাবলী ও ঐতিহ্য বিধিমালা
**সর্বশেষ সংস্করণ:** অক্টোবর ২০২৬

### ১. রাজবাড়ি ব্যবহারের নিয়মাবলী
খেলাৎ ভবন একটি জীবন্ত ঐতিহ্য ও পবিত্র দেবস্থান। এখানে আয়োজিত যেকোনো সামাজিক, শাস্ত্রীয় ও সাংস্কৃতিক অনুষ্ঠানে রাজবাড়ির ঐতিহাসিক মর্যাদা ও স্থাপত্যের সুরক্ষা রক্ষা করা বাধ্যতামূলক।

### ২. কপিরাইট ও বৌদ্ধিক সম্পত্তি
ওয়েবসাইটের সমস্ত ছবি, ভিডিও ও ঐতিহাসিক তথ্য খেলাৎ ভবন ট্রাস্টের নিজস্ব সম্পত্তি।

### ৩. বুকিং ও নিশ্চয়তা
অনলাইন অনুসন্ধান প্রেরণের পর আমাদের কনসিয়ার্জ টিম পরবর্তী ৪৮ ঘণ্টার মধ্যে বিস্তারিত তথ্যের সাথে যোগাযোগ করবে।`
    },
    privacyTitle: {
      en: 'Privacy Policy — Khelat Bhawan Heritage Estate',
      bn: 'গোপনীয়তা নীতি — খেলাৎ ভবন হেরিটেজ এস্টেট'
    },
    privacyPdf: {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: termsAsset._id
      }
    },
    privacyContent: {
      en: `# Privacy Policy — Khelat Bhawan Heritage Estate
**Last Updated:** October 2026

### 1. Overview & Heritage Custodianship
Khelat Bhawan (Pathuria Ghata Ghosh Bari), established in 1845 and administered under the perpetual trusts (*Lakshmi Narayan Gopal Radha Krishna Jew Trust, Khelat Ghosh Memorial Trust, and Artist Nectar Council of Culture*), is committed to safeguarding the digital privacy and personal data of our visitors, patrons, scholars, and event guests.

### 2. Information We Collect
We collect only the essential personal details necessary to facilitate official communications, heritage visits, and estate reservations:
- **Contact Inquiries:** Name, email address, phone number, and event specifications submitted through our reservation and contact forms.
- **Automated Logging:** Anonymous analytics including browser type, language preferences, and device characteristics.
- **Media Inquiries:** Credentials of researchers, journalists, and classical musicians requesting archival access.

### 3. Purpose of Processing
Your data is used strictly for responding to heritage reservation requests, issuing booking confirmations within 48 hours, and coordinating cultural access. We strictly prohibit any third-party commercial sale or data brokering.

### 4. Data Security & Storage
All personal data is encrypted in transit and stored in protected databases with dual administrative verification.

### 5. Contact & Trust Office
- **Email:** councilofculture.ghoshbari47@gmail.com
- **Address:** 47, Pathuria Ghata Street, Kolkata – 700006, West Bengal, India`,
      bn: `# গোপনীয়তা নীতি — খেলাৎ ভবন রাজবাড়ি এস্টেট
**সর্বশেষ সংস্করণ:** অক্টোবর ২০২৬

### ১. ভূমিকা ও ঐতিহ্য সংরক্ষণ
১৮৪৫ সালে প্রতিষ্ঠিত পাথুরিয়াঘাটা ঘোষ বাড়ি (খেলাৎ ভবন) এবং এর অধীনে পরিচালিত ট্রাস্ট আমাদের ওয়েবসাইটের দর্শক ও অতিথিদের তথ্যের সর্বোচ্চ গোপনীয়তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ।

### ২. সংগৃহীত তথ্যের বিবরণ
- অনুসন্ধান ও বুকিং: নাম, ইমেল, ফোন নম্বর এবং অনুষ্ঠানের বিবরণ।
- কোনো অবস্থাতেই আপনার তথ্য কোনো তৃতীয় পক্ষের কাছে বাণিজ্যিক উদ্দেশ্যে বিক্রি বা হস্তান্তর করা হয় না।

### ৩. যোগাযোগের ঠিকানা
- ইমেল: councilofculture.ghoshbari47@gmail.com
- ঠিকানা: ৪৭, পাথুরিয়াঘাটা স্ট্রিট, কলকাতা – ৭০০০১৬`
    },
    additionalDocuments: [
      {
        _key: 'doc-guidelines',
        title: 'Heritage Estate Brand Guidelines & Architectural Protocols',
        desc: 'Official preservation directives for photographers, cinematographers, and event planners.',
        file: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: guidelinesAsset._id
          }
        }
      }
    ]
  };

  await client.createOrReplace(legalDoc);
  console.log('🎉 Terms & Privacy Policy document successfully updated with PDF attachments in Sanity!');
}

run().catch(err => {
  console.error('Error seeding legal policy PDF:', err);
  process.exit(1);
});
