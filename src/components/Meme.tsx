import React, { useEffect } from 'react'
import { useState } from 'react'
import MemeText from './MemeText.tsx'

const Meme = (props: any) => {
  const {
    memeRef,
    meme,
    handleImageLoad,
    topTextPos,
    setTopTextPos,
    bottomTextPos,
    setBottomTextPos,
    isImageLoaded,
  } = props

  const [dragging, setDragging] = useState({ isDragging: false, which: null })

  useEffect(() => {
    if (isImageLoaded) {
      setTopTextPos({ x: 50, y: 10 })
      setBottomTextPos({ x: 50, y: 80 })
    }
  }, [isImageLoaded, setTopTextPos, setBottomTextPos])

  const handleMouseDown = (e, which) => {
    e.preventDefault()
    setDragging({ isDragging: true, which })
  }

  const handleMouseMove = (e) => {
    if (!dragging.isDragging) return

    const rect = memeRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (dragging.which === 'top') {
      setTopTextPos({ x, y })
    } else if (dragging.which === 'bottom') {
      setBottomTextPos({ x, y })
    }
  }

  const handleMouseUp = () => {
    setDragging({ isDragging: false, which: null })
  }

  return (
    <div
      className="meme"
      ref={memeRef}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <img
        src={meme.randomImage}
        alt="meme"
        className="meme--image"
        style={{ width: '100%', height: '100%' }}
        crossOrigin="anonymous"
        onLoad={handleImageLoad}
        draggable="false"
      />
      <MemeText
        memeText={meme.topText}
        position={topTextPos}
        handleMouseDown={handleMouseDown}
        whichPos="top"
      />
      <MemeText
        memeText={meme.bottomText}
        position={bottomTextPos}
        handleMouseDown={handleMouseDown}
        whichPos="bottom"
      />
    </div>
  )
}

export default Meme
