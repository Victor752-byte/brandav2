import type { MarketCode } from "./markets";
import { rates } from "./markets";
export type Category = "Digital" | "Gifts" | "Create" | "Studio" | "Prints";
export type Service = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  discount?: number;
  image: string;
  gallery: string[];
  included: string[];
  turnaround: string;
  popularity: number;
  industry: string[];
  urgency: "Standard" | "Express";
  variations: string[];
  related: string[];
  complementary: string[];
};
const raw: Service[] = [
  {
    id: "s1",
    slug: "logo-design",
    name: "Logo Design",
    category: "Digital",
    description:
      "A distinctive mark that gives your business a confident first impression. Created by a dedicated brand designer, ready for every touchpoint.",
    price: 180000,
    discount: 15,
    image:
      "https://images.unsplash.com/photo-1634942536790-2539dbf2e4a7?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1634942536790-2539dbf2e4a7",
      "photo-1626785774573-4b799315345d",
    ],
    included: [
      "3 original logo concepts",
      "Two revision rounds",
      "Full colour and monochrome files",
      "PNG, SVG and print-ready PDF",
    ],
    turnaround: "5–7 business days",
    popularity: 98,
    industry: ["Technology", "Real estate", "Food & drink"],
    urgency: "Express",
    variations: ["Essential", "Signature", "Studio"],
    related: ["brand-identity", "social-media-design", "packaging-design"],
    complementary: ["business-cards", "branded-mugs"],
  },
  {
    id: "s2",
    slug: "brand-identity",
    name: "Brand Identity",
    category: "Digital",
    description:
      "A thoughtful visual system that makes your brand unmistakable, from colour and type to the way your story shows up.",
    price: 420000,
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1634942537034-2531766767d1",
      "photo-1634942536790-2539dbf2e4a7",
    ],
    included: [
      "Logo suite and usage guide",
      "Colour and typography system",
      "Brand voice foundations",
      "Social avatar and cover artwork",
    ],
    turnaround: "10–14 business days",
    popularity: 94,
    industry: ["Technology", "Beauty", "Real estate"],
    urgency: "Standard",
    variations: ["Core", "Complete", "Signature"],
    related: ["logo-design", "packaging-design", "social-media-design"],
    complementary: ["business-cards", "event-backdrops"],
  },
  {
    id: "s3",
    slug: "branded-mugs",
    name: "Branded Mugs",
    category: "Gifts",
    description:
      "Everyday ceramic mugs, finished with your brand. A considered gift for teams, clients and the coffee table.",
    price: 8500,
    discount: 10,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1514228742587-6b1558fcca3d",
      "photo-1509042239860-f550ce710b93",
    ],
    included: [
      "Premium 330ml ceramic mug",
      "Full colour wrap print",
      "Gift-ready protective packaging",
      "Minimum order of 25 units",
    ],
    turnaround: "7–10 business days",
    popularity: 89,
    industry: ["Corporate", "Food & drink", "Technology"],
    urgency: "Express",
    variations: ["25 mugs", "50 mugs", "100 mugs"],
    related: ["t-shirts", "business-cards", "flyers"],
    complementary: ["logo-design", "brand-identity"],
  },
  {
    id: "s4",
    slug: "business-cards",
    name: "Business Cards",
    category: "Prints",
    description:
      "A beautifully tactile introduction to your business. Designed with intention and printed on heavyweight stocks.",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1507238691740-187a5b1d37b8",
      "photo-1589330694653-ded6df03f754",
    ],
    included: [
      "Custom front and back design",
      "500 premium 400gsm cards",
      "Matte or soft-touch finish",
      "Print-ready artwork supplied",
    ],
    turnaround: "4–6 business days",
    popularity: 92,
    industry: ["Professional services", "Real estate", "Beauty"],
    urgency: "Express",
    variations: ["Classic", "Soft-touch", "Foil finish"],
    related: ["logo-design", "brand-identity", "flyers"],
    complementary: ["event-backdrops", "branded-mugs"],
  },
  {
    id: "s5",
    slug: "event-backdrops",
    name: "Event Backdrops",
    category: "Prints",
    description:
      "Make the room feel like yours. Large-format branded backdrops for launches, conferences and celebrations.",
    price: 240000,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1492684223066-81342ee5ff30",
      "photo-1511578314322-379afb476865",
    ],
    included: [
      "Custom event artwork",
      "Fabric or tension-fabric print",
      "Lightweight reusable frame",
      "Carry bag and setup guide",
    ],
    turnaround: "8–12 business days",
    popularity: 77,
    industry: ["Events", "Corporate", "Entertainment"],
    urgency: "Standard",
    variations: ["2m × 2m", "3m × 2.3m", "Custom size"],
    related: ["flyers", "business-cards", "product-photography"],
    complementary: ["brand-identity", "logo-design"],
  },
  {
    id: "s6",
    slug: "social-media-design",
    name: "Social Media Design",
    category: "Digital",
    description:
      "A flexible set of branded templates that keeps every post looking like it came from the same place.",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1611162617474-5b21e879e113",
      "photo-1611162616305-c69b3fa7fbe0",
    ],
    included: [
      "12 editable post templates",
      "6 story layouts",
      "Canva template link",
      "Quick-start brand posting guide",
    ],
    turnaround: "5–8 business days",
    popularity: 91,
    industry: ["Beauty", "Food & drink", "Technology"],
    urgency: "Express",
    variations: ["12 posts", "24 posts", "Monthly set"],
    related: ["logo-design", "brand-identity", "product-photography"],
    complementary: ["flyers", "packaging-design"],
  },
  {
    id: "s7",
    slug: "t-shirts",
    name: "Branded T-Shirts",
    category: "Gifts",
    description:
      "Comfortable, well-made tees with your brand front and centre. Made for teams, events and the everyday.",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1521572163474-6864f9cf17ab",
      "photo-1503342217505-b0a15ec3261c",
    ],
    included: [
      "Premium cotton crew neck",
      "Screen or direct-to-garment print",
      "Size run XS–XXL",
      "Minimum order of 20 units",
    ],
    turnaround: "8–12 business days",
    popularity: 86,
    industry: ["Corporate", "Entertainment", "Events"],
    urgency: "Standard",
    variations: ["20 tees", "50 tees", "100 tees"],
    related: ["branded-mugs", "event-backdrops", "flyers"],
    complementary: ["logo-design", "brand-identity"],
  },
  {
    id: "s8",
    slug: "flyers",
    name: "Flyers & Brochures",
    category: "Prints",
    description:
      "Print collateral that earns a second look. Clear, considered layouts on paper that feels good to hold.",
    price: 48000,
    image:
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1589330694653-ded6df03f754",
      "photo-1558655146-9f40138edfeb",
    ],
    included: [
      "Custom double-sided layout",
      "500 A5 premium flyers",
      "120gsm silk finish",
      "Print-ready artwork supplied",
    ],
    turnaround: "4–7 business days",
    popularity: 83,
    industry: ["Food & drink", "Events", "Real estate"],
    urgency: "Express",
    variations: ["250 copies", "500 copies", "1,000 copies"],
    related: ["business-cards", "event-backdrops", "social-media-design"],
    complementary: ["logo-design", "brand-identity"],
  },
  {
    id: "s9",
    slug: "product-photography",
    name: "Product Photography",
    category: "Studio",
    description:
      "A considered shoot that makes the details shine. Crisp, versatile product imagery for your shop and campaigns.",
    price: 160000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1542291026-7eec264c27ff",
      "photo-1523275335684-37898b6baf30",
    ],
    included: [
      "Half-day studio session",
      "10 professionally retouched images",
      "Two styled setups",
      "Web and print-ready exports",
    ],
    turnaround: "7–10 business days",
    popularity: 81,
    industry: ["Beauty", "Food & drink", "Retail"],
    urgency: "Standard",
    variations: ["10 images", "20 images", "Campaign day"],
    related: ["packaging-design", "social-media-design", "brand-identity"],
    complementary: ["flyers", "branded-mugs"],
  },
  {
    id: "s10",
    slug: "packaging-design",
    name: "Packaging Design",
    category: "Create",
    description:
      "Packaging that tells your story before the box is even opened. Designed around your product and your people.",
    price: 280000,
    discount: 12,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1602143407151-7111542de6e8",
      "photo-1556228578-0d85b1a4d571",
    ],
    included: [
      "One packaging format",
      "Two design directions",
      "Print-ready dieline artwork",
      "Supplier handoff specifications",
    ],
    turnaround: "8–12 business days",
    popularity: 85,
    industry: ["Beauty", "Food & drink", "Retail"],
    urgency: "Standard",
    variations: ["Single format", "Product range", "Full collection"],
    related: ["brand-identity", "product-photography", "logo-design"],
    complementary: ["business-cards", "flyers"],
  },
  {
    id: "s11",
    slug: "brand-strategy",
    name: "Brand Strategy Session",
    category: "Create",
    description:
      "A focused working session to sharpen your position, audience and next move with an experienced strategist.",
    price: 135000,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1552664730-d307ca884978",
      "photo-1521737711867-e3b97375f902",
    ],
    included: [
      "90-minute facilitated session",
      "Audience and positioning map",
      "Written next-step summary",
      "One follow-up check-in",
    ],
    turnaround: "Booked within 5 days",
    popularity: 75,
    industry: ["Technology", "Professional services", "Retail"],
    urgency: "Express",
    variations: ["Solo founder", "Growing team", "Brand workshop"],
    related: ["brand-identity", "logo-design", "social-media-design"],
    complementary: ["business-cards", "event-backdrops"],
  },
  {
    id: "s12",
    slug: "brand-guidelines",
    name: "Brand Guidelines",
    category: "Digital",
    description:
      "A practical home for your visual identity so your team can use it with confidence and consistency.",
    price: 125000,
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1455390582262-044cdead277a",
      "photo-1558655146-9f40138edfeb",
    ],
    included: [
      "Logo and clear-space rules",
      "Colour and type specifications",
      "Image direction and examples",
      "Shareable PDF guide",
    ],
    turnaround: "5–7 business days",
    popularity: 72,
    industry: ["Technology", "Real estate", "Beauty"],
    urgency: "Standard",
    variations: ["Essentials", "Extended", "Team-ready"],
    related: ["brand-identity", "logo-design", "social-media-design"],
    complementary: ["business-cards", "packaging-design"],
  },
  {
    id: "s13",
    slug: "custom-stationery",
    name: "Custom Stationery Set",
    category: "Prints",
    description:
      "Thoughtful letterheads, envelopes and note cards that make the small moments feel considered.",
    price: 72000,
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1517842645767-c639042777db",
      "photo-1494438639946-1ebd1d20bf85",
    ],
    included: [
      "Letterhead and envelope design",
      "100 printed letterheads",
      "50 matching envelopes",
      "Print-ready file set",
    ],
    turnaround: "6–9 business days",
    popularity: 70,
    industry: ["Professional services", "Real estate", "Corporate"],
    urgency: "Standard",
    variations: ["Starter set", "Complete set", "Executive set"],
    related: ["business-cards", "logo-design", "brand-identity"],
    complementary: ["branded-mugs", "event-backdrops"],
  },
  {
    id: "s14",
    slug: "brand-photography",
    name: "Brand Photography",
    category: "Studio",
    description:
      "Relaxed, art-directed portraits and working images that put a human face to the business you’re building.",
    price: 210000,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1529139574466-a303027c1d8b",
      "photo-1534528741775-53994a69daeb",
    ],
    included: [
      "Two-hour guided shoot",
      "15 retouched photographs",
      "Studio or one local location",
      "Usage rights for your brand",
    ],
    turnaround: "7–10 business days",
    popularity: 79,
    industry: ["Beauty", "Professional services", "Food & drink"],
    urgency: "Express",
    variations: ["Portrait set", "Brand story", "Full day"],
    related: ["product-photography", "social-media-design", "brand-identity"],
    complementary: ["business-cards", "flyers"],
  },
  {
    id: "s15",
    slug: "gift-boxes",
    name: "Branded Gift Boxes",
    category: "Gifts",
    description:
      "A ready-to-give collection of useful, beautifully branded objects for clients, teams and special moments.",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "photo-1549465220-1a8b9238cd48",
      "photo-1513201099705-a9746e1e201f",
    ],
    included: [
      "Rigid gift box and tissue",
      "Custom printed note card",
      "Choice of curated items",
      "Minimum order of 10 boxes",
    ],
    turnaround: "10–14 business days",
    popularity: 88,
    industry: ["Corporate", "Technology", "Events"],
    urgency: "Standard",
    variations: ["Welcome kit", "Client thank-you", "Custom collection"],
    related: ["branded-mugs", "t-shirts", "custom-stationery"],
    complementary: ["logo-design", "brand-identity"],
  },
];
export const services = raw;
export function servicePrice(service: Service, market: MarketCode) {
  return Math.max(
    1,
    Math.round(
      service.price * rates[market] * (1 - (service.discount ?? 0) / 100),
    ),
  );
}
export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}
