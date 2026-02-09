
import { Course, CourseCategory, SecurityKey } from './types';

export const INSTRUCTOR_NAME = "Manjit";
export const SUPPORT_EMAIL = "m4njit6@gmail.com";
export const SUPPORT_PHONE = "+977 9803307657";
export const ESEWA_ID = "9803307657";

// Deterministic code generation
const generateStaticCodes = (prefix: string, count: number, type: 'PREMIUM' | 'FREE', seed: string): SecurityKey[] => {
  return Array.from({ length: count }, (_, i) => {
    const hex = (i + 1).toString(16).toUpperCase().padStart(4, '0');
    const code = `MJ-${prefix}-${seed}${hex}`;
    return {
      code,
      type,
      isUsed: false
    };
  });
};

// Total 300 Unique Keys
export const INITIAL_SECURITY_CODES: SecurityKey[] = [
  ...generateStaticCodes('PREM', 200, 'PREMIUM', 'XP'),
  ...generateStaticCodes('FREE', 100, 'FREE', 'ZF')
];

export const DEMO_VIDEO_URL = "https://www.youtube.com/embed/t8YI7A8M93o"; 

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    slug: 'canva-design-mastery',
    title: 'Canva Design Mastery',
    description: 'Learn to create premium visual content for brands, social media, and business using Canva.',
    price: 999,
    category: CourseCategory.DESIGN,
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    instructor: INSTRUCTOR_NAME,
    features: ['Lifetime Access', 'Project Files', 'Certificate'],
    lessons: [
      { id: 'l1', title: 'Introduction to Canva Interface', duration: '10:00', youtubeId: 't8YI7A8M93o', isLocked: false },
      { id: 'l2', title: 'Typography and Color Theory', duration: '15:20', youtubeId: 'l68DCCZ4XdU', isLocked: true },
    ]
  },
  {
    id: 'c2',
    slug: 'excel-for-professionals',
    title: 'Excel for Professionals',
    description: 'Master data analysis, visualization, and automation in Microsoft Excel.',
    price: 999,
    category: CourseCategory.OFFICE,
    thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800',
    instructor: INSTRUCTOR_NAME,
    features: ['Lifetime Access', 'Worksheets', 'Certificate'],
    lessons: [
      { id: 'l3', title: 'Basic Formulas', duration: '12:00', youtubeId: 'pW6M_pTfU-U', isLocked: false },
    ]
  }
];

export const COURSES = JSON.parse(localStorage.getItem('manjit_modules') || JSON.stringify(INITIAL_COURSES));
