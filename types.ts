
export enum CourseCategory {
  DESIGN = 'Design',
  OFFICE = 'Office',
  AI = 'AI & Automation',
  VIDEO = 'Video Editing',
  PRODUCTIVITY = 'Productivity',
  DEVELOPMENT = 'Development'
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  youtubeId: string; // Used for the video ID regardless of source (YouTube ID or Drive ID)
  videoSource?: 'youtube' | 'google-drive';
  isLocked: boolean;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: CourseCategory;
  thumbnail: string;
  instructor: string;
  lessons: Lesson[];
  features: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  purchasedCourses: string[]; // Course IDs
  progress: Record<string, number>; // courseId -> completionPercentage
  role: 'user' | 'admin';
  paidAmount?: number;
  securityCode?: string;
  lastDeviceId?: string; // For single-device lock simulation
}

export interface SecurityKey {
  code: string;
  type: 'PREMIUM' | 'FREE';
  isUsed: boolean;
  usedBy?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
