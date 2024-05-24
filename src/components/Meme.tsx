import React from 'react'

const Meme = (props: any) => {
  const { memeRef, meme, handleImageLoad } = props
  return (
    <div className="meme" ref={memeRef}>
      <img
        src={meme.randomImage}
        alt="meme"
        className="meme--image"
        style={{ width: '100%', height: '100%' }}
        crossOrigin="anonymous"
        onLoad={handleImageLoad}
      />
      <h2 className="meme--text top">{meme.topText}</h2>
      <h2 className="meme--text bottom">{meme.bottomText}</h2>
    </div>
  )
}

export default Meme
