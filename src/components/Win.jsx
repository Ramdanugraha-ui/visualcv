import { memo, useEffect, useRef } from 'react'
import { APPS } from '../data/apps.js'
import { gameStart, gameEnd } from '../engine/audio.js'
import { carGo } from '../engine/gallery.js'
import { typeIn } from '../engine/typewriter.js'

// Isi jendela dibuat sekali (HTML dari data/apps.js) agar tidak ditimpa React saat posisi berubah
const Body = memo(({ html }) => <div className="body" dangerouslySetInnerHTML={{ __html: html }} />)

export default function Win({ k, w, top, onFocus, onMin, onMax, onClose, onMove }) {
  const a = APPS[k]
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    let stop
    if (a.init) { stop = a.init(el); gameStart(k, a) }
    el.querySelectorAll('.car').forEach((c) => carGo(c, 0))
    if (a.type) typeIn(el)
    return () => { if (stop) stop(); if (a.init) gameEnd(k) }
  }, [])

  const drag = (e) => {
    if (innerWidth <= 720 || w.max || e.target.closest('[data-a]')) return
    const ox = e.clientX - w.x, oy = e.clientY - w.y
    const mv = (ev) => onMove(k, Math.max(0, ev.clientX - ox), Math.max(0, ev.clientY - oy))
    const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up) }
    addEventListener('pointermove', mv)
    addEventListener('pointerup', up)
  }

  return (
    <div
      ref={root}
      className={'win' + (w.max ? ' max' : '')}
      data-top={top ? 1 : undefined}
      style={{ left: w.x, top: w.y, width: a.w, height: a.h, zIndex: w.z, display: w.min ? 'none' : 'flex' }}
      onPointerDown={(e) => { if (!e.target.closest('[data-a]')) onFocus(k) }}
    >
      <div className="tb" onPointerDown={drag}>
        <span>{a.ic} {a.t}</span>
        <button data-a="min" aria-label="Minimize" onClick={() => onMin(k)}>_</button>
        <button data-a="max" aria-label="Maximize" onClick={() => onMax(k)}>□</button>
        <button data-a="x" aria-label="Close" onClick={() => onClose(k)}>×</button>
      </div>
      <Body html={a.h$} />
    </div>
  )
}
