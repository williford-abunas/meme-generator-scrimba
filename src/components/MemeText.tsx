import React from 'react'

type MemeTextProps = {
  position: { x: number; y: number }
  memeText: string
  whichPos: string
  handleMouseDown: (e: React.MouseEvent, whichPos: string) => void
}
const MemeText = (props: MemeTextProps) => {
  const { position, memeText, whichPos, handleMouseDown } = props
  return (
    <h2
      className="meme--text top"
      style={{ top: `${position.y}%`, left: `${position.x}%` }}
      onMouseDown={(e) => handleMouseDown(e, `${whichPos}`)}
    >
      {memeText}
    </h2>
  )
}

export default MemeText
