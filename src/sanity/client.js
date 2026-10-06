import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Environment variables or fallback default project ID
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'khelatbhawan';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = '2024-01-01';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true, // `true` gives fast cached edge responses for visitors
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) return '';
  // If it's a regular string URL or asset path
  if (typeof source === 'string') return source;
  try {
    return builder.image(source).auto('format').fit('max').url();
  } catch (err) {
    return '';
  }
}
