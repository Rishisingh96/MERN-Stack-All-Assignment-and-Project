import React from 'react'

const ORBS = [
  {
    key: 'o1',
    size: 640,
    color: '#3b82f6',
    color2: '#60a5fa',
    opacity: 0.18,
    top: '-220px',
    right: '-120px',
    animName: 'bgOrb1',
    dur: { slow: 18, normal: 12, fast: 7 },
    keyframes: `
      @keyframes bgOrb1 {
        0%   { transform: translate(0px, 0px)    scale(1);    }
        33%  { transform: translate(-80px, 70px) scale(1.1);  }
        66%  { transform: translate(-30px,-90px) scale(0.95); }
        100% { transform: translate(-110px,50px) scale(1.06); }
      }
    `,
  },
  {
    key: 'o2',
    size: 500,
    color: '#93c5fd',
    color2: '#bfdbfe',
    opacity: 0.14,
    bottom: '-160px',
    left: '-90px',
    animName: 'bgOrb2',
    dur: { slow: 22, normal: 15, fast: 9 },
    keyframes: `
      @keyframes bgOrb2 {
        0%   { transform: translate(0px, 0px)    scale(1);    }
        33%  { transform: translate(110px,-80px) scale(1.15); }
        66%  { transform: translate(60px,  90px) scale(0.9);  }
        100% { transform: translate(140px,-50px) scale(1.08); }
      }
    `,
  },
  {
    key: 'o3',
    size: 380,
    color: '#60a5fa',
    color2: '#93c5fd',
    opacity: 0.10,
    top: '30%',
    left: '32%',
    animName: 'bgOrb3',
    dur: { slow: 16, normal: 10, fast: 6 },
    keyframes: `
      @keyframes bgOrb3 {
        0%   { transform: translate(0px,   0px)   scale(1);    }
        50%  { transform: translate(-70px,-100px) scale(1.2);  }
        100% { transform: translate(90px,  70px)  scale(0.85); }
      }
    `,
  },
]

const INTENSITY_OPACITY = { low: 0.6, medium: 1, high: 1.35 }

export default function AnimatedBg({
  intensity = 'medium',
  speed = 'normal',
  baseColor = '#f5f8ff',
}) {
  const opacityScale = INTENSITY_OPACITY[intensity] ?? 1

  const allKeyframes = ORBS.map(o => o.keyframes).join('\n')

  const styleTag = `
    ${allKeyframes}
    .animated-bg-noise::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      opacity: 0.018;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />

      <div
        className="animated-bg-noise"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          background: baseColor,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {ORBS.map(orb => {
          const posStyle = {}
          if (orb.top)    posStyle.top    = orb.top
          if (orb.bottom) posStyle.bottom = orb.bottom
          if (orb.left)   posStyle.left   = orb.left
          if (orb.right)  posStyle.right  = orb.right

          return (
            <div
              key={orb.key}
              style={{
                position: 'absolute',
                width: orb.size,
                height: orb.size,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${orb.color} 0%, ${orb.color2} 40%, transparent 70%)`,
                opacity: orb.opacity * opacityScale,
                filter: 'blur(80px)',
                willChange: 'transform',
                animation: `${orb.animName} ${orb.dur[speed]}s ease-in-out infinite alternate`,
                ...posStyle,
              }}
            />
          )
        })}
      </div>
    </>
  )
}