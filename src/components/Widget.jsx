export default function Widget({ mode }) {
  return (
    <div id="wid">
      <div className="wt">SYS_MONITOR.EXE</div>
      <div>PLAYER 1 ▸ <b>RAMDAN N.</b></div>
      <div>CLASS ▸ INFO SYSTEMS</div>
      <div>LEVEL ▸ S.KOM · 3.77</div>
      <div>QUEST ▸ <span id="wq">{mode === 'day' ? 'BUILD SOLUTIONS' : 'PLAY GAMES'}</span></div>
      <div className="bl">INSERT COIN ▮</div>
    </div>
  )
}
