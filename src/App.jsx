import { useEffect, useRef, useState } from 'react'
import { APPS } from './data/apps.js'
import { sfx, whoosh, bgmPlay, bgmStop, setMuted, live, gameActive } from './engine/audio.js'
import Boot from './components/Boot.jsx'
import Desktop from './components/Desktop.jsx'
import Taskbar from './components/Taskbar.jsx'
import StartMenu from './components/StartMenu.jsx'

export default function App() {
  const [on, setOn] = useState(false) // desktop menyala?
  const [halt, setHalt] = useState('') // pesan setelah SHUT DOWN
  const [mode, setMode] = useState('day')
  const [wins, setWins] = useState([]) // [{ key, x, y, z, min, max }]
  const [top, setTop] = useState(null)
  const [menu, setMenu] = useState(false)
  const [muted, setMutedState] = useState(false)
  const [fx, setFx] = useState({ run: false, c: '#FF36C8' })
  const z = useRef(10)
  const busy = useRef(false)
  const winsRef = useRef(wins)
  winsRef.current = wins

  useEffect(() => { document.body.dataset.mode = mode; live.mode = mode }, [mode])
  useEffect(() => {
    const close = () => setMenu(false)
    addEventListener('click', close)
    return () => removeEventListener('click', close)
  }, [])

  // ---- window manager
  const addWin = (k) => {
    const exists = winsRef.current.some((w) => w.key === k)
    if (!exists && !APPS[k].init) sfx(k.endsWith('_g') ? 'open' : 'exe')
    setWins((ws) => {
      if (ws.some((w) => w.key === k)) return ws.map((w) => (w.key === k ? { ...w, min: false, z: ++z.current } : w))
      const a = APPS[k], n = ws.length * 22
      return [...ws, { key: k, x: a.x + n, y: a.y + n, z: ++z.current, min: false, max: false }]
    })
    setTop(k)
  }
  const open = (k0) => addWin(mode === 'night' && APPS[k0 + '_g'] ? k0 + '_g' : k0)
  const focus = (k) => {
    setWins((ws) => ws.map((w) => (w.key === k ? { ...w, min: false, z: ++z.current } : w)))
    setTop(k)
  }
  const minimize = (k) => {
    sfx('tog')
    setWins((ws) => ws.map((w) => (w.key === k ? { ...w, min: true } : w)))
    setTop((t) => (t === k ? null : t))
  }
  const maximize = (k) => {
    sfx('tog')
    setWins((ws) => ws.map((w) => (w.key === k ? { ...w, max: !w.max } : w)))
  }
  const close = (k) => {
    sfx('close')
    setWins((ws) => ws.filter((w) => w.key !== k))
    setTop((t) => (t === k ? null : t))
  }
  const move = (k, x, y) => setWins((ws) => ws.map((w) => (w.key === k ? { ...w, x, y } : w)))
  const taskClick = (k) => {
    const w = winsRef.current.find((x) => x.key === k)
    if (top === k && !w.min) minimize(k)
    else focus(k)
  }

  // ---- power
  const startDesktop = () => {
    setHalt('')
    live.mode = 'day'
    live.desk = true
    setMode('day')
    setOn(true)
    bgmPlay('day')
    if (innerWidth > 720) addWin('about')
  }
  const shutdown = () => {
    live.desk = false
    const lb = document.getElementById('lb')
    if (lb) lb.remove()
    setWins([])
    setTop(null)
    setMenu(false)
    setOn(false)
    setHalt('SYSTEM HALTED.\nSEE YOU, PLAYER 1!')
    bgmStop()
    sfx('off')
  }

  // ---- day / night dengan transisi neon
  const toggleMode = () => {
    if (busy.current) return
    busy.current = true
    const m = mode === 'day' ? 'night' : 'day'
    sfx('mode')
    whoosh()
    setFx({ run: true, c: m === 'night' ? '#FF36C8' : '#31E8FF' })
    setTimeout(() => {
      setMode(m)
      live.mode = m
      if (!gameActive()) bgmPlay(m)
    }, 430)
    setTimeout(() => {
      setFx((f) => ({ ...f, run: false }))
      busy.current = false
    }, 980)
  }
  const toggleMute = () => {
    const m = !muted
    setMutedState(m)
    setMuted(m)
  }

  return (
    <>
      {!on && <Boot msg={halt} onDone={startDesktop} />}
      {on && (
        <Desktop mode={mode} wins={wins} top={top} onOpen={open} onFocus={focus} onMin={minimize} onMax={maximize} onClose={close} onMove={move} />
      )}
      <StartMenu open={menu && on} mode={mode} onPick={(k) => { setMenu(false); open(k) }} onShutdown={() => { setMenu(false); shutdown() }} />
      <div id="fx" className={fx.run ? 'go' : ''} style={{ '--c': fx.c }}><i /><i /></div>
      {on && (
        <Taskbar
          wins={wins} top={top} mode={mode} muted={muted}
          onStart={(e) => { e.stopPropagation(); sfx('click'); setMenu((m) => !m) }}
          onTask={taskClick} onClose={close} onMute={toggleMute} onMode={toggleMode}
        />
      )}
    </>
  )
}
