import { APPS } from '../data/apps.js'

export default function StartMenu({ open, mode, onPick, onShutdown }) {
  const night = mode === 'night'
  return (
    <div id="menu" style={{ display: open ? 'block' : 'none' }}>
      {Object.entries(APPS)
        .filter(([k]) => !k.endsWith('_g'))
        .map(([k, a]) => {
          const v = (night && APPS[k + '_g']) || a
          return (
            <button key={k} className="vt" onClick={() => onPick(k)}>{v.ic} {v.t}</button>
          )
        })}
      <hr style={{ margin: '2px 0', border: '1px solid #404560' }} />
      <button className="vt" onClick={onShutdown}>⏻ SHUT DOWN...</button>
    </div>
  )
}
