import brahmaputraSunset from '@/assets/brahmaputra-sunset.jpg';
import teaTasting from '@/assets/tea-tasting.jpg';
import silkWeaving from '@/assets/silk-weaving.jpg';
import kamakhyaTemple from '@/assets/kamakhya-temple.jpg';
import spiceMarket from '@/assets/spice-market.jpg';
import tribalArt from '@/assets/tribal-art.jpg';

export interface Experience {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  duration: number; // in minutes
  price: number;
  rating: number;
  reviewCount: number;
  hostName: string;
  hostImage: string;
  hostBio: string;
  category: 'culture' | 'food' | 'nature' | 'spiritual' | 'craft';
  spotsLeft: number;
  meetingPoint: string;
  highlights: string[];
  timeSlots: string[];
}

export const experiences: Experience[] = [
  {
    id: 'brahmaputra-sunset',
    title: 'Brahmaputra Sunset Walk',
    description: 'Experience the magical sunset over the mighty Brahmaputra River. We\'ll walk along the scenic ghats, learn about the river\'s cultural significance, and capture stunning golden-hour photographs. The walk includes stories of local legends and a refreshing chai break.',
    shortDescription: 'Scenic riverside walk with local stories',
    image: brahmaputraSunset,
    duration: 90,
    price: 850,
    rating: 4.9,
    reviewCount: 127,
    hostName: 'Bikash Kalita',
    hostImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bikash',
    hostBio: 'Born by the Brahmaputra, I\'ve spent my life learning its rhythms. As a local photographer and storyteller, I love sharing the magic of our river with visitors from around the world.',
    category: 'nature',
    spotsLeft: 4,
    meetingPoint: 'Umananda Ghat, near the ferry terminal',
    highlights: ['Golden hour photography', 'Local legends & stories', 'Complimentary chai', 'Small group (max 6)'],
    timeSlots: ['4:00 PM', '4:30 PM', '5:00 PM']
  },
  {
    id: 'panbazar-tea',
    title: 'Panbazar Tea Tasting',
    description: 'Dive into Assam\'s famous tea culture at historic Panbazar. Visit traditional tea stalls, learn the art of brewing the perfect Assamese chai, and taste rare single-estate teas. Includes visits to century-old shops and local snacks.',
    shortDescription: 'Authentic Assamese tea experience',
    image: teaTasting,
    duration: 120,
    price: 650,
    rating: 4.8,
    reviewCount: 89,
    hostName: 'Priyanka Bora',
    hostImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanka',
    hostBio: 'My family has been in the tea trade for three generations. I grew up smelling the aroma of fresh Assam leaves and now love introducing travelers to our chai traditions.',
    category: 'food',
    spotsLeft: 2,
    meetingPoint: 'Panbazar Main Road, near Fancy Bazar crossing',
    highlights: ['5 tea varieties', 'Brewing masterclass', 'Local snacks included', 'Tea to take home'],
    timeSlots: ['9:00 AM', '10:00 AM', '3:00 PM', '4:00 PM']
  },
  {
    id: 'sualkuchi-silk',
    title: 'Sualkuchi Silk Weaving',
    description: 'Visit the \"Manchester of Assam\" and witness the magic of Muga and Eri silk weaving. Watch master weavers at work, try your hand at the loom, and learn about patterns passed down through generations. Optional silk shopping available.',
    shortDescription: 'Traditional silk weaving experience',
    image: silkWeaving,
    duration: 240,
    price: 1450,
    rating: 5.0,
    reviewCount: 56,
    hostName: 'Rupjyoti Das',
    hostImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rupjyoti',
    hostBio: 'I come from a family of weavers. Every thread tells a story, and I\'m passionate about keeping our silk heritage alive while sharing it with curious travelers.',
    category: 'craft',
    spotsLeft: 3,
    meetingPoint: 'Sualkuchi Bus Stand (transport from GHY included)',
    highlights: ['Live weaving demo', 'Try the loom yourself', 'Learn silk history', 'Shop authentic silk'],
    timeSlots: ['8:00 AM', '1:00 PM']
  },
  {
    id: 'kamakhya-darshan',
    title: 'Kamakhya Quick-Darshan',
    description: 'A respectful and efficient visit to one of India\'s most sacred Shakti Peethas. Skip the long queues with our local guidance, learn about the temple\'s unique traditions, and experience the spiritual energy of Nilachal Hill.',
    shortDescription: 'Guided temple visit with queue skip',
    image: kamakhyaTemple,
    duration: 150,
    price: 950,
    rating: 4.7,
    reviewCount: 203,
    hostName: 'Dipankar Sharma',
    hostImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dipankar',
    hostBio: 'As a temple priest\'s son, I grew up in the shadow of Kamakhya. I offer respectful tours that help visitors understand our traditions while honoring the sacred space.',
    category: 'spiritual',
    spotsLeft: 6,
    meetingPoint: 'Kamakhya Temple Lower Parking',
    highlights: ['Priority entry tips', 'Temple history', 'Photo spots guide', 'Prasad included'],
    timeSlots: ['6:00 AM', '7:00 AM', '2:00 PM', '3:00 PM']
  },
  {
    id: 'fancy-bazar-spice',
    title: 'Fancy Bazar Spice Walk',
    description: 'Navigate the colorful chaos of Guwahati\'s oldest market. Discover rare Northeastern spices, taste local delicacies, and learn to bargain like a local. This sensory overload ends with a delicious traditional Assamese thali.',
    shortDescription: 'Market exploration with food tastings',
    image: spiceMarket,
    duration: 180,
    price: 1100,
    rating: 4.9,
    reviewCount: 145,
    hostName: 'Anjali Hazarika',
    hostImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
    hostBio: 'Fancy Bazar is my playground! I know every corner, every vendor, and every hidden gem. Let me show you the real flavors of Assam through its bustling markets.',
    category: 'food',
    spotsLeft: 5,
    meetingPoint: 'Fancy Bazar Main Gate, opposite SBI',
    highlights: ['15+ tastings', 'Spice shopping guide', 'Hidden food gems', 'Assamese thali lunch'],
    timeSlots: ['9:00 AM', '10:00 AM']
  },
  {
    id: 'tribal-art',
    title: 'Tribal Art Workshop',
    description: 'Learn traditional Bodo and Karbi art forms in an intimate workshop setting. Create your own piece using natural dyes and traditional techniques, and take home both your artwork and new skills.',
    shortDescription: 'Hands-on traditional art creation',
    image: tribalArt,
    duration: 180,
    price: 1250,
    rating: 4.8,
    reviewCount: 78,
    hostName: 'Monika Brahma',
    hostImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Monika',
    hostBio: 'I\'m a Bodo artist preserving our tribal heritage through art. Every pattern I teach carries centuries of meaning, and I love passing this knowledge to new generations.',
    category: 'culture',
    spotsLeft: 4,
    meetingPoint: 'Tribal Art Centre, near Zoo Road',
    highlights: ['Natural dye making', 'Take your art home', 'Tribal history stories', 'Refreshments included'],
    timeSlots: ['10:00 AM', '2:00 PM', '4:00 PM']
  }
];

export const languagePhrases = [
  { english: 'Hello', assamese: 'নমস্কাৰ', phonetic: 'Nomoskar' },
  { english: 'Thank you', assamese: 'ধন্যবাদ', phonetic: 'Dhonyobad' },
  { english: 'How much?', assamese: 'কিমান হ\'ব?', phonetic: 'Kimant hobo?' },
  { english: 'Delicious!', assamese: 'বৰ সোৱাদ!', phonetic: 'Bor suwaad!' },
  { english: 'Where is...?', assamese: '...ত ক\'ত?', phonetic: '...kot?' },
  { english: 'Help!', assamese: 'সহায় কৰক!', phonetic: 'Sahay korok!' },
  { english: 'Yes', assamese: 'হয়', phonetic: 'Hoy' },
  { english: 'No', assamese: 'নহয়', phonetic: 'Nohoy' },
  { english: 'Water', assamese: 'পানী', phonetic: 'Pani' },
  { english: 'Beautiful', assamese: 'ধুনীয়া', phonetic: 'Dhuniya' }
];
