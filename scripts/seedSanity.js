/**
 * Khelat Bhawan Heritage - Sanity Seeder
 * Run this script to populate initial sample documents into Sanity CMS.
 * Usage: SANITY_AUTH_TOKEN="your_token" node scripts/seedSanity.js
 */

import { createClient } from '@sanity/client';
import { defaultEventsData } from '../src/data/eventsData.js';

const token = process.env.SANITY_AUTH_TOKEN;
const projectId = process.env.SANITY_PROJECT_ID || '4w2m42ab';
const dataset = process.env.SANITY_DATASET || 'production';

if (!token) {
  console.log('ℹ️  No SANITY_AUTH_TOKEN provided. If you want to auto-seed default items, create a Write token in Sanity Manage (https://sanity.io/manage/project/4w2m42ab/api) and run:');
  console.log('   SANITY_AUTH_TOKEN="your_token_here" node scripts/seedSanity.js\n');
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function seed() {
  console.log(`🚀 Starting Sanity seed for project ${projectId} (${dataset})...`);

  // 1. Seed Site Settings
  const settingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    phonePrimary: '+91 98310 12345',
    phoneSecondary: '+91 98300 67890',
    email: 'heritage@khelatbhawan.com',
    address: 'Khelat Bhawan, 46 Pathuria Ghata Street, Kolkata 700006, West Bengal, India',
    visitingHoursEn: 'Daily: 11:00 AM – 7:00 PM (Prior appointment recommended for heritage tours & meetings)',
    visitingHoursBn: 'প্রতিদিন: বেলা ১১:০০ – সন্ধ্যা ৭:০০ (হেরিটেজ ট্যুর ও সাক্ষাতের জন্য পূর্বানুমতি কাম্য)',
    googleMapsUrl: 'https://share.google/TFFurvjijjI8QM8eg'
  };
  await client.createOrReplace(settingsDoc);
  console.log('✅ Site Settings configured.');

  // 2. Seed Events
  for (const event of defaultEventsData) {
    const doc = {
      _id: `event-${event.id}`,
      _type: 'event',
      id: event.id,
      category: event.category || 'heritage',
      featured: Boolean(event.featured),
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      badge: event.badge,
      desc: event.desc,
      highlights: event.highlights || [],
      whatsappMessage: event.whatsappMessage || ''
    };
    await client.createOrReplace(doc);
    console.log(`✅ Seeded event: ${event.title.en}`);
  }

  console.log('\n🎉 Sanity CMS successfully pre-populated!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err.message);
});
