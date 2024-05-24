import React from 'react'

const MemeText = (props) => {
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
