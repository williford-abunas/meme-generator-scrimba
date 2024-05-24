import React from 'react'

const MemeText = (props) => {
  const { position, meme, whichPos, handleMouseDown } = props
  return (
    <h2
      className="meme--text top"
      style={{ top: `${position.y}%`, left: `${position.x}%` }}
      onMouseDown={(e) => handleMouseDown(e, `${whichPos}`)}
    >
      {meme.topText}
    </h2>
  )
}

export default MemeText
