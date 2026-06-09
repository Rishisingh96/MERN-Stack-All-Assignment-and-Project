import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const colorMap = {
  orange: {
    glow: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 70%)',
    line: 'linear-gradient(90deg, #f97316, #facc15)',
    icon: { bg: 'rgba(249,115,22,0.08)', color: '#f97316' },
    num: '#92400e', title: '#78350f', desc: '#a16207', arrow: '#f97316',
  },
  teal: {
    glow: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)',
    line: 'linear-gradient(90deg, #10b981, #34d399)',
    icon: { bg: 'rgba(16,185,129,0.08)', color: '#059669' },
    num: '#065f46', title: '#064e3b', desc: '#047857', arrow: '#10b981',
  },
  purple: {
    glow: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)',
    line: 'linear-gradient(90deg, #8b5cf6, #c084fc)',
    icon: { bg: 'rgba(139,92,246,0.08)', color: '#7c3aed' },
    num: '#4c1d95', title: '#3b0764', desc: '#6d28d9', arrow: '#8b5cf6',
  },
  blue: {
    glow: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)',
    line: 'linear-gradient(90deg, #3b82f6, #818cf8)',
    icon: { bg: 'rgba(59,130,246,0.08)', color: '#2563eb' },
    num: '#1e3a5f', title: '#0f2942', desc: '#1d4ed8', arrow: '#3b82f6',
  },
}

const ServiceCard = ({ num, title, description, color = 'orange', icon }) => {
  const cardRef  = useRef(null)
  const lineRef  = useRef(null)
  const iconRef  = useRef(null)
  const arrowRef = useRef(null)
  const glowRef  = useRef(null)
  const c = colorMap[color]

  useEffect(() => {
    gsap.set(lineRef.current,  { scaleX: 0, transformOrigin: 'left' })
    gsap.set(arrowRef.current, { opacity: 0, x: -8 })
    gsap.set(glowRef.current,  { opacity: 0 })
  }, [])

  const handleEnter = () => {
    gsap.to(cardRef.current,  { y: -8, duration: 0.4, ease: 'power2.out',
      boxShadow: '0 25px 70px rgba(0,0,0,0.12)',
      background: 'rgba(255,255,255,0.95)' })
    gsap.to(lineRef.current,  { scaleX: 1, duration: 0.45, ease: 'power3.out' })
    gsap.to(iconRef.current,  { scale: 1.12, rotation: -4, duration: 0.4, ease: 'back.out(2)' })
    gsap.to(arrowRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(glowRef.current,  { opacity: 1, duration: 0.4 })
  }

  const handleLeave = () => {
    gsap.to(cardRef.current,  { y: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)',
      boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
      background: 'rgba(255,255,255,0.85)' })
    gsap.to(lineRef.current,  { scaleX: 0, duration: 0.35, ease: 'power2.in' })
    gsap.to(iconRef.current,  { scale: 1, rotation: 0, duration: 0.4, ease: 'power2.out' })
    gsap.to(arrowRef.current, { opacity: 0, x: -8, duration: 0.2 })
    gsap.to(glowRef.current,  { opacity: 0, duration: 0.4 })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative rounded-[24px] p-8 sm:p-9 overflow-hidden cursor-pointer border border-white/80 shadow-lg"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' }}
    >
      {/* Glow */}
      <div ref={glowRef} className="absolute inset-0 rounded-[24px] pointer-events-none"
        style={{ background: c.glow }} />

      {/* Bottom line */}
      <div ref={lineRef} className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
        style={{ background: c.line }} />

      {/* Icon */}
      <div ref={iconRef}
        className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center mb-6"
        style={{ background: c.icon.bg, color: c.icon.color }}>
        {icon}
      </div>

      {/* Number */}
      <p className="text-[12px] font-semibold tracking-[0.12em] mb-2"
        style={{ color: c.num, fontFamily: "'Roboto', sans-serif" }}>{num}</p>

      {/* Title */}
      <h3 className="text-[1.15rem] sm:text-[1.25rem] font-bold mb-3 tracking-tight"
        style={{ color: c.title, fontFamily: "'Roboto', sans-serif" }}>{title}</h3>

      {/* Description */}
      <p className="text-[14px] sm:text-[15px] leading-relaxed font-normal"
        style={{ color: c.desc }}>{description}</p>

      {/* Arrow */}
      <div ref={arrowRef} className="flex items-center gap-1.5 mt-4 text-[11px] font-medium tracking-wider"
        style={{ color: c.arrow }}>
        Explore →
      </div>
    </div>
  )
}

export default ServiceCard