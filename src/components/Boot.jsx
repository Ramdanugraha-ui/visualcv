import { useRef, useState } from 'react'
import { ctx, sfx, preload } from '../engine/audio.js'

const LINES = ['BIOS ... OK', 'MEMORY ... 640K', 'LOADING PLAYER_1.SYS ...', 'MOUNTING ARCADE DESKTOP ...']

// Layar "PRESS START". msg = pesan setelah SHUT DOWN
export default function Boot({ msg, onDone }) {
  const [text, setText] = useState(msg || '')
  const busy = useRef(false)

  const go = () => {
    if (busy.current) return
    busy.current = true
    ctx()
    sfx('press')
    preload()
    setText('')
    let i = 0
    const t = setInterval(() => {
      setText((s) => s + LINES[i++] + '\n')
      if (i === LINES.length) {
        clearInterval(t)
        setTimeout(onDone, 350)
      }
    }, 320)
  }

  return (
    <div id="start">
      <div className="hud">
        <span>1P<br />00</span>
        <span style={{ textAlign: 'center' }}>HIGH SCORE<br />♥♥♥♥♥</span>
        <span style={{ textAlign: 'right' }}>2P<br />00</span>
      </div>
      <button id="go" className="px" style={{ all: 'unset' }} onClick={go}>
        <h1>PRESS START</h1>
      </button>
      <p style={{ color: '#fff' }}>INSERT COIN TO CONTINUE</p>
      <p style={{ color: 'var(--yel)' }}>RAMDAN NUGRAHA</p>
      <p style={{ color: 'var(--mag)' }}>TWO LIVES. ONE PLAYER.</p>
      <div id="boot">{text}</div>
      <p style={{ color: '#9aa', fontSize: 7 }}>RETRO ARCADE PORTFOLIO SYSTEM v1.0</p>
    </div>
  )
}
