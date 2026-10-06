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
  badge,
  desc,
  highlights,
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
  "src": mediaFile.asset->url,
  "preview": previewImage.asset->url,
  category,
  title,
  desc,
  photographer,
  year
}`;

export const FEEDBACK_QUERY = `*[_type == "feedback" && isApproved == true] | order(_createdAt desc) {
  _id,
  name,
  rating,
  visitType,
  review,
  date
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  phonePrimary,
  phoneSecondary,
  email,
  address,
  googleMapsUrl,
  visitingHoursEn,
  visitingHoursBn
}`;
