import { APPS } from '../data/apps.js'
import { emit } from '../engine/bus.js'
import Background from './Background.jsx'
import Widget from './Widget.jsx'
import Hero from './Hero.jsx'
import Win from './Win.jsx'

export default function Desktop({ mode, wins, top, onOpen, onFocus, onMin, onMax, onClose, onMove }) {
  const night = mode === 'night'
  const icons = Object.entries(APPS).filter(([k]) => !k.endsWith('_g'))
  return (
    <div id="desk">
      <Background mode={mode} />
      <div id="fl">
        <span style={{ top: '13%', animationDuration: '46s' }}>👾</span>
        <span style={{ top: '27%', animationDuration: '62s', animationDelay: '-24s' }}>👻</span>
        <span style={{ top: '20%', animationDuration: '38s', animationDelay: '-12s' }}>🪙</span>
      </div>
      <Widget mode={mode} />
      <div id="icons">
        {icons.map(([k, a]) => {
          const v = (night && APPS[k + '_g']) || a
          return (
            <button key={k} className="ic" onClick={() => { onOpen(k); emit('victory') }}>
              <b>{v.ic}</b>{v.t}
            </button>
          )
        })}
      </div>
      <div id="tag">
        TWO LIVES.<br />ONE PLAYER.<br />
        <span id="sub">{night ? 'PLAY GAMES BY NIGHT.' : 'BUILD SOLUTIONS BY DAY.'}</span>
      </div>
      <Hero mode={mode} />
      {wins.map((w) => (
        <Win key={w.key} k={w.key} w={w} top={top === w.key} onFocus={onFocus} onMin={onMin} onMax={onMax} onClose={onClose} onMove={onMove} />
      ))}
    </div>
  )
}
