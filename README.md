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

## 🐙 ขั้นตอนที่ 3: การนำโค้ดขึ้น Git (GitHub)

### 3.1 สร้าง Repository บน GitHub
1. ไปที่ [GitHub](https://github.com/new) และสร้าง Repository ใหม่ (เช่นชื่อ `my-portfolio`)
2. ไม่ต้องติ๊กเพิ่ม README หรือ .gitignore (เพราะในโปรเจกต์มีเรียบร้อยแล้ว)

### 3.2 บันทึกและ Push โค้ดขึ้น GitHub
รันคำสั่งต่อไปนี้ใน Terminal (PowerShell):

```powershell
# 1. เพิ่มไฟล์ทั้งหมดเข้าสู่ Git Staging
git add .

# 2. บันทึก Commit
git commit -m "feat: complete modern portfolio with Supabase integration"

# 3. เปลี่ยนชื่อ Branch หลักเป็น main (ถ้ายังเป็น master)
git branch -M main

# 4. เชื่อมต่อไปยัง GitHub Repository ของคุณ (แทนที่ username และ repo-name ด้วยของคุณ)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

# 5. Push โค้ดขึ้น GitHub
git push -u origin main
```

---

## 🌐 ขั้นตอนที่ 4: การนำเว็บขึ้นออนไลน์ (Deploy to Vercel)

วิธีที่แนะนำและง่ายที่สุดสำหรับ Next.js + Supabase:

1. สมัคร/เข้าสู่ระบบ [Vercel](https://vercel.com/)
2. กด **Add New...** -> **Project**
3. เลือก Import จาก GitHub Repository ที่เพิ่ง Push ขึ้นไป
4. ในส่วน **Environment Variables** ให้เพิ่ม 2 ค่า:
   - `NEXT_PUBLIC_SUPABASE_URL` = ค่า URL ของคุณจาก Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = ค่า Anon key ของคุณจาก Supabase
5. กดปุ่ม **Deploy**
6. เสร็จสิ้น! ทุกครั้งที่คุณสั่ง `git push` ขึ้น GitHub เว็บไซต์จะทำการ Deploy อัปเดตเวอร์ชันใหม่อัตโนมัติทันที

---

## 🧪 การตรวจสอบโค้ด (Verification)

```powershell
# ตรวจสอบ Lint
npm run lint

# ตรวจสอบ Build สำหรับ Production
npm run build
```
