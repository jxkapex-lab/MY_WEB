# 🚀 Modern Developer Portfolio (Next.js + Supabase + Git)

เว็บไซต์ Portfolio สุดพรีเมียมสำหรับนักพัฒนา ออกแบบด้วย **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** และเชื่อมต่อฐานข้อมูล **Supabase (PostgreSQL)** พร้อมระบบสำรอง (Fallback) ใช้งานได้ทันที และเตรียมพร้อมสำหรับการนำขึ้น **Git / GitHub** และ Deploy สู่ Production

---

## ✨ ฟีเจอร์เด่น (Key Features)

- 🎨 **Modern Dark Glow & Glassmorphism Design**: ธีมมืดล้ำสมัย ประดับด้วยเอฟเฟกต์แสงสะท้อน การ์ดโปร่งใส และแอนิเมชันที่ลื่นไหล
- ⚡ **Supabase Live Database Integration**:
  - ตาราง `projects`: ดึงข้อมูลผลงาน, หมวดหมู่, แท็กเทคโนโลยี, ลิงก์ GitHub และ Live Demo
  - ตาราง `skills`: แสดงทักษะความชำนาญแบ่งตามหมวดหมู่ (Frontend, Backend, Database & Cloud, Tools)
  - ตาราง `experiences`: ไทม์ไลน์ประสบการณ์การทำงาน
  - ตาราง `messages`: รับข้อความจาก Contact Form บันทึกลง Supabase โดยตรงแบบเรียลไทม์
- 🛡️ **Row Level Security (RLS)**: ป้องกันความปลอดภัยของข้อมูลในระดับฐานข้อมูล โดยเปิดให้อ่านได้เฉพาะข้อมูลสาธารณะ และอนุญาตให้ส่งฟอร์มติดต่อได้
- 🔄 **Smart Fallback System**: หากยังไม่ได้เชื่อมต่อ Key ของ Supabase เว็บไซต์จะยังทำงานได้อย่างสมบูรณ์แบบด้วยข้อมูลจำลองคุณภาพสูงทันที
- 📱 **Fully Responsive**: รองรับการแสดงผลทุกขนาดหน้าจอ ตั้งแต่มือถือ แท็บเล็ต ไปจนถึงเดสก์ท็อปขนาดใหญ่

---

## 🛠️ ขั้นตอนที่ 1: ติดตั้งและทดสอบในเครื่อง (Local Setup)

```powershell
# 1. ติดตั้ง Dependencies
npm install

# 2. คัดลอกไฟล์ Environment
Copy-Item .env.example .env.local

# 3. เริ่มต้นเซิร์ฟเวอร์สำหรับพัฒนา
npm run dev
```

เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

---

## 🗄️ ขั้นตอนที่ 2: การตั้งค่า Supabase Database

1. ไปที่เว็บไซต์ [Supabase](https://supabase.com/) และสร้างบัญชี / New Project
2. เมื่อโปรเจกต์สร้างเสร็จ ให้ไปที่เมนู **SQL Editor** บนแถบด้านซ้าย
3. เปิดไฟล์ [`supabase/schema.sql`](./supabase/schema.sql) ในโปรเจกต์นี้ คัดลอกโค้ดทั้งหมดไปวางใน SQL Editor แล้วกด **Run**
   - คำสั่งนี้จะสร้างตาราง `projects`, `skills`, `experiences`, `messages`
   - เปิดสิทธิ์ความปลอดภัย Row Level Security (RLS)
   - เพิ่มข้อมูลตั้งต้น (Seed Data) ให้ทันที
4. ไปที่ **Project Settings** -> **API**
   - คัดลอกค่า **Project URL**
   - คัดลอกค่า **Project API anon / public key**
5. นำค่ามาใส่ในไฟล์ `.env.local` ในเครื่องของคุณ:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   ```
6. รีสตาร์ทเซิร์ฟเวอร์ด้วย `npm run dev` หน้าเว็บจะแสดงสถานะ `🟢 Supabase Connected` และดึงข้อมูลจริงจากฐานข้อมูลของคุณ!

---

## 🐙 ขั้นตอนที่ 3: การ Push ขึ้น GitHub

โปรเจกต์นี้เชื่อมกับ repository `jxkapex-lab/MY_WEB` และใช้ branch `master` อยู่แล้ว การอัปเดตใช้คำสั่ง:

```powershell
git add .
git commit -m "feat: update portfolio"
git push origin master
```

---

## 🌐 ขั้นตอนที่ 4: Deploy ด้วย GitHub Pages

1. เปิด repository **Settings → Secrets and variables → Actions** แล้วเพิ่ม Repository secrets:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL จาก Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/public key จาก Supabase
2. เปิด **Settings → Pages** แล้วเลือก **Source: GitHub Actions**
3. เปิดแท็บ **Actions** และ Run workflow ชื่อ **Deploy to GitHub Pages** หรือ push ไปที่ `master`
4. เมื่อ workflow ผ่าน เว็บจะอยู่ที่ `https://jxkapex-lab.github.io/MY_WEB/`

ค่า anon/public key ถูกออกแบบให้ใช้ใน browser ได้ แต่ต้องใช้ร่วมกับ RLS ใน [`supabase/schema.sql`](./supabase/schema.sql) เสมอ ห้ามใส่ `service_role` key หรือรหัสผ่านฐานข้อมูลในตัวแปร `NEXT_PUBLIC_*`

---

## 🧪 การตรวจสอบโค้ด (Verification)

```powershell
# ตรวจสอบ Lint
npm run lint

# ตรวจสอบ Build สำหรับ Production
npm run build
```
