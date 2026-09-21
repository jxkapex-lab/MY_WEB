'use client'

import { useState } from 'react'
import { submitContactMessage } from '@/lib/supabase'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setFeedbackMessage('กรุณากรอกข้อมูล ชื่อ, อีเมล และข้อความให้ครบถ้วน')
      return
    }

    setStatus('loading')
    setFeedbackMessage('')

    try {
      const result = await submitContactMessage(formData)
      if (result.success) {
        setStatus('success')
        setFeedbackMessage(
          result.error || 'ส่งข้อความสำเร็จ! ข้อมูลถูกบันทึกลง Supabase Database เรียบร้อยแล้ว'
        )
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
        setFeedbackMessage(result.error || 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง')
      }
    } catch {
      setStatus('error')
      setFeedbackMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง')
    }
  }

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <span>ส่งข้อความถึงผม</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/70 text-cyan-400 border border-cyan-800/40">
            Direct to Supabase
          </span>
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          กรอกข้อมูลด้านล่าง ข้อความจะถูกจัดเก็บลงในตาราง <code className="text-cyan-300 font-mono text-xs">public.messages</code> ทันที
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
              ชื่อของคุณ <span className="text-rose-400">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="สมชาย ใจดี"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
              อีเมลติดต่อ <span className="text-rose-400">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="somchai@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300 mb-1.5">
            หัวข้อเรื่อง / โปรเจกต์
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="สนใจจ้างงานพัฒนา Web App / ระบบงานองค์กร"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1.5">
            รายละเอียดข้อความ <span className="text-rose-400">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            rows={4}
            placeholder="สวัสดีครับ อยากปรึกษาเรื่องการพัฒนาระบบ..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
          />
        </div>

        {feedbackMessage && (
          <div
            className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              status === 'success'
                ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-300'
                : 'bg-rose-950/80 border border-rose-700/60 text-rose-300'
            }`}
          >
            {feedbackMessage}
          </div>
        )}

        <button
          id="contact-submit-btn"
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>กำลังส่งข้อมูลเข้า Supabase...</span>
            </>
          ) : (
            <>
              <span>ส่งข้อความทันที (Send Message) →</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
