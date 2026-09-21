-- ==========================================================
-- Supabase Portfolio Database Schema & Seed Data
-- ==========================================================

-- 1. Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  description text,
  category text not null default 'Full Stack',
  tags text[] not null default '{}',
  year int not null default extract(year from now()),
  image_url text,
  live_url text,
  github_url text,
  featured boolean not null default false,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- 2. Skills Table
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null default 'Frontend', -- 'Frontend', 'Backend', 'Database & Cloud', 'Tools'
  proficiency int not null default 85,      -- 1-100 percentage
  icon text,
  order_index int not null default 0
);

-- 3. Experiences Table
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  description text not null,
  technologies text[] not null default '{}',
  order_index int not null default 0
);

-- 4. Contact Inquiries / Messages Table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ==========================================================
-- Row Level Security (RLS) Policies
-- ==========================================================

alter table public.projects enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.messages enable row level security;

-- Public can read projects, skills, and experiences
create policy "Public projects are readable" on public.projects for select using (true);
create policy "Public skills are readable" on public.skills for select using (true);
create policy "Public experiences are readable" on public.experiences for select using (true);

-- Public can submit messages through the portfolio contact form
create policy "Public can submit contact messages" on public.messages for insert with check (true);

-- Indexes for optimal query performance
create index if not exists projects_featured_order_idx on public.projects (featured desc, order_index asc, created_at desc);
create index if not exists skills_category_order_idx on public.skills (category asc, order_index asc);
create index if not exists experiences_order_idx on public.experiences (order_index asc);

-- ==========================================================
-- Initial Seed Data (ข้อมูลตั้งต้นสำหรับทดสอบ)
-- ==========================================================

-- Seed Projects
insert into public.projects (slug, title, summary, description, category, tags, year, github_url, live_url, featured, order_index)
values
  (
    'cloud-analytics-hub',
    'Cloud Analytics & AI Hub',
    'แพลตฟอร์มวิเคราะห์ข้อมูลและมอนิเตอร์ Metrics แบบ Real-time พร้อมระบบคาดการณ์แนวโน้มด้วย AI',
    'แดชบอร์ดจัดการข้อมูลขนาดใหญ่ รองรับการดึงข้อมูลจาก Cloud Storage และ BigQuery พร้อม Data Visualization แบบอินเทอร์แอคทีฟ',
    'Full Stack',
    array['Next.js 14', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    2025,
    'https://github.com/',
    'https://example.com/demo1',
    true,
    1
  ),
  (
    'e-commerce-headless',
    'Modern Headless Commerce',
    'ระบบร้านค้าออนไลน์ประสิทธิภาพสูง ออกแบบด้วย Headless Architecture โหลดไวและปลอดภัย',
    'รองรับระบบตะกร้าสินค้าแบบเรียลไทม์ ชำระเงินผ่าน Payment Gateway และจัดการสต็อกสินค้าอัตโนมัติ',
    'Web App',
    array['React', 'Next.js', 'Stripe API', 'Tailwind CSS', 'PostgreSQL'],
    2024,
    'https://github.com/',
    'https://example.com/demo2',
    true,
    2
  ),
  (
    'workflow-automation-engine',
    'Workflow Automation Engine',
    'ระบบจัดการและสั่งการทำงานอัตโนมัติสำหรับทีมองค์กร ลดเวลางานซ้ำซากลงกว่า 70%',
    'เครื่องมือเชื่อมต่อ Webhook, REST APIs และสร้าง Pipeline อัตโนมัติพร้อมระบบแจ้งเตือนแบบเรียลไทม์',
    'Backend',
    array['Node.js', 'FastAPI', 'Redis', 'Docker', 'PostgreSQL'],
    2024,
    'https://github.com/',
    null,
    true,
    3
  ),
  (
    'developer-portfolio-kit',
    'Developer Portfolio & CMS Kit',
    'เทมเพลตเว็บไซต์ผลงานนักพัฒนา เชื่อมต่อฐานข้อมูล Supabase จัดการเนื้อหาได้ง่ายผ่าน SQL หรือ Dashboard',
    'รองรับ Dark Mode สุดพรีเมียม, ตัวกรองผลงาน, และระบบฟอร์มติดต่อบันทึกลงดาต้าเบสได้ทันที',
    'Frontend',
    array['Next.js', 'Supabase', 'Tailwind CSS', 'TypeScript'],
    2025,
    'https://github.com/',
    'https://example.com/portfolio',
    false,
    4
  )
on conflict (slug) do nothing;

-- Seed Skills
insert into public.skills (name, category, proficiency, icon, order_index)
values
  ('React / Next.js', 'Frontend', 95, 'code', 1),
  ('TypeScript', 'Frontend', 90, 'layers', 2),
  ('Tailwind CSS', 'Frontend', 95, 'palette', 3),
  ('Node.js / Express', 'Backend', 88, 'server', 4),
  ('Python / FastAPI', 'Backend', 82, 'terminal', 5),
  ('PostgreSQL / Supabase', 'Database & Cloud', 90, 'database', 6),
  ('Docker & CI/CD', 'Tools & DevOps', 80, 'cpu', 7),
  ('Git & GitHub', 'Tools & DevOps', 92, 'git-branch', 8)
on conflict do nothing;

-- Seed Experiences
insert into public.experiences (role, company, period, description, technologies, order_index)
values
  (
    'Senior Full Stack Developer',
    'Tech Innovations Lab',
    '2024 - ปัจจุบัน',
    'ออกแบบและพัฒนาระบบ Web Application ขนาดใหญ่ พัฒนาสถาปัตยกรรม Microservices และเพิ่มประสิทธิภาพฐานข้อมูล',
    array['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker'],
    1
  ),
  (
    'Frontend Engineer',
    'Digital Studio Co., Ltd.',
    '2022 - 2024',
    'สร้างสรรค์ User Interface ที่ทันสมัย ใช้งานง่าย และเน้น Performance สูง ร่วมงานกับทีม Product และ Designer',
    array['React', 'Tailwind CSS', 'REST API', 'Figma'],
    2
  ),
  (
    'Junior Software Developer',
    'Startup Inc.',
    '2021 - 2022',
    'เริ่มต้นสายงานพัฒนาซอฟต์แวร์ พัฒนาระบบ API ภายในองค์กร และทำ Automation scripts สำหรับประมวลผลข้อมูล',
    array['JavaScript', 'Node.js', 'SQL', 'Git'],
    3
  )
on conflict do nothing;
