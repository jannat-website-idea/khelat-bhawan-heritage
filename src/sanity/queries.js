// GROQ queries for Sanity CMS
export const EVENTS_QUERY = `*[_type == "event"] | order(orderRank asc, date.en desc) {
  _id,
  id,
  category,
  featured,
  title,
  date,
  time,
  location,
  "image": image.asset->url,
  "galleryImages": galleryImages[].asset->url,
  badge,
  desc,
  highlights,
  whatsappNumber,
  whatsappMessage
}`;

export const TIMELINE_QUERY = `*[_type == "timeline"] | order(year asc) {
  _id,
  year,
  era,
  title,
  desc,
  "image": image.asset->url
}`;

export const GALLERY_QUERY = `*[_type == "galleryItem"] | order(orderRank asc) {
  _id,
  mediaType,
  "src": coalesce(image.asset->url, videoFile.asset->url, videoUrl, mediaFile.asset->url),
  "preview": coalesce(previewImage.asset->url, image.asset->url),
  category,
  title,
  desc,
  photographer,
  year,
  orderRank
}`;

export const ABOUT_QUERY = `*[_type == "aboutPage"][0] {
  _id,
  title,
  subtitle,
  historyOverview,
  architectureHighlights[] {
    featureTitleEn,
    featureTitleBn,
    featureDescEn,
    featureDescBn,
    "image": image.asset->url
  }
}`;

export const FOUNDER_QUERY = `*[_type == "founder"][0] {
  _id,
  name,
  years,
  "portrait": portrait.asset->url,
  biography,
  patronageHighlights
}`;

export const TRUSTEES_QUERY = `*[_type == "trustee"] | order(orderRank asc) {
  _id,
  name,
  role,
  orderRank,
  "photo": photo.asset->url,
  bio
}`;

export const RENTAL_QUERY = `*[_type == "rentalPackage"] | order(orderRank asc, _createdAt asc) {
  _id,
  title,
  category,
  orderRank,
  "coverImage": coalesce(coverImage.asset->url, heroImage.asset->url),
  guestCapacity,
  desc,
  features
}`;

export const APPROVED_RESERVATION_DATES_QUERY = `*[
  _type == "reservationEnquiry" &&
  status == "approved" &&
  defined(preferredDate)
].preferredDate`;

export const CALENDAR_BLOCKS_QUERY = `{
  "reservationDates": *[
    _type == "reservationEnquiry" &&
    status == "approved" &&
    defined(preferredDate)
  ].preferredDate,
  "eventRanges": *[_type == "event" && defined(date)] {
    "start": date.start,
    "end": coalesce(date.end, date.start),
    "label": coalesce(date.en, date.bn, string(date))
  }
}`;

export const CALENDAR_BLOCKS_LISTEN_QUERY = `*[_type in ["event", "reservationEnquiry"]]`;

export const FEEDBACK_QUERY = `*[_type == "feedback" && isApproved == true] | order(_createdAt desc) {
  _id,
  name,
  rating,
  visitType,
  review,
  date
}`;

export const FEEDBACK_LISTEN_QUERY = `*[_type == "feedback"]`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  "heroVideoDesktop": heroVideoDesktop.asset->url,
  "heroVideoMobile": heroVideoMobile.asset->url,
  "heroPoster": heroPoster.asset->url,
  phonePrimary,
  phoneSecondary,
  email,
  address,
  googleMapsUrl,
  visitingHoursEn,
  visitingHoursBn
}`;

export const HERO_SECTION_QUERY = `*[_type == "heroSection"][0] {
  headlineFirstLine,
  headlineSecondLine,
  headlineBn,
  subheadlineEn,
  subheadlineBn,
  "heroImage": heroImage.asset->url,
  "heroVideoFile": heroVideoFile.asset->url,
  heroVideoUrl,
  primaryCtaText,
  secondaryCtaText
}`;

export const LEGAL_POLICY_QUERY = `*[_type == "legalPolicy"][0] {
  privacyTitle,
  privacyContent,
  termsTitle,
  termsContent,
  lastUpdated,
  "termsPdfUrl": termsPdf.asset->url,
  "termsPdfFilename": termsPdf.asset->originalFilename,
  "termsPdfSize": termsPdf.asset->size,
  "privacyPdfUrl": privacyPdf.asset->url,
  "privacyPdfFilename": privacyPdf.asset->originalFilename,
  "privacyPdfSize": privacyPdf.asset->size,
  "additionalDocuments": additionalDocuments[] {
    title,
    desc,
    "fileUrl": file.asset->url,
    "filename": file.asset->originalFilename,
    "size": file.asset->size
  }
}`;


