'use client'

import { useState } from 'react'

interface SupabaseBadgeProps {
  isConfigured: boolean
}

export default function SupabaseBadge({ isConfigured }: SupabaseBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        id="supabase-status-toggle"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800"
        style={{
          borderColor: isConfigured ? 'rgba(16, 185, 129, 0.3)' : 'rgba(234, 179, 8, 0.3)',
        }}
      >
        <span className="relative flex h-2 w-2">
          {isConfigured ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </>
          ) : (
            <>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </>
          )}
        </span>
        <span className="text-slate-300">
          {isConfigured ? 'Supabase Connected' : 'Supabase (Demo Mode)'}
        </span>
      </button>

      {showTooltip && (
        <div className="absolute right-0 mt-2 w-72 p-3.5 rounded-xl bg-slate-900 border border-slate-700/60 shadow-2xl text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
            <span>{isConfigured ? '⚡ สถานะ: เชื่อมต่อสำเร็จ' : 'ℹ️ โหมดทดสอบการทำงาน'}</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {isConfigured
              ? 'ระบบดึงข้อมูลโปรเจกต์และรับข้อความจากฐานข้อมูล Supabase เรียลไทม์'
              : 'ขณะนี้ใช้ข้อมูลจำลอง หากต้องการเชื่อมต่อ Database จริง ให้ตั้งค่า NEXT_PUBLIC_SUPABASE_URL ใน .env.local'}
          </p>
        </div>
      )}
    </div>
  )
}
