
export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  categoryIcon?: string;
  unit: string;
  today: number;
  yesterday: number;
};

export const products: Product[] = [
  { id: 1, slug: "sorno-machi-chal", nameBn: "স্বর্ণমাছি চাল", image: "🍚", unit: "কেজি", today: 148, yesterday: 145 },
  { id: 2, slug: "miniket-chal", nameBn: "মিনিকেট চাল", image: "🍚", unit: "কেজি", today: 99, yesterday: 102 },
  { id: 3, slug: "nazir-chal", nameBn: "নাজির চাল", image: "🍚", unit: "কেজি", today: 74, yesterday: 74 },
  { id: 4, slug: "batam-size-chal", nameBn: "বাটাম সাইজ চাল", image: "🍚", unit: "কেজি", today: 66, yesterday: 64 },
  { id: 5, slug: "mosur-dal", nameBn: "মসুর ডাল", image: "🫘", unit: "কেজি", today: 142, yesterday: 138 },
  { id: 6, slug: "mug-dal", nameBn: "মুগ ডাল", image: "🫘", unit: "কেজি", today: 135, yesterday: 135 },
  { id: 7, slug: "chola-dal", nameBn: "ছোলা", image: "🫘", unit: "কেজি", today: 120, yesterday: 123 },
  { id: 8, slug: "aman-dal-khosasila", nameBn: "আমন ডাল (খোসাসিলা)", image: "🫘", unit: "কেজি", today: 156, yesterday: 152 },
  { id: 9, slug: "sorishar-tel", nameBn: "সরিষার তেল", image: "🫙", unit: "লিটার", today: 192, yesterday: 188 },
  { id: 10, slug: "pam-tel", nameBn: "পাম তেল", image: "🛢️", unit: "কেজি", today: 168, yesterday: 172 },
  { id: 11, slug: "ghani-banga-sorishar-tel", nameBn: "ঘানি ভাঙা সরিষার তেল", image: "🫙", unit: "লিটার", today: 215, yesterday: 210 },
  { id: 12, slug: "alu", nameBn: "আলু", image: "🥔", unit: "কেজি", today: 30, yesterday: 32 },
  { id: 13, slug: "peyaj", nameBn: "পেঁয়াজ", image: "🧅", unit: "কেজি", today: 54, yesterday: 48 },
  { id: 14, slug: "kaccha-moric", nameBn: "কাঁচামরিচ", image: "🌶️", unit: "কেজি", today: 92, yesterday: 105 },
  { id: 15, slug: "begun", nameBn: "বেগুন", image: "🍆", unit: "কেজি", today: 44, yesterday: 42 },
  { id: 16, slug: "dhenders", nameBn: "ঢেঁড়স", image: "🟢", unit: "কেজি", today: 38, yesterday: 38 },
  { id: 17, slug: "rui-mach", nameBn: "রুই মাছ", image: "🐟", unit: "কেজি", today: 46, yesterday: 44 },
  { id: 18, slug: "telapiya-mach", nameBn: "তেলাপিয়া", image: "🐟", unit: "কেজি", today: 36, yesterday: 36 },
  { id: 19, slug: "ilish-mach", nameBn: "ইলিশ মাছ", image: "🐠", unit: "কেজি", today: 1850, yesterday: 1790 },
  { id: 20, slug: "katla-mach", nameBn: "কাতলা মাছ", image: "🐠", unit: "কেজি", today: 43, yesterday: 45 },
  { id: 21, slug: "chingri-mach", nameBn: "চিংড়ি মাছ (খোলা)", image: "🦐", unit: "কেজি", today: 330, yesterday: 320 },
  { id: 22, slug: "murgi-r-mangsho", nameBn: "মুরগির মাংস", image: "🍗", unit: "কেজি", today: 225, yesterday: 228 },
  { id: 23, slug: "goru-r-mangsho", nameBn: "গরুর মাংস", image: "🥩", unit: "কেজি", today: 790, yesterday: 800 },
  { id: 24, slug: "khasir-mangsho", nameBn: "খাসির মাংস", image: "🍖", unit: "কেজি", today: 1290, yesterday: 1330 },
  { id: 25, slug: "hanser-mangsho", nameBn: "হাঁসের মাংস", image: "🦆", unit: "কেজি", today: 285, yesterday: 295 },
  { id: 26, slug: "dim", nameBn: "ডিম", image: "🥚", unit: "ডজন", today: 158, yesterday: 152 },
  { id: 27, slug: "dui-dudh", nameBn: "দুধ", image: "🥛", unit: "লিটার", today: 102, yesterday: 100 },
  { id: 28, slug: "doi", nameBn: "দই", image: "🥣", unit: "লিটার", today: 92, yesterday: 92 },
  { id: 29, slug: "mokhhan", nameBn: "মাখন (১০০ গ্রাম)", image: "🧈", unit: "পিস", today: 145, yesterday: 140 },
  { id: 30, slug: "ada", nameBn: "আদা", image: "🫚", unit: "কেজি", today: 85, yesterday: 78 },
  { id: 31, slug: "roshun", nameBn: "রসুন", image: "🧄", unit: "কেজি", today: 125, yesterday: 135 },
  { id: 32, slug: "morich-gunda", nameBn: "মরিচ গুঁড়া", image: "🌶️", unit: "কেজি", today: 245, yesterday: 250 },
  { id: 33, slug: "dhanepata-gunda", nameBn: "ধনেপাতা গুঁড়া", image: "🍃", unit: "কেজি", today: 265, yesterday: 265 }
];
