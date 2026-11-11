import { useEffect, useRef, useState } from 'react'
import { S, draw } from '../engine/sprite.js'
import { sfx } from '../engine/audio.js'
import { on } from '../engine/bus.js'

// Karakter Ramdan: idle, jalan acak, bekerja (DAY) / bermain (NIGHT), dan pose kemenangan
export default function Hero({ mode }) {
  const cv = useRef(null)
  const hero = useRef(null)
  const m = useRef(mode)
  m.current = mode
  const [act, setAct] = useState(false)
  const g = useRef({ HX: 0, walkTo: null, actT: 0, startAct: () => {} })

  useEffect(() => {
    const h = hero.current, c = cv.current, q = g.current
    const paint = () => draw(c, m.current)
    const place = () => { h.style.transform = `translateX(${q.HX}px)` }
    const endAct = () => { S.st = 'idle'; h.classList.remove('walk'); setAct(false) }
    q.startAct = () => {
      if (S.st === 'win') return
      q.walkTo = null; S.st = 'act'; q.actT = 40
      h.classList.add('walk'); c.style.scale = '1 1'; setAct(true)
    }
    const victory = () => {
      S.st = 'win'; q.walkTo = null
      h.classList.remove('walk'); h.classList.add('vic'); setAct(false); paint()
      setTimeout(() => { S.st = 'idle'; h.classList.remove('vic'); paint() }, 1700)
    }
    q.HX = innerWidth - (innerWidth > 720 ? 260 : 170)
    place()
    victory()
    const off = on('victory', victory)
    const t = setInterval(() => {
      if (S.st === 'win') return
      if (S.st === 'act') {
        S.F = !S.F
        if (--q.actT <= 0) endAct()
      } else if (q.walkTo != null) {
        const d = q.walkTo - q.HX
        if (Math.abs(d) < 10) { q.walkTo = null; S.st = 'idle'; h.classList.remove('walk') }
        else {
          q.HX += Math.sign(d) * 10
          c.style.scale = d < 0 ? '-1 1' : '1 1'
          S.F = !S.F
          S.st = S.F ? 'w1' : 'w2'
          h.classList.add('walk')
        }
      } else {
        const r = Math.random()
        if (r < 0.03) {
          const lo = innerWidth > 720 ? 260 : innerWidth * 0.4
          q.walkTo = lo + Math.random() * (innerWidth - lo - (innerWidth > 720 ? 250 : 170))
        } else if (r < 0.06) q.startAct()
      }
      place()
      paint()
    }, 180)
    return () => { clearInterval(t); off(); S.st = 'idle' }
  }, [])

  // animasi "flash" + gambar ulang saat pindah mode
  useEffect(() => {
    const h = hero.current
    h.classList.remove('flash')
    void h.offsetWidth
    h.classList.add('flash')
    draw(cv.current, mode)
  }, [mode])

  const day = mode === 'day'
  const label = act ? (day ? 'PLAYER 1 · WORKING' : 'PLAYER 1 · PLAYING') : day ? 'PLAYER 1 · WORK' : 'PLAYER 1 · GAME'

  return (
    <div id="hero" ref={hero}>
      <canvas
        id="cv" ref={cv} width="40" height="32" title="Klik aku!" style={{ cursor: 'pointer' }}
        onClick={() => { if (S.st !== 'act') { sfx('chr'); g.current.startAct() } else g.current.actT = 0 }}
      />
      <div id="role">{label}</div>
    </div>
  )
}
