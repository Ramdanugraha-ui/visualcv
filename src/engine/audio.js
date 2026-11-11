// Mesin audio.
// - Efek suara: Web Audio (latensi rendah), file di public/audio/sfx
// - Musik latar: elemen <audio> yang di-loop, file di public/audio/bgm
let ac
export const ctx = () => {
  ac = ac || new (window.AudioContext || window.webkitAudioContext)()
  if (ac.state === 'suspended') ac.resume()
  return ac
}

export const audio = { muted: false }
// Diisi oleh App: dipakai saat game ditutup untuk kembali ke musik desktop
export const live = { mode: 'day', desk: false }

const BUF = {}
const load = async (n) => {
  if (BUF[n]) return BUF[n]
  const ab = await (await fetch(`/audio/sfx/${n}.mp3`)).arrayBuffer()
  return (BUF[n] = await new Promise((ok, err) => ctx().decodeAudioData(ab, ok, err)))
}
export const preload = () =>
  ['press', 'exe', 'open', 'chr', 'pac', 'close', 'tog', 'mode', 'click', 'alt', 'defeat', 'off', 'start', 'ready'].forEach((n) =>
    load(n).catch(() => {})
  )

let cur = null // musik yang sedang aktif
let game = null // key jendela game yang sedang terbuka
const els = {}

export function sfx(n) {
  if (audio.muted) return
  ctx()
  load(n)
    .then((buf) => {
      const s = ac.createBufferSource()
      const g = ac.createGain()
      s.buffer = buf
      g.gain.value = ['defeat', 'pac', 'press'].includes(n) ? 0.9 : 0.7
      s.connect(g)
      g.connect(ac.destination)
      s.start()
      if (n === 'defeat' && cur) {
        // musik berhenti sebentar saat jingle kalah
        const c = cur
        c.pause()
        setTimeout(() => {
          if (cur === c && !audio.muted) c.play().catch(() => {})
        }, 5400)
      }
    })
    .catch(() => {})
}

export function beep(f = 660, d = 0.08, ty = 'square') {
  if (audio.muted) return
  try {
    const a = ctx(), o = a.createOscillator(), g = a.createGain()
    o.type = ty
    o.frequency.value = f
    g.gain.value = 0.05
    o.connect(g)
    g.connect(a.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + d)
    o.stop(a.currentTime + d)
  } catch (e) {}
}

export function whoosh() {
  if (audio.muted) return
  try {
    const a = ctx(), o = a.createOscillator(), g = a.createGain(), t = a.currentTime
    o.type = 'sawtooth'
    o.frequency.setValueAtTime(180, t)
    o.frequency.exponentialRampToValueAtTime(1400, t + 0.45)
    o.frequency.exponentialRampToValueAtTime(300, t + 0.9)
    g.gain.setValueAtTime(0.04, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.9)
    o.connect(g)
    g.connect(a.destination)
    o.start()
    o.stop(t + 0.9)
  } catch (e) {}
}

export function bgmPlay(n) {
  ctx()
  const el = els[n] || (els[n] = Object.assign(new Audio(`/audio/bgm/${n}.mp3`), { loop: true, preload: 'auto', volume: n === 'day' || n === 'night' ? 0.3 : 0.35 }))
  if (cur && cur !== el) cur.pause()
  cur = el
  if (!audio.muted) el.play().catch(() => {})
}
export function bgmStop() {
  if (cur) cur.pause()
  cur = null
  game = null
}
export function setMuted(m) {
  audio.muted = m
  if (cur) m ? cur.pause() : cur.play().catch(() => {})
}

// Dipanggil saat jendela game dibuka / ditutup
export function gameStart(k, a) {
  game = k
  if (a.bgm === 'pac') {
    // Pac-Man: hanya jingle pembuka, lalu musik desktop lanjut
    if (cur) cur.pause()
    sfx('pac')
    setTimeout(() => { if (game === k) bgmPlay(live.mode) }, 4600)
  } else bgmPlay(a.bgm)
}
export function gameEnd(k) {
  if (game === k) {
    game = null
    if (live.desk) bgmPlay(live.mode)
  }
}
export const gameActive = () => game !== null
