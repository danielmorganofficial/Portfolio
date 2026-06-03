import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const interactiveSelector = 'a,button,input,textarea,select,summary,[role="button"],.interactive-hover'

const PARTICLE_COLORS = ['6, 182, 212', '168, 85, 247', '236, 72, 153']

function resolveLabel(el: HTMLElement): string {
  const tag = el.tagName.toLowerCase()
  const href = el.getAttribute('href') ?? el.closest('a')?.getAttribute('href') ?? ''
  const text = (el.innerText ?? el.textContent ?? '').trim().toLowerCase()

  // 1. Check for email links
  if (href.startsWith('mailto:') || text.includes('email') || text.includes('gmail.com')) {
    return 'say hello ✉'
  }

  // 2. Check for resume
  if (text.includes('resume') || href.includes('drive.google.com')) {
    return 'resume 📄'
  }

  // 3. Check for specific social platforms
  if (href.includes('github.com')) {
    return 'github ↗'
  }
  if (href.includes('linkedin.com')) {
    return 'linkedin ↗'
  }
  if (href.includes('devpost.com')) {
    return 'devpost ↗'
  }
  if (href.includes('figma.com') || href.includes('figma.site')) {
    return 'figma ↗'
  }

  // 4. Check for navbar buttons
  if (tag === 'button' || el.closest('button')) {
    if (text === 'about') return 'about'
    if (text === 'experience') return 'experience'
    if (text === 'projects') return 'projects'
    if (text === 'contact') return 'contact'
  }

  // 5. Default link check
  if (tag === 'a' || el.closest('a')) {
    return href.startsWith('http') ? 'open ↗' : 'view →'
  }

  const type = el.getAttribute('type') ?? ''
  if (type === 'submit') return 'submit'
  if (tag === 'input' || tag === 'textarea') return 'type'

  if (text.includes('project')) return 'view →'
  if (text.includes('connect') || text.includes('contact')) return 'connect'
  if (text.includes('about')) return 'about'
  if (text.includes('experience')) return 'explore'

  return 'click'
}

function interpolateColor(speed: number): string {
  const cPurple = [168, 85, 247]; // rest / slow
  const cCyan = [6, 182, 212];    // moving
  const cPink = [236, 72, 153];   // fast flick
  const cWhite = [255, 255, 255];  // hyper-speed
  
  let r, g, b;
  if (speed < 4) {
    const t = speed / 4;
    r = Math.round(cPurple[0] + (cCyan[0] - cPurple[0]) * t);
    g = Math.round(cPurple[1] + (cCyan[1] - cPurple[1]) * t);
    b = Math.round(cPurple[2] + (cCyan[2] - cPurple[2]) * t);
  } else if (speed < 14) {
    const t = (speed - 4) / 10;
    r = Math.round(cCyan[0] + (cPink[0] - cCyan[0]) * t);
    g = Math.round(cCyan[1] + (cPink[1] - cCyan[1]) * t);
    b = Math.round(cCyan[2] + (cPink[2] - cCyan[2]) * t);
  } else {
    const t = Math.min((speed - 14) / 14, 1);
    r = Math.round(cPink[0] + (cWhite[0] - cPink[0]) * t);
    g = Math.round(cPink[1] + (cWhite[1] - cPink[1]) * t);
    b = Math.round(cPink[2] + (cWhite[2] - cPink[2]) * t);
  }
  return `${r}, ${g}, ${b}`;
}

interface Particle {
  x: number; y: number; vx: number; vy: number
  size: number; alpha: number; decay: number; colorRgb: string
}

interface Shockwave {
  x: number; y: number; radius: number; maxRadius: number
  alpha: number; lineWidth: number; colorRgb: string
  type?: 'r' | 'g' | 'b' | 'normal'
}

interface TrailPoint {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isHover, setIsHover] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoverLabel, setHoverLabel] = useState('')
  const [scanKey, setScanKey] = useState(0)
  const [isIdle, setIsIdle] = useState(false)

  // Refs for RAF-safe reading (avoids stale closure deps)
  const hoveredElRef = useRef<HTMLElement | null>(null)
  const prevHoveredElRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotInnerRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const shockwavesRef = useRef<Shockwave[]>([])
  const lastSpawnPos = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const auroraPosRef = useRef({ x: -300, y: -300 })
  const prevTickPos = useRef({ x: -100, y: -100 })

  // Upgraded custom cursor trail and speed refs
  const trailPointsRef = useRef<TrailPoint[]>([])
  const smoothSpeedRef = useRef(0)
  const lastMoveTimeRef = useRef(0)
  const isIdleRef = useRef(false)

  // Motion values — dot tracks cursor instantly
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Label offset flips above/below depending on cursor Y proximity to navbar
  const labelOffsetY = useMotionValue(-32)
  const labelFinalY = useTransform(
    [cursorY, labelOffsetY] as const,
    ([cy, off]) => (cy as number) + (off as number)
  )

  // Ring position is driven from RAF lerp (not spring) — no lag
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)

  // Ring SIZE only uses springs — shape morphing stays smooth
  const sizeSpring = { damping: 28, stiffness: 340, mass: 0.7 }
  const ringWidthMv = useMotionValue(36)
  const ringHeightMv = useMotionValue(36)
  const ringBrMv = useMotionValue(18)
  const ringWidth = useSpring(ringWidthMv, sizeSpring)
  const ringHeight = useSpring(ringHeightMv, sizeSpring)
  const ringBorderRadius = useSpring(ringBrMv, sizeSpring)

  const getElementBorderRadius = useCallback((el: HTMLElement, h: number): number => {
    const br = window.getComputedStyle(el).borderRadius
    if (!br || br === '0px') return 10
    if (br.endsWith('%')) return h / 2
    const v = parseFloat(br)
    return isNaN(v) ? 10 : v
  }, [])

  // Lock-on ripple: fire when hoveredEl changes to a non-null element
  useEffect(() => {
    if (hoveredElRef.current && hoveredElRef.current !== prevHoveredElRef.current) {
      setScanKey(k => k + 1)
      const rect = hoveredElRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      // Purple expanding ring from the element's own center ("target acquired")
      shockwavesRef.current.push({
        x: cx, y: cy,
        radius: 2,
        maxRadius: Math.max(rect.width, rect.height) * 0.55 + 18,
        alpha: 0.55, lineWidth: 1, colorRgb: '168, 85, 247',
        type: 'normal'
      })
    }
    prevHoveredElRef.current = hoveredElRef.current
  }, [isHover]) // isHover changes when hoveredEl changes

  // ── Event listeners ──────────────────────────────────────────────────
  useEffect(() => {
    lastMoveTimeRef.current = performance.now()
    const showCursor = () => setIsVisible(true)
    window.addEventListener('mousemove', showCursor, { once: true })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      mouseRef.current = { x, y }
      cursorX.set(x)
      cursorY.set(y)

      // Reset inactivity timer and exit idle state
      lastMoveTimeRef.current = performance.now()
      if (isIdleRef.current) {
        isIdleRef.current = false
        setIsIdle(false)
      }

      // Smart label flip: show below cursor when in the navbar zone (top 80px)
      labelOffsetY.set(y < 80 ? 30 : -32)

      // Buffer trail positions for Bezier ribbon
      const points = trailPointsRef.current
      const lastPt = points[points.length - 1]
      if (!lastPt || Math.hypot(x - lastPt.x, y - lastPt.y) > 3.5) {
        points.push({ x, y })
        if (points.length > 18) {
          points.shift()
        }
      }

      // Trail particles — spawn with backward directional spray
      const dx = x - lastSpawnPos.current.x
      const dy = y - lastSpawnPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 5 && particlesRef.current.length < 80) {
        const speed = Math.min(dist / 5, 4)
        const moveAngle = Math.atan2(dy, dx)
        // Spray opposite to movement direction with spread
        const backAngle = moveAngle + Math.PI + (Math.random() - 0.5) * 1.4

        // Get current thermal color shift for the particles based on speed
        const currentSpeed = smoothSpeedRef.current
        const color = interpolateColor(currentSpeed)

        particlesRef.current.push({
          x, y,
          vx: Math.cos(backAngle) * speed * 0.38,
          vy: Math.sin(backAngle) * speed * 0.38 - 0.15,
          size: 1.2 + Math.random() * 1.8 * (speed / 4),
          alpha: 0.5 + speed * 0.07,
          decay: 0.014 + Math.random() * 0.012,
          colorRgb: color,
        })
        lastSpawnPos.current = { x, y }
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true)
      const { clientX: x, clientY: y } = e

      // Radial burst — evenly spaced angles + jitter
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
        const spd = 1.8 + Math.random() * 4.5
        const colorRgb = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          size: 1.8 + Math.random() * 3.2,
          alpha: 1.0,
          decay: 0.018 + Math.random() * 0.016,
          colorRgb,
        })
      }

      // Three shockwave rings for Chromatic Aberration (R, G, B)
      shockwavesRef.current.push(
        { x, y, radius: 2, maxRadius: 65, alpha: 0.95, lineWidth: 2.0, colorRgb: '255, 40, 80', type: 'r' },
        { x, y, radius: 2, maxRadius: 65, alpha: 0.95, lineWidth: 2.0, colorRgb: '20, 255, 120', type: 'g' },
        { x, y, radius: 2, maxRadius: 65, alpha: 0.95, lineWidth: 2.0, colorRgb: '40, 120, 255', type: 'b' }
      )
    }

    const handleMouseUp = () => setIsClicked(false)

    const handleMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(interactiveSelector) as HTMLElement | null
      if (el) {
        hoveredElRef.current = el
        setIsHover(true)
        setHoverLabel(resolveLabel(el))
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest(interactiveSelector) as HTMLElement | null
      if (el) {
        hoveredElRef.current = null
        setIsHover(false)
        setHoverLabel('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', showCursor)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY, labelOffsetY])

  // ── RAF loop: ring lerp + dot elongation + aurora + canvas ────────────
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      const ctx = canvas.getContext('2d')
      if (ctx) { ctx.resetTransform(); ctx.scale(dpr, dpr) }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    let animId: number

    const tick = () => {
      const { x: mX, y: mY } = mouseRef.current
      const LERP = 0.52

      // ── Per-frame velocity (RAFaccurate, not event-rate jitter) ──
      const vx = mX - prevTickPos.current.x
      const vy = mY - prevTickPos.current.y
      prevTickPos.current = { x: mX, y: mY }
      const speed = Math.sqrt(vx * vx + vy * vy)
      
      // Smooth speed estimate
      smoothSpeedRef.current += (speed - smoothSpeedRef.current) * 0.12
      const currentSpeed = smoothSpeedRef.current

      const angle = speed > 0.8 ? Math.atan2(vy, vx) * (180 / Math.PI) : 0
      const elongation = Math.min(1 + speed * 0.08, 2.8)

      // ── Velocity-elongated dot (direct DOM, most performant) ──
      if (dotInnerRef.current) {
        dotInnerRef.current.style.transform = `rotate(${angle}deg) scaleX(${elongation})`
      }

      // ── Ambient aurora: very slow follow (0.04 lerp) ──
      auroraPosRef.current.x += (mX - auroraPosRef.current.x) * 0.04
      auroraPosRef.current.y += (mY - auroraPosRef.current.y) * 0.04
      if (auroraRef.current) {
        auroraRef.current.style.transform =
          `translate(${auroraPosRef.current.x - 200}px, ${auroraPosRef.current.y - 200}px)`
      }

      // ── Ring position: fast lerp (no spring lag on position) ──
      const el = hoveredElRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const cX = rect.left + rect.width  / 2
        const cY = rect.top  + rect.height / 2
        // Tiny elastic pull toward actual mouse position within snapped element
        const tX = cX + (mX - cX) * 0.08
        const tY = cY + (mY - cY) * 0.08
        ringPosRef.current.x += (tX - ringPosRef.current.x) * LERP
        ringPosRef.current.y += (tY - ringPosRef.current.y) * LERP
        ringWidthMv.set(rect.width  + 14)
        ringHeightMv.set(rect.height + 14)
        ringBrMv.set(getElementBorderRadius(el, rect.height + 14))
      } else {
        ringPosRef.current.x += (mX - ringPosRef.current.x) * LERP
        ringPosRef.current.y += (mY - ringPosRef.current.y) * LERP
        ringWidthMv.set(36)
        ringHeightMv.set(36)
        ringBrMv.set(18)
      }
      ringX.set(ringPosRef.current.x)
      ringY.set(ringPosRef.current.y)

      // ── Idle breathing check ──
      const now = performance.now()
      if (now - lastMoveTimeRef.current > 2000) {
        if (!isIdleRef.current) {
          isIdleRef.current = true
          setIsIdle(true)
        }
      }

      // ── Bezier ribbon trail physics ──
      const points = trailPointsRef.current
      if (points.length > 0) {
        for (let i = 0; i < points.length - 1; i++) {
          points[i].x += (points[i+1].x - points[i].x) * 0.22
          points[i].y += (points[i+1].y - points[i].y) * 0.22
        }
        const last = points[points.length - 1]
        last.x += (mX - last.x) * 0.22
        last.y += (mY - last.y) * 0.22
      }

      // ── Canvas rendering: ribbon + constellation + particles + shockwaves ──
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const dpr = window.devicePixelRatio || 1
          // Reset transform and apply DPR scaling for crisp coordinate mappings
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

          // Interpolated trail color based on speed (thermal gradient shift)
          const currentTrailColor = interpolateColor(currentSpeed)

          // 1. Draw Bezier Ribbon Trail
          if (points.length > 1) {
            for (let i = 0; i < points.length - 1; i++) {
              const p1 = points[i]
              const p2 = points[i + 1]
              
              const ratio = i / (points.length - 1)
              const opacity = ratio * 0.42 // max opacity 0.42
              const width = 0.5 + ratio * 4.2 // tapers down to 0.5px at the tail
              
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              
              ctx.strokeStyle = `rgba(${currentTrailColor}, ${opacity})`
              ctx.lineWidth = width
              ctx.lineCap = 'round'
              ctx.stroke()
            }
          }

          // 2. Draw Constellation Particle Mesh (proximity lines)
          const particles = particlesRef.current
          if (particles.length > 1) {
            for (let i = 0; i < particles.length; i++) {
              for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i]
                const p2 = particles[j]
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const distSqr = dx * dx + dy * dy
                const maxDist = 42
                const maxDistSqr = maxDist * maxDist
                
                if (distSqr < maxDistSqr) {
                  const dist = Math.sqrt(distSqr)
                  const alpha = (1 - dist / maxDist) * Math.min(p1.alpha, p2.alpha) * 0.16
                  
                  ctx.beginPath()
                  ctx.moveTo(p1.x, p1.y)
                  ctx.lineTo(p2.x, p2.y)
                  ctx.strokeStyle = `rgba(${p1.colorRgb}, ${alpha})`
                  ctx.lineWidth = 0.5
                  ctx.stroke()
                }
              }
            }
          }

          // 3. Draw particles (glow halo + solid core)
          particlesRef.current = particlesRef.current.filter(p => {
            p.x  += p.vx
            p.y  += p.vy
            p.vy += 0.012 // subtle gravity
            p.alpha -= p.decay
            p.size   = Math.max(0.1, p.size - 0.015)
            if (p.alpha <= 0 || p.size <= 0.1) return false

            // Radial glow halo
            const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5)
            g.addColorStop(0, `rgba(${p.colorRgb}, ${p.alpha * 0.85})`)
            g.addColorStop(1, `rgba(${p.colorRgb}, 0)`)
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2)
            ctx.fillStyle = g
            ctx.fill()

            // Solid bright core
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${p.colorRgb}, ${Math.min(p.alpha * 1.8, 1)})`
            ctx.fill()
            return true
          })

          // 4. Draw Chromatic Aberration Shockwaves
          shockwavesRef.current = shockwavesRef.current.filter(s => {
            s.radius += (s.maxRadius - s.radius) * 0.08
            s.alpha  -= 0.016
            if (s.alpha <= 0) return false
            
            const progress = s.radius / s.maxRadius
            const shift = progress * 4.8 // max horizontal shift of 4.8px
            
            let drawX = s.x
            if (s.type === 'r') drawX = s.x - shift
            if (s.type === 'b') drawX = s.x + shift
            
            ctx.beginPath()
            ctx.arc(drawX, s.y, s.radius, 0, Math.PI * 2)
            
            // Draw offset channels with additive blend mode
            ctx.globalCompositeOperation = 'screen'
            ctx.strokeStyle = `rgba(${s.colorRgb}, ${s.alpha})`
            ctx.lineWidth   = s.lineWidth * (1 - progress * 0.4)
            ctx.stroke()
            ctx.globalCompositeOperation = 'source-over'
            return true
          })
        }
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [ringX, ringY, ringWidthMv, ringHeightMv, ringBrMv, getElementBorderRadius])

  return (
    <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 250ms ease', pointerEvents: 'none' }}>
      {/* ── Atmospheric aurora glow — follows at 4% lerp ── */}
      <div ref={auroraRef} className="cursor-aurora" />

      {/* ── Canvas: particle trail + click bursts + shockwaves ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9996,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />

      {/* ── Dot wrapper: position + state scale via Framer Motion ── */}
      <motion.div
        style={{
          x: cursorX, y: cursorY,
          position: 'fixed', left: 0, top: 0,
          translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none', zIndex: 9999,
          mixBlendMode: 'screen',
        }}
        animate={{
          scale: isClicked ? 0.4 : isHover ? 0 : isIdle ? [1, 0.65, 1] : 1
        }}
        transition={{
          scale: isIdle && !isClicked && !isHover
            ? { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
            : { type: 'spring', damping: 22, stiffness: 400 }
        }}
      >
        {/* Inner dot: velocity elongation via direct RAF DOM writes */}
        <div ref={dotInnerRef} className="cursor-dot-inner" />
      </motion.div>

      {/* ── Outer ring: lerp position, spring shape ── */}
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX, y: ringY,
          width: ringWidth, height: ringHeight,
          borderRadius: ringBorderRadius,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.88 : (isIdle ? [1, 1.12, 1] : 1) as unknown as number,
          borderColor: isHover ? 'rgba(168, 85, 247, 0.85)' : 'rgba(6, 182, 212, 0.55)',
          boxShadow: isHover
            ? '0 0 20px rgba(168, 85, 247, 0.5), inset 0 0 12px rgba(6, 182, 212, 0.1)'
            : '0 0 10px rgba(6, 182, 212, 0.12)',
          backgroundColor: isHover ? 'rgba(168, 85, 247, 0.06)' : 'transparent',
        }}
        transition={{
          scale: isIdle && !isClicked
            ? { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
            : { type: 'spring', damping: 26, stiffness: 340 }
        }}
      >
        {/* HUD rotating SVG — fades out when snapped to element */}
        <svg
          className="hud-svg"
          viewBox="0 0 100 100"
          style={{ opacity: isHover ? 0 : 1, transition: 'opacity 180ms ease' }}
        >
          <circle cx="50" cy="50" r="44" className="hud-outer"
            stroke="rgba(6,182,212,0.7)" strokeWidth="1.2" fill="none"
            strokeDasharray="22 14 4 14"
            style={{ animationDuration: isIdle ? '30s' : '14s' }} />
          <circle cx="50" cy="50" r="36" className="hud-inner"
            stroke="rgba(168,85,247,0.55)" strokeWidth="0.9" fill="none"
            strokeDasharray="6 10"
            style={{ animationDuration: isIdle ? '20s' : '9s' }} />
          {/* Cardinal axis ticks */}
          <line x1="50" y1="2"  x2="50" y2="9"  stroke="rgba(6,182,212,0.7)"  strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="91" x2="50" y2="98" stroke="rgba(6,182,212,0.7)"  strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2"  y1="50" x2="9"  y2="50" stroke="rgba(6,182,212,0.7)"  strokeWidth="1.5" strokeLinecap="round" />
          <line x1="91" y1="50" x2="98" y2="50" stroke="rgba(6,182,212,0.7)"  strokeWidth="1.5" strokeLinecap="round" />
          {/* Diagonal minor ticks */}
          <line x1="14" y1="14" x2="18" y2="18" stroke="rgba(168,85,247,0.4)" strokeWidth="1" strokeLinecap="round" />
          <line x1="82" y1="18" x2="86" y2="14" stroke="rgba(168,85,247,0.4)" strokeWidth="1" strokeLinecap="round" />
          <line x1="14" y1="86" x2="18" y2="82" stroke="rgba(168,85,247,0.4)" strokeWidth="1" strokeLinecap="round" />
          <line x1="82" y1="82" x2="86" y2="86" stroke="rgba(168,85,247,0.4)" strokeWidth="1" strokeLinecap="round" />
        </svg>

        {/* Scan line — sweeps once on each new hover lock-on */}
        {isHover && <div key={scanKey} className="cursor-scan-line" />}
      </motion.div>

      {/* ── Corner brackets — spring in on hover ── */}
      <motion.div
        className="cursor-brackets"
        style={{
          x: ringX, y: ringY,
          width: ringWidth, height: ringHeight,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{ scale: isHover ? 1.18 : 0.82, opacity: isHover ? 1 : 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
      >
        <span className="bracket bracket-tl" />
        <span className="bracket bracket-tr" />
        <span className="bracket bracket-bl" />
        <span className="bracket bracket-br" />
      </motion.div>

      {/* ── Floating label — OWN z-index layer, fully above navbar ── */}
      <motion.div
        className="cursor-label-float"
        style={{
          x: cursorX,
          y: labelFinalY,
          translateX: '-50%',
          position: 'fixed',
          left: 0, top: 0,
          pointerEvents: 'none',
          zIndex: 99999,
        }}
        animate={{
          opacity: isHover && hoverLabel ? 1 : 0,
          scale:   isHover && hoverLabel ? 1 : 0.75,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {hoverLabel}
      </motion.div>
    </div>
  )
}
