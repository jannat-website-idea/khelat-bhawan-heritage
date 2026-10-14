import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const envContent = fs.readFileSync(".env", "utf8");
const env = Object.fromEntries(envContent.split("\n").filter(l => l.includes("=")).map(l => {
  const idx = l.indexOf("=");
  return [l.slice(0, idx).trim(), l.slice(idx + 1).trim().replace(/^["']|["']$/g, "")];
}));

const client = createClient({
  projectId: env.VITE_SANITY_PROJECT_ID || "4w2m42ab",
  dataset: env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false
});

async function uploadImageIfNeeded(localRelPath) {
  const cleanPath = localRelPath.replace(/^\//, "");
  const fullPath = path.join(rootDir, "public", cleanPath);
  if (!fs.existsSync(fullPath)) {
    console.warn("File not found:", fullPath);
    return null;
  }
  const filename = path.basename(fullPath);
  // Check if asset already exists
  const existing = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]`, { filename });
  if (existing) {
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: existing._id
      }
    };
  }
  // Upload if not exists
  console.log(`Uploading ${filename}...`);
  const asset = await client.assets.upload("image", fs.createReadStream(fullPath), { filename });
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id
    }
  };
}

const FIVE_EVENTS = [
  {
    id: "wedding",
    orderRank: 1,
    title: {
      en: "Wedding Ceremony & Sangeet",
      bn: "ওয়েডিং সিরিমনি ও সঙ্গীত (Wedding Ceremony & Sangeet)"
    },
    category: "wedding",
    guestCapacity: "Up to 1,500 Guests",
    imagePath: "images/SDP_0282.jpg",
    desc: {
      en: "Host timeless royal wedding ceremonies, grand receptions, and vibrant sangeet celebrations in the illuminated Thakur Dalan courtyard and grand ballroom suites.",
      bn: "ঐতিহাসিক ঠাকুর দালান প্রাঙ্গণ ও রাজকীয় মহলে স্মরণীয় বিবাহ, সাড়ম্বর সংবর্ধনা ও আনন্দমুখর সঙ্গীত অনুষ্ঠান আয়োজন।"
    },
    features: [
      "Accommodates up to 1,500 guests across grand courtyards and wings",
      "Exclusive Access to Thakur Dalan Courtyard & Corinthian colonnade",
      "Private Bridal Suite & Royal Dressing Chambers",
      "Heritage Chandelier & Courtyard Lighting",
      "Dedicated Estate Hospitality Liaison"
    ]
  },
  {
    id: "concert",
    orderRank: 2,
    title: {
      en: "Heritage Classical Concert / Soiree",
      bn: "মার্গ সঙ্গীত ও সান্ধ্য জলসা (Heritage Classical Concert / Soiree)"
    },
    category: "concert",
    guestCapacity: "Up to 1,500 Guests",
    imagePath: "images/SDP_0257.jpg",
    desc: {
      en: "Acoustically rich classical Indian concerts, baithaks, poetry recitals, and intimate musical soirees in a 170-year-old aristocratic ambiance.",
      bn: "শাস্ত্রীয় উচ্চাঙ্গ সঙ্গীত, বাচিক অনুষ্ঠান, সাহিত্য সভা ও সঙ্গীত সন্ধ্যার জন্য অনুপম মার্বেল প্রাঙ্গণ।"
    },
    features: [
      "Accommodates up to 1,500 attendees with traditional seating options",
      "Acoustically Reverberant Historic Courtyard with natural resonance",
      "Platform Stage for Classical Virtuosos & Ensembles",
      "Artist green rooms and archival sound & lighting setup",
      "Traditional Carpet & Gaddi Seating Layouts"
    ]
  },
  {
    id: "gala",
    orderRank: 3,
    title: {
      en: "Private Gala / Aristocratic Dinner",
      bn: "অভিজাত নৈশভোজ ও গালা (Private Gala / Aristocratic Dinner)"
    },
    category: "gala",
    guestCapacity: "Up to 1,500 Guests",
    imagePath: "images/SDP_0365.jpg",
    desc: {
      en: "Distinguished private banquets, royal feasts, and aristocratic gala dinners under antique Belgian glass chandeliers and illuminated heritage arches.",
      bn: "বেলজিয়াম কাচের ঝাড়বাতি ও সাবেকি আলোয় সজ্জিত মহলে বিশিষ্ট সান্ধ্যভোজ, রাজকীয় ভোজসভা ও গালা ডিনার।"
    },
    features: [
      "Royal banquet and reception capacity up to 1,500 guests",
      "Grand Courtyard & Banquet Hall Setting with silver-service dining",
      "Ambient evening illumination with antique chandeliers and lanterns",
      "Dedicated estate concierge, valet coordination, and hospitality staff",
      "Bespoke catering liaison and heritage reception suites"
    ]
  },
  {
    id: "cinema",
    orderRank: 4,
    title: {
      en: "Film & Art Photography Shoot",
      bn: "চলচ্চিত্র ও আর্ট ফটোশুট (Film & Art Photography Shoot)"
    },
    category: "cinema",
    guestCapacity: "Cast & Production Crew (Up to 1,500)",
    imagePath: "images/SDP_0344.jpg",
    desc: {
      en: "Authentic 19th-century architectural backdrops for national & international period cinema, documentaries, and editorial fashion shoots.",
      bn: "ঐতিহাসিক চলচ্চিত্র, তথ্যচিত্র ও ফ্যাশন ফটোশুটের জন্য উনিশ শতকের দুর্লভ ঐতিহ্যবাহী প্রাসাদের দৃশ্যপট।"
    },
    features: [
      "1845 Corinthian Colonnade Architecture & Grand Marble Courtyards",
      "Uninterrupted Daylight Courtyard Access",
      "3-Phase High-Amperage Power & Production Green Rooms",
      "Historic Marble Halls & Authentic Period Furniture",
      "Dedicated Hair, Makeup, Wardrobe & Production Coordination Suites"
    ]
  },
  {
    id: "corporate",
    orderRank: 5,
    title: {
      en: "Corporate Cultural Summit",
      bn: "কর্পোরেট কালচারাল সামিট (Corporate Cultural Summit)"
    },
    category: "corporate",
    guestCapacity: "Up to 1,500 Guests",
    imagePath: "images/SDP_0299.jpg",
    desc: {
      en: "Prestigious executive conclaves, corporate summits, flagship product unveilings, and institutional galas amidst 170+ years of aristocratic stature.",
      bn: "ফ্ল্যাগশিপ প্রডাক্ট লঞ্চ, উচ্চপর্যায়ের সম্মেলন ও প্রাতিষ্ঠানিক সমাবেশের জন্য আধুনিক সুবিধা ও ১৭০ বছরের আভিজাত্যের রাজকীয় পরিবেশ।"
    },
    features: [
      "Flexible summit, conference, and banquet capacity up to 1,500 delegates",
      "Exclusive Heritage Licensing, AV infrastructure & High-Amperage Power",
      "VIP Executive Lounge, reception areas & Breakout Colonnade Areas",
      "Full coordination for press briefings, digital showcases & media setups",
      "Bespoke Catering Liaison & High-Protocol Security"
    ]
  }
];

async function main() {
  console.log("Seeding all 5 rental packages into Sanity CMS...");

  // Remove any legacy rental packages that might not match
  const existingDocs = await client.fetch(`*[_type == "rentalPackage"]{ _id }`);
  console.log("Found existing rentalPackage count:", existingDocs.length);

  for (const item of FIVE_EVENTS) {
    const docId = `rental-${item.id}`;
    const imageAsset = await uploadImageIfNeeded(item.imagePath);

    const doc = {
      _id: docId,
      _type: "rentalPackage",
      orderRank: item.orderRank,
      title: item.title,
      category: item.category,
      guestCapacity: item.guestCapacity,
      desc: item.desc,
      features: item.features,
      ...(imageAsset ? { coverImage: imageAsset, heroImage: imageAsset } : {})
    };

    await client.createOrReplace(doc);
    console.log(`✓ Seeded ${docId}: "${item.title.en}" (Order: ${item.orderRank})`);
  }

  // Delete any orphaned rental packages if any exist
  const validIds = FIVE_EVENTS.map(e => `rental-${e.id}`);
  for (const doc of existingDocs) {
    if (!validIds.includes(doc._id)) {
      console.log(`Cleaning up legacy doc ${doc._id}...`);
      await client.delete(doc._id);
    }
  }

  const result = await client.fetch(`*[_type == "rentalPackage"] | order(orderRank asc){ _id, orderRank, title, guestCapacity, "coverUrl": coalesce(coverImage.asset->url, heroImage.asset->url) }`);
  console.log("\nVerified Sanity rental packages:\n", JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
