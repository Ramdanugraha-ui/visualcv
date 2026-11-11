import { useEffect, useState } from 'react'
import { APPS } from '../data/apps.js'

export default function Taskbar({ wins, top, mode, muted, onStart, onTask, onClose, onMute, onMode }) {
  const [clk, setClk] = useState('')
  useEffect(() => {
    const f = () => setClk(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
    f()
    const t = setInterval(f, 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div id="bar">
      <button id="sb" className="px" style={{ fontSize: 9 }} onClick={onStart}>▶ START</button>
      <div id="tasks">
        {wins.map((w) => {
          const a = APPS[w.key]
          return (
            <button key={w.key} className={top === w.key && !w.min ? 'on' : ''} onClick={() => onTask(w.key)}>
              {a.ic} {a.t}
              <span className="tx" title="Tutup" onClick={(e) => { e.stopPropagation(); onClose(w.key) }}>×</span>
            </button>
          )
        })}
      </div>
      <button id="snd" title="Suara" onClick={onMute}>{muted ? '🔇' : '🔊'}</button>
      <button id="mode" onClick={onMode}>{mode === 'day' ? '☀ DAY' : '☾ NIGHT'}</button>
      <span id="clk" className="hide-m">{clk}</span>
    </div>
  )
}
