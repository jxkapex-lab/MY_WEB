import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key'
)

export const supabase = isConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null

// Type Definitions
export interface Project {
  id?: string
  slug: string
  title: string
  summary: string
  description?: string | null
  category: string
  tags: string[]
  year: number
  image_url?: string | null
  github_url?: string | null
  live_url?: string | null
  featured: boolean
  order_index?: number
}

export interface Skill {
  id?: string
  name: string
  category: string
  proficiency: number
  icon?: string | null
  order_index?: number
}

export interface Experience {
  id?: string
  role: string
  company: string
  period: string
  description: string
  technologies: string[]
  order_index?: number
}

export interface ContactMessage {
  name: string
  email: string
  subject?: string
  message: string
}

// Fallback Mock Data for instant demonstration
export const fallbackProjects: Project[] = [
  {
    slug: 'cloud-analytics-hub',
    title: 'Cloud Analytics & AI Hub',
    summary: 'แพลตฟอร์มวิเคราะห์ข้อมูลและมอนิเตอร์ Metrics แบบ Real-time พร้อมระบบคาดการณ์แนวโน้มด้วย AI',
    description: 'แดชบอร์ดจัดการข้อมูลขนาดใหญ่ รองรับการดึงข้อมูลจาก Cloud Storage และ BigQuery พร้อม Data Visualization แบบอินเทอร์แอคทีฟ',
    category: 'Full Stack',
    tags: ['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    year: 2025,
    github_url: 'https://github.com/',
    live_url: 'https://example.com/demo1',
    featured: true,
    order_index: 1,
  },
  {
    slug: 'e-commerce-headless',
    title: 'Modern Headless Commerce',
    summary: 'ระบบร้านค้าออนไลน์ประสิทธิภาพสูง ออกแบบด้วย Headless Architecture โหลดไวและปลอดภัย',
    description: 'รองรับระบบตะกร้าสินค้าแบบเรียลไทม์ ชำระเงินผ่าน Payment Gateway และจัดการสต็อกสินค้าอัตโนมัติ',
    category: 'Web App',
    tags: ['React', 'Next.js', 'Stripe API', 'Tailwind CSS', 'PostgreSQL'],
    year: 2024,
    github_url: 'https://github.com/',
    live_url: 'https://example.com/demo2',
    featured: true,
    order_index: 2,
  },
  {
    slug: 'workflow-automation-engine',
    title: 'Workflow Automation Engine',
    summary: 'ระบบจัดการและสั่งการทำงานอัตโนมัติสำหรับทีมองค์กร ลดเวลางานซ้ำซากลงกว่า 70%',
    description: 'เครื่องมือเชื่อมต่อ Webhook, REST APIs และสร้าง Pipeline อัตโนมัติพร้อมระบบแจ้งเตือนแบบเรียลไทม์',
    category: 'Backend',
    tags: ['Node.js', 'FastAPI', 'Redis', 'Docker', 'PostgreSQL'],
    year: 2024,
    github_url: 'https://github.com/',
    live_url: null,
    featured: true,
    order_index: 3,
  },
  {
    slug: 'developer-portfolio-kit',
    title: 'Developer Portfolio & CMS Kit',
    summary: 'เทมเพลตเว็บไซต์ผลงานนักพัฒนา เชื่อมต่อฐานข้อมูล Supabase จัดการเนื้อหาได้ง่ายผ่าน SQL หรือ Dashboard',
    description: 'รองรับ Dark Mode สุดพรีเมียม, ตัวกรองผลงาน, และระบบฟอร์มติดต่อบันทึกลงดาต้าเบสได้ทันที',
    category: 'Frontend',
    tags: ['Next.js', 'Supabase', 'Tailwind CSS', 'TypeScript'],
    year: 2025,
    github_url: 'https://github.com/',
    live_url: 'https://example.com/portfolio',
    featured: false,
    order_index: 4,
  },
]

export const fallbackSkills: Skill[] = [
  { name: 'React / Next.js', category: 'Frontend', proficiency: 95, icon: 'code', order_index: 1 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 90, icon: 'layers', order_index: 2 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, icon: 'palette', order_index: 3 },
  { name: 'Node.js / Express', category: 'Backend', proficiency: 88, icon: 'server', order_index: 4 },
  { name: 'Python / FastAPI', category: 'Backend', proficiency: 82, icon: 'terminal', order_index: 5 },
  { name: 'PostgreSQL / Supabase', category: 'Database & Cloud', proficiency: 90, icon: 'database', order_index: 6 },
  { name: 'Docker & CI/CD', category: 'Tools & DevOps', proficiency: 80, icon: 'cpu', order_index: 7 },
  { name: 'Git & GitHub', category: 'Tools & DevOps', proficiency: 92, icon: 'git-branch', order_index: 8 },
]

export const fallbackExperiences: Experience[] = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Tech Innovations Lab',
    period: '2024 - ปัจจุบัน',
    description: 'ออกแบบและพัฒนาระบบ Web Application ขนาดใหญ่ พัฒนาสถาปัตยกรรม Microservices และเพิ่มประสิทธิภาพฐานข้อมูล',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker'],
    order_index: 1,
  },
  {
    role: 'Frontend Engineer',
    company: 'Digital Studio Co., Ltd.',
    period: '2022 - 2024',
    description: 'สร้างสรรค์ User Interface ที่ทันสมัย ใช้งานง่าย และเน้น Performance สูง ร่วมงานกับทีม Product และ Designer',
    technologies: ['React', 'Tailwind CSS', 'REST API', 'Figma'],
    order_index: 2,
  },
  {
    role: 'Junior Software Developer',
    company: 'Startup Inc.',
    period: '2021 - 2022',
    description: 'เริ่มต้นสายงานพัฒนาซอฟต์แวร์ พัฒนาระบบ API ภายในองค์กร และทำ Automation scripts สำหรับประมวลผลข้อมูล',
    technologies: ['JavaScript', 'Node.js', 'SQL', 'Git'],
    order_index: 3,
  },
]

// Data Fetching Helpers
export async function getProjects(): Promise<Project[]> {
  if (!supabase) return fallbackProjects
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return fallbackProjects
    }
    return data as Project[]
  } catch {
    return fallbackProjects
  }
}

export async function getSkills(): Promise<Skill[]> {
  if (!supabase) return fallbackSkills
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackSkills
    }
    return data as Skill[]
  } catch {
    return fallbackSkills
  }
}

export async function getExperiences(): Promise<Experience[]> {
  if (!supabase) return fallbackExperiences
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackExperiences
    }
    return data as Experience[]
  } catch {
    return fallbackExperiences
  }
}

// Contact Form Submission to Supabase
export async function submitContactMessage(message: ContactMessage): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    // In demo mode or when keys are missing, simulate success after brief delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      success: true,
      error: 'บันทึกสำเร็จในโหมดทดสอบ (ยังไม่ได้เชื่อมต่อ Supabase Keys จริง)',
    }
  }

  try {
    const { error } = await supabase.from('messages').insert([
      {
        name: message.name.trim(),
        email: message.email.trim(),
        subject: message.subject?.trim() || 'Portfolio Contact',
        message: message.message.trim(),
      },
    ])

    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการส่งข้อความ',
    }
  }
}
