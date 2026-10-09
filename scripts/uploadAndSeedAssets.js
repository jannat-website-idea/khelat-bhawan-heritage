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

async function uploadImageToSanity(relPath) {
  const cleanPath = relPath.replace(/^\//, '');
  const fullPath = path.join(rootDir, 'public', cleanPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return null;
  }
  try {
    const filename = path.basename(fullPath);
    const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
      filename: filename
    });
    console.log(`  📸 Uploaded asset: ${filename} -> ${asset._id}`);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (err) {
    console.error(`  ❌ Failed to upload ${relPath}:`, err.message);
    return null;
  }
}

async function run() {
  console.log('🚀 Uploading & Seeding Visual Assets into Sanity Project (ncesiy4k)...');

  // 1. HERO SECTION
  console.log('\n🏛️ Seeding Hero Section with uploaded images & banners...');
  const heroImageAsset = await uploadImageToSanity('images/hero-rajbari.jpg');
  const banner1 = await uploadImageToSanity('images/SDP_0344.jpg');
  const banner2 = await uploadImageToSanity('images/SDP_0337.jpg');
  const banner3 = await uploadImageToSanity('images/SDP_0305.jpg');

  await client.createOrReplace({
    _id: 'heroSection',
    _type: 'heroSection',
    headlineFirstLine: 'Khelat Bhawan',
    headlineSecondLine: 'Living Heritage of Pathuria Ghata Ghosh Bari',
    headlineBn: 'পাথুরিয়াঘাটা ঘোষ বাড়ির জীবন্ত ঐতিহ্য',
    subheadlineEn: 'An imperial 19th-century palace where timeless Bengali aristocracy, grand Corinthian colonnades, and 171 years of continuous Durga Puja live on.',
    subheadlineBn: 'ঊনবিংশ শতাব্দীর এক রাজকীয় ঐতিহ্যবাহী প্রাসাদ—যেখানে করিন্থিয়ান স্থাপত্য, সুরের মূর্ছনা এবং ১৭১ বছরের ঐতিহ্যবাহী দুর্গাপূজা আজও বহমান।',
    heroImage: heroImageAsset,
    heroVideoUrl: 'https://khelatbhawan.com/Videos/drone_hero.mp4',
    heroBanners: [
      {
        _key: 'banner-1',
        caption: 'Grand Courtyard & Classical Colonnades',
        bannerImage: banner1
      },
      {
        _key: 'banner-2',
        caption: 'Nat Mandir & Sacred Durga Puja Sanctuary',
        bannerImage: banner2
      },
      {
        _key: 'banner-3',
        caption: 'Belgian Chandeliers & Aristocratic Grandeur',
        bannerImage: banner3
      }
    ].filter(b => b.bannerImage),
    primaryCtaText: 'Explore Heritage',
    secondaryCtaText: 'Book Heritage Rental'
  });
  console.log('  ✓ Hero Section Document & Banners Updated!');

  // 2. VISUAL GALLERY ITEMS (Attach photo assets to all gallery-photo-photo-01..12 and named items)
  console.log('\n🖼️ Uploading & Linking Photo Assets to all gallery items...');
  const photoMap = {
    'gallery-photo-photo-01': 'images/SDP_0344.jpg',
    'gallery-photo-photo-02': 'images/SDP_0282.jpg',
    'gallery-photo-photo-03': 'images/SDP_0337.jpg',
    'gallery-photo-photo-04': 'images/SDP_0323.jpg',
    'gallery-photo-photo-05': 'images/hero-rajbari.jpg',
    'gallery-photo-photo-06': 'images/SDP_0305.jpg',
    'gallery-photo-photo-07': 'images/SDP_0291.jpg',
    'gallery-photo-photo-08': 'images/SDP_0320.jpg',
    'gallery-photo-photo-09': 'images/SDP_0331.jpg',
    'gallery-photo-photo-10': 'images/SDP_0352.jpg',
    'gallery-photo-photo-11': 'images/SDP_0391.jpg',
    'gallery-photo-photo-12': 'images/SDP_0409.jpg'
  };

  for (const [docId, imgPath] of Object.entries(photoMap)) {
    const asset = await uploadImageToSanity(imgPath);
    if (asset) {
      await client.patch(docId).set({ image: asset, previewImage: asset }).commit();
      console.log(`  ✓ Attached image asset to ${docId}`);
    }
  }

  // 3. EVENTS HERO IMAGES
  console.log('\n🎪 Uploading event images...');
  const event1Img = await uploadImageToSanity('images/SDP_0337.jpg');
  const event2Img = await uploadImageToSanity('images/SDP_0282.jpg');
  const event3Img = await uploadImageToSanity('images/SDP_0344.jpg');

  await client.patch('event-durga-puja-2026').set({ image: event1Img }).commit();
  await client.patch('event-classical-music-soiree').set({ image: event2Img }).commit();
  await client.patch('event-heritage-walk-architecture').set({ image: event3Img }).commit();
  console.log('  ✓ Updated Event documents with image assets');

  // 4. RENTAL PACKAGES IMAGES
  console.log('\n🏰 Uploading rental package images...');
  const pkg1Img = await uploadImageToSanity('images/SDP_0344.jpg');
  const pkg2Img = await uploadImageToSanity('images/SDP_0282.jpg');
  const pkg3Img = await uploadImageToSanity('images/SDP_0331.jpg');

  await client.patch('rental-wedding').set({ heroImage: pkg1Img }).commit();
  await client.patch('rental-concert').set({ heroImage: pkg2Img }).commit();
  await client.patch('rental-cinema').set({ heroImage: pkg3Img }).commit();
  console.log('  ✓ Updated Rental Package documents with image assets');

  console.log('\n🎉 ALL ASSETS & GALLERIES SUCCESSFULLY UPLOADED AND LINKED IN SANITY!');
}

run().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
