import { useEffect, useRef } from 'react'
import { drawBG } from '../engine/background.js'

export default function Background({ mode }) {
  const ref = useRef(null)
  useEffect(() => {
    const paint = () => drawBG(ref.current.parentElement, ref.current, mode === 'night')
    paint()
    let t
    const rs = () => { clearTimeout(t); t = setTimeout(paint, 150) }
    addEventListener('resize', rs)
    return () => { removeEventListener('resize', rs); clearTimeout(t) }
  }, [mode])
  return <canvas id="bgc" ref={ref} />
}
