'use client'

import { useState, useMemo } from 'react'
import type { Project } from '@/lib/supabase'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return ['All', ...Array.from(set)]
  }, [projects])

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects
    return projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
  }, [projects, selectedCategory])

  return (
    <section id="work" className="relative py-24 border-t border-slate-800/80">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 mb-4">
              <span>Featured Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              ผลงานที่คัดสรรแล้ว
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl text-base sm:text-lg">
              รวมโปรเจกต์พัฒนาระบบ เว็บแอปพลิเคชัน และงานสถาปัตยกรรมซอฟต์แวร์ที่เชื่อมต่อฐานข้อมูล Supabase และเครื่องมือสมัยใหม่
            </p>
          </div>

          <div className="text-sm text-slate-400 font-mono bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800">
            <span>แสดงผล {filteredProjects.length} จาก {projects.length} โปรเจกต์</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                id={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 border-transparent'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {category === 'All' ? 'ทั้งหมด (All)' : category}
              </button>
            )
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => {
            const isFirst = idx === 0 && selectedCategory === 'All'
            return (
              <article
                key={project.slug || project.id || idx}
                className={`glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group ${
                  isFirst ? 'md:col-span-2' : ''
                }`}
              >
                {/* Accent border highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Card Meta */}
                  <div className="flex items-center justify-between gap-4 mb-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-950/70 border border-indigo-800/40 text-indigo-300 font-medium">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-700/40 text-amber-300 font-medium flex items-center gap-1">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500">{project.year}</span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-slate-300 leading-relaxed text-sm sm:text-base">
                    {project.summary}
                  </p>

                  {project.description && (
                    <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-normal">
                      {project.description}
                    </p>
                  )}

                  {/* Tech Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-8 pt-5 border-t border-slate-800/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all duration-150"
                        id={`btn-github-${project.slug}`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>GitHub Code</span>
                      </a>
                    )}

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/50 transition-all duration-150"
                        id={`btn-live-${project.slug}`}
                      >
                        <span>Live Demo ↗</span>
                      </a>
                    )}
                  </div>

                  <span className="text-xs text-slate-500 font-mono">#{idx + 1}</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
