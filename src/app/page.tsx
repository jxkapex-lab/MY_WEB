import {
  getProjects,
  getSkills,
  getExperiences,
  isConfigured,
} from '@/lib/supabase'
import ProjectsSection from './components/ProjectsSection'
import ContactForm from './components/ContactForm'
import SupabaseBadge from './components/SupabaseBadge'

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function Home() {
  const [projects, skills, experiences] = await Promise.all([
    getProjects(),
    getSkills(),
    getExperiences(),
  ])

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const cat = skill.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-[#0a0d14] text-slate-100 selection:bg-indigo-500 selection:text-white relative">
      {/* Subtle Background Grid & Gradients */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <a
            href="#top"
            id="nav-logo"
            className="group flex items-center gap-2 font-bold text-lg tracking-tight text-white hover:text-cyan-400 transition-colors"
          >
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-indigo-500/20">
              TK
            </span>
            <span>
              PORTFOLIO<span className="text-cyan-400 font-mono">.git</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#work" className="hover:text-white transition-colors">
              ผลงาน (Projects)
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              ทักษะ (Skills)
            </a>
            <a href="#experience" className="hover:text-white transition-colors">
              ประสบการณ์ (Experience)
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              ติดต่อ (Contact)
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <SupabaseBadge isConfigured={isConfigured} />
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              id="nav-github-link"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all duration-150"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900/90 border border-slate-700/80 text-slate-300 mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>พร้อมรับงานพัฒนา Web App & Software Architecture</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
            สร้างสรรค์ซอฟต์แวร์ที่{' '}
            <span className="gradient-text-accent">รวดเร็ว เสถียร</span>{' '}
            และขยายตัวได้จริง
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Full Stack Developer ผู้เชี่ยวชาญการสร้าง Web Application ด้วย{' '}
            <span className="text-slate-200 font-semibold">Next.js</span>,{' '}
            <span className="text-slate-200 font-semibold">TypeScript</span> และ{' '}
            <span className="text-cyan-400 font-semibold">Supabase (PostgreSQL)</span>{' '}
            พร้อมระบบ CI/CD บน Git ให้ทุกโปรเจกต์พร้อมใช้งานในระดับ Production
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              id="hero-explore-btn"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/25 transition-all duration-200 flex items-center gap-2"
            >
              <span>ชมผลงานทั้งหมด</span>
              <span>↓</span>
            </a>
            <a
              href="#contact"
              id="hero-contact-btn"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all duration-200"
            >
              ปรึกษาโปรเจกต์ →
            </a>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80 font-mono">
            <div className="glass-panel p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-white">100%</div>
              <div className="text-xs text-slate-400 mt-1">Git Version Control</div>
            </div>
            <div className="glass-panel p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400">Supabase</div>
              <div className="text-xs text-slate-400 mt-1">PostgreSQL & Auth</div>
            </div>
            <div className="glass-panel p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">&lt; 100ms</div>
              <div className="text-xs text-slate-400 mt-1">High Performance</div>
            </div>
            <div className="glass-panel p-4 rounded-xl">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-400">Full-Stack</div>
              <div className="text-xs text-slate-400 mt-1">End-to-End Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <ProjectsSection projects={projects} />

      {/* Skills & Tech Matrix */}
      <section id="skills" className="relative py-24 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 mb-4">
              <span>Core Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              ทักษะและความเชี่ยวชาญ
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-base sm:text-lg">
              เทคโนโลยีและเครื่องมือที่ใช้เป็นประจำในการส่งมอบงานระดับคุณภาพสูง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div key={category} className="glass-card rounded-2xl p-6 border border-slate-800">
                <h3 className="text-base font-bold text-slate-200 mb-4 pb-2 border-b border-slate-800/80 flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-xs text-cyan-400 font-mono">{items.length} ทักษะ</span>
                </h3>
                <div className="space-y-3.5">
                  {items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1 font-mono">
                        <span className="text-slate-300 font-medium">{skill.name}</span>
                        <span className="text-slate-400">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Journey Timeline */}
      <section id="experience" className="relative py-24 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 mb-4">
              <span>Career Journey</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              เส้นทางและประสบการณ์ทำงาน
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-base sm:text-lg">
              ประวัติการทำงานและบทบาทในการร่วมขับเคลื่อนผลิตภัณฑ์ร่วมกับทีมเทคโนโลยี
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-cyan-400 text-sm font-medium">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60 w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                  {exp.description}
                </p>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-900/90 text-slate-400 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-24 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 mb-4">
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                พร้อมพูดคุยหรือปรึกษาโปรเจกต์?
              </h2>
              <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
                เปิดรับงานพัฒนา Web App, ระบบหลังบ้าน, หรือการปรึกษาด้านสถาปัตยกรรมคลาวด์และฐานข้อมูล สามารถส่งข้อความผ่านฟอร์มได้โดยตรง หรือติดต่อผ่านช่องทางด้านล่าง
              </p>

              <div className="mt-8 space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                    📧
                  </div>
                  <span>hello@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                    📍
                  </div>
                  <span>Bangkok, Thailand (Remote / On-site)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                    ⚡
                  </div>
                  <span>Supabase PostgreSQL Enabled</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 bg-[#07090e] text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Modern Developer Portfolio. Built with{' '}
            <span className="text-slate-300 font-semibold">Next.js 14</span> &{' '}
            <span className="text-cyan-400 font-semibold">Supabase</span>.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-slate-300">
              GitHub Repository
            </a>
            <span>•</span>
            <a href="#top" className="hover:text-slate-300">
              กลับขึ้นด้านบน ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
